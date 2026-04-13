import { AppBar } from '@/components/AppBar';
import FooterCredit from '@/components/FooterCredit';
import MenuRow from '@/components/profile/MenuRow';
import { theme } from '@/constants/theme';
import { useAuthStore, useCartStore } from '@/store';
import { useClerk, useUser } from '@clerk/expo';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, View } from 'react-native';
import AlertDialog from '@/components/AlertDialog';

const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`bg-card rounded-2xl border border-border overflow-hidden mb-3 ${className}`}>
        {children}
    </View>
);

const Divider = () => <View className="h-[0.5px] bg-border mx-4" />;

const Profile = () => {
    const { user, isLoaded } = useUser();
    const { signOut } = useClerk();
    const router = useRouter();

    // Zustand
    const { syncFromClerk, clear } = useAuthStore();
    const { notificationsEnabled, toggleNotifications } = useCartStore();

    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);

    // Sync Clerk user data into Zustand on mount / user change
    useEffect(() => {
        if (user) syncFromClerk(user as any);
    }, [user]);

    const handleLogout = () => {
        setShowLogoutModal(true);
    };

    const confirmLogout = async () => {
        setIsLoggingOut(true);
        try {
            clear();
            await signOut();
            setShowLogoutModal(false);
            router.replace('/(auth)/sign-in');
        } catch (e) {
            console.error(e);
            setIsLoggingOut(false);
        }
    };

    // Real user data from Clerk
    const displayName = user?.fullName || user?.firstName || 'Bhukkad User';
    const email = user?.primaryEmailAddress?.emailAddress || '';
    const phone = user?.primaryPhoneNumber?.phoneNumber || '';
    const avatar = user?.imageUrl || '';

    return (
        <View className="flex-1 bg-background">
            <AppBar
                title="Profile"
                showBack={false}
            >
                {/* ── Hero Card ── */}
                <View className="flex-row items-center gap-4 px-5 pb-5 pt-1">
                    {/* Avatar */}
                    <View className="relative">
                        <View className="size-20 rounded-2xl overflow-hidden border-2 border-primary/40">
                            {avatar ? (
                                <Image
                                    source={{ uri: avatar }}
                                    className="w-full h-full"
                                    resizeMode="cover"
                                />
                            ) : (
                                <View className="w-full h-full bg-primary/20 items-center justify-center">
                                    <Ionicons name="person" size={32} color={theme.colors.primary} />
                                </View>
                            )}
                        </View>
                    </View>

                    {/* Info */}
                    <View className="flex-1">
                        <Text className="font-heading-bold text-xl text-white leading-tight" numberOfLines={1}>
                            {isLoaded ? displayName : '—'}
                        </Text>
                        <Text className="font-sans-regular text-sm text-muted/80 mt-0.5" numberOfLines={1}>
                            {email || '—'}
                        </Text>
                        {!!phone && (
                            <Text className="font-sans-regular text-sm text-muted/80 mt-0.5">
                                {phone}
                            </Text>
                        )}
                    </View>
                </View>
            </AppBar>

            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ padding: 20, paddingBottom: 120 }}
            >
                {/* ── Stats Strip ── */}
                <View className="flex-row bg-card border border-border rounded-2xl overflow-hidden mb-4">
                    {[
                        { label: 'BhukkadCoins', value: '120', icon: 'flame' as const, color: theme.colors.accent },
                        { label: 'Addresses', value: '2', icon: 'location' as const, color: theme.colors.primary },
                        { label: 'Active Orders', value: '1', icon: 'bag-check' as const, color: theme.colors.success },
                    ].map((stat, i, arr) => (
                        <React.Fragment key={stat.label}>
                            <View className="flex-1 items-center py-4 gap-1">
                                <Ionicons name={stat.icon} size={20} color={stat.color} />
                                <Text className="font-heading-bold text-lg text-foreground">{stat.value}</Text>
                                <Text className="font-sans-regular text-xs text-muted-foreground text-center">{stat.label}</Text>
                            </View>
                            {i < arr.length - 1 && <View className="w-[0.5px] bg-border my-3" />}
                        </React.Fragment>
                    ))}
                </View>

                {/* ── Account ── */}
                <Text className="font-sans-bold text-[11px] text-muted-foreground uppercase tracking-widest mb-2 ml-1">
                    Account
                </Text>
                <SectionCard>
                    <MenuRow icon="person-outline" label="Personal Information" />
                    <Divider />
                    <MenuRow icon="heart-outline" label="Favourites" />
                    <Divider />
                    <MenuRow icon="location-outline" label="Saved Addresses" value="2 saved" />
                    <Divider />
                    <MenuRow icon="card-outline" label="Payment Methods" />
                </SectionCard>

                {/* ── Orders & Activity ── */}
                <Text className="font-sans-bold text-[11px] text-muted-foreground uppercase tracking-widest mb-2 ml-1 mt-1">
                    Orders & Activity
                </Text>
                <SectionCard>
                    <MenuRow icon="receipt-outline" label="Order History" />
                    <Divider />
                    <MenuRow
                        icon="notifications-outline"
                        label="Notifications"
                        value={notificationsEnabled ? 'On' : 'Off'}
                        onPress={toggleNotifications}
                    />
                    <Divider />
                    <MenuRow icon="star-outline" label="Ratings & Reviews" />
                </SectionCard>

                {/* ── Support ── */}
                <Text className="font-sans-bold text-[11px] text-muted-foreground uppercase tracking-widest mb-2 ml-1 mt-1">
                    Support
                </Text>
                <SectionCard>
                    <MenuRow icon="headset-outline" label="Help & Support" />
                    <Divider />
                    <MenuRow icon="chatbubble-ellipses-outline" label="Chat with Us" />
                    <Divider />
                    <MenuRow icon="shield-checkmark-outline" label="Privacy Policy" />
                    <Divider />
                    <MenuRow icon="document-text-outline" label="Terms & Conditions" />
                    <Divider />
                    <MenuRow icon="information-circle-outline" label="About BhukkadDrop" value="v1.0.0" />
                </SectionCard>

                {/* ── Logout ── */}
                <SectionCard className="mt-1">
                    <MenuRow
                        icon="log-out-outline"
                        label="Sign out"
                        showChevron={false}
                        danger={true}
                        onPress={handleLogout}
                    />
                </SectionCard>

                <FooterCredit />
            </ScrollView>

            <AlertDialog
                visible={showLogoutModal}
                title="Sign out?"
                message="Are you sure you want to log out of your account?"
                icon="log-out-outline"
                cancelText="Cancel"
                confirmText="Sign Out"
                onCancel={() => setShowLogoutModal(false)}
                onConfirm={confirmLogout}
                isConfirming={isLoggingOut}
                destructive={true}
            />
        </View>
    );
};

export default Profile;
