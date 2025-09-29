import {
    View,
    FlatList,
    StyleSheet,
    Text,
    StatusBar,
    Pressable,
    Button,
    SafeAreaView,
} from "react-native";
import { ReactNode, useContext, useState } from "react";
import { useRouter, Link } from "expo-router";
import { Context as DataContext } from "../context/dataContext";
import { Context as SensorContext } from "../context/sensorContext";

type props = {
    name: string;
    val: number;
    route: () => void;
    status: boolean;
};

const Item = ({ name, val, route, status }: props) => (
    <Pressable
        style={styles.item}
        onPress={() => route()}
        onLongPress={() => console.log("Long pressed", name)}
    >
        {status ? (
            <View
                style={{
                    height: 10,
                    width: 10,
                    backgroundColor: "yellow",
                    borderRadius: 5,
                }}
            />
        ) : (
            <View
                style={{
                    height: 10,
                    width: 10,
                    backgroundColor: "red",
                    borderRadius: 5,
                }}
            />
        )}
        <Text style={{ fontSize: 20, color: "white" }}>{name}</Text>
        <Text style={{ fontSize: 50, color: "white" }}>{val} </Text>
    </Pressable>
);

const SensorContainer = () => {
    const router = useRouter();
    // const { state } = useContext(DataContext);
    const { state: sensors, updateSensor } = useContext(SensorContext);

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
        updateSensor(123, { name: "Coolant Temp" });
    };

    return (
        <SafeAreaView style={styles.container}>
            <View
                style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                    marginHorizontal: 10,
                    padding: 10,
                }}
            >
                <Button title="Add +" onPress={handleAddSensor} />
            </View>

            <FlatList
                data={sensors}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        val={item.value}
                        route={() => router.push(`/gauges/${item.route}`)}
                        status={item.active}
                    />
                )}
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
