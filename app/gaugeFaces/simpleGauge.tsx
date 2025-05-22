import { useState } from 'react';
import { View, Text, Button, StyleSheet, TextInput } from 'react-native';

type gaugeProps = {
    currentValue: number;
    backgroundColor: string;
    fontColor: string;
    fontWeight: number;
    fontSize: number;
    unit: string;
    needleSize: number; // 2,3,5
};

const SimpleGauge = ({
    backgroundColor,
    fontColor,
    fontSize,
    fontWeight,
    currentValue,
    unit,
    needleSize,
}: gaugeProps) => {
    let font = 400;
    if (needleSize === 2) {
        font = 100;
    } else if (needleSize === 3) {
        font = 500;
    } else {
        font = 600;
    }
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
                    fontWeight: font,
                    fontSize: fontSize,
                    color: fontColor,
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                }}
            >
                {currentValue}° {unit}
            </Text>
        </View>
    );
};

export default SimpleGauge;
