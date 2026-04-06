import { Restaurant } from "@/constants/data";
import { theme } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, Text, View } from "react-native";

type Props = {
    restaurant: Restaurant;
    onPress?: () => void;
};

export function RestaurantCard({ restaurant, onPress }: Props) {
    return (
        <Pressable className="mb-6 bg-card rounded-3xl pb-2 shadow-sm" onPress={onPress}>
            {/* ── Image Section ── */}
            <View className="relative w-full h-52 rounded-3xl overflow-hidden mb-3">
                <Image
                    source={{ uri: restaurant.imageUri }}
                    resizeMode="cover"
                    className="w-full h-full"
                />

                {/* Top Right Badges */}
                <View className="absolute top-3 right-3 flex-row items-center gap-2">
                    {restaurant.isAd && (
                        <View className="bg-black/40 px-1.5 py-0.5 rounded-md mr-1">
                            <Text className="font-sans-bold text-[10px] text-white/90">Ad</Text>
                        </View>
                    )}
                    <Pressable className="size-8 items-center justify-center rounded-full bg-black/30">
                        <Ionicons name="heart-outline" size={20} color={theme.colors.white} />
                    </Pressable>
                    <Pressable className="size-8 items-center justify-center rounded-full bg-black/30">
                        <Ionicons name="ellipsis-vertical" size={16} color={theme.colors.white} />
                    </Pressable>
                </View>

                {/* Bottom Gradient overlay */}
                <LinearGradient
                    colors={[
                        "transparent",
                        "rgba(0,0,0,0.2)",
                        "rgba(0,0,0,0.5)",
                        theme.colors.foreground
                    ]}
                    locations={[0, 0.4, 0.7, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                    style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: "60%",
                    }}
                />

                {/* Bottom Left Offers */}
                <View className="absolute bottom-3 left-4">
                    <Text className="font-heading-bold text-2xl text-white tracking-tight">
                        <MaterialCommunityIcons name="brightness-percent" size={14} color={theme.colors.primary} />
                        {" "}{restaurant.offerTitle}
                    </Text>
                    {restaurant.offerSubtitle && (
                        <Text className="font-sans-bold text-xs text-white/90 mt-0.5 ml-1">
                            <MaterialCommunityIcons name="brightness-percent" size={12} color={theme.colors.primary} />
                            {" "}{restaurant.offerSubtitle}
                        </Text>
                    )}
                </View>

                {/* Bottom Right Delivery Time Bubble */}
                <View className="absolute bottom-0 right-0 bg-muted px-3 py-1.5 rounded-tl-xl rounded-br-3xl items-center pb-2 gap-0.5">
                    <MaterialCommunityIcons name="clock-fast" size={12} color={theme.colors.primary} className="bg-muted absolute -top-4 right-0 p-2 rounded-xl" />
                    <Text className="font-sans-bold text-sm text-foreground">{restaurant.deliveryTime}</Text>
                    <Text className="font-sans-bold text-xs text-primary">FREE DELIVERY</Text>
                </View>
            </View>

            {/* ── Details Section ── */}
            <View className="pl-3">
                {/* Flexible Badge */}
                {restaurant.badgeType === 'veg' && (
                    <View className="flex-row items-center gap-1">
                        <MaterialCommunityIcons name="leaf" size={12} color="#16A34A" />
                        <Text className="font-sans-semibold text-sm text-success tracking-wide">Pure Veg</Text>
                    </View>
                )}
                {restaurant.badgeType === 'bolt' && (
                    <View className="flex-row items-center gap-1">
                        <Ionicons name="flash" size={12} color="#8B5CF6" />
                        <Text className="font-sans-semibold text-sm text-[#8B5CF6] tracking-wide">Bolt</Text>
                    </View>
                )}

                {/* Name */}
                <Text className="font-heading-bold text-2xl text-foreground leading-tight tracking-tight mb-1">{restaurant.name}</Text>

                {/* Rating & Distance */}
                <View className="flex-row items-center gap-1.5 mb-1">
                    <MaterialCommunityIcons name="star-circle" size={14} color={theme.colors.success} />
                    <Text className="font-sans-semibold text-sm text-foreground">
                        {restaurant.rating} {restaurant.ratingCount} • {restaurant.location}, {restaurant.distance}
                    </Text>
                </View>

                {/* Tags & Price */}
                <Text className="font-sans-regular text-sm text-muted-foreground">
                    {restaurant.tags} • {restaurant.priceForTwo}
                </Text>
            </View>
        </Pressable>
    );
}
