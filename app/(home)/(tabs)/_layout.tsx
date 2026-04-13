import { tabs } from "@/constants/data";
import { colors, components } from "@/constants/theme";
import { Tabs } from "expo-router";
import { Image, View, Pressable, LayoutChangeEvent, Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useState, useEffect } from "react";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";

const tabBar = components.tabBar;
const { width: SCREEN_WIDTH } = Dimensions.get('window');

const CustomTabBar = ({ state, descriptors, navigation, insets }: any) => {
    // Give it a smart initial width so it doesn't glitch before onLayout fires
    const initialWidth = SCREEN_WIDTH - (tabBar.horizontalInset * 2);
    const [dimensions, setDimensions] = useState<{ height: number; width: number }>({ height: tabBar.height, width: initialWidth });

    const buttonWidth = dimensions.width / state.routes.length;

    const tabPositionX = useSharedValue(0);

    useEffect(() => {
        tabPositionX.value = withSpring(buttonWidth * state.index, {
            damping: 14,
            stiffness: 130,
            mass: 0.8
        });
    }, [state.index, buttonWidth]);

    const animatedPillStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        };
    });

    const onTabbarLayout = (e: LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width,
        });
    };

    return (
        <View
            onLayout={onTabbarLayout}
            style={{
                position: 'absolute',
                bottom: Math.max(insets.bottom, tabBar.horizontalInset),
                left: tabBar.horizontalInset,
                right: tabBar.horizontalInset,
                height: tabBar.height,
                borderRadius: tabBar.radius,
                backgroundColor: colors.foreground,
                elevation: 0,
                flexDirection: 'row',
                alignItems: 'center',
            }}
        >
            {/* The Animated Sliding Pill */}
            <Animated.View
                style={[
                    animatedPillStyle,
                    {
                        position: 'absolute',
                        width: buttonWidth,
                        height: '100%',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }
                ]}
            >
                <View className="size-12 rounded-full bg-accent" />
            </Animated.View>

            {/* The Tab Icons */}
            {state.routes.map((route: any, index: number) => {
                const isFocused = state.index === index;
                const tabData = tabs.find(t => t.name === route.name);

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                return (
                    <Pressable
                        key={route.key}
                        onPress={onPress}
                        className="flex-1 justify-center items-center h-full"
                    >
                        {tabData?.icon && (
                            <Image
                                source={tabData.icon}
                                className="size-6"
                                style={{
                                    tintColor: isFocused ? colors.background : colors.mutedForeground
                                }}
                                resizeMode="contain"
                            />
                        )}
                    </Pressable>
                );
            })}
        </View>
    );
};

const TabLayout = () => {
    const insets = useSafeAreaInsets();

    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} insets={insets} />}
            screenOptions={{ headerShown: false }}
        >
            {tabs.map((tab) => (
                <Tabs.Screen
                    key={tab.name}
                    name={tab.name}
                    options={{ title: tab.title }}
                />
            ))}
        </Tabs>
    );
}

export default TabLayout;