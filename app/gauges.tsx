import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,
    GaugeValueText,
    Gauge,
    gaugeClasses,
} from '@mui/x-charts/Gauge';
import { Slider } from '@miblanchard/react-native-slider';
import { SafeAreaView } from 'react-native-safe-area-context';

type GaugePointerProps = {
    needleSize: number; // needle size
    GaugeType: string;
    fontSize: string; // not implemented yet
    primaryColor: string;
    secondaryColor: string;
};
type NeedleProps = {
    updateNeedleSize: (val: number) => void;
    active: string;
};
type GaugeStyleProps = {
    updateGaugeType: (type: string) => void;
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

const GaugeComponent = ({ needleSize, GaugeType }: GaugePointerProps) => {
    // const needleSize = 5; // 2,3,5
    const currentVal = 220;
    const minVal = 0;
    const maxVal = 280;
    const fontWeight = 400;

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
                        fill: '#e0e0e0', // grey reference arc
                    },
                    // foreground (value) arc
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: '#0076ec', // green value arc
                    },
                    // target the center-value <text> element
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: '32px', // make the number bigger
                        fill: '#333', // (optional) change color
                        fontWeight: fontWeight, // (optional) make it semibold
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
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
                        fontSize: '32px', // make the number bigger
                        fill: '#333', // (optional) change color
                        fontWeight: fontWeight, // (optional) make it semibold
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
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
                {/* <GaugeValueText
                text={({ value, valueMax }) => `${value} / ${valueMax}`}
            /> */}
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
                    backgroundColor: 'black',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Text
                    style={{
                        fontWeight: fontWeight,
                        fontSize: 40,
                        color: 'white',
                        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                    }}
                >
                    {currentVal}
                </Text>
            </View>
        );
    };

    const gaugePicker = (gaugeType: string) => {
        switch (gaugeType) {
            case 'arc':
                return <ArcGauge />;
            case 'round':
                return <RoundGauge />;
            case 'simple':
                return <SimpleGauge />;
            default:
                return <DefaultGauge />;
        }
    };

    return <View>{gaugePicker(GaugeType)}</View>;
};

const GaugeStyle = ({ updateGaugeType }: GaugeStyleProps) => {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Gauge Style</Text>

            {/* row container for side-by-side buttons */}
            <View style={styles.buttonRow}>
                <Button
                    title="default"
                    onPress={() => {
                        updateGaugeType('default');
                    }}
                />
                <Button
                    title="Round"
                    onPress={() => {
                        updateGaugeType('round');
                    }}
                />
                <Button
                    title="Arc"
                    onPress={() => {
                        updateGaugeType('arc');
                    }}
                />

                <Button
                    title="Simple"
                    onPress={() => {
                        updateGaugeType('simple');
                    }}
                />
            </View>
        </View>
    );
};

const NeedleStyle = ({ updateNeedleSize, active }: NeedleProps) => {
    const buttons = [
        { title: 'Thin', size: 2 },
        { title: 'Normal', size: 3 },
        { title: 'Thick', size: 5 },
    ];
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Needle Style</Text>

            {/* row container for side-by-side buttons */}
            <View style={styles.buttonRow}>
                {buttons.map(({ title, size }) => (
                    <Button
                        key={title}
                        title={title}
                        onPress={() => updateNeedleSize(size)}
                        disabled={active !== 'default'}
                    />
                ))}
            </View>
        </View>
    );
};

const GaugeRange = ({
    updateRange,
}: {
    updateRange: (val: number) => void;
}) => {
    const [value, setValue] = useState(10);
    const [maxValue, setMaxValue] = useState(250);
    const [redStart, setRedStart] = useState(maxValue);
    const [redEnd, setRedEnd] = useState('280');

    const onChangeStart = (val: string) => {
        setRedStart(val);
        const start = parseInt(val, 10);
        const end = parseInt(redEnd, 10);
        if (!isNaN(start) && !isNaN(end)) {
            updateRange({ redStart: start, redEnd: end });
        }
    };

    const onChangeEnd = (val: string) => {
        setRedEnd(val);
        const start = parseInt(redStart, 10);
        const end = parseInt(val, 10);
        if (!isNaN(start) && !isNaN(end)) {
            updateRange({ redStart: start, redEnd: end });
        }
    };

    const styless = StyleSheet.create({
        sliderContainer: { width: 180, height: 40 },
        sliderThumb: {
            width: 20,
            height: 20,
            borderRadius: 12,
            backgroundColor: '#fff',
            borderWidth: 0,
            borderColor: '#0076ec',
        },
        trackStyle: {
            height: 1,
            borderRadius: 5,
        },
        // red zone
        textInput: {
            width: 60,
            height: 40,
            backgroundColor: '#333',
            borderRadius: 5,
            color: 'white',
            textAlign: 'center',
        },
    });
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Range</Text>

            {/* row container for side-by-side buttons */}
            <View style={styles.buttonRow}>
                <Text style={{ color: 'white' }}>Min</Text>
                <Slider
                    // size the track container so it’s easy to see and grab
                    containerStyle={styless.sliderContainer}
                    // style the track itself
                    trackStyle={styless.trackStyle}
                    minimumTrackTintColor="#0076ec" // filled rail to the left  [oai_citation:0‡GitHub](https://github.com/miblanchard/react-native-slider)
                    maximumTrackTintColor="#ccc" // empty rail to the right  [oai_citation:1‡GitHub](https://github.com/miblanchard/react-native-slider)
                    // enlarge & color the thumb
                    thumbStyle={styless.sliderThumb}
                    thumbTintColor="#0076ec" // fallback color  [oai_citation:2‡GitHub](https://github.com/miblanchard/react-native-slider)
                    thumbTouchSize={{ width: 40, height: 40 }} // bigger hit area  [oai_citation:3‡GitHub](https://github.com/miblanchard/react-native-slider)
                    // range & stepping
                    minimumValue={0}
                    maximumValue={100}
                    step={10}
                    // controlled value
                    value={value}
                    onValueChange={setValue}
                />
                <Text style={{ color: 'white', fontWeight: 400 }}>{value}</Text>
            </View>

            <View style={styles.buttonRow}>
                <Text style={{ color: 'white' }}>Max</Text>
                <Slider
                    // size the track container so it’s easy to see and grab
                    containerStyle={styless.sliderContainer}
                    // style the track itself
                    trackStyle={styless.trackStyle}
                    minimumTrackTintColor="#0076ec" // filled rail to the left  [oai_citation:0‡GitHub](https://github.com/miblanchard/react-native-slider)
                    maximumTrackTintColor="#ccc" // empty rail to the right  [oai_citation:1‡GitHub](https://github.com/miblanchard/react-native-slider)
                    // enlarge & color the thumb
                    thumbStyle={styless.sliderThumb}
                    thumbTintColor="#0076ec" // fallback color  [oai_citation:2‡GitHub](https://github.com/miblanchard/react-native-slider)
                    thumbTouchSize={{ width: 40, height: 40 }} // bigger hit area  [oai_citation:3‡GitHub](https://github.com/miblanchard/react-native-slider)
                    // range & stepping
                    minimumValue={250}
                    maximumValue={280}
                    step={1}
                    // controlled value
                    value={maxValue}
                    onValueChange={setMaxValue}
                />
                <Text style={{ color: 'white', fontWeight: 400 }}>
                    {maxValue}
                </Text>
            </View>

            <View
                style={{
                    backgroundColor: 'black',
                    borderRadius: 10,
                    display: 'flex',
                }}
            >
                <Text style={{ color: 'white', marginBottom: 8, fontSize: 16 }}>
                    Red Zone
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'center',
                    }}
                >
                    <TextInput
                        value={redStart}
                        onChangeText={onChangeStart}
                        placeholder="Start"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        style={[styless.textInput, { marginRight: 50 }]}
                    />
                    <TextInput
                        value={redEnd}
                        onChangeText={onChangeEnd}
                        placeholder="End"
                        placeholderTextColor="#888"
                        keyboardType="numeric"
                        style={styless.textInput}
                    />
                </View>
            </View>
        </View>
    );
};

const GaugeLabels = () => {
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Labels</Text>

            {/* row container for side-by-side buttons */}
            <View style={styles.buttonRow}>
                <Text style={{ color: 'white' }}>Unit Display</Text>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-around',
                        width: 100,
                        // borderWidth: 1,
                        // borderColor: 'red',
                    }}
                >
                    <Button
                        title="C"
                        onPress={() => {
                            /*…*/
                        }}
                    />
                    <Button
                        title="F"
                        onPress={() => {
                            /*…*/
                        }}
                    />
                </View>
            </View>
            <View style={styles.buttonRow}>
                <Text style={{ color: 'white' }}>Other</Text>
                <Button
                    title="other"
                    onPress={() => {
                        /*…*/
                    }}
                />
            </View>
        </View>
    );
};

export default function GaugesScreen() {
    const [range, setRange] = useState(0);
    const [needleSize, setNeedleSize] = useState(3); // 2/3/5
    const [gaugeType, setGaugeType] = useState('SimpleGauge');

    const updateRange = (val: number) => {
        setRange(val);
    };
    const updateNeedleSize = (val: number) => {
        setNeedleSize(val);
    };
    const updateGaugeType = (type: string) => {
        setGaugeType(type);
    };
    console.log(needleSize);
    return (
        <SafeAreaView
            style={{
                flex: 1, // fill the whole screen
                justifyContent: 'center', // center children vertically
                alignItems: 'center',
            }}
        >
            <View
                style={{
                    width: 300, // your fixed width
                    justifyContent: 'center', // center inner items vertically within this box
                    alignItems: 'center', // center inner items horizontally within this box
                }}
            >
                <GaugeComponent needleSize={needleSize} GaugeType={gaugeType} />
                <GaugeStyle updateGaugeType={updateGaugeType} />
                <NeedleStyle
                    updateNeedleSize={updateNeedleSize}
                    active={gaugeType}
                />
                <GaugeRange updateRange={updateRange} />
                <GaugeLabels />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    card: {
        width: 300,
        // height: 100,
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    label: {
        color: 'white',
    },
    buttonRow: {
        flexDirection: 'row', // lay children out horizontally
        justifyContent: 'space-around', // distribute space evenly
        alignItems: 'center', // vertically center buttons
        marginTop: 8, // a bit of breathing room under the text
    },
});
