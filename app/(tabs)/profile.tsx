import { AppBar } from '@/components/AppBar';
import FooterCredit from '@/components/FooterCredit';
import MenuRow from '@/components/profile/MenuRow';
import { theme } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Image, ScrollView, Text, View } from 'react-native';



const SectionCard = ({ children, className = '' }: { children: React.ReactNode; className?: string }) => (
    <View className={`bg-card rounded-2xl border border-border overflow-hidden mb-3 ${className}`}>
        {children}
    </View>
);

const Divider = () => <View className="h-[0.5px] bg-border mx-4" />;

// ---------- Main Component ----------
const Profile = () => {
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);

    // Dummy user data
    const user = {
        name: 'Gaurav Kumar',
        email: 'gaurav@bhukkad.com',
        phone: '+91 98765 43210',
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&q=80',
        bhukkadCoins: 120,
        savedAddresses: 2,
        activeOrders: 1,
    };

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
                            <Image
                                source={{ uri: user.avatar }}
                                className="w-full h-full"
                                resizeMode="cover"
                            />
                        </View>
                    </View>

                    {/* Info */}
                    <View className="flex-1">
                        <Text className="font-heading-bold text-xl text-white leading-tight" numberOfLines={1}>
                            {user.name}
                        </Text>
                        <Text className="font-sans-regular text-sm text-muted/80 mt-0.5" numberOfLines={1}>
                            {user.email}
                        </Text>
                        <Text className="font-sans-regular text-sm text-muted/80 mt-0.5">
                            {user.phone}
                        </Text>
                        {/* <Pressable className="mt-2.5 self-start bg-primary/20 border border-primary/30 px-3 py-1 rounded-full">
                            <Text className="font-sans-semibold text-xs text-primary">Edit Profile</Text>
                        </Pressable> */}
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
                        { label: 'BhukkadCoins', value: user.bhukkadCoins.toString(), icon: 'flame' as const, color: theme.colors.accent },
                        { label: 'Addresses', value: user.savedAddresses.toString(), icon: 'location' as const, color: theme.colors.primary },
                        { label: 'Active Orders', value: user.activeOrders.toString(), icon: 'bag-check' as const, color: theme.colors.success },
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
                    <MenuRow icon="location-outline" label="Saved Addresses" value={`${user.savedAddresses} saved`} />
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
                        onPress={() => setNotificationsEnabled(v => !v)}
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
                        label="Logout"
                        showChevron={false}
                        danger={true}
                    />
                </SectionCard>
                <FooterCredit />
            </ScrollView>
        </View>
    );
};

export default Profile;