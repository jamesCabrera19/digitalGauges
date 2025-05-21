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
import { useRouter, Link } from 'expo-router';

const sensors = [
    {
        name: 'Coolant Temp',
        id: 123,
        value: 180,
        route: 'temp',
        active: true,
    },
    {
        name: 'Boost',
        id: 1234,
        value: 10.4,
        route: 'boost',
        active: false,
    },
    {
        name: 'Oil Pressure',
        id: 123456,
        value: 42,
        route: 'pressure',
        active: false,
    },
    {
        name: 'Brake Temp',
        id: 123455556,
        value: 250,
        route: 'brake-temp',
        active: true,
    },
];

const SensorContainer = () => {
    const router = useRouter();

    const onItemClick = (id: number): void => {
        // on press navigate to sensor screen modifier
        console.log(id);
    };

    const Item: React.FC<{
        name: string;
        val: number;
        route: string;
        status: boolean;
    }> = ({ name, val, route, status }) => (
        <Pressable
            style={styles.item}
            onPress={() => router.push(`/gauges/${route}`)}
        >
            {status ? (
                <View
                    style={{
                        height: 10,
                        width: 10,
                        backgroundColor: 'yellow',
                        borderRadius: 5,
                    }}
                />
            ) : (
                <View
                    style={{
                        height: 10,
                        width: 10,
                        backgroundColor: 'red',
                        borderRadius: 5,
                    }}
                />
            )}
            <Text style={{ fontSize: 20, color: 'white' }}>{name}</Text>
            <Text style={{ fontSize: 50, color: 'white' }}>{val} </Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginHorizontal: 10,
                }}
            >
                <Text style={{ fontSize: 30, color: 'white' }}>GAUGES</Text>
                <Button title="+" onPress={() => console.log('Add sensor')} />
            </View>

            <FlatList
                data={sensors}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        val={item.value}
                        route={item.route}
                        status={item.active}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </View>
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
    title: {
        fontSize: 32,
    },
});
export default SensorContainer;
