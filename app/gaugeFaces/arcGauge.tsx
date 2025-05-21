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

// shared // shared
type gaugeProps = {
    currentVal: number;
    fontWeight: number;
};

const ArcGauge = ({ fontWeight }: gaugeProps) => {
    return (
        <Gauge
            width={200}
            height={200}
            value={50}
            startAngle={-90}
            endAngle={90}
            text={({ value }) => `${value}`}
            sx={{
                // background (reference) arc
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: '#e0e0e0', // white part,(right)
                },
                // foreground (value) arc
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#0076ec', // green value arc (left)
                },
                // target the center-value <text> element
                [`& .${gaugeClasses.valueText} text`]: {
                    fontSize: '32px', // make the number bigger
                    fill: '#fff',
                    fontWeight: fontWeight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

export default ArcGauge;
