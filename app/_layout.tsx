import { Stack } from 'expo-router';
import { Provider as DataProvider } from '../app/context/dataContext';
import { WebSocketProvider } from '../app/context/webSocketContext';

export default function RootLayout() {
    return (
        <WebSocketProvider>
            <DataProvider>
                <Stack
                    screenOptions={{
                        // headerBackVisible: true,
                        headerShown: false, // completely removes the header bar
                    }}
                >
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerBackVisible: false }}
                    />
                    <Stack.Screen
                        name="gauges"
                        options={{ headerBackVisible: false }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </DataProvider>
        </WebSocketProvider>
    );
}
