import React from 'react';
import { View, Text, Modal, Pressable, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { theme } from '@/constants/theme';

export interface AlertDialogProps {
    visible: boolean;
    title: string;
    message: string;
    icon?: keyof typeof Ionicons.glyphMap;
    cancelText?: string;
    confirmText?: string;
    onCancel: () => void;
    onConfirm: () => void;
    isConfirming?: boolean;
    destructive?: boolean;
}

export default function AlertDialog({
    visible,
    title,
    message,
    icon = 'alert-circle-outline',
    cancelText = 'Cancel',
    confirmText = 'Confirm',
    onCancel,
    onConfirm,
    isConfirming = false,
    destructive = false,
}: AlertDialogProps) {
    const iconColor = destructive ? theme.colors.destructive : theme.colors.primary;
    const iconBgClass = destructive ? 'bg-destructive/10' : 'bg-primary/10';
    const confirmBtnClass = destructive ? 'bg-destructive' : 'bg-primary';

    return (
        <Modal
            transparent
            visible={visible}
            animationType="fade"
            onRequestClose={onCancel}
        >
            <View className="flex-1 bg-black/40 justify-center items-center px-6">
                <View className="bg-card w-full rounded-[28px] p-6 gap-6 items-center shadow-lg border border-border">
                    <View className={`size-16 rounded-full items-center justify-center ${iconBgClass}`}>
                        <Ionicons name={icon} size={32} color={iconColor} />
                    </View>

                    <View className="gap-2 items-center">
                        <Text className="font-heading-bold text-2xl text-foreground text-center">
                            {title}
                        </Text>
                        <Text className="font-sans-regular text-sm text-muted-foreground text-center">
                            {message}
                        </Text>
                    </View>

                    <View className="flex-row gap-3 w-full">
                        <Pressable
                            onPress={onCancel}
                            disabled={isConfirming}
                            className="flex-1 bg-muted rounded-2xl items-center justify-center py-4"
                        >
                            <Text className="font-sans-bold text-foreground text-base tracking-wide">
                                {cancelText}
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={onConfirm}
                            disabled={isConfirming}
                            className={`flex-1 rounded-2xl items-center justify-center py-4 ${confirmBtnClass}`}
                        >
                            {isConfirming ? (
                                <ActivityIndicator color="#fff" size="small" />
                            ) : (
                                <Text className="font-sans-bold text-white text-base tracking-wide">
                                    {confirmText}
                                </Text>
                            )}
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}
