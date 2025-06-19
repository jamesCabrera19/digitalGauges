import { useState, useContext } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import { Context as DataContext } from '../context/dataContext';
import RoundGauge from '../gaugeFaces/roundGauge';
import SimpleGauge from '../gaugeFaces/simpleGauge';
import ArcGauge from '../gaugeFaces/arcGauge';
import DefaultGauge from '../gaugeFaces/defaultGauge';

type GaugeProps = {
    needleSize: number;
    gaugeType: string;
    unit: 'C' | 'F';
    backgroundColor: string;
    fontColor: string;
    range: { min: number; max: number };
};

const Gauges = ({
    needleSize,
    gaugeType,
    unit,
    backgroundColor,
    fontColor,
    range,
}: GaugeProps) => {
    const currentVal = 220;
    const minVal = 0;
    const maxVal = 280;

    const currentTemp = unit === 'F' ? currentVal : (currentVal - 32) * (5 / 9);

    const roundToTwo = (n: number) => Math.round(n * 100) / 100;

    const getPercentageTemp = (start: number, max: number, current: number) => {
        return Math.round(((current - start) / (max - start)) * 100);
    };
    // temp variable name
    const TEMP = getPercentageTemp(range.min, range.max, currentTemp);

    switch (gaugeType.toLowerCase()) {
        case 'arc':
            return (
                <ArcGauge
                    temperature={TEMP}
                    needleSize={needleSize}
                    colors={[backgroundColor, fontColor]}
                />
            );
        case 'round':
            return (
                <RoundGauge temperature={currentTemp} needleSize={needleSize} />
            );
        case 'simple':
            return (
                <SimpleGauge
                    temperature={roundToTwo(currentTemp)}
                    fontColor={fontColor}
                    backgroundColor={backgroundColor}
                    unit={unit}
                    needleSize={needleSize}
                />
            );
        default:
            return (
                <DefaultGauge
                    currentVal={currentTemp}
                    minVal={minVal}
                    maxVal={maxVal}
                    needleSize={needleSize}
                />
            );
    }
};
export default Gauges;
