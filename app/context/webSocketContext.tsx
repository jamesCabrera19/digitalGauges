import React, {
    createContext,
    useEffect,
    useState,
    useRef,
    ReactNode,
} from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

interface WebSocketContextType {
    serverMessages: string[];
    serverState: string;
    ws: WebSocket | null;
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
    null
);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const WS_ADDRESS = 'ws://192.168.4.1:80';

    const [serverState, setServerState] = useState<string>('Disconnected');
    const [serverMessages, setServerMessages] = useState<string[]>([]);
    const [serverAddress, setServerAddress] = useState<string>(WS_ADDRESS);
    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        // ws.current = new WebSocket(WS_ADDRESS);
        ws.current = new WebSocket(serverAddress);

        ws.current.onopen = () => {
            setServerState('Connected to the server');
        };

        ws.current.onclose = () => {
            setServerState('Disconnected. Check internet or server.');
        };

        ws.current.onerror = (e) => {
            console.error('WebSocket error:', e);
            setServerState('An error occurred. Check the console for details.');
        };

        ws.current.onmessage = (e) => {
            setServerMessages((prevMessages) => [...prevMessages, e.data]);
        };

        return () => {
            ws.current?.close();
        };
    }, []); // Run only once on mount

    return (
        <WebSocketContext.Provider
            value={{ serverMessages, serverState, ws: ws.current }}
        >
            <View style={{}}>
                <Text style={{ textAlign: 'center' }}>{serverState}</Text>
                <TextInput
                    style={{
                        height: 40,
                        borderColor: 'gray',
                        borderWidth: 1,
                        padding: 5,
                        marginTop: 10,
                    }}
                    placeholder="Type here..."
                    onChangeText={(newText) => setServerAddress(newText)}
                    value={serverAddress}
                />
            </View>
            {children}
        </WebSocketContext.Provider>
    );
};
