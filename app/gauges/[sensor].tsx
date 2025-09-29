import { useContext } from "react";
import { View, Button, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";

import { Context as DataContext } from "../context/dataContext";
import { Context as SensorContext } from "../context/sensorContext";

//
import GaugeLabels from "../components/gaugeLabels";
import Gauges from "../components/gauges";
import GaugeStyle from "../components/gaugeStyle";
import GaugeNeedle from "../components/gaugeNeedle";
import GaugeRange from "../components/gaugeRange";
import GaugeColorPicker from "../components/gaugeColorPicker";

import { useWebSocket, WebSocketPayload } from "../hooks/useWebSocket";

export default function SensorGauge() {
    // extracting the route param
    const { sensor: route } = useLocalSearchParams<{ sensor: string }>();
    // websocket hook
    const { ws, serverMessages, serverState, sendMessage } = useWebSocket();
    //
    const {
        state,
        updateData,
        updateRange,
        updateNeedleSize,
        updateGaugeType,
        updateUnitDisplay,
        handleReset,
        sendData,
    } = useContext(DataContext);

    // sensor state list
    const { state: sensors } = useContext(SensorContext);

    const handleSaveData = () => {
        // parsing the state
        const data = JSON.stringify(state);
        let target;
        // identifying the target
        for (let i = 0; i < sensors.length; i++) {
            if (sensors[i].route === `/${route}`) {
                target = sensors[i];
                break;
            }
        }

        if (!target) {
            console.warn("No sensor was found!");
            return;
        }

        // console.log(data);

        // creating the message
        const message = {
            command: "update_ui",
            data: data,
            device_id: target.id.toString(),
            // other: [],
        };
        // only send data if target is found

        try {
            sendMessage(message);
        } catch (error) {
            console.log("Message could not be sent. ", error);
        }
    };

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.screen}
        >
            <View style={styles.container}>
                <Gauges
                    needleSize={state.needleSize}
                    gaugeType={state.gaugeType}
                    unit={state.unit}
                    colors={[
                        state.backgroundColor,
                        state.secondaryColor,
                        state.fontColor,
                    ]}
                    range={state.range}
                />

                <GaugeStyle updateGaugeType={updateGaugeType} />

                <GaugeNeedle
                    updateNeedleSize={updateNeedleSize}
                    active={state.gaugeType}
                />

                <GaugeColorPicker
                    updateColor={updateData}
                    colors={[
                        state.backgroundColor,
                        state.secondaryColor,
                        state.fontColor,
                    ]}
                    gaugeFace={state.gaugeType}
                />

                <GaugeRange
                    updateRange={updateRange}
                    range={state.range}
                    unit={state.unit}
                />

                <GaugeLabels
                    updateUnit={(val) =>
                        updateUnitDisplay(val.toUpperCase() as "C" | "F")
                    }
                />

                <View style={styles.footer}>
                    <Button title="Reset" color={"red"} onPress={handleReset} />

                    <Button
                        title="Save Data"
                        color={"blue"}
                        onPress={handleSaveData}
                    />
                    <Button
                        title="Read Message"
                        onPress={() => console.log(serverMessages)}
                        color={"blue"}
                    />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1, // allows content to grow beyond the viewport
        justifyContent: "center",
        alignItems: "center",
        padding: 16, // optional padding around your content
    },
    screen: {
        flex: 1,
        backgroundColor: "#25292e",
    },
    container: {
        width: 350, // your fixed width

        backgroundColor: "#292e34",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: 30,
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
    footer: {
        flexDirection: "row", // lay children out horizontally
        justifyContent: "space-between", // distribute space evenly
        alignItems: "center", // vertically center buttons
        marginTop: 8, // a bit of breathing room under the text
        width: 300,
    },
});
