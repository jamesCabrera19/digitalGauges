import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
//
import GaugeLabels from './components/gaugeLabels';
import GaugeComponent from './components/gaugeComponent';
import GaugeStyle from './components/gaugeStyle';
import GaugeNeedle from './components/gaugeNeedle';
import GaugeRange from './components/gaugeRange';
import GaugeUnitComponent from './components/gaugeUnitComponent';

interface Range {
    min: number;
    max: number;
}

export default function GaugesScreen() {
    const [range, setRange] = useState<Range>({ min: 0, max: 0 });
    const [needleSize, setNeedleSize] = useState(3); // 2/3/5
    const [gaugeType, setGaugeType] = useState('SimpleGauge');
    const [unit, setUnit] = useState('F');

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
        setUnit(tempUnit);
    };
    const saveChanges = () => {
        const data = {
            range,
            needleSize,
            gaugeType,
            unit,
            colors: 'colors',
            other: 'other',
        };
        // send data to local store state.
        // saveData(data) => sendData()=> readData()=> displayData()
        console.log(data);
    };
    const handleReset = () => {
        const resetGauge = { min: 0, max: 0 };
        const resetNeedleSize = 3;
        const resetGaugeType = 'SimpleGauge';
        const resetUnit = 'F';

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
                <GaugeNeedle
                    updateNeedleSize={updateNeedleSize}
                    active={gaugeType}
                />
                <GaugeRange updateRange={updateRange} />
                <GaugeLabels updateUnit={updateUnitDisplay} />

                <GaugeUnitComponent reset={handleReset} save={saveChanges} />
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    screen: {
        flex: 1,
<<<<<<< Updated upstream
<<<<<<< Updated upstream
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#25292e",
    },
    screenContainer: {
        width: 300, // your fixed width
        justifyContent: "center", // center inner items vertically within this box
        alignItems: "center", // center inner items horizontally within this box
        backgroundColor: "#292e34",
        borderRadius: 10,
=======
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenContainer: {
        width: 300, // your fixed width
        justifyContent: 'center', // center inner items vertically within this box
        alignItems: 'center', // center inner items horizontally within this box
>>>>>>> Stashed changes
=======
        justifyContent: 'center',
        alignItems: 'center',
    },
    screenContainer: {
        width: 300, // your fixed width
        justifyContent: 'center', // center inner items vertically within this box
        alignItems: 'center', // center inner items horizontally within this box
>>>>>>> Stashed changes
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
    buttonRow: {
        flexDirection: 'row', // lay children out horizontally
        justifyContent: 'space-around', // distribute space evenly
        alignItems: 'center', // vertically center buttons
        marginTop: 8, // a bit of breathing room under the text
    },
});
