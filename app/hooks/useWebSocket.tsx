import { useContext } from 'react';
import { WebSocketContext } from '../context/webSocketContext';

export interface WebSocketPayload {
    // command: string;
    data: {};
    device_id: '_pwa_iphone_';
    target_id: string;
}

export const useWebSocket = () => {
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    const { ws, serverMessages, serverState, sensors } = context;

    const defaultMessage = {
        command: 'hello from the PC',
        data: {},
        device_id: '_pwa_iphone_',
        target_id: sensors[sensors.length - 1].toString(), // hard coded //
    };

    const sendMessage = (message: WebSocketPayload) => {
        if (ws && ws.readyState === 1) {
            ws.send(JSON.stringify(message));
        } else {
            console.warn('WebSocket is not connected.');
        }
        console.log('Message sent!', message);
    };

    return { ws, serverMessages, serverState, sendMessage, sensors };
};
