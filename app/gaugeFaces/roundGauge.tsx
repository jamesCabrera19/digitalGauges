import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,
    Gauge,
    gaugeClasses,
} from '@mui/x-charts/Gauge';

type gaugeProps = {
    temperature: number;
    needleSize: number;
};

const RoundGauge = ({ temperature, needleSize }: gaugeProps) => {
    let weight = 400;
    if (needleSize === 2) {
        weight = 100;
    } else if (needleSize === 3) {
        weight = 500;
    } else {
        weight = 600;
    }
    return (
        <Gauge
            width={200}
            height={200}
            value={temperature}
            valueMin={10}
            valueMax={280}
            startAngle={-180}
            endAngle={260}
            text={({ value }) => `${value}`}
            sx={{
                [`& .${gaugeClasses.valueText} text`]: {
                    fontSize: '32px', // make the number bigger
                    fill: '#FFF', // (optional) change color
                    fontWeight: weight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

export default RoundGauge;
