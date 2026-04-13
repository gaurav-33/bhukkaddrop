import { theme } from '@/constants/theme';
import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

export interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (v: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: any;
  autoCapitalize?: any;
  rightIcon?: React.ReactNode;
  errorMsg?: string;
}

export default function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  autoCapitalize,
  rightIcon,
  errorMsg,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  let borderColorClass = 'border-border';
  if (errorMsg) {
    borderColorClass = 'border-destructive';
  } else if (isFocused) {
    borderColorClass = 'border-primary';
  }

  return (
    <View className="gap-1.5">
      <Text className="font-sans-semibold text-sm text-foreground">{label}</Text>
      <View
        className={`flex-row items-center bg-white rounded-2xl px-4 border ${borderColorClass}`}
        style={{ minHeight: 52 }}
      >
        <TextInput
          className="flex-1 font-sans-regular text-base text-foreground py-3"
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={theme.colors.mutedForeground}
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType ?? 'default'}
          autoCapitalize={autoCapitalize ?? 'none'}
          autoCorrect={false}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          cursorColor={theme.colors.primary}
          selectionColor={theme.colors.primaryLight}
        />
        {rightIcon}
      </View>
      {!!errorMsg && (
        <Text className="font-sans-regular text-xs text-destructive ml-1">{errorMsg}</Text>
      )}
    </View>
  );
}
