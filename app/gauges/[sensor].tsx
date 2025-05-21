import { useState, useReducer } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
//
import GaugeLabels from '../components/gaugeLabels';
import GaugeComponent from '../components/gaugeComponent';
import GaugeStyle from '../components/gaugeStyle';
import GaugeNeedle from '../components/gaugeNeedle';
import GaugeRange from '../components/gaugeRange';
import GaugeUnitComponent from '../components/gaugeUnitComponent';

interface Range {
    min: number;
    max: number;
}

interface Settings {
    range: Range;
    needleSize: number;
    gaugeType: string;
    unit: 'C' | 'F';
}
const initialSettings: Settings = {
    range: { min: 0, max: 0 },
    needleSize: 3,
    gaugeType: 'SimpleGauge',
    unit: 'F',
};
type Action =
    | { type: 'SET_RANGE'; payload: Range }
    | { type: 'SET_NEEDLE'; payload: number }
    | { type: 'SET_TYPE'; payload: string }
    | { type: 'SET_UNIT'; payload: 'C' | 'F' }
    | { type: 'RESET' };

function reducer(state: Settings, action: Action): Settings {
    switch (action.type) {
        case 'SET_RANGE':
            return { ...state, range: action.payload };
        case 'SET_NEEDLE':
            return { ...state, needleSize: action.payload };
        case 'SET_TYPE':
            return { ...state, gaugeType: action.payload };
        case 'SET_UNIT':
            return { ...state, unit: action.payload };
        case 'RESET':
            return initialSettings;
        default:
            return state;
    }
}

export default function SensorGauge() {
    const { sensor } = useLocalSearchParams<{ sensor: string }>();

    const [state, dispatch] = useReducer(reducer, initialSettings);

    const updateRange = (range: Range) =>
        dispatch({ type: 'SET_RANGE', payload: range });

    const updateNeedleSize = (size: number) =>
        dispatch({ type: 'SET_NEEDLE', payload: size });

    const updateGaugeType = (type: string) =>
        dispatch({ type: 'SET_TYPE', payload: type });

    const updateUnitDisplay = (unit: 'C' | 'F') =>
        dispatch({ type: 'SET_UNIT', payload: unit });

    const handleReset = () => dispatch({ type: 'RESET' });

    const saveChanges = () => console.log({ sensor, ...state });

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.label}>
                {sensor.replace('-', ' ').toUpperCase()} Gauge
            </Text>

            <View style={styles.container}>
                <GaugeComponent
                    needleSize={state.needleSize}
                    GaugeType={state.gaugeType}
                    fontWeight={400}
                    primaryColor="red"
                    secondaryColor="blue"
                    unit={state.unit}
                />

                <GaugeStyle updateGaugeType={updateGaugeType} />

                <GaugeNeedle
                    updateNeedleSize={updateNeedleSize}
                    active={state.gaugeType}
                />

                <GaugeRange updateRange={updateRange} />
                <GaugeLabels
                    updateUnit={(val) =>
                        updateUnitDisplay(val.toUpperCase() as 'C' | 'F')
                    }
                />

                <View style={styles.footer}>
                    <Button title="Reset" color="red" onPress={handleReset} />
                    <Button
                        title="Save Data"
                        color="blue"
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

        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#25292e',
    },
    container: {
        width: 300, // your fixed width

        backgroundColor: '#292e34',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: 300,
        backgroundColor: 'black',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    label: {
        color: 'white',
    },
    footer: {
        flexDirection: 'row', // lay children out horizontally
        justifyContent: 'space-around', // distribute space evenly
        alignItems: 'center', // vertically center buttons
        marginTop: 8, // a bit of breathing room under the text
    },
});
