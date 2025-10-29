import React, {
    createContext,
    useEffect,
    useState,
    useRef,
    ReactNode,
} from 'react';

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
    // 1) Manual endpoints you add via UI
    const [endpoints, setEndpoints] = useState([
        { id: 'hub', name: 'GaugeHub', url: 'ws://192.168.4.1:80' },
        // add more later with addEndpoint(...)
    ]);

    // 2) Which endpoint is “active” (we keep exactly ONE socket open)
    const [activeId, setActiveId] = useState(endpoints[0]?.id ?? null);

    // 3) Simple connection state + message log (optional)
    const [status, setStatus] = useState<string>('Disconnected');
    const [messages, setMessages] = useState<string[]>([]);

    // 4) The single active WebSocket
    const wsRef = useRef(null);

    // --- helpers you’ll use from the app ---
    const addEndpoint = (ep) => {
        setEndpoints((list) =>
            list.find((e) => e.id === ep.id) ? list : [...list, ep]
        );
    };

    const removeEndpoint = (id) => {
        setEndpoints((list) => list.filter((e) => e.id !== id));
        if (activeId === id) setActiveId(null); // if removing current, deactivate
    };

    const selectEndpoint = (id) => setActiveId(id);

    const send = (payload) => {
        const ws = wsRef.current;
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify(payload));
        } else {
            console.warn('WebSocket is not open');
        }
    };

    // 5) (Re)connect whenever activeId or endpoints change
    useEffect(() => {
        // close previous
        if (wsRef.current) {
            try {
                wsRef.current.close();
            } catch {}
            wsRef.current = null;
        }

        const ep = endpoints.find((e) => e.id === activeId);
        if (!ep) {
            setStatus('Disconnected');
            return;
        }

        const ws = new WebSocket(ep.url);
        wsRef.current = ws;

        ws.onopen = () => setStatus(`Connected: ${ep.name}`);
        ws.onclose = () => setStatus('Disconnected');
        ws.onerror = () => setStatus('Error');
        ws.onmessage = (e) => setMessages((prev) => [...prev, String(e.data)]);

        return () => {
            try {
                ws.close();
            } catch {}
            wsRef.current = null;
        };
    }, [activeId, endpoints]);

    return (
        <WebSocketContext.Provider
            value={{
                endpoints,
                activeId,
                status,
                messages,
                addEndpoint,
                removeEndpoint,
                selectEndpoint,
                send,
            }}
        >
            {children}
        </WebSocketContext.Provider>
    );
};

export function useWebSocket() {
    const ctx = useContext(WebSocketContext);
    if (!ctx)
        throw new Error('useWebSocket must be used inside WebSocketProvider');
    return ctx;
}
