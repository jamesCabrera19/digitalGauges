import { useState, useReducer, useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Context as DataContext } from '../context/dataContext';
//
import GaugeLabels from '../components/gaugeLabels';
import Gauges from '../components/gauges';
import GaugeStyle from '../components/gaugeStyle';
import GaugeNeedle from '../components/gaugeNeedle';
import GaugeRange from '../components/gaugeRange';
import GaugeUnitComponent from '../components/gaugeUnitComponent';
import GaugeColorPicker from '../components/gaugeColorPicker';

export default function SensorGauge() {
    const { sensor } = useLocalSearchParams<{ sensor: string }>();
    const {
        state,
        updateRange,
        updateNeedleSize,
        updateGaugeType,
        updateUnitDisplay,
        handleReset,
    } = useContext(DataContext);

    const saveChanges = () => console.log({ sensor, ...state });

    return (
        <SafeAreaView style={styles.screen}>
            <Text style={styles.label}>
                {sensor.replace('-', ' ').toUpperCase()} Gauge
            </Text>

            <View style={styles.container}>
                <Gauges
                    needleSize={state.needleSize}
                    GaugeType={state.gaugeType}
                    fontWeight={400}
                    primaryColor="red"
                    secondaryColor="blue"
                    unit={state.unit}
                    backgroundColor=""
                    fontColor=""
                />

                <GaugeStyle updateGaugeType={updateGaugeType} />

                <GaugeNeedle
                    updateNeedleSize={updateNeedleSize}
                    active={state.gaugeType}
                />
                <GaugeColorPicker />

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
        width: 350, // your fixed width

        backgroundColor: '#292e34',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 30,
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
