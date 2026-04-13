import BrandLogo from '@/components/BrandLogo';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { theme } from '@/constants/theme';
import { useSignIn } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgetPasswordScreen() {
  const { signIn, fetchStatus, errors } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');

  const [successfulCreation, setSuccessfulCreation] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);

  const isFetching = fetchStatus === 'fetching';
  const isLoading = isFetching || isNavigating;

  // Request a password reset code by email
  const onRequestReset = async () => {
    if (!signIn) return;
    if (!emailAddress.trim()) {
      setLocalError('Email address is required.');
      return;
    }
    setLocalError('');

    try {
      // 1. Start the attempt with ONLY the identifier
      const creationResult = await signIn.create({
        identifier: emailAddress.trim().toLowerCase(),
      });

      if (creationResult?.error) {
        setLocalError(creationResult.error.longMessage || creationResult.error.message);
        return;
      }

      // 2. Explicitly send the email code using the new helper
      const sendResult = await signIn.resetPasswordEmailCode.sendCode();

      if (sendResult?.error) {
        setLocalError(sendResult.error.longMessage || sendResult.error.message);
        return;
      }

      setSuccessfulCreation(true);
      setLocalError('');
    } catch (err: any) {
      console.error('Request Reset Error:', err);
      setLocalError('An error occurred. Please try again.');
    }
  };

  // Reset the password with the code and the new password
  const onReset = async () => {
    if (!signIn) return;
    if (!code) { setLocalError('Verification code is required.'); return; }
    if (password.length < 8) { setLocalError('Password must be at least 8 characters.'); return; }
    setLocalError('');

    try {
      // 1. Only verify the code if we haven't already verified it
      if (signIn.status === 'needs_first_factor') {
        const verifyResult = await signIn.resetPasswordEmailCode.verifyCode({
          code,
        });

        if (verifyResult?.error) {
          setLocalError(verifyResult.error.longMessage || verifyResult.error.message);
          return;
        }
      }

      // 2. Once verified, the status becomes 'needs_new_password'. Submit the new password.
      const submitResult = await signIn.resetPasswordEmailCode.submitPassword({
        password,
      });

      if (submitResult?.error) {
        setLocalError(submitResult.error.longMessage || submitResult.error.message);
        return;
      }

      // 3. Password changed successfully
      if (signIn.status === 'complete') {
        setIsNavigating(true);

        // Auto-login
        router.replace('/');
      } else {
        setLocalError('Unable to reset password. Please try again.');
      }
    } catch (err: any) {
      console.log('Forget Password reset error:', err);
      // Catch specific errors so you know if it was the code or the password that failed
      setLocalError(err.errors?.[0]?.longMessage || 'Failed to verify code or reset password.');
    }
  };

  const handleResend = async () => {
    if (!signIn) return;
    setIsResending(true);
    setResent(false);

    try {
      // Just call the sendCode helper again
      const sendResult = await signIn.resetPasswordEmailCode.sendCode();

      if (sendResult?.error) {
        setLocalError(sendResult.error.longMessage || sendResult.error.message || 'Failed to resend code.');
      } else {
        setResent(true);
        setTimeout(() => setResent(false), 4000);
      }
    } catch (err: any) {
      console.error('Resend Error:', err);
      setLocalError(err.errors?.[0]?.longMessage || 'Failed to resend code.');
    } finally {
      setIsResending(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View className="items-center pt-12 pb-6 px-6 gap-2">
            <BrandLogo />
          </View>

          <View className="mx-5 bg-card rounded-3xl p-6 border border-border gap-5 shadow-sm">
            {!successfulCreation ? (
              <>
                <View className="gap-1">
                  <Text className="font-heading-bold text-2xl text-foreground">Forgot Password?</Text>
                  <Text className="font-sans-regular text-sm text-muted-foreground">
                    Enter your email to receive a reset code.
                  </Text>
                </View>
                <View className="gap-4">
                  <InputField
                    label="Email address"
                    value={emailAddress}
                    onChangeText={(v) => { setEmailAddress(v); setLocalError(''); }}
                    placeholder="you@college.edu"
                    keyboardType="email-address"
                    errorMsg={errors?.fields?.identifier?.message}
                  />
                </View>
                {!!localError && (
                  <View className="flex-row items-start gap-2 bg-destructive/10 rounded-xl px-3 py-2.5">
                    <Ionicons name="alert-circle" size={15} color={theme.colors.destructive} style={{ marginTop: 1 }} />
                    <Text className="font-sans-regular text-xs text-destructive flex-1">{localError}</Text>
                  </View>
                )}
                <Button
                  title="Send Code"
                  onPress={onRequestReset}
                  disabled={!emailAddress}
                  isLoading={isLoading}
                />
                <Link href="/(auth)/sign-in" asChild>
                  <Pressable className="items-center py-2">
                    <Text className="font-sans-medium text-sm text-muted-foreground">← Back to Sign In</Text>
                  </Pressable>
                </Link>
              </>
            ) : (
              <>
                <View className="items-center gap-3 mb-2">
                  <View className="size-16 rounded-full bg-primary/10 items-center justify-center">
                    <Ionicons name="mail-open-outline" size={28} color={theme.colors.primary} />
                  </View>
                  <Text className="font-heading-bold text-2xl text-foreground text-center">Reset Password</Text>
                  <Text className="font-sans-regular text-sm text-muted-foreground text-center leading-5">
                    We sent a 6-digit code to{'\n'}
                    <Text className="font-sans-semibold text-foreground">{emailAddress.trim().toLowerCase()}</Text>
                  </Text>
                </View>

                <View className="gap-4">
                  <InputField
                    label="Verification Code"
                    value={code}
                    onChangeText={(v) => { setCode(v); setLocalError(''); }}
                    placeholder="000000"
                    keyboardType="number-pad"
                  />
                  <InputField
                    label="New Password"
                    value={password}
                    onChangeText={(v) => { setPassword(v); setLocalError(''); }}
                    placeholder="Min. 8 chars, 1 uppercase, 1 number"
                    secureTextEntry={!showPassword}
                    rightIcon={
                      <Pressable onPress={() => setShowPassword((s) => !s)} className="p-1">
                        <Ionicons
                          name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                          size={20}
                          color={theme.colors.mutedForeground}
                        />
                      </Pressable>
                    }
                  />
                </View>

                {resent && (
                  <View className="flex-row items-center gap-2 bg-success/10 rounded-xl px-3 py-2.5">
                    <Ionicons name="checkmark-circle" size={15} color={theme.colors.success} />
                    <Text className="font-sans-regular text-xs text-success">New code sent!</Text>
                  </View>
                )}

                {!!localError && (
                  <View className="flex-row items-start gap-2 bg-destructive/10 rounded-xl px-3 py-2.5">
                    <Ionicons name="alert-circle" size={15} color={theme.colors.destructive} style={{ marginTop: 1 }} />
                    <Text className="font-sans-regular text-xs text-destructive flex-1">{localError}</Text>
                  </View>
                )}

                <Button
                  title="Set New Password"
                  onPress={onReset}
                  disabled={!code || !password}
                  isLoading={isLoading}
                />

                <Pressable onPress={handleResend} disabled={isResending} className="items-center py-1">
                  {isResending
                    ? <ActivityIndicator color={theme.colors.primary} size="small" />
                    : <Text className="font-sans-medium text-sm text-muted-foreground">
                      Didn't get it?{' '}
                      <Text className="text-primary">Resend code</Text>
                    </Text>
                  }
                </Pressable>

                <Pressable onPress={() => { setSuccessfulCreation(false); setCode(''); setPassword(''); setLocalError(''); }} className="items-center py-2 mt-2">
                  <Text className="font-sans-medium text-sm text-muted-foreground">← Use a different email</Text>
                </Pressable>

                {/* Required for Clerk bot protection */}
                <View nativeID="clerk-captcha" />
              </>
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
