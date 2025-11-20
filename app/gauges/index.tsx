import {
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    Button,
    SafeAreaView,
} from 'react-native';
import { ReactNode, useContext, useEffect, useState } from 'react';
import { useRouter, Link } from 'expo-router';
import { Context as DataContext } from '../context/dataContext';
import { WebSocketContext } from '../context/webSocketContext';

type props = {
    name: string;
    val: number;
    route: () => void;
    status: boolean;
};
type simulated = {
    range: number;
};

const SimulatedData = ({ range }: simulated) => {
    const [text, setText] = useState<number>(10);

    useEffect(() => {
        // sets how often the interval runs
        const timer = 2000;

        const data = setInterval(() => {
            const number = Math.floor(Math.random() * range) + 1;
            setText(number);
        }, timer);
        return () => clearInterval(data);
    }, [range]);

    return <Text style={{ fontSize: 50, color: 'white' }}>{text}</Text>;
};
const Item = ({ name, val, route, status }: props) => {
    return (
        <Pressable
            style={styles.item}
            onPress={() => route()}
            onLongPress={() => console.log('Long pressed', name)}
        >
            <View
                style={{
                    height: 10,
                    width: 10,
                    backgroundColor: status ? 'yellow' : 'red',
                    borderRadius: 5,
                }}
            />
            <Text style={{ fontSize: 20, color: 'white' }}>{name}</Text>
            {/* <Text style={{ fontSize: 50, color: 'white' }}>{val}</Text> */}
            <SimulatedData range={20} />
        </Pressable>
    );
};

const SensorContainer = () => {
    const router = useRouter();
    // const { state } = useContext(DataContext);
    const context = useContext(WebSocketContext);
    if (!context) {
        throw new Error('useWebSocket must be used within a WebSocketProvider');
    }
    const { sensors } = context;

    //

    const handleLongPress = (id: string) => {};

    const handleAddSensor = () => {
        // enter IP? or scan for devices?
        // trigger a form and ask for this info
        // add name
        // unit preference
        // min max range
        // positon
        // testing updateSensor function
        // id: 123
        // changes: {CoolantTemp}
        // updateSensor(123, { name: "Coolant Temp" });
        //[null,2,null,]

        console.log('add sensor');
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                    padding: 10,
                }}
            >
                <Button title="Add +" onPress={() => console.log(sensors)} />
            </View>

            <FlatList
                data={sensors}
                renderItem={({ item }) =>
                    item.name === 'Server' ? null : (
                        <Item
                            name={item.name}
                            val={item.value}
                            route={() => router.push(`/gauges/${item.route}`)}
                            status={item.status}
                        />
                    )
                }
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        marginTop: StatusBar.currentHeight || 20,
        width: 300,
        borderRadius: 10,
        backgroundColor: '#292e34',
        height: 450,
    },
    item: {
        backgroundColor: 'black',
        margin: 8,
        flex: 1,
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
    },
    itemActive: {
        height: 10,
        width: 10,
        backgroundColor: 'red',
        borderRadius: 5,
    },
    title: {
        fontSize: 32,
    },
});
export default SensorContainer;
