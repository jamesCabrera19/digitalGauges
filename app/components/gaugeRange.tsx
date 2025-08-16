import { useEffect, useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

import { Slider } from '@miblanchard/react-native-slider';
import MultiSlider from '@ptomasroos/react-native-multi-slider';

import { SafeAreaView } from 'react-native-safe-area-context';

interface DangerZoneRange {
    min: number;
    max: number;
    current: number;
}
type GaugeRangeProps = {
    updateRange: (value: number) => void;
    range: number;
    unit: string;
};

const MIN = 200;
const MAX = 325;

// helper functions

const fToC = (f: number) => Math.round(((f - 32) * 5) / 9);
const cToF = (c: number) => Math.round((c * 9) / 5 + 32);

const GaugeRange = ({ updateRange, range, unit }: GaugeRangeProps) => {
    const [currentValue, setCurrentValue] = useState(250);
    const [state, setState] = useState<DangerZoneRange>({
        min: 200,
        max: 325,
        current: 250,
    });

    const handleEndSliderDrag = (value: any) => {
        const val = Array.isArray(value) ? value[0] : 250;
        updateRange(val);
    };

    useEffect(() => {
        const currentTemp = (value: number) => {
            if (unit === 'C') {
                return Math.floor(((value - 32) * 5) / 9);
            }
            return value;
        };
        const min = currentTemp(200);
        const max = currentTemp(325);
        const current = currentTemp(range);

        setState((prev) => ({ current, min, max }));
    }, [unit, range]);

    console.log('range: ', range);

    return (
        <View style={styles.card}>
            <Text style={styles.label}>Danger Zone Limit</Text>

            <View style={styles.buttonRow}>
                <Text style={styles.text}>{state.min}</Text>
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
                    minimumValue={200}
                    maximumValue={325}
                    step={1}
                    // controlled value
                    value={currentValue}
                    // on change
                    onValueChange={(value) => {
                        setCurrentValue(
                            Array.isArray(value) ? value[0] : value
                        );
                    }}
                    // on complete
                    onSlidingComplete={(value) => handleEndSliderDrag(value)}
                />
                <Text style={styles.text}>{state.max}</Text>
            </View>

            <View style={styles.textBox}>
                <View style={styles.box}>
                    <Text style={styles.text}>{state.current}</Text>
                </View>
            </View>
        </View>
    );
};
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
        fontWeight: '400',
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

export default GaugeRange;
