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
    range: number;
    colors: string[];
};

const Gauges = ({ needleSize, gaugeType, unit, colors, range }: GaugeProps) => {
    // Sample temperature reading in Fahrenheit
    const CURRENT_TEMPERATURE = 220;

    // Minimum and maximum values for the temperature range
    const minVal = 0;
    const maxVal = 280;

    // Convert temperature to Celsius if unit is 'C'; otherwise, use Fahrenheit as-is
    const currentTemp =
        unit === 'F'
            ? CURRENT_TEMPERATURE
            : (CURRENT_TEMPERATURE - 32) * (5 / 9);

    // Helper function to round a number to two decimal places
    const roundToTwo = (n: number) => Math.round(n * 100) / 100;

    // Calculates the percentage position of `current` between `start` and `max`
    // For example: if current is close to max, percentage approaches 100
    const getPercentageTemp = (start: number, max: number, current: number) => {
        return Math.round(((current - start) / (max - start)) * 100);
    };

    // Get the percentage representation of the current temperature
    // Useful for positioning indicators or filling progress bars
    const temperatureProgress = getPercentageTemp(minVal, maxVal, currentTemp);

    // Destructure color values from array (e.g., [background, secondary, font])
    const [backgroundColor, secondaryColor, fontColor] = colors;

    switch (gaugeType.toLowerCase()) {
        case 'arc':
            return (
                <ArcGauge
                    temperature={temperatureProgress}
                    actualTemperature={currentTemp}
                    fontWeight={needleSize}
                    colors={[backgroundColor, secondaryColor, fontColor]}
                    range={range}
                />
            );
        case 'round':
            return (
                <RoundGauge
                    temperature={currentTemp}
                    needleSize={needleSize}
                    colors={[backgroundColor, secondaryColor, fontColor]}
                    range={range}
                />
            );
        case 'simple':
            return (
                <SimpleGauge
                    temperature={roundToTwo(currentTemp)}
                    colors={[backgroundColor, fontColor]}
                    unit={unit}
                    needleSize={needleSize}
                    range={range}
                />
            );
        default:
            return (
                <DefaultGauge
                    temperature={currentTemp}
                    colors={[backgroundColor, secondaryColor, fontColor]}
                    minVal={0} // start value of gauge
                    maxVal={300} // max value of gauge
                    needleSize={needleSize}
                    range={range}
                />
            );
    }
};
export default Gauges;
