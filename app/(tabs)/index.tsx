import { CategoryCard } from "@/components/CategoryCard";
import { FilterChip } from "@/components/FilterChip";
import FooterCredit from "@/components/FooterCredit";
import { OfferCard } from "@/components/OfferCard";
import { PromoCard } from "@/components/PromoCard";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SafeAreaView } from "@/components/SafeAreaWrapper";
import SectionHeader from "@/components/SectionHeader";
import { CATEGORIES, FILTERS, offers, PROMOS, RESTAURANTS } from "@/constants/data";
import { icons } from "@/constants/icons";
import { components, theme } from "@/constants/theme";
import { useEffect, useRef, useState } from "react";
import { Animated, Image, Pressable, ScrollView, Text, TextInput, View } from "react-native";

export default function Home() {
  const [vegOnly, setVegOnly] = useState(false);
  const thumbAnim = useRef(new Animated.Value(2)).current;

  useEffect(() => {
    Animated.spring(thumbAnim, {
      toValue: vegOnly ? 25 : 2,
      useNativeDriver: true,
      speed: 20,
      bounciness: 4,
    }).start();
  }, [vegOnly]);

  return (
    <SafeAreaView className="safe-view">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: components.tabBar.height + 50 }}
      >
        {/* ── Top bar: location (left) + avatar (right) ── */}
        <View className="flex-row items-center justify-between pb-4">
          {/* Location section */}
          <View className="flex-row items-center flex-1 pr-6">
            <Image
              className="size-7 mr-2"
              style={{ tintColor: theme.colors.primary }}
              source={icons.location}
              resizeMode="contain"
            />
            <View className="flex-col justify-center flex-1">
              <View className="flex-row items-center">
                <Text className="font-sans-bold text-xl text-foreground tracking-tight" numberOfLines={1}>
                  Gaurav
                </Text>
                <Image
                  className="size-4 ml-1"
                  source={icons.down}
                  resizeMode="contain"
                />
              </View>
              <Text className="font-sans-regular text-sm text-muted-foreground" numberOfLines={1}>
                Kautilya, NIT PATNA
              </Text>
            </View>
          </View>

          {/* Avatar / Profile button */}
          <Pressable className="items-center justify-center p-2 rounded-full border border-border bg-muted shadow-sm" onPress={() => null}>
            <Image
              className="size-6"
              source={icons.profile}
              style={{ tintColor: theme.colors.foreground }}
              resizeMode="contain"
            />
          </Pressable>
        </View>

        {/* ── Brand title ── */}
        <View className="mb-2">
          <Text className="font-heading-bold text-primary text-3xl tracking-wide">
            bhukkad<Text className="text-foreground">drop!</Text>
          </Text>
        </View>

        {/* ── Search Section ── */}
        <View className="flex-row items-center gap-1 mb-5">
          {/* Search Bar */}
          <View className="flex-1 flex-row items-center bg-card border border-border rounded-4xl px-4 py-2 gap-2.5">
            <Image
              className="size-5"
              source={icons.search}
              style={{ tintColor: theme.colors.mutedForeground }}
              resizeMode="contain"
            />
            <TextInput
              className="flex-1 font-sans-regular text-sm text-foreground"
              placeholder="Search for food, restaurants..."
              placeholderTextColor={theme.colors.mutedForeground}
              returnKeyType="search"
            />
          </View>

          {/* Veg Toggle */}
          <Pressable
            className="flex-col items-center gap-2 bg-card border border-border rounded-4xl px-4 py-2"
            onPress={() => setVegOnly((v) => !v)}
          >
            <Text className="font-sans-bold text-xs text-foreground">VEG</Text>
            {/* Switch track */}
            <View
              className={`w-10 h-4 rounded-full justify-center ${vegOnly ? "bg-success" : "bg-border"
                }`}
            >
              {/* Sliding thumb */}
              <Animated.View
                className="size-3 rounded-full bg-white shadow"
                style={{ transform: [{ translateX: thumbAnim }] }}
              />
            </View>
          </Pressable>
        </View>

        {/* ── Promo Section ── */}
        <SectionHeader title={"Today's Deals"} onPress={() => { }} />
        <ScrollView
          className="mb-5"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {PROMOS.map((promo) => (
            <PromoCard key={promo.id} promo={promo} onPress={() => null} />
          ))}
        </ScrollView>

        {/* ── Offer Section ── */}
        <SectionHeader title={"Best Offers"} onPress={() => { }} />
        <ScrollView
          className="mb-5"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {offers.map((offer) => (
            <OfferCard key={offer.id} offer={offer} onPress={() => null} />
          ))}
        </ScrollView>

        {/* ── What's on your mind? ── */}
        <SectionHeader title={"What's on your mind?"} />
        <ScrollView
          className="mb-4 pb-2"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {CATEGORIES.map((cat) => (
            <CategoryCard key={cat.id} category={cat} />
          ))}
        </ScrollView>

        {/* ── Filters ── */}
        <ScrollView
          className="mb-6"
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingRight: 20 }}
        >
          {FILTERS.map((f) => (
            <FilterChip key={f.id} label={f.label} icon={f.icon as any} />
          ))}
        </ScrollView>

        {/* ── Restaurants to explore ── */}
        <SectionHeader title={"Restaurants to explore"} />

        <View className="mb-5">
          {RESTAURANTS.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} onPress={() => null} />
          ))}
        </View>

        {/* Footer */}
        <FooterCredit />
      </ScrollView>
    </SafeAreaView>
  );
}