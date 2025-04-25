import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen
                name="gauges"
                options={{ headerShown: true, presentation: 'modal' }}
            />
            <Stack.Screen name="+not-found" />
        </Stack>
    );
}
