import React, {
    createContext,
    useEffect,
    useState,
    useRef,
    ReactNode,
} from 'react';
import { Text, View } from 'react-native';

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
    const WS_ADDRESS = 'ws://172.20.10.2:80';

    const [serverState, setServerState] = useState<string>('Disconnected');
    const [serverMessages, setServerMessages] = useState<string[]>([]);

    const ws = useRef<WebSocket | null>(null);

    useEffect(() => {
        ws.current = new WebSocket(WS_ADDRESS);

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
            </View>
            {children}
        </WebSocketContext.Provider>
    );
};
