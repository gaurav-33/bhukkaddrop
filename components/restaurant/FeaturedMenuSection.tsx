import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import Animated, { Easing, FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';

import { theme } from '@/constants/theme';
import VegNonVegBadge from '../VegNonVegBadge';
import { AddToCartButton } from './AddToCartButton';


type Props = {
    title: string;
    items: MenuItem[];
    defaultExpanded?: boolean
};


const FeaturedMenuSection = ({ title, items, defaultExpanded = true }: Props) => {

    const [isExpanded, setIsExpanded] = useState(defaultExpanded);

    const toggleExpand = () => {
        requestAnimationFrame(() => {
            setIsExpanded(!isExpanded);
        });
    };

    return (
        <View>
            {/* Title Row with Dropdown Chevron */}
            <Pressable
                onPress={toggleExpand}
                className="flex-row items-center justify-between py-4"
            >
                <Text className="font-heading-bold text-xl text-foreground">{title} ({items.length})</Text>
                <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={24}
                    color={theme.colors.mutedForeground} />
            </Pressable>

            {/* Grid of Items */}
            {isExpanded && (
                <Animated.View
                    // OPENING: 200ms. Fast, with a smooth deceleration at the end.
                    entering={FadeIn.duration(200).easing(Easing.out(Easing.quad))}

                    // CLOSING: 100ms. Lightning fast fade out so the user can immediately click again.
                    exiting={FadeOut.duration(100)}

                    // LAYOUT: 200ms. A perfectly predictable, smooth open/close curve. No bouncing.
                    layout={LinearTransition.duration(200).easing(Easing.inOut(Easing.quad))}
                    className="flex-row flex-wrap justify-between overflow-hidden"
                >
                    {items.map((item) => (
                        <View key={item.id} className="w-[48%] mb-8">
                            <View className="w-full h-45 rounded-3xl overflow-hidden mb-3 bg-card shadow-sm border border-border">
                                <Image
                                    source={{ uri: item.imageUri }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            </View>

                            <View className="px-1">
                                {/* Badge, Bestseller, and Rating all in one row */}
                                <View className="flex-row items-center flex-wrap gap-2 mb-1.5">
                                    <VegNonVegBadge isVeg={item.isVeg} />

                                    {item.isBestseller && (
                                        <Text className="font-sans-bold text-[10px] text-primary">
                                            Bestseller
                                        </Text>
                                    )}

                                    {item.rating && (
                                        <View className="flex-row items-center gap-0.5">
                                            <Ionicons name="star" size={10} color={theme.colors.success} />
                                            <Text className="font-sans-bold text-[10px] text-success">
                                                {item.rating} ({item.ratingCount})
                                            </Text>
                                        </View>
                                    )}
                                </View>

                                <Text
                                    className="font-sans-semibold text-[13px] text-foreground leading-snug"
                                    numberOfLines={2}
                                >
                                    {item.name}
                                </Text>

                                <View className="flex-row items-center justify-between mt-auto pt-3">
                                    <View>
                                        <Text className="font-sans-bold text-sm text-foreground">
                                            ₹{item.price}
                                        </Text>
                                    </View>
                                    <AddToCartButton
                                        initialCount={0}
                                        onCountChange={(newCount) => {
                                            // Handle cart logic here later
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    ))}
                </Animated.View>
            )}

            {/* Static Divider - Always visible, never animates transparency */}
            <View className="h-0.5 bg-muted" />
        </View>
    );
}

export default FeaturedMenuSection;