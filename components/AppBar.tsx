import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export type AppBarProps = {
    title?: string;
    titleClassName?: string;
    showBack?: boolean;
    onBackPress?: () => void;
    rightActions?: ReactNode;
    bgColor?: string;
    contentColor?: string;
    borderBottom?: boolean;
    children?: ReactNode;
};

export const AppBar = ({
    title,
    titleClassName = 'text-2xl',
    showBack = true,
    onBackPress,
    rightActions,
    bgColor = "bg-foreground",
    contentColor = theme.colors.white,
    children
}: AppBarProps) => {
    const router = useRouter();
    const insets = useSafeAreaInsets();

    const handleBack = () => {
        if (onBackPress) {
            onBackPress();
        } else if (router.canGoBack()) {
            router.back();
        }
    };

    return (
        <View 
            className={`${bgColor} rounded-b-4xl pb-3 border-b border-border z-10`}
            style={{ paddingTop: insets.top }}
        >
            <View className={`flex-row items-center justify-between px-5 pt-2 ${children ? '' : 'pb-2'}`}>
                {/* Left side (Back Button & Title) */}
                <View className="flex-row items-center flex-1">
                    {showBack && (
                        <Pressable onPress={handleBack} className={`size-10 items-center justify-center -ml-2 ${title ? 'mr-1' : ''}`}>
                            <Ionicons name="arrow-back" size={24} color={contentColor} />
                        </Pressable>
                    )}
                    {title && (
                        <Text
                            className={`font-heading-bold ${titleClassName} ${!showBack ? 'mt-2' : ''}`}
                            style={{ color: contentColor }}
                            numberOfLines={1}
                        >
                            {title}
                        </Text>
                    )}
                </View>

                {/* Right side (Actions) */}
                {rightActions && (
                    <View className="flex-row items-center gap-1">
                        {rightActions}
                    </View>
                )}
            </View>

            {/* Children */}
            {children && (
                <View className='mt-2'>
                    {children}
                </View>
            )}
        </View>
    );
};
