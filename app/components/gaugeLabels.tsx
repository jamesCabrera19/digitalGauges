import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

type UnitDisplay = {
    updateUnit: (val: string) => void;
};

const GaugeLabels = ({ updateUnit }: UnitDisplay) => {
    const [state, setState] = useState(false);
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Units</Text>

            {/* row container for side-by-side buttons */}
            <View style={styles.buttonRow}>
                <Text style={{ color: "white" }}>Unit Display</Text>
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        width: 100,
                    }}
                >
                    <Button
                        title="C"
                        onPress={() => {
                            updateUnit("c");
                            setState((prev) => !prev);
                        }}
                        disabled={state ? false : true}
                    />
                    <Button
                        title="F"
                        onPress={() => {
                            updateUnit("f");
                            setState((prev) => !prev);
                        }}
                        disabled={state ? true : false}
                    />
                </View>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    screenContainer: {
        width: 300, // your fixed width
        justifyContent: "center", // center inner items vertically within this box
        alignItems: "center", // center inner items horizontally within this box
    },
    card: {
        width: 300,
        backgroundColor: "black",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    label: {
        color: "white",
    },
    buttonRow: {
        flexDirection: "row", // lay children out horizontally
        justifyContent: "space-around", // distribute space evenly
        alignItems: "center", // vertically center buttons
        marginTop: 8, // a bit of breathing room under the text
    },
});

export default GaugeLabels;
