import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

type Props = {
    label: string;
    icon?: keyof typeof Ionicons.glyphMap;
};

export function FilterChip({ label, icon }: Props) {
    return (
        <View className="flex-row items-center border border-border bg-card px-4 py-2 rounded-3xl mr-3 shadow-none">
            <Text className="font-sans-regular text-xs text-foreground">{label}</Text>
            {icon && (
                <Ionicons name={icon} size={14} color="#3D2C24" className="ml-1" />
            )}
        </View>
    );
}
