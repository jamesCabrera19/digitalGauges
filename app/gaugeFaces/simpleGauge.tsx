import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

type gaugeProps = {
    temperature: number;
    backgroundColor: string;
    fontColor: string;
    unit: string;
    needleSize: number; // 2,3,5
    colors: string[];
};

const SimpleGauge = ({ temperature, unit, needleSize, colors }: gaugeProps) => {
    let weight = 400;
    if (needleSize === 2) {
        weight = 100;
    } else if (needleSize === 3) {
        weight = 500;
    } else {
        weight = 600;
    }

    const [backgroundColor, fontColor] = colors;

    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                width: 200,
                height: 200,
                borderRadius: 100,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontWeight: weight,
                    fontSize: 40,
                    color: fontColor,
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                }}
            >
                {temperature}° {unit}
            </Text>
        </View>
    );
};

export default SimpleGauge;
