import BrandLogo from '@/components/BrandLogo';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { theme } from '@/constants/theme';
import { useAuth, useSignUp } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { type Href, Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function validateSignUp(
  firstName: string,
  lastName: string,
  email: string,
  password: string,
  confirm: string
): string | null {
  if (!firstName.trim()) return 'First name is required.';
  if (!lastName.trim()) return 'Last name is required.';
  if (!email.trim()) return 'Email address is required.';
  if (!/\S+@\S+\.\S+/.test(email.trim())) return 'Enter a valid email address.';
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Include at least one uppercase letter.';
  if (!/[0-9]/.test(password)) return 'Include at least one number.';
  if (password !== confirm) return 'Passwords do not match.';
  return null;
}



// ─── Main Sign-Up Screen ──────────────────────────────────────────────────────

export default function SignUpScreen() {
  const { signUp, errors, fetchStatus } = useSignUp();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [localError, setLocalError] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  // Guard: already signed in
  if (isSignedIn) return null;

  const isFetching = fetchStatus === 'fetching';

  const handleSignUp = async () => {
    const vc = validateSignUp(firstName, lastName, email, password, confirmPassword);
    if (vc) {
      setLocalError(vc);
      return;
    }
    setLocalError('');

    const { error } = await signUp.password({
      emailAddress: email.trim().toLowerCase(),
      password,
      firstName: firstName.trim().toLowerCase(),
      lastName: lastName.trim().toLowerCase(),
    });
    if (error) {
      // If the error is specific to a field (handled by InputField), don't show it in the summary box
      const isFieldError = (error as any).meta?.paramName || (error as any).errors?.[0]?.meta?.paramName || error.code === 'form_identifier_exists';

      if (isFieldError) {
        setLocalError('');
      } else {
        setLocalError(error.longMessage || error.message);
      }
      return;
    }

    // Once password step passes, send email code
    if (!error) await signUp.verifications.sendEmailCode();
  };

  const handleVerify = async () => {
    await signUp.verifications.verifyEmailCode({ code: otpCode });

    if (signUp.status === 'complete') {
      await signUp.finalize({
        navigate: ({ session, decorateUrl }: any) => {
          if (session?.currentTask) return;
          const url = decorateUrl('/');
          router.replace(url as Href);
        },
      });
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    setResent(false);
    try {
      await signUp.verifications.sendEmailCode();
      setResent(true);
      setTimeout(() => setResent(false), 4000);
    } finally {
      setIsResending(false);
    }
  };

  // ── OTP verification screen ───────────────────────────────────────────────
  if (
    signUp.status === 'missing_requirements' &&
    signUp.unverifiedFields.includes('email_address') &&
    signUp.missingFields.length === 0
  ) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
        <StatusBar style="dark" />
        <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <ScrollView
            className="flex-1"
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {/* Brand */}
            <View className="items-center pt-12 pb-6 px-6 gap-2">
              <BrandLogo />
            </View>

            {/* Icon + copy */}
            <View className="items-center gap-3 px-6 mb-6">
              <View className="size-20 rounded-full bg-primary/10 items-center justify-center">
                <Ionicons name="mail-open-outline" size={36} color={theme.colors.primary} />
              </View>
              <Text className="font-heading-bold text-2xl text-foreground text-center">
                Check your inbox
              </Text>
              <Text className="font-sans-regular text-sm text-muted-foreground text-center leading-5">
                We sent a 6-digit code to{'\n'}
                <Text className="font-sans-semibold text-foreground">{email.trim().toLowerCase()}</Text>
              </Text>
            </View>

            {/* Card */}
            <View className="mx-5 bg-card rounded-3xl p-6 border border-border gap-5">
              <InputField
                label="Verification Code"
                value={otpCode}
                onChangeText={setOtpCode}
                placeholder="000000"
                keyboardType="number-pad"
                errorMsg={errors?.fields?.code?.message}
              />

              {resent && (
                <View className="flex-row items-center gap-2 bg-success/10 rounded-xl px-3 py-2.5">
                  <Ionicons name="checkmark-circle" size={15} color={theme.colors.success} />
                  <Text className="font-sans-regular text-xs text-success">New code sent!</Text>
                </View>
              )}

              {/* Verify button */}
              <Button
                title="Verify & Continue"
                onPress={handleVerify}
                disabled={!otpCode}
                isLoading={isFetching}
              />

              {/* Resend */}
              <Pressable onPress={handleResend} disabled={isResending} className="items-center py-1">
                {isResending
                  ? <ActivityIndicator color={theme.colors.primary} size="small" />
                  : <Text className="font-sans-medium text-sm text-muted-foreground">
                    Didn't get it?{' '}
                    <Text className="text-primary">Resend code</Text>
                  </Text>
                }
              </Pressable>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }

  // Guard: sign-up complete, waiting for redirect
  if (signUp.status === 'complete' || isSignedIn) return null;

  // ── Registration form ─────────────────────────────────────────────────────
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1, paddingBottom: 32 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ── Brand Header ── */}
          <View className="items-center pt-12 pb-8 px-6 gap-2">
            <BrandLogo />
            <Text className="font-sans-regular text-sm text-muted-foreground text-center">
              Because cravings don’t check the clock.
            </Text>
          </View>

          {/* ── Form Card ── */}
          <View className="mx-5 bg-card rounded-3xl p-6 border border-border gap-5 shadow-sm">
            {/* Title */}
            <View className="gap-1">
              <Text className="font-heading-bold text-2xl text-foreground">
                Join the bhukkads 🍕
              </Text>
              <Text className="font-sans-regular text-sm text-muted-foreground">
                Create your account — it's free!
              </Text>
            </View>

            <View className="gap-4">
              <View className="flex-row gap-3">
                <View className="flex-1">
                  <InputField
                    label="First Name"
                    value={firstName}
                    onChangeText={(v) => { setFirstName(v); setLocalError(''); }}
                    placeholder="John"
                    errorMsg={errors?.fields?.firstName?.message}
                  />
                </View>
                <View className="flex-1">
                  <InputField
                    label="Last Name"
                    value={lastName}
                    onChangeText={(v) => { setLastName(v); setLocalError(''); }}
                    placeholder="Doe"
                    errorMsg={errors?.fields?.lastName?.message}
                  />
                </View>
              </View>
              <InputField
                label="Email address"
                value={email}
                onChangeText={(v) => { setEmail(v); setLocalError(''); }}
                placeholder="you@college.edu"
                keyboardType="email-address"
                errorMsg={errors?.fields?.emailAddress?.message}
              />
              <InputField
                label="Password"
                value={password}
                onChangeText={(v) => { setPassword(v); setLocalError(''); }}
                placeholder="Min. 8 chars, 1 uppercase, 1 number"
                secureTextEntry={!showPassword}
                errorMsg={errors?.fields?.password?.message}
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
              <InputField
                label="Confirm Password"
                value={confirmPassword}
                onChangeText={(v) => { setConfirmPassword(v); setLocalError(''); }}
                placeholder="Repeat your password"
                secureTextEntry={!showConfirm}
                errorMsg={password && confirmPassword && password !== confirmPassword ? "Passwords don't match" : undefined}
                rightIcon={
                  <Pressable onPress={() => setShowConfirm((s) => !s)} className="p-1">
                    <Ionicons
                      name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                      size={20}
                      color={theme.colors.mutedForeground}
                    />
                  </Pressable>
                }
              />
            </View>

            {/* Password hint */}
            <View className="flex-row items-center gap-2 bg-muted rounded-xl px-3 py-2.5">
              <Ionicons name="information-circle-outline" size={14} color={theme.colors.mutedForeground} />
              <Text className="font-sans-regular text-xs text-muted-foreground flex-1">
                8+ characters · 1 uppercase · 1 number
              </Text>
            </View>

            {/* Local validation error */}
            {!!localError && (
              <View className="flex-row items-start gap-2 bg-destructive/10 rounded-xl px-3 py-2.5">
                <Ionicons name="alert-circle" size={15} color={theme.colors.destructive} style={{ marginTop: 1 }} />
                <Text className="font-sans-regular text-xs text-destructive flex-1">{localError}</Text>
              </View>
            )}

            {/* CTA */}
            <Button
              title="Create Account"
              onPress={handleSignUp}
              disabled={!email || !password}
              isLoading={isFetching}
            />

            {/* Terms */}
            <Text className="font-sans-regular text-sm text-muted-foreground text-center leading-4">
              By joining you agree to our{' '}
              <Text className="text-primary">Terms of Service</Text>
              {' '}and{' '}
              <Text className="text-primary">Privacy Policy</Text>.
            </Text>

            {/* Required for Clerk bot protection */}
            <View nativeID="clerk-captcha" />
          </View>

          {/* ── Sign-in link ── */}
          <View className="flex-row justify-center items-center gap-1.5 py-8">
            <Text className="font-sans-regular text-sm text-muted-foreground">
              Already bhukkading?
            </Text>
            <Link href="/(auth)/sign-in" asChild>
              <Pressable>
                <Text className="font-sans-bold text-sm text-primary">Sign in →</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}