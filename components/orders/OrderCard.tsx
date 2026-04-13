import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';

type OrderCardProps = {
    order: Order;
    onPress: () => void;
};

// Sub-component to render the 5 star rating logic
const StarRating = ({ rating = 0 }: { rating?: number }) => {
    return (
        <View className="flex-row items-center gap-1">
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = rating >= star;
                return (
                    <Ionicons
                        key={star}
                        name={isFilled ? "star" : "star-outline"}
                        size={16}
                        color={isFilled ? theme.colors.primary : theme.colors.mutedForeground}
                    />
                );
            })}
        </View>
    );
};

export const OrderCard = ({ order, onPress }: OrderCardProps) => {
    const isPastOrder = !order.isCurrent;

    // Show maximum of 2 items
    const displayItems = order.items.slice(0, 2);
    const hiddenItemsCount = order.items.length - 2;

    return (
        <Pressable onPress={onPress}>

            <View className="bg-card rounded-3xl p-4 shadow-sm border border-border mb-4">

                {/* Header section: Image, Name, Location, Status */}
                <View className="flex-row justify-between items-start mb-4">
                    <View className="flex-row gap-3 items-center flex-1 pr-2">
                        <View className="size-12 rounded-xl overflow-hidden bg-muted border border-border">
                            <Image
                                source={{ uri: order.imageUri }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                        <View>
                            <Text className="font-heading-bold text-base text-foreground mb-0.5">
                                {order.restaurantName}
                            </Text>
                            <Text className="font-sans-regular text-xs text-muted-foreground">
                                {order.location}
                            </Text>
                        </View>
                    </View>

                    {/* Status Pill */}
                    <View className="flex-row items-center gap-1">
                        <Text
                            className="font-sans-bold text-xs"
                            style={{ color: order.statusColor || theme.colors.foreground }}
                        >
                            {order.status}
                        </Text>
                        {order.status === 'Delivered' && (
                            <Ionicons name="checkmark-circle" size={14} color={order.statusColor || theme.colors.success} />
                        )}
                    </View>
                </View>

                {/* Items List Section */}
                <View className="mb-4">
                    {displayItems.map((item) => (
                        <View key={item.id} className="flex-row items-center mb-1.5">
                            <View className="bg-card-foreground/10 px-1.5 py-0.5 rounded-sm mr-3">
                                <Text className="font-sans-semibold text-xs text-muted-foreground">
                                    {item.quantity}x
                                </Text>
                            </View>
                            <Text className="font-sans-regular text-xs text-foreground">
                                {item.name}
                            </Text>
                        </View>
                    ))}

                    {/* Extra items "...& X more" logic */}
                    {hiddenItemsCount > 0 && (
                        <Pressable
                            className="mt-1"
                            onPress={onPress}
                        >
                            <Text className="font-sans-semibold text-[12px] text-muted-foreground underline">
                                & {hiddenItemsCount} more
                            </Text>
                        </Pressable>
                    )}
                </View>

                {/* Ratings Section (Only for past orders as per requirements) */}
                {isPastOrder && (
                    <>
                        <View className="h-0.5 bg-muted/60 mb-4" />

                        <View className="flex-row justify-between items-center mb-4">
                            <View className="items-start">
                                <Text className="font-sans-semibold text-xs text-muted-foreground mb-2">
                                    Rate your food
                                </Text>
                                <StarRating rating={order.foodRating} />
                            </View>

                            {/* Reorder Button */}
                            <Pressable className="bg-muted flex-row rounded-lg px-4 py-2 items-center justify-center">
                                <Text className="font-sans-bold text-[11px] tracking-wide text-foreground uppercase mr-1">
                                    Reorder
                                </Text>
                                <Ionicons name="chevron-forward" size={12} color={theme.colors.foreground} />
                            </Pressable>
                        </View>
                    </>
                )}

                {/* Footer String (Date, Amount) */}
                <View className="flex-row items-center justify-start">
                    <Text className="font-sans-regular text-xs text-muted-foreground">
                        Ordered: {order.date} • Bill Total: ₹{order.billTotal}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};
