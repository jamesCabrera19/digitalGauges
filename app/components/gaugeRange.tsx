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

type GaugeRangeProps = {
    updateRange: (newRange: Range) => void;
};
interface Range {
    min: number;
    max: number;
}

const GaugeRange = ({ updateRange }: GaugeRangeProps) => {
    // min and max values
    const [minValue, setMinValue] = useState(0); // min value Range
    const [maxValue, setMaxValue] = useState(100); // max value Range

    const data = [
        {
            title: 'Min',
            startValue: 0,
            endingValue: 250,
        },
        {
            title: 'Max',
            startValue: 100,
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

    const handleValueChange = (value: number, type: string) => {
        if (type === 'Min') {
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
                const value = title === 'Min' ? minValue : maxValue;

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

export default GaugeRange;
