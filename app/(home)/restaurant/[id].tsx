import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';

import { AppBar } from '@/components/AppBar';
import { FilterChip } from '@/components/FilterChip';
import { DietaryToggle } from '@/components/restaurant/DietaryToggle';
import FeaturedMenuSection from '@/components/restaurant/FeaturedMenuSection';
import FooterDesclaimer from '@/components/restaurant/FooterDesclaimer';
import { MenuModal } from '@/components/restaurant/MenuModal';
import { RestaurantInfoCard } from '@/components/restaurant/RestaurantInfoCard';
import MenuSection from '@/components/restaurant/MenuSection';
import { MENU_ITEMS, RESTAURANTS, TOP_PICKS } from '@/constants/data';
import { theme } from '@/constants/theme';

const RestaurantPage = () => {
    const { id } = useLocalSearchParams();
    const router = useRouter();

    const restaurant = RESTAURANTS.find(r => r.id === id) || RESTAURANTS[0];

    const [vegOnly, setVegOnly] = useState(false);
    const [nonVegOnly, setNonVegOnly] = useState(false);
    const [isMenuModalVisible, setIsMenuModalVisible] = useState(false);

    return (
        <View className="flex-1 bg-background">
            {/* Header Dark Section */}
            <AppBar
                rightActions={
                    <>
                        <Pressable className="size-10 items-center justify-center">
                            <Ionicons name="heart-outline" size={24} color={theme.colors.white} />
                        </Pressable>
                        <Pressable className="size-10 items-center justify-center">
                            <Ionicons name="ellipsis-vertical" size={20} color={theme.colors.white} />
                        </Pressable>
                    </>
                }
            >

                {/* Restaurant Info Card */}
                <RestaurantInfoCard restaurant={restaurant} />
            </AppBar>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 120, paddingHorizontal: 20, paddingTop: 20}}>

                {/* Search Bar */}
                <View className="flex-row items-center bg-card border border-border rounded-4xl px-4 py-2 gap-2.5 mb-3">
                    <Ionicons name="search" size={18} color={theme.colors.mutedForeground} />
                    <TextInput
                        className="flex-1 font-sans-regular text-sm text-foreground"
                        placeholder="Search for dishes"
                        placeholderTextColor={theme.colors.mutedForeground}
                        returnKeyType="search"
                    />
                </View>


                {/* Dietary Filters */}
                <View className="mb-3 flex-row items-center">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingRight: 20 }}>
                        <DietaryToggle
                            type="veg"
                            active={vegOnly}
                            onToggle={() => {
                                setVegOnly(!vegOnly)
                                if (nonVegOnly) setNonVegOnly(false)
                            }} />
                        <DietaryToggle
                            type="nonveg"
                            active={nonVegOnly}
                            onToggle={() => {
                                setNonVegOnly(!nonVegOnly)
                                if (vegOnly) setVegOnly(false)
                            }} />
                        <FilterChip label="Ratings 4.0+" />
                        <FilterChip label="Bestseller" />
                    </ScrollView>
                </View>

                {/* Divider */}
                <View className='h-0.5 bg-muted' />

                {/* Top Picks */}
                <FeaturedMenuSection
                    title="Top Picks"
                    items={TOP_PICKS}
                />

                {/* Recommended */}
                <MenuSection
                    title="Recommendation"
                    items={MENU_ITEMS}
                />
                <MenuSection
                    title="Khana"
                    items={MENU_ITEMS}
                />

                {/* Desclaimer & Address */}
                <FooterDesclaimer
                    name={restaurant.name}
                    outlet={restaurant.name}
                    location={restaurant.location}
                />

            </ScrollView>

            {/* Menu FAB */}
            <Pressable
                onPress={() => setIsMenuModalVisible(true)}
                className="absolute bottom-8 right-5 bg-foreground rounded-full size-16 items-center justify-center shadow-lg"
            >
                <Ionicons name="list" size={20} color={theme.colors.white} />
                <Text className="font-sans-bold text-xs text-white mt-1">MENU</Text>
            </Pressable>

            {/* Menu Modal */}
            <MenuModal
                visible={isMenuModalVisible}
                onClose={() => setIsMenuModalVisible(false)}
                categories={restaurant.menuCategories || []}
            />
        </View>
    );
}

export default RestaurantPage;