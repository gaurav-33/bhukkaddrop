import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { theme } from '@/constants/theme';
import { AddToCartButton } from './AddToCartButton';
import VegNonVegBadge from './VegNonVegBadge';

type Props = {
    title: string;
    items: MenuItem[];
    defaultExpanded?: boolean;
};

const MenuItemRow = ({ item }: { item: MenuItem }) => {
    const [isDescExpanded, setIsDescExpanded] = useState(false);

    return (
        <View className="flex-row py-5 border-b border-muted min-h-40">
            {/* Left Info */}
            <View className="flex-1 pr-4">
                <View className="mb-1">
                    <VegNonVegBadge isVeg={item.isVeg} />
                </View>
                <Text className="font-sans-bold text-[16px] text-foreground leading-tight mb-1 mt-1">{item.name}</Text>
                <Text className="font-sans-semibold text-[14px] text-foreground mb-2">₹{item.price}</Text>

                {item.description && (
                    <View className="mt-1">
                        <Text
                            className="font-sans-regular text-[13px] leading-4 text-muted-foreground"
                            numberOfLines={isDescExpanded ? undefined : 2}
                        >
                            {item.description}
                        </Text>
                        {!isDescExpanded && item.description.length > 50 && (
                            <Pressable onPress={() => setIsDescExpanded(true)} className="mt-1">
                                <Text className="font-sans-bold text-[13px] text-foreground">more</Text>
                            </Pressable>
                        )}
                    </View>
                )}
            </View>

            {/* Right Image & Button */}
            <View className="w-35 items-center ml-2">
                <View className="w-full h-35 rounded-2xl overflow-hidden bg-card border border-border">
                    {item.imageUri && (
                        <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
                    )}
                </View>
                <View className="-mt-5 w-27">
                    <AddToCartButton initialCount={0} />
                </View>
            </View>
        </View>
    );
};

const MenuSection = ({ title, items, defaultExpanded = true }: Props) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const toggleExpand = () => {
        requestAnimationFrame(() => setIsExpanded(!isExpanded));
    };

    return (
        <View>
            {/* Title Row */}
            <Pressable
                onPress={toggleExpand}
                className="flex-row items-center justify-between py-4"
            >
                <Text className="font-heading-bold text-xl text-foreground">{title} ({items.length})</Text>
                <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={theme.colors.mutedForeground}
                />
            </Pressable>

            {/* Items List */}
            {isExpanded && (
                <Animated.View
                    entering={FadeIn.duration(200).easing(Easing.out(Easing.quad))}
                    exiting={FadeOut.duration(100)}
                    layout={LinearTransition.duration(200).easing(Easing.inOut(Easing.quad))}
                    className="overflow-hidden"
                >
                    {items.map((item) => (
                        <MenuItemRow key={item.id} item={item} />
                    ))}
                </Animated.View>
            )}

            {/* Divider */}
            <View className="h-0.5 bg-muted" />
        </View>
    );
};

export default MenuSection;