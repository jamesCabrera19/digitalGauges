import { View, Text, Button, StyleSheet, TextInput } from "react-native";
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,
    GaugeValueText,
    Gauge,
    gaugeClasses,
} from "@mui/x-charts/Gauge";
import { Slider } from "@miblanchard/react-native-slider";
import { SafeAreaView } from "react-native-safe-area-context";

type NeedleProps = {
    updateNeedleSize: (val: number) => void;
    active: string;
};

const GaugeNeedle = ({ updateNeedleSize, active }: NeedleProps) => {
    const buttons = [
        { title: "Thin", size: 2 },
        { title: "Normal", size: 3 },
        { title: "Thick", size: 5 },
    ];
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Style</Text>
            {/* row container for side-by-side buttons */}
            <View style={styles.buttonRow}>
                {buttons.map((button) => (
                    <Button
                        key={button.title}
                        title={button.title}
                        onPress={() => updateNeedleSize(button.size)}
                        // disabled={active !== 'Default'}
                    />
                ))}
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

export default GaugeNeedle;
