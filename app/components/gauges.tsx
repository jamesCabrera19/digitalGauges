import { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Context as DataContext } from '../context/dataContext';
import RoundGauge from '../gaugeFaces/roundGauge';
import SimpleGauge from '../gaugeFaces/simpleGauge';
import ArcGauge from '../gaugeFaces/arcGauge';
import DefaultGauge from '../gaugeFaces/defaultGauge';

type GaugeProps = {
    needleSize: number; // needle size
    GaugeType: string;
    fontWeight: number;
    primaryColor: string; // not implemented -- bar color?
    secondaryColor: string; // not implemented -- needle color?
    unit: string;
    fontColor: string;
    backgroundColor: string;
};

const Gauges = ({ needleSize, GaugeType, fontWeight, unit }: GaugeProps) => {
    const { state } = useContext(DataContext);

    const currentVal = 220;
    const minVal = 0;
    const maxVal = 280;

    const degrees = unit == 'F' ? currentVal : (currentVal - 32) * (5 / 9);
    const roundToTwo = (num: number) => {
        return Math.round(num * 100) / 100;
    };

    const gaugePicker = (gaugeType: string) => {
        switch (gaugeType.toLocaleLowerCase()) {
            case 'arc':
                return (
                    <ArcGauge currentVal={degrees} fontWeight={fontWeight} />
                );
            case 'round':
                return (
                    <RoundGauge currentVal={degrees} fontWeight={fontWeight} />
                );
            case 'simple':
                return (
                    <SimpleGauge
                        currentValue={roundToTwo(degrees)}
                        fontWeight={fontWeight}
                        fontColor={state.fontColor}
                        fontSize={40}
                        backgroundColor={state.backgroundColor}
                        unit={unit}
                        needleSize={needleSize}
                    />
                );
            default:
                return (
                    <DefaultGauge
                        currentVal={degrees}
                        minVal={minVal}
                        maxVal={maxVal}
                        needleSize={needleSize}
                    />
                );
        }
    };

    return <View>{gaugePicker(GaugeType)}</View>;
};

export default Gauges;
