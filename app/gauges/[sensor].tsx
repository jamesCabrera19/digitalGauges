import { useState, useReducer, useContext } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TextInput,
    ScrollView,
} from 'react-native';
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
        updateData,
        updateRange,
        updateNeedleSize,
        updateGaugeType,
        updateUnitDisplay,
        handleReset,
    } = useContext(DataContext);

    const saveChanges = () => console.log({ sensor, ...state });

    return (
        <ScrollView
            contentContainerStyle={styles.scrollContent}
            style={styles.screen}
        >
            {/* <Text style={styles.label}>
                {sensor.replace('-', ' ').toUpperCase()} Gauge sss
            </Text> */}

            <View style={styles.container}>
                <Gauges
                    needleSize={state.needleSize}
                    gaugeType={state.gaugeType}
                    fontWeight={400}
                    unit={state.unit}
                    backgroundColor={state.backgroundColor}
                    fontColor={state.fontColor}
                />

                <GaugeStyle updateGaugeType={updateGaugeType} />

                <GaugeNeedle
                    updateNeedleSize={updateNeedleSize}
                    active={state.gaugeType}
                />

                <GaugeColorPicker
                    backgroundColor={state.backgroundColor}
                    fontColor={state.fontColor}
                    updateColor={updateData}
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
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    scrollContent: {
        flexGrow: 1, // allows content to grow beyond the viewport
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16, // optional padding around your content
    },
    screen: {
        flex: 1,
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
