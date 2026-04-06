export const colors = {
    background: "#FFF0E6",
    foreground: "#3D2C24",
    card: "#FFFFFF",
    cardForeground: "#3D2C24",
    muted: "#F7E4D9",
    mutedForeground: "#968176",
    primary: "#FF7043",
    primaryDark: "#E64A19",
    accent: "#FF9D42",
    border: "#EEDDCC",
    success: "#16A34A",
    destructive: "#DC2626",
    white: "#FFFFFF",
} as const;

export const spacing = {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    6: 24,
    7: 28,
    8: 32,
    9: 36,
    10: 40,
    11: 44,
    12: 48,
    14: 56,
    16: 64,
    18: 72,
    20: 80,
    24: 96,
    30: 120,
} as const;

export const components = {
    tabBar: {
        height: spacing[18],
        horizontalInset: spacing[5],
        radius: spacing[8],
        iconFrame: spacing[12],
        itemPaddingVertical: spacing[2],
    },
} as const;

export const theme = {
    colors,
    spacing,
    components,
} as const;