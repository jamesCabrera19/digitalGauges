import React, {
    createContext,
    useEffect,
    useState,
    useRef,
    ReactNode,
} from 'react';
import { Text, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';

export const ROUTES = {
    coolantTemperature: '/coolant_temperature',
    boostPressure: '/boost_pressure',
    oilPressure: '/oil_pressure',
    brakeTemperature: '/brake_temperature',
    server: '/server',
} as const;

type Route = (typeof ROUTES)[keyof typeof ROUTES];

// we are replacing the sensorContext with SIMULATED data from the WebSocketProvider
type Telemetry = {
    name: string;
    id: number;
    value: number;
    route: Route;
    status: boolean;
    unit?: string;
};

const INITIAL_SENSORS: Telemetry[] = [
    {
        name: 'Coolant Temp',
        id: 123,
        value: 180,
        route: ROUTES.coolantTemperature,
        status: true,
        unit: '°C',
    },
    {
        name: 'Boost',
        id: 1234,
        value: 10.4,
        route: ROUTES.boostPressure,
        status: false,
        unit: 'psi',
    },
    {
        name: 'Oil Pressure',
        id: 123456,
        value: 42,
        route: ROUTES.oilPressure,
        status: false,
        unit: 'psi',
    },
    {
        name: 'Brake Temp',
        id: 123455556,
        value: 250,
        route: ROUTES.brakeTemperature,
        status: true,
        unit: '°C',
    },
    {
        name: 'Server',
        id: 99999999999,
        value: 250,
        route: ROUTES.brakeTemperature,
        status: true,
        unit: '°C',
    },
];

interface WebSocketContextType {
    serverMessages: string[];
    serverState: string;
    ws: WebSocket | null;
    sensors: Telemetry[]; // sensors
}

export const WebSocketContext = createContext<WebSocketContextType | null>(
    null
);

export const WebSocketProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const WS_ADDRESS = 'ws://192.168.4.1:81';

    //
    const [sensors, setSensors] = useState<Telemetry[]>(INITIAL_SENSORS);
    //
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
        // heres where we will update setSensors later on - the sensors will be coming from the ws

        return () => {
            ws.current?.close();
        };
    }, []); // Run only once on mount

    return (
        <WebSocketContext.Provider
            value={{ serverMessages, serverState, ws: ws.current, sensors }}
        >
            <View>
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
