import { Link } from "expo-router";
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    Button,
} from "react-native";
import { ReactNode } from "react";
import { useRouter } from "expo-router";

const SensorContainer = () => {
    const router = useRouter();

    const sensors = [
        {
            name: "coolant temp",
            id: 123,
            value: 180,
            route: "temp",
        },
        {
            name: "boost",
            id: 1234,
            value: 10.4,
            route: "boost",
        },
        {
            name: "oil pressure",
            id: 123456,
            value: 42,
            route: "pressure",
        },
        {
            name: "brake temp",
            id: 123455556,
            value: 250,
            route: "brake-temp",
        },
    ];
    const onItemClick = (id: number): void => {
        // on press navigate to sensor screen modifier
        console.log(id);
    };

    const Item: React.FC<{ name: string; val: number; route: string }> = ({
        name,
        val,
        route,
    }) => (
        <Pressable
            style={styles.item}
            onPress={() => router.push(`/gauges/${route}`)}
        >
            <Text style={{ fontSize: 20, color: "white" }}>{name}</Text>
            <Text style={{ fontSize: 50, color: "white" }}>{val} </Text>
        </Pressable>
    );

    return (
        <View style={styles.container}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                }}
            >
                <Text style={{ fontSize: 30, color: "white" }}>GAUGES</Text>
                <Button title="+" onPress={() => console.log("Add sensor")} />
            </View>

            <FlatList
                data={sensors}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        val={item.value}
                        route={item.route}
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
        backgroundColor: "#292e34",
        height: 450,
    },
    item: {
        backgroundColor: "black",
        margin: 8,
        flex: 1,
        height: 150,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
    },
    title: {
        fontSize: 32,
    },
});
export default SensorContainer;
