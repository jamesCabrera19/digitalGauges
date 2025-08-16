import { useContext } from 'react';
import { WebSocketContext } from '../context/webSocketContext';

export interface WebSocketPayload {
    command: string;
    data: string;
    device_id: string;
    other: object;
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    const { ws, serverMessages, serverState } = context;

    const sendMessage = (message: WebSocketPayload) => {
        const defaultMessage = { message: 'hello from the PC' };

        if (ws && ws.readyState === 1) {
            ws.send(JSON.stringify(message || defaultMessage));
        } else {
            console.warn('WebSocket is not connected.');
        }
        console.log('Message sent!', message);
    };

    return { ws, serverMessages, serverState, sendMessage };
};
