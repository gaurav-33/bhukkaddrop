import { Pressable, Text, ActivityIndicator } from 'react-native';
import React from 'react';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
  style?: any;
}

export default function Button({
  title,
  onPress,
  disabled = false,
  isLoading = false,
  className = '',
  style,
}: ButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}
      className={`rounded-2xl items-center justify-center py-4 ${disabled || isLoading ? 'bg-primary/60' : 'bg-primary'} ${className}`}
      style={[{ minHeight: 52 }, style]}
    >
      {isLoading ? (
        <ActivityIndicator color="#fff" size="small" />
      ) : (
        <Text className="font-sans-bold text-white text-base tracking-wide">
          {title}
        </Text>
      )}
    </Pressable>
  );
}
