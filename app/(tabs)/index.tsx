import { Link } from 'expo-router';
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    Button,
} from 'react-native';
import { ReactNode } from 'react';
import { useRouter } from 'expo-router';
import { useWebSocket } from '../hooks/useWebSocket';
import SensorContainer from '../gauges';

export default function Index() {
    const { ws, serverMessages, serverState, sendMessage } = useWebSocket();

    return (
        <View style={styles.container}>
            <SensorContainer />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#fff',
    },
    button: {
        fontSize: 20,
        textDecorationLine: 'underline',
        color: '#fff',
    },
});
