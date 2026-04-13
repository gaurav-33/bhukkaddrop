import { AppBar } from '@/components/AppBar';
import { RestaurantInfoCard } from '@/components/restaurant/RestaurantInfoCard';
import { SafeAreaView } from '@/components/SafeAreaWrapper';
import VegNonVegBadge from '@/components/VegNonVegBadge';
import { CURRENT_ORDERS, PAST_ORDERS, RESTAURANTS } from '@/constants/data';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';

const STAGES = [
    'Order placed',
    'Preparing',
    'Out for delivery',
    'Delivered'
];

const OrderSummaryPage = () => {
    const { id, restaurantName } = useLocalSearchParams();
    const router = useRouter();

    // Find the order across current or past orders
    const order = CURRENT_ORDERS.find(o => o.id === id) || PAST_ORDERS.find(o => o.id === id);
    const restaurant = RESTAURANTS.find(r => r.name === restaurantName) || RESTAURANTS[0];

    if (!order) {
        return (
            <SafeAreaView className="flex-1 bg-background justify-center items-center">
                <Text className="font-heading-bold text-lg text-foreground mb-4">Order Not Found</Text>
                <Pressable onPress={() => router.back()} className="bg-primary px-6 py-3 rounded-xl">
                    <Text className="font-sans-bold text-white">Go Back</Text>
                </Pressable>
            </SafeAreaView>
        );
    }

    // Determine current active stage index for tracker
    let activeStageIndex = 3; // default Delivered
    if (order.isCurrent) {
        if (order.status.toLowerCase().includes('way') || order.status.toLowerCase().includes('delivery')) {
            activeStageIndex = 2; // Out for delivery
        } else if (order.status.toLowerCase().includes('prepar')) {
            activeStageIndex = 1; // Preparing
        } else {
            activeStageIndex = 0; // Order placed
        }
    }

    const itemSubtotal = order.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const platformFee = 5;
    const taxesAndCharges = Math.round(itemSubtotal * 0.05); // dummy 5%
    // If we have a given specific bill total vs computed subtotal, adjust delivery fee to match total
    const computedTotalWithoutDelivery = itemSubtotal + platformFee + taxesAndCharges;
    const deliveryFee = order.billTotal > computedTotalWithoutDelivery ? order.billTotal - computedTotalWithoutDelivery : 0;

    // Safety check just in case mocked totals don't align with random dummy item prices
    const displayTotal = order.billTotal;

    return (
        <View className="flex-1 bg-background">
            {/* Header */}
            <AppBar
                title='Summary'
                bgColor="bg-foreground"
                contentColor={theme.colors.white}
            >
                {/* Restaurant Info Card */}
                <RestaurantInfoCard restaurant={restaurant} />
            </AppBar>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
                <View className="p-5 gap-4">

                    {/* Progress Tracker (Current Orders Only) */}
                    {order.isCurrent && (
                        <View className="bg-card flex-col rounded-3xl p-5 shadow-sm border border-border mt-2">
                            <Text className="font-heading-bold text-sm text-foreground uppercase tracking-wider mb-5">
                                Order Status
                            </Text>

                            <View className="ml-2 gap-0">
                                {STAGES.map((stage, index) => {
                                    const isCompleted = index <= activeStageIndex;
                                    const isLast = index === STAGES.length - 1;

                                    return (
                                        <View key={stage} className="flex-row items-start relative">
                                            {/* Node Container */}
                                            <View className="items-center z-10 w-6">
                                                <View className={`size-4 rounded-full border-2 ${isCompleted ? 'bg-primary border-primary' : 'bg-muted border-muted-foreground/30'} flex justify-center items-center`}>
                                                    {isCompleted && <Ionicons name="checkmark" size={10} color={theme.colors.white} />}
                                                </View>

                                                {/* Connecting Line */}
                                                {!isLast && (
                                                    <View className={`w-0.5 h-10 ${index < activeStageIndex ? 'bg-primary' : 'bg-muted-foreground/20'}`} />
                                                )}
                                            </View>

                                            {/* Text Group */}
                                            <View className="ml-3 -mt-0.5 flex-1 pb-8">
                                                <Text className={`font-sans-bold text-[15px] ${isCompleted ? 'text-foreground' : 'text-muted-foreground'}`}>
                                                    {stage}
                                                </Text>
                                                {index === activeStageIndex && (
                                                    <Text className="font-sans-regular text-[11px] text-primary mt-1">
                                                        {order.status}
                                                    </Text>
                                                )}
                                            </View>
                                        </View>
                                    );
                                })}
                            </View>
                        </View>
                    )}

                    {/* Item List Detail */}
                    <View className="bg-card rounded-3xl p-5 shadow-sm border border-border mt-2">
                        <Text className="font-heading-bold text-sm text-foreground uppercase tracking-wider mb-5">
                            Your Items
                        </Text>

                        {order.items.map((item, index) => (
                            <View
                                key={item.id}
                                className={`flex-row justify-between items-start py-3 ${index !== order.items.length - 1 ? 'border-b border-muted/50' : ''}`}
                            >
                                <View className="flex-row items-start gap-3 flex-1 pr-4">
                                    <View className="mt-1">
                                        <VegNonVegBadge isVeg={item.isVeg} />
                                    </View>
                                    <View>
                                        <Text className="font-sans-semibold text-sm text-foreground mb-1">{item.name}</Text>
                                        <Text className="font-sans-regular text-xs text-muted-foreground">₹{item.price} x {item.quantity}</Text>
                                    </View>
                                </View>
                                <Text className="font-sans-semibold text-sm text-foreground">
                                    ₹{item.price * item.quantity}
                                </Text>
                            </View>
                        ))}
                    </View>

                    {/* Bill Breakdown */}
                    <View className="bg-card rounded-3xl p-5 shadow-sm border border-border mt-2 mb-6">
                        <Text className="font-heading-bold text-sm text-foreground uppercase tracking-wider mb-4">
                            Bill Details
                        </Text>

                        <View className="gap-2.5">
                            <View className="flex-row justify-between">
                                <Text className="font-sans-medium text-[13px] text-muted-foreground">Item Total</Text>
                                <Text className="font-sans-medium text-[13px] text-foreground">₹{itemSubtotal}</Text>
                            </View>

                            {deliveryFee > 0 && (
                                <View className="flex-row justify-between">
                                    <Text className="font-sans-medium text-[13px] text-muted-foreground">Delivery Partner Fee</Text>
                                    <Text className="font-sans-medium text-[13px] text-foreground">₹{deliveryFee}</Text>
                                </View>
                            )}

                            <View className="flex-row justify-between">
                                <Text className="font-sans-medium text-[13px] text-muted-foreground">Platform Fee</Text>
                                <Text className="font-sans-medium text-[13px] text-foreground">₹{platformFee}</Text>
                            </View>

                            <View className="flex-row justify-between mb-2">
                                <Text className="font-sans-medium text-[13px] text-muted-foreground">Taxes & Charges</Text>
                                <Text className="font-sans-medium text-[13px] text-foreground">₹{taxesAndCharges}</Text>
                            </View>
                        </View>

                        <View className="h-px bg-border my-3" />

                        <View className="flex-row justify-between mb-1">
                            <Text className="font-heading-bold text-base text-foreground">To Pay</Text>
                            <Text className="font-heading-bold text-base text-foreground">₹{displayTotal}</Text>
                        </View>
                    </View>

                </View>
            </ScrollView>
        </View>
    );
};

export default OrderSummaryPage;