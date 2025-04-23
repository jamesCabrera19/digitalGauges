import { Link } from 'expo-router';
import { View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
const SensorContaine = () => {
    const sensors = [
        {
            name: 'coolant temp',
            id: 123,
        },
        {
            name: 'boost',
            id: 1234,
        },
        {
            name: 'oil temp',
            id: 123456,
        },
    ];
    const onItemClick = (id) => {
        console.log(id);
    };
    const Item = ({ name }) => (
        <View style={styles.item}>
            <Text style={styles.name}>{name}</Text>
        </View>
    );
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop: StatusBar.currentHeight || 0,
        },
        item: {
            backgroundColor: '#f9c2ff',
            padding: 20,
            marginVertical: 8,
            marginHorizontal: 16,
        },
        title: {
            fontSize: 32,
        },
    });
    return (
        <View>
            <FlatList
                data={sensors}
                renderItem={({ item }) => <Item name={item.name} />}
                keyExtractor={(item) => item.id}
            />
        </View>
    );
};

export default function Index() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Home screen</Text>
            {/* <Link href="/about" style={styles.button}>
                Go to About screen
            </Link> */}
            <SensorContaine />
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
