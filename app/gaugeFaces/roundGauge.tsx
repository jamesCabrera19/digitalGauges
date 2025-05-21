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
    currentVal: number;
    fontWeight: number;
};

const RoundGauge = ({ currentVal, fontWeight }: gaugeProps) => {
    return (
        <Gauge
            width={200}
            height={200}
            value={currentVal}
            valueMin={10}
            valueMax={280}
            startAngle={-180}
            endAngle={260}
            text={({ value }) => `${value}`}
            sx={{
                [`& .${gaugeClasses.valueText} text`]: {
                    fontSize: '32px', // make the number bigger
                    fill: '#FFF', // (optional) change color
                    fontWeight: fontWeight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

export default RoundGauge;
