import { Stack } from 'expo-router';
import { Provider as DataProvider } from '../app/context/dataContext';
import { WebSocketProvider } from '../app/context/webSocketContext';
import { Provider as SensorProvider } from '../app/context/sensorContext';

export default function RootLayout() {
    return (
        <SensorProvider>
            <DataProvider>
                <WebSocketProvider>
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
                </WebSocketProvider>
            </DataProvider>
        </SensorProvider>
    );
}
