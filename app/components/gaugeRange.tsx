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
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { SafeAreaView } from 'react-native-safe-area-context';

interface Range {
    min: number;
    max: number;
}
type GaugeRangeProps = {
    updateRange: (value: number) => void;
    range: Range;
};

const RangeSlider = () => {
    const [range, setRange] = useState([220, 260]);

    const styles = StyleSheet.create({
        container: {
            backgroundColor: 'black',
            borderRadius: 10,
            display: 'flex',
        },
        label: {
            marginBottom: 20,
            fontSize: 16,
            color: 'white',
            fontWeight: 400,
        },
        sliderContainer: {
            height: 40,
        },
        trackStyle: {
            height: 1,
            borderRadius: 5,
        },
        thumbStyle: {
            width: 20,
            height: 20,
            borderRadius: 12,
            backgroundColor: '#fff',
            borderWidth: 0,
            borderColor: '#0076ec',
        },
        textBox: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: 10,
        },
        box: {
            height: 40,
            width: 40,
            borderRadius: 10,
            backgroundColor: '#333',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    console.log(range);
    return (
        <View style={styles.container}>
            <Text style={[styles.label]}>Danger Zone Limit</Text>
            <MultiSlider
                values={range}
                onValuesChangeFinish={(values) => setRange(values)}
                min={200}
                max={320}
                step={1}
                sliderLength={280}
                selectedStyle={{ backgroundColor: '#0076ec' }}
                unselectedStyle={{ backgroundColor: '#ccc' }}
                containerStyle={styles.sliderContainer}
                trackStyle={styles.trackStyle}
                customMarker={() => <View style={styles.thumbStyle} />}
            />
            <View style={styles.container}>
                <View style={styles.textBox}>
                    <View style={styles.box}>
                        <Text style={styles.label}>{range[0]}</Text>
                    </View>
                    <View style={styles.box}>
                        <Text style={styles.label}>{range[1]}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

const GaugeRange = ({ updateRange, range }: GaugeRangeProps) => {
    const [currentValue, setCurrentValue] = useState(250);

    const data = [
        {
            title: 'Max',
            startValue: 250,
            endingValue: 300,
        },
    ];
    const styles = StyleSheet.create({
        label: {
            color: 'white',
        },
        buttonRow: {
            flexDirection: 'row', // lay children out horizontally
            justifyContent: 'space-around', // distribute space evenly
            alignItems: 'center', // vertically center buttons
            marginTop: 8, // a bit of breathing room under the text
        },
        card: {
            width: 300,
            backgroundColor: 'black',
            borderRadius: 10,
            padding: 10,
            margin: 10,
        },
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
        thumbTouchSize: {
            width: 40,
            height: 40,
        },
        // text text
        text: {
            color: 'white',
            fontWeight: 400,
        },
        // red zone
        container: {
            backgroundColor: 'black',
            borderRadius: 10,
            display: 'flex',
        },
        textBox: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignItems: 'center',
            margin: 10,
        },
        box: {
            height: 40,
            width: 40,
            borderRadius: 10,
            backgroundColor: '#333',
            alignItems: 'center',
            justifyContent: 'center',
        },
    });

    const handleValueChange = () => {
        updateRange(currentValue);
    };
    return (
        <View style={styles.card}>
            <Text style={styles.label}>Danger Zone Limit</Text>

            {data.map(({ title, startValue, endingValue }) => {
                return (
                    <View style={styles.buttonRow} key={title}>
                        <Text style={styles.text}>{startValue}</Text>
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
                            value={currentValue}
                            onValueChange={(raw) => {
                                // raw: number | number[]
                                // const num = Array.isArray(raw) ? raw[0] : raw;
                                setCurrentValue(
                                    Array.isArray(raw) ? raw[0] : raw
                                );

                                handleValueChange();
                            }}
                        />
                        <Text style={styles.text}>{endingValue}</Text>
                    </View>
                );
            })}

            <View style={styles.container}>
                {/* <Text style={[styles.text, { fontSize: 16 }]}>
                    Red Zone Range
                </Text> */}
                <View style={styles.textBox}>
                    {/* <View style={styles.box}>
                        <Text style={styles.text}>{minValue}</Text>
                    </View> */}
                    <View style={styles.box}>
                        <Text style={styles.text}>{currentValue}</Text>
                    </View>
                </View>
            </View>
            {/* <RangeSlider /> */}
        </View>
    );
};

export default GaugeRange;
