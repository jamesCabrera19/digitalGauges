import { Stack } from "expo-router";
import { Provider as DataProvider } from "../app/context/dataContext";
export default function RootLayout() {
    return (
        <DataProvider>
            <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen
                    name="gauges"
                    options={{ headerShown: true, presentation: "modal" }}
                />
                <Stack.Screen name="+not-found" />
            </Stack>
        </DataProvider>
    );
}
