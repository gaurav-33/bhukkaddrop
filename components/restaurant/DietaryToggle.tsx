import clsx from "clsx";
import React, { useEffect, useRef } from 'react';
import { Animated, Pressable, View } from 'react-native';

type Props = {
    type: 'veg' | 'nonveg';
    active: boolean;
    onToggle: () => void;
};

export function DietaryToggle({ type, active, onToggle }: Props) {
    const animValue = useRef(new Animated.Value(active ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animValue, {
            toValue: active ? 1 : 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    }, [active, animValue]);

    // REDUCED TRAVEL DISTANCE: Changed from 40 to 36 to prevent overshooting the right edge.
    // Tweak this '36' if you need pixel-perfect adjustments based on your UI's border/padding.
    const thumbTranslateX = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 36]
    });

    // Kept perfectly in sync with the thumb's distance
    const trackTranslateX = animValue.interpolate({
        inputRange: [0, 1],
        outputRange: [-36, 0]
    });

    const activeBg = type === 'veg' ? 'bg-success' : 'bg-destructive';
    const borderColor = type === 'veg' ? 'border-success' : 'border-destructive';

    return (
        <Pressable
            onPress={onToggle}
            className="w-16 h-8 rounded-3xl flex-row items-center border border-border bg-card px-1 mr-3 overflow-hidden"
        >
            {/* Full Background Track (always visible) */}
            <View className="absolute left-3 right-3 h-1.5 rounded-full bg-muted" />

            {/* Active Fill Track Container */}
            <View className="absolute left-3 right-3 h-1.5 overflow-hidden rounded-full">
                <Animated.View
                    style={{ transform: [{ translateX: trackTranslateX }] }}
                    className={clsx("w-full h-full rounded-full", activeBg)}
                />
            </View>

            {/* Thumb Container - bg-card ensures the track is hidden behind the icon */}
            <Animated.View
                style={{ transform: [{ translateX: thumbTranslateX }] }}
                className="size-4 bg-card items-center justify-center rounded-full z-10"
            >
                {/* The Veg/Non-Veg Icon */}
                <View className={clsx("size-3.5 border items-center justify-center rounded-sm bg-card", borderColor)}>
                    {type === 'veg' ? (
                        <View className="size-1.5 bg-success rounded-full" />
                    ) : (
                        <View className="w-0 h-0 border-l-[3px] border-r-[3px] border-b-[5px] border-l-transparent border-r-transparent border-b-destructive" />
                    )}
                </View>
            </Animated.View>
        </Pressable>
    );
}