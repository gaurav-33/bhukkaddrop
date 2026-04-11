import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

type RestaurantInfoCardProps = {
    restaurant: Restaurant;
};

export const RestaurantInfoCard = ({ restaurant }: RestaurantInfoCardProps) => {
    return (
        <View className="px-5 mb-5">
            <View className="bg-card rounded-3xl p-5 shadow-sm border border-border">
                <View className="flex-row justify-between items-start mb-1.5">
                    <Text className="font-heading-bold text-3xl text-foreground max-w-[80%] leading-tight">
                        {restaurant.name}
                    </Text>
                    <View className="items-center bg-success px-2 py-1 rounded-xl flex-row gap-0.5 mt-1">
                        <Text className="font-sans-bold text-white text-[11px]">{restaurant.rating}</Text>
                        <Ionicons name="star" size={10} color={theme.colors.white} />
                    </View>
                </View>

                <View className="flex-row items-center">
                    <Text className="font-sans-semibold text-sm text-muted-foreground">
                        {restaurant.deliveryTime.toLowerCase()}
                    </Text>
                    <Text className="font-sans-regular text-sm text-border mx-2">|</Text>
                    <Text className="font-sans-semibold text-sm text-muted-foreground">
                        {restaurant.location}
                    </Text>
                    <Text className="font-sans-regular text-[10px] text-muted-foreground ml-auto">
                        {restaurant.ratingCount} ratings
                    </Text>
                </View>
            </View>
        </View>
    );
};
