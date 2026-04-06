import { Image, Text, View } from "react-native";
import { Category } from "@/constants/data";

export function CategoryCard({ category }: { category: Category }) {
    return (
        <View className="items-center mr-5 w-18">
            <View className="size-18 rounded-full overflow-hidden mb-2 items-center justify-center bg-card shadow-sm">
                <Image
                    source={{ uri: category.imageUri }}
                    className="w-full h-full"
                    resizeMode="cover"
                />
            </View>
            <Text className="font-sans-bold text-xs text-foreground text-center" numberOfLines={1}>
                {category.alias}
            </Text>
        </View>
    );
}
