import { View, Text, Pressable } from 'react-native'
import React from 'react'
import { Ionicons } from "@expo/vector-icons"
import { theme } from '@/constants/theme';

// ---------- Types ----------
type MenuRowProps = {
    icon: keyof typeof Ionicons.glyphMap;
    label: string;
    value?: string;
    onPress?: () => void;
    showChevron?: boolean;
    danger?: boolean;
};

// ---------- Sub-Components ----------
const MenuRow = ({ icon, label, value, onPress, showChevron = true, danger = false }: MenuRowProps) => (
    <Pressable
        onPress={onPress}
        className="flex-row items-center px-4 py-3.5 active:bg-muted/20"
    >
        <View className="size-9 rounded-xl items-center justify-center mr-3">
            <Ionicons name={icon} size={18} color={danger ? theme.colors.destructive : theme.colors.foreground} />
        </View>
        <Text className={`flex-1 font-sans-medium text-md ${danger ? 'text-destructive' : 'text-foreground'}`}>
            {label}
        </Text>
        {value && (
            <Text className="font-sans-regular text-xs text-muted-foreground mr-2">{value}</Text>
        )}
        {showChevron && (
            <Ionicons name="chevron-forward" size={16} color={theme.colors.mutedForeground} />
        )}
    </Pressable>
);

export default MenuRow