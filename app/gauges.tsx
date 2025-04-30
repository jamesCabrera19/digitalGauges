import { useState } from "react";
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

type GaugePointerProps = {
    needleSize: number; // needle size
    GaugeType: string;
    fontWeight: number;
    primaryColor: string; // not implemented -- bar color?
    secondaryColor: string; // not implemented -- needle color?
};
type NeedleProps = {
    updateNeedleSize: (val: number) => void;
    active: string;
};
type GaugeStyleProps = {
    updateGaugeType: (type: string) => void;
};
type GaugeRangeProps = {
    updateRange: (newRange: Range) => void;
};
interface Range {
    min: number;
    max: number;
}
type UnitDisplay = {
    updateUnit: (val: string) => void;
};

////
////
////
////
const GaugePointer = ({ needleSize }: { needleSize: number }) => {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
        // No value to display
        return null;
    }

    const target = {
        x: cx + outerRadius * Math.sin(valueAngle),
        y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
        <g>
            <circle cx={cx} cy={cy} r={5} fill="red" />
            <path
                d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                stroke="red"
                strokeWidth={needleSize}
            />
        </g>
    );
};

const GaugeComponent = ({
    needleSize,
    GaugeType,
    fontWeight,
}: GaugePointerProps) => {
    // const needleSize = 5; // 2,3,5
    const currentVal = 220;
    const minVal = 0;
    const maxVal = 280;

    const ArcGauge = () => {
        return (
            <Gauge
                width={200}
                height={200}
                value={50}
                startAngle={-90}
                endAngle={90}
                text={({ value }) => `${value}`}
                sx={{
                    // background (reference) arc
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: "#e0e0e0", // grey reference arc
                    },
                    // foreground (value) arc
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: "#0076ec", // green value arc
                    },
                    // target the center-value <text> element
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: "32px", // make the number bigger
                        fill: "#333", // (optional) change color
                        fontWeight: fontWeight, // (optional) make it semibold
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    },
                }}
            />
        );
    };
    const RoundGauge = () => {
        return (
            <Gauge
                width={200}
                height={200}
                value={currentVal}
                valueMin={10}
                valueMax={280}
                startAngle={-180}
                endAngle={260}
                text={({ value }) => `${value}`}
                sx={{
                    // target the center-value <text> element
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: "32px", // make the number bigger
                        fill: "#333", // (optional) change color
                        fontWeight: fontWeight, // (optional) make it semibold
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    },
                }}
            />
        );
    };
    const DefaultGauge = () => {
        return (
            <GaugeContainer
                width={200}
                height={200}
                startAngle={-110}
                endAngle={110}
                value={currentVal}
                valueMin={minVal} // define your range
                valueMax={maxVal}
            >
                <GaugeReferenceArc />
                <GaugeValueArc />
                <GaugePointer needleSize={needleSize} />
            </GaugeContainer>
        );
    };

    const SimpleGauge = () => {
        return (
            <View
                style={{
                    width: 200,
                    height: 200,
                    borderRadius: 100,
                    backgroundColor: "black",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontWeight: fontWeight,
                        fontSize: 40,
                        color: "white",
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    {currentVal}
                </Text>
            </View>
        );
    };

    const gaugePicker = (gaugeType: string) => {
        switch (gaugeType.toLocaleLowerCase()) {
            case "arc":
                return <ArcGauge />;
            case "round":
                return <RoundGauge />;
            case "simple":
                return <SimpleGauge />;
            default:
                return <DefaultGauge />;
        }
    };

    return <View>{gaugePicker(GaugeType)}</View>;
};

const GaugeStyle = ({ updateGaugeType }: GaugeStyleProps) => {
    const buttons = [
        { title: "Default" },
        { title: "Round" },
        { title: "Arc" },
        { title: "Simple" },
    ];
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Gauge Style</Text>
            <View style={styles.buttonRow}>
                {buttons.map((button) => {
                    return (
                        <Button
                            key={button.title}
                            title={button.title}
                            onPress={() => updateGaugeType(button.title)}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const NeedleStyle = ({ updateNeedleSize, active }: NeedleProps) => {
    const buttons = [
        { title: "Thin", size: 2 },
        { title: "Normal", size: 3 },
        { title: "Thick", size: 5 },
    ];
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Needle Style</Text>
            {/* row container for side-by-side buttons */}
            <View style={styles.buttonRow}>
                {buttons.map((button) => (
                    <Button
                        key={button.title}
                        title={button.title}
                        onPress={() => updateNeedleSize(button.size)}
                        disabled={active !== "Default"}
                    />
                ))}
            </View>
        </View>
    );
};

const GaugeRange = ({ updateRange }: GaugeRangeProps) => {
    // min and max values
    const [minValue, setMinValue] = useState(0); // min value Range
    const [maxValue, setMaxValue] = useState(100); // max value Range

    const data = [
        {
            title: "Min",
            startValue: 0,
            endingValue: 250,
        },
        {
            title: "Max",
            startValue: 100,
            endingValue: 300,
        },
    ];
    const styles = StyleSheet.create({
        label: {
            color: "white",
        },
        buttonRow: {
            flexDirection: "row", // lay children out horizontally
            justifyContent: "space-around", // distribute space evenly
            alignItems: "center", // vertically center buttons
            marginTop: 8, // a bit of breathing room under the text
        },
        card: {
            width: 300,
            backgroundColor: "black",
            borderRadius: 10,
            padding: 10,
            margin: 10,
        },
        sliderContainer: { width: 180, height: 40 },
        sliderThumb: {
            width: 20,
            height: 20,
            borderRadius: 12,
            backgroundColor: "#fff",
            borderWidth: 0,
            borderColor: "#0076ec",
        },
        trackStyle: {
            height: 1,
            borderRadius: 5,
        },
        thumbTouchSize: {
            width: 40,
            height: 40,
        },
        // text text
        text: {
            color: "white",
            fontWeight: 400,
        },
        // red zone
        container: {
            backgroundColor: "black",
            borderRadius: 10,
            display: "flex",
        },
        textBox: {
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
            margin: 10,
        },
        box: {
            height: 40,
            width: 40,
            borderRadius: 10,
            backgroundColor: "#333",
            alignItems: "center",
            justifyContent: "center",
        },
    });

    const handleValueChange = (value: number, type: string) => {
        if (type === "Min") {
            setMinValue(value);
        } else {
            setMaxValue(value);
        }

        const data = { min: minValue, max: maxValue };
        updateRange(data);
    };
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Range</Text>

            {data.map(({ title, startValue, endingValue }) => {
                const value = title === "Min" ? minValue : maxValue;
                const setValue = title === "Min" ? setMinValue : setMaxValue;

                return (
                    <View style={styles.buttonRow} key={title}>
                        <Text style={styles.text}>{title}</Text>
                        <Slider
                            containerStyle={styles.sliderContainer}
                            // style the track itself
                            trackStyle={styles.trackStyle}
                            minimumTrackTintColor="#0076ec"
                            maximumTrackTintColor="#ccc"
                            // enlarge & color the thumb
                            thumbStyle={styles.sliderThumb}
                            thumbTintColor="#0076ec"
                            thumbTouchSize={styles.thumbTouchSize}
                            minimumValue={startValue}
                            maximumValue={endingValue}
                            step={1}
                            // controlled value
                            value={value}
                            onValueChange={(raw) => {
                                // raw: number | number[]
                                const num = Array.isArray(raw) ? raw[0] : raw;
                                handleValueChange(num, title);
                            }}
                        />
                        <Text style={styles.text}>{value}</Text>
                    </View>
                );
            })}

            <View style={styles.container}>
                <Text style={[styles.text, { fontSize: 16 }]}>
                    Red Zone Range
                </Text>
                <View style={styles.textBox}>
                    <View style={styles.box}>
                        <Text style={styles.text}>{minValue}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.text}>{maxValue}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
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

export default function GaugesScreen() {
    const [range, setRange] = useState<Range>({ min: 0, max: 0 });
    const [needleSize, setNeedleSize] = useState(3); // 2/3/5
    const [gaugeType, setGaugeType] = useState("SimpleGauge");
    const [unit, setUnit] = useState("F");

    const updateRange = (newRange: Range) => {
        setRange(newRange);
    };
    const updateNeedleSize = (val: number) => {
        setNeedleSize(val);
    };
    const updateGaugeType = (type: string) => {
        setGaugeType(type);
    };

    const updateUnitDisplay = (val: string) => {
        const tempUnit = val.toUpperCase();
        console.log(tempUnit);
        setUnit(tempUnit);
    };
    const saveChanges = () => {
        const data = {
            range,
            needleSize,
            gaugeType,
            unit,
            colors: "colors",
            other: "other",
        };
        // send data to local store state.
        // saveData(data) => sendData()=> readData()=> displayData()
        console.log(data);
    };
    const handleReset = () => {
        const resetGauge = { min: 0, max: 0 };
        const resetNeedleSize = 3;
        const resetGaugeType = "SimpleGauge";
        const resetUnit = "F";

        setRange(resetGauge);
        setNeedleSize(resetNeedleSize);
        setGaugeType(resetGaugeType);
        setUnit(resetUnit);
    };
    return (
        <SafeAreaView style={styles.screen}>
            <View style={styles.screenContainer}>
                <GaugeComponent
                    needleSize={needleSize}
                    GaugeType={gaugeType}
                    fontWeight={400}
                    primaryColor="red"
                    secondaryColor="blue"
                />
                <GaugeStyle updateGaugeType={updateGaugeType} />
                <NeedleStyle
                    updateNeedleSize={updateNeedleSize}
                    active={gaugeType}
                />
                <GaugeRange updateRange={updateRange} />
                <GaugeLabels updateUnit={updateUnitDisplay} />
                <View
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        width: 200,
                        justifyContent: "space-between",
                    }}
                >
                    <Button title="Reset" color={"red"} onPress={handleReset} />
                    <Button
                        title="Save Data"
                        color={"blue"}
                        onPress={saveChanges}
                    />
                </View>
            </View>
        </SafeAreaView>
    );
}
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
