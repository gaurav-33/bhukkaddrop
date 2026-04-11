import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

type AddToCartButtonProps = {
    initialCount?: number;
    onCountChange?: (count: number) => void;
};

export function AddToCartButton({ initialCount = 0, onCountChange }: AddToCartButtonProps) {
    const [count, setCount] = useState(initialCount);

    const handleIncrement = () => {
        const newCount = count + 1;
        setCount(newCount);
        onCountChange?.(newCount); // Pass the updated count to the parent if needed
    };

    const handleDecrement = () => {
        if (count > 0) {
            const newCount = count - 1;
            setCount(newCount);
            onCountChange?.(newCount); // Pass the updated count to the parent if needed
        }
    };

    // STATE 1: If count is 0, show the default "ADD" button
    if (count === 0) {
        return (
            <Pressable
                onPress={handleIncrement}
                className="bg-white border border-border rounded-xl px-4 py-2 shadow-sm min-w-20 items-center justify-center h-9"
            >
                <Text className="font-sans-bold text-success text-xs">ADD</Text>
            </Pressable>
        );
    }

    // STATE 2: If count > 0, show the - / count / + controls
    return (
        <View className="bg-white border border-border rounded-xl shadow-sm flex-row items-center justify-between min-w-20 h-9">
            <Pressable
                onPress={handleDecrement}
                className="px-3 h-full items-center justify-center rounded-l-xl"
            >
                <Text className="font-sans-bold text-success text-lg leading-none">-</Text>
            </Pressable>

            <Text className="font-sans-bold text-success text-xs">{count}</Text>

            <Pressable
                onPress={handleIncrement}
                className="px-3 h-full items-center justify-center rounded-r-xl"
            >
                <Text className="font-sans-bold text-success text-lg leading-none">+</Text>
            </Pressable>
        </View>
    );
}