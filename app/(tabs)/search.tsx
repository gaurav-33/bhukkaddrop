import { AppBar } from '@/components/AppBar';
import VegNonVegBadge from '@/components/VegNonVegBadge';
import { AddToCartButton } from '@/components/restaurant/AddToCartButton';
import { MENU_ITEMS, RESTAURANTS, TOP_PICKS } from '@/constants/data';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Image,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    View,
} from 'react-native';

// ── Types ────────────────────────────────────────────────────────────────────

type ActiveTab = 'dishes' | 'restaurants';

// ── Helpers ──────────────────────────────────────────────────────────────────

const ALL_DISHES = [
    ...MENU_ITEMS.map(item => ({ ...item, restaurantId: 'r1', restaurantName: 'Vadilal Ice Creams' })),
    ...TOP_PICKS.map(item => ({ ...item, restaurantId: 'r2', restaurantName: 'Burger Bliss' })),
];

// ── Sub Components ────────────────────────────────────────────────────────────

const EmptyState = ({ query }: { query: string }) => (
    <View className="flex-1 items-center justify-center py-24 px-6">

        {/* Subtle icon */}
        <Ionicons
            name="search-outline"
            size={88}
            color={theme.colors.muted}
            style={{ marginBottom: 12 }}
        />

        {/* Title */}
        <Text className="font-heading-bold text-xl text-muted-foreground text-center">
            No results found
        </Text>

        {/* Query highlight */}
        <Text className="font-sans-medium text-sm text-muted-foreground text-center mt-1">
            "{query}"
        </Text>

        {/* Helper text */}
        <Text className="font-sans-regular text-sm text-muted-foreground text-center mt-2 leading-5">
            Try a different dish or restaurant name
        </Text>
    </View>
);

const IdleState = () => (
    <View className="flex-1 items-center justify-center py-24 px-6">

        {/* Subtle background-style icon */}
        <Ionicons
            name="restaurant-outline"
            size={96}
            color={theme.colors.muted}
            style={{ marginBottom: 12 }}
        />

        {/* Primary heading */}
        <Text className="font-heading-bold text-2xl text-muted-foreground text-center">
            What are you craving?
        </Text>

        {/* Secondary description */}
        <Text className="font-sans-regular text-sm text-muted-foreground text-center mt-2 leading-5">
            Search for a dish or restaurant to get started
        </Text>
    </View>
);

// Dish card — shown inside horizontal scroll within a restaurant group
const DishCard = ({ item }: { item: typeof ALL_DISHES[0] }) => (
    <View className="w-44 bg-background rounded-2xl border border-border overflow-hidden mr-3 shadow-sm">
        {/* Image */}
        {item.imageUri ? (
            <View className="h-32 w-full">
                <Image source={{ uri: item.imageUri }} className="w-full h-full" resizeMode="cover" />
            </View>
        ) : (
            <View className="h-32 w-full bg-muted items-center justify-center">
                <Ionicons name="fast-food-outline" size={32} color={theme.colors.mutedForeground} />
            </View>
        )}

        <View className="p-3 gap-1.5">
            {/* Badge row */}
            <View className="flex-row items-center gap-1.5">
                <VegNonVegBadge isVeg={item.isVeg} />
                {item.isBestseller && (
                    <Text className="font-sans-bold text-[10px] text-primary">⭐ Bestseller</Text>
                )}
            </View>

            {/* Name */}
            <Text className="font-sans-semibold text-[13px] text-foreground leading-tight" numberOfLines={2}>
                {item.name}
            </Text>

            {/* Rating */}
            {item.rating && (
                <View className="flex-row items-center gap-0.5">
                    <Ionicons name="star" size={10} color={theme.colors.success} />
                    <Text className="font-sans-semibold text-[11px] text-success">
                        {item.rating} ({item.ratingCount})
                    </Text>
                </View>
            )}

            {/* Price + ADD */}
            <View className="flex-row items-center justify-between mt-1">
                <Text className="font-sans-bold text-sm text-foreground">₹{item.price}</Text>
                <AddToCartButton initialCount={0} />
            </View>
        </View>
    </View>
);

// A restaurant group — info header + horizontal dish scroll
const DishGroup = ({
    restaurantId,
    restaurantName,
    dishes,
    onRestaurantPress,
}: {
    restaurantId: string;
    restaurantName: string;
    dishes: typeof ALL_DISHES;
    onRestaurantPress: () => void;
}) => {
    const restaurant = RESTAURANTS.find(r => r.id === restaurantId);

    return (
        <View className="mb-4 bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
            {/* Restaurant header — tappable → navigate to restaurant */}
            <Pressable onPress={onRestaurantPress} className="px-4 pt-4 pb-3 flex-row items-start justify-between">
                <View className="flex-1 pr-3">
                    <Text className="font-heading-bold text-lg text-foreground leading-tight mb-1">
                        {restaurantName}
                    </Text>
                    {restaurant && (
                        <View className="flex-row items-center gap-1.5 flex-wrap">
                            {/* Rating badge */}
                            <View className="flex-row items-center bg-success/10 px-1.5 py-0.5 rounded-md gap-0.5">
                                <Ionicons name="star" size={10} color={theme.colors.success} />
                                <Text className="font-sans-semibold text-[11px] text-success">{restaurant.rating}</Text>
                            </View>
                            <Text className="font-sans-regular text-xs text-muted-foreground">{restaurant.ratingCount}</Text>
                            <Text className="font-sans-regular text-xs text-muted-foreground">·</Text>
                            <Text className="font-sans-regular text-xs text-muted-foreground">{restaurant.deliveryTime}</Text>
                            <Text className="font-sans-regular text-xs text-muted-foreground">·</Text>
                            <Text className="font-sans-regular text-xs text-muted-foreground" numberOfLines={1}>{restaurant.tags}</Text>
                        </View>
                    )}
                </View>
                <Ionicons name="arrow-forward" size={18} color={theme.colors.foreground} />
            </Pressable>

            {/* Divider */}
            <View className="h-px bg-border mx-4 mb-3" />

            {/* Horizontal dish scroll */}
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 16, paddingBottom: 16 }}
            >
                {dishes.map(dish => (
                    <DishCard key={dish.id} item={dish} />
                ))}
            </ScrollView>
        </View>
    );
};

// Single restaurant result card
const RestaurantRow = ({ restaurant, onPress }: { restaurant: typeof RESTAURANTS[0]; onPress: () => void }) => (
    <Pressable onPress={onPress} className="bg-card rounded-2xl border border-border overflow-hidden mb-3 shadow-sm">
        <View className="flex-row">
            <View className="w-24 h-24 bg-muted">
                <Image source={{ uri: restaurant.imageUri }} className="w-full h-full" resizeMode="cover" />
            </View>
            <View className="flex-1 p-3 justify-center gap-1">
                <Text className="font-sans-bold text-[14px] text-foreground" numberOfLines={1}>{restaurant.name}</Text>
                <View className="flex-row items-center gap-1 flex-wrap">
                    <View className="flex-row items-center bg-success/10 px-1.5 py-0.5 rounded-md gap-0.5">
                        <Ionicons name="star" size={10} color={theme.colors.success} />
                        <Text className="font-sans-semibold text-[11px] text-success">{restaurant.rating}</Text>
                    </View>
                    <Text className="font-sans-regular text-xs text-muted-foreground">{restaurant.ratingCount}</Text>
                    <Text className="font-sans-regular text-xs text-muted-foreground">·</Text>
                    <Text className="font-sans-regular text-xs text-muted-foreground">{restaurant.deliveryTime}</Text>
                </View>
                <Text className="font-sans-regular text-xs text-muted-foreground" numberOfLines={1}>
                    {restaurant.tags}
                </Text>
            </View>
            <View className="pr-3 justify-center">
                <Ionicons name="chevron-forward" size={16} color={theme.colors.mutedForeground} />
            </View>
        </View>
    </Pressable>
);

// ── Main Screen ───────────────────────────────────────────────────────────────

const Search = () => {
    const [query, setQuery] = useState('');
    const [vegOnly, setVegOnly] = useState(false);
    const [activeTab, setActiveTab] = useState<ActiveTab>('dishes');
    const inputRef = useRef<TextInput>(null);
    const router = useRouter();

    const normalizedQuery = query.trim().toLowerCase();

    // ── Dish Results ──────────────────────────────────────────────────────────
    const dishResults = useMemo(() => {
        if (!normalizedQuery) return [];
        let items = ALL_DISHES.filter(d =>
            d.name.toLowerCase().includes(normalizedQuery)
        );
        if (vegOnly) items = items.filter(d => d.isVeg);
        return items;
    }, [normalizedQuery, vegOnly]);

    // Group by restaurant
    const dishGroups = useMemo(() => {
        const map: Record<string, { restaurantId: string; dishes: typeof ALL_DISHES }> = {};
        for (const d of dishResults) {
            if (!map[d.restaurantName]) map[d.restaurantName] = { restaurantId: d.restaurantId, dishes: [] };
            map[d.restaurantName].dishes.push(d);
        }
        return Object.entries(map);
    }, [dishResults]);

    // ── Restaurant Results ────────────────────────────────────────────────────
    const restaurantResults = useMemo(() => {
        if (!normalizedQuery) return [];
        return RESTAURANTS.filter(r =>
            r.name.toLowerCase().includes(normalizedQuery) ||
            r.tags.toLowerCase().includes(normalizedQuery) ||
            r.location.toLowerCase().includes(normalizedQuery)
        );
    }, [normalizedQuery]);

    const hasQuery = normalizedQuery.length > 0;

    // Veg toggle animation
    const thumbAnim = useRef(new Animated.Value(2)).current;
    useEffect(() => {
        Animated.spring(thumbAnim, {
            toValue: vegOnly ? 22 : 2,
            useNativeDriver: true,
            speed: 20,
            bounciness: 4,
        }).start();
    }, [vegOnly]);

    return (
        <View className="flex-1 bg-background">
            {/* ── AppBar ── */}
            <AppBar title="Search" showBack={false}>
                {/* Search bar + veg pill */}
                <View className="flex-row items-center gap-2 px-5 pb-1">
                    {/* Input */}
                    <View className="flex-1 flex-row items-center bg-white/10 border border-white/20 rounded-4xl px-4 py-2.5 gap-2.5">
                        <Ionicons name="search" size={18} color={theme.colors.mutedForeground} />
                        <TextInput
                            ref={inputRef}
                            value={query}
                            onChangeText={setQuery}

                            placeholder="Search dishes, restaurants..."
                            placeholderTextColor={theme.colors.mutedForeground}
                            accessibilityLabel="Search input"
                            accessibilityRole="search"

                            className="flex-1 font-sans-regular text-base text-white py-2"
                            cursorColor={theme.colors.primary}
                            selectionColor={theme.colors.primary} // Matches cursor for a cohesive look
                            returnKeyType="search"

                            // onSubmitEditing={handleSearchSubmit} // Trigger search on "Enter"
                            autoCorrect={false}
                            autoCapitalize="none"
                            spellCheck={false}
                            enablesReturnKeyAutomatically={true} // Grays out 'Search' if input is empty

                            // --- Performance & UX ---
                            clearButtonMode="while-editing" // Adds native 'X' on iOS
                            keyboardAppearance="dark"      // Matches your text-white/dark theme
                            importantForAutofill="no"
                        />
                        {hasQuery && (
                            <Pressable onPress={() => setQuery('')} hitSlop={8}>
                                <Ionicons name="close-circle" size={18} color={theme.colors.mutedForeground} />
                            </Pressable>
                        )}
                    </View>

                    {/* Veg toggle pill */}
                    <Pressable
                        onPress={() => setVegOnly(v => !v)}
                        className={`items-center gap-1 border rounded-2xl px-3 py-2 ${vegOnly ? 'border-success bg-success/20' : 'border-white/20 bg-white/10'}`}
                    >
                        <VegNonVegBadge isVeg={true} />
                        <Text className={`font-sans-bold text-[9px] tracking-widest ${vegOnly ? 'text-success' : 'text-white/60'}`}>VEG</Text>
                        <View className={`w-8 h-[13px] rounded-full justify-center ${vegOnly ? 'bg-success' : 'bg-white/20'}`}>
                            <Animated.View
                                className="size-2.5 rounded-full bg-white shadow"
                                style={{ transform: [{ translateX: thumbAnim }] }}
                            />
                        </View>
                    </Pressable>
                </View>
            </AppBar>

            {/* ── Tabs ── */}
            {hasQuery && (
                <View className="flex-row border-b border-border px-5 bg-background">
                    {(['dishes', 'restaurants'] as ActiveTab[]).map(tab => (
                        <Pressable
                            key={tab}
                            onPress={() => setActiveTab(tab)}
                            className="mr-6 py-3"
                        >
                            <Text className={`font-sans-bold text-[13px] capitalize tracking-wide ${activeTab === tab ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {tab}
                            </Text>
                            {activeTab === tab && (
                                <View className="h-[2px] bg-foreground rounded-full mt-2 -mb-px" />
                            )}
                        </Pressable>
                    ))}
                </View>
            )}

            {/* ── Content ── */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 16, paddingBottom: 110, flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                {!hasQuery && <IdleState />}

                {/* Dishes tab */}
                {hasQuery && activeTab === 'dishes' && (
                    dishGroups.length > 0 ? (
                        dishGroups.map(([restaurantName, { restaurantId, dishes }]) => (
                            <DishGroup
                                key={restaurantName}
                                restaurantId={restaurantId}
                                restaurantName={restaurantName}
                                dishes={dishes}
                                onRestaurantPress={() => router.push(`/restaurant/${restaurantId}`)}
                            />
                        ))
                    ) : (
                        <EmptyState query={query} />
                    )
                )}

                {/* Restaurants tab */}
                {hasQuery && activeTab === 'restaurants' && (
                    restaurantResults.length > 0 ? (
                        <View>
                            <Text className="font-sans-bold text-xs text-muted-foreground uppercase tracking-widest mb-3">
                                {restaurantResults.length} result{restaurantResults.length !== 1 ? 's' : ''}
                            </Text>
                            {restaurantResults.map(r => (
                                <RestaurantRow
                                    key={r.id}
                                    restaurant={r}
                                    onPress={() => router.push(`/restaurant/${r.id}`)}
                                />
                            ))}
                        </View>
                    ) : (
                        <EmptyState query={query} />
                    )
                )}
            </ScrollView>
        </View>
    );
};

export default Search;