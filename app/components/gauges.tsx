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
};

const Gauges = ({
    needleSize,
    gaugeType,
    unit,
    backgroundColor,
    fontColor,
}: GaugeProps) => {
    const currentVal = 220;
    const minVal = 0;
    const maxVal = 280;

    const toDisplay = unit === 'F' ? currentVal : (currentVal - 32) * (5 / 9);

    const roundToTwo = (n: number) => Math.round(n * 100) / 100;

    switch (gaugeType.toLowerCase()) {
        case 'arc':
            return <ArcGauge temperature={toDisplay} needleSize={needleSize} />;
        case 'round':
            return (
                <RoundGauge temperature={toDisplay} needleSize={needleSize} />
            );
        case 'simple':
            return (
                <SimpleGauge
                    temperature={roundToTwo(toDisplay)}
                    fontColor={fontColor}
                    backgroundColor={backgroundColor}
                    unit={unit}
                    needleSize={needleSize}
                />
            );
        default:
            return (
                <DefaultGauge
                    currentVal={toDisplay}
                    minVal={minVal}
                    maxVal={maxVal}
                    needleSize={needleSize}
                />
            );
    }
};
export default Gauges;
