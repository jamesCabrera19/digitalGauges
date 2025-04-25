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
const SensorContainer = () => {
    const router = useRouter();

    const sensors = [
        {
            name: 'coolant temp',
            id: 123,
            value: 180,
        },
        {
            name: 'boost',
            id: 1234,
            value: 10.4,
        },
        {
            name: 'oil pressure',
            id: 123456,
            value: 42,
        },
        {
            name: 'brake temp',
            id: 123455556,
            value: 250,
        },
    ];
    const onItemClick = (id: number): void => {
        // on press navigate to sensor screen modifier
        console.log(id);
    };

    const Item: React.FC<{ name: string; val: number }> = ({ name, val }) => (
        <Pressable style={styles.item} onPress={() => onItemClick(val)}>
            <Text style={{ fontSize: 20 }}>{name}</Text>
            <Text style={{ fontSize: 50 }}>{val} </Text>
        </Pressable>
    );
    const styles = StyleSheet.create({
        container: {
            // flex: 1,
            marginTop: StatusBar.currentHeight || 20,
            borderWidth: 1,
            width: 300,
            borderRadius: 10,
            backgroundColor: '#FFFF',
            height: 450,
            // margin: 'auto',
            // justifyContent: 'space-between',
        },
        item: {
            backgroundColor: '#FFFFF0',
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
                <Text style={{ fontSize: 30 }}>GAUGES</Text>
                <Button title="+" onPress={() => router.push('/gauges')} />
            </View>

            <FlatList
                data={sensors}
                renderItem={({ item }) => (
                    <Item name={item.name} val={item.value} />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
            />
        </View>
    );
};

export default function Index() {
    return (
        <View style={styles.container}>
            {/* <Text style={styles.text}>Home screen</Text> */}
            {/* <Link href="/about" style={styles.button}>
                Go to About screen
            </Link> */}
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
