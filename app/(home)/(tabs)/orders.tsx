import { AppBar } from '@/components/AppBar';
import FooterCredit from '@/components/FooterCredit';
import { OrderCard } from '@/components/orders/OrderCard';
import { CURRENT_ORDERS, PAST_ORDERS } from '@/constants/data';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';


const OrdersScreen = () => {
    const router = useRouter();

    return (
        <View className='flex-1 bg-background'>
            <AppBar
                title="Orders"
                showBack={false}
            />
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
            >

                {/* Current Orders Section */}
                {CURRENT_ORDERS.length > 0 && (
                    <View className="mb-2">
                        <Text className="font-sans-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                            Current Orders
                        </Text>

                        {CURRENT_ORDERS.map((order) => (
                            <OrderCard key={order.id} order={order} onPress={() => router.push({ pathname: '/orders/[id]', params: { id: order.id, restaurantName: order.restaurantName } })} />
                        ))}
                    </View>
                )}

                {/* Divider between current and past orders if both exist */}
                {CURRENT_ORDERS.length > 0 && PAST_ORDERS.length > 0 && (
                    <View className="h-2 bg-muted/40 w-full mb-6 mt-2" />
                )}

                {/* Past Orders Section */}
                {PAST_ORDERS.length > 0 && (
                    <View className="">
                        <Text className="font-sans-bold text-sm text-muted-foreground uppercase tracking-wider mb-4">
                            Past Orders
                        </Text>

                        {PAST_ORDERS.map((order) => (
                            <OrderCard key={order.id} order={order} onPress={() => router.push({ pathname: '/orders/[id]', params: { id: order.id, restaurantName: order.restaurantName } })} />
                        ))}
                    </View>
                )}
                {/* View More Orders */}
                <Pressable>
                    <View className="bg-muted-foreground flex-row gap-1 p-3 rounded-2xl justify-center items-center my-2">
                        <Text className="text-sm uppercase text-white font-sans-bold tracking-wide">View more orders</Text>
                        <Ionicons name="chevron-down" size={16} color={theme.colors.white} />
                    </View>
                </Pressable>

                <FooterCredit />
            </ScrollView>
        </View>
    );
};

export default OrdersScreen;