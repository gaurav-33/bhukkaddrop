import BrandLogo from '@/components/BrandLogo';
import Button from '@/components/Button';
import InputField from '@/components/InputField';
import { theme } from '@/constants/theme';
import { useAuth, useSignIn } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { type Href, Link, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ─── Helpers ─────────────────────────────────────────────────────────────────

function validate(email: string, password: string): string | null {
  if (!email.trim()) return 'Email address is required.';
  if (!/\S+@\S+\.\S+/.test(email.trim())) return 'Enter a valid email address.';
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  return null;
}



// ─── MFA Screen ───────────────────────────────────────────────────────────────

function MfaScreen({ signIn, errors, fetchStatus, onBack }: { signIn: any; errors: any; fetchStatus: string; onBack: () => void }) {
  const router = useRouter();
  const [code, setCode] = useState('');

  const handleVerify = async () => {
    await signIn.mfa.verifyEmailCode({ code });
    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }: any) => {
          if (session?.currentTask) return;
          const url = decorateUrl('/');
          router.replace(url as Href);
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <StatusBar style="dark" />
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS !== 'ios' ? 'padding' : 'height'}>
        <ScrollView className="flex-1" contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
          <View className="items-center pt-12 pb-8 px-6 gap-2">
            <BrandLogo />
          </View>
          <View className="items-center gap-3 px-6 mb-6">
            <View className="size-20 rounded-full bg-primary/10 items-center justify-center">
              <Ionicons name="mail-open-outline" size={36} color={theme.colors.primary} />
            </View>
            <Text className="font-heading-bold text-2xl text-foreground text-center">Check your inbox 📬</Text>
            <Text className="font-sans-regular text-sm text-muted-foreground text-center">
              We sent a verification code to your email.
            </Text>
          </View>
          <View className="mx-5 bg-card rounded-3xl p-6 border border-border gap-5">
            <InputField
              label="Verification Code"
              value={code}
              onChangeText={setCode}
              placeholder="000000"
              keyboardType="number-pad"
              errorMsg={errors?.fields?.code?.message}
            />
            <Button
              title="Verify"
              onPress={handleVerify}
              disabled={false}
              isLoading={fetchStatus === 'fetching'}
            />
            <Pressable
              onPress={() => signIn.mfa.sendEmailCode()}
              disabled={fetchStatus === 'fetching'}
              className="items-center"
            >
              <Text className="font-sans-medium text-sm text-muted-foreground">
                Didn't get it? <Text className="text-primary">Resend code</Text>
              </Text>
            </Pressable>
            <Pressable onPress={onBack} className="items-center">
              <Text className="font-sans-medium text-sm text-muted-foreground">← Start over</Text>
            </Pressable>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ─── Main Sign-In Screen ──────────────────────────────────────────────────────

export default function SignInScreen() {
  const { signIn, errors, fetchStatus } = useSignIn();
  const { isSignedIn } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState('');
  const [pendingMfa, setPendingMfa] = useState(false);

  console.log('[SignInScreen] Mounting... isSignedIn:', isSignedIn);

  // Guard: already signed in
  if (isSignedIn) return null;

  const isFetching = fetchStatus === 'fetching';

  const handleSignIn = async () => {
    const validationError = validate(email, password);
    if (validationError) { setLocalError(validationError); return; }
    setLocalError('');

    const { error } = await signIn.password({
      emailAddress: email.trim().toLowerCase(),
      password,
    });
    if (error) {
      // Check if this error is already handled by individual InputFields
      // We use (error as any) to safely check for field-specific metadata in the API response
      const isFieldError = (error as any).meta?.paramName || (error as any).errors?.[0]?.meta?.paramName || error.code?.includes('invalid');
      
      if (isFieldError) {
        setLocalError('');
      } else {
        setLocalError(error.longMessage || error.message);
      }
      return;
    }

    if (signIn.status === 'complete') {
      await signIn.finalize({
        navigate: ({ session, decorateUrl }: any) => {
          if (session?.currentTask) return;
          const url = decorateUrl('/');
          router.replace(url as Href);
        },
      });
    } else if (signIn.status === 'needs_client_trust') {
      const emailFactor = signIn.supportedSecondFactors?.find(
        (f: any) => f.strategy === 'email_code'
      );
      if (emailFactor) {
        await signIn.mfa.sendEmailCode();
        setPendingMfa(true);
      }
    }
  };

  if (pendingMfa) {
    return (
      <MfaScreen
        signIn={signIn}
        errors={errors}
        fetchStatus={fetchStatus}
        onBack={() => { setPendingMfa(false); signIn.reset(); }}
      />
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView
          className="flex-1"
          contentContainerStyle={{ flexGrow: 1 }}
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
              <Text className="font-heading-bold text-2xl text-foreground">Welcome back 👋</Text>
              <Text className="font-sans-regular text-sm text-muted-foreground">
                Sign in to continue bhukkadding
              </Text>
            </View>

            {/* Fields */}
            <View className="gap-4">
              <InputField
                label="Email address"
                value={email}
                onChangeText={(v) => { setEmail(v); setLocalError(''); }}
                placeholder="you@college.edu"
                keyboardType="email-address"
                errorMsg={errors?.fields?.identifier?.message}
              />
              <InputField
                label="Password"
                value={password}
                onChangeText={(v) => { setPassword(v); setLocalError(''); }}
                placeholder="Enter your password"
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
            </View>

            {/* Local validation error */}
            {!!localError && (
              <View className="flex-row items-start gap-2 bg-destructive/10 rounded-xl px-3 py-2.5">
                <Ionicons name="alert-circle" size={15} color={theme.colors.destructive} style={{ marginTop: 1 }} />
                <Text className="font-sans-regular text-xs text-destructive flex-1">{localError}</Text>
              </View>
            )}

            {/* Sign In Button */}
            <Button
              title="Sign In"
              onPress={handleSignIn}
              disabled={!email || !password}
              isLoading={isFetching}
            />

            {/* Required for Clerk bot protection */}
            <View nativeID="clerk-captcha" />
            
            {/* Forgot password */}
            <Link href="/(auth)/forget-password" asChild>
              <Pressable className="items-center">
                <Text className="font-sans-medium text-sm text-primary">Forgot password?</Text>
              </Pressable>
            </Link>
          </View>

          {/* ── Sign up link ── */}
          <View className="flex-row justify-center items-center gap-1.5 py-8">
            <Text className="font-sans-regular text-sm text-muted-foreground">New to BhukkadDrop?</Text>
            <Link href="/(auth)/sign-up" asChild>
              <Pressable>
                <Text className="font-sans-bold text-sm text-primary">Sign up →</Text>
              </Pressable>
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}