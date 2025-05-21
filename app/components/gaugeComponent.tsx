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

type GaugePointerProps = {
    needleSize: number; // needle size
    GaugeType: string;
    fontWeight: number;
    primaryColor: string; // not implemented -- bar color?
    secondaryColor: string; // not implemented -- needle color?
    unit: string;
};

type defaultProps = {
    currentVal: number;
    minVal: number;
    maxVal: number;
    needleSize: number;
};
// shared // shared
type gaugeProps = {
    currentVal: number;
    fontWeight: number;
};
type simpleGaugeProps = {
    currentValue: number;
    backgroundColor: string;
    fontColor: string;
    fontWeight: number;
    fontSize: number;
    unit: string;
};
const GaugePointer = ({ needleSize }: { needleSize: number }) => {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
        // No value to display
        return null;
    }

    const target = {
        x: cx + outerRadius * Math.sin(valueAngle),
        y: cy - outerRadius * Math.cos(valueAngle),
    };
    return (
        <g>
            <circle cx={cx} cy={cy} r={5} fill="red" />
            <path
                d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                stroke="red"
                strokeWidth={needleSize}
            />
        </g>
    );
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

const SimpleGauge = ({
    backgroundColor,
    fontColor,
    fontSize,
    fontWeight,
    currentValue,
    unit,
}: simpleGaugeProps) => {
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
                    fontWeight: fontWeight,
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

const DefaultGauge = ({
    currentVal,
    minVal,
    maxVal,
    needleSize,
}: defaultProps) => {
    return (
        <GaugeContainer
            width={200}
            height={200}
            startAngle={-110}
            endAngle={110}
            value={currentVal}
            valueMin={minVal} // define your range
            valueMax={maxVal}
        >
            <GaugeReferenceArc />
            <GaugeValueArc />
            <GaugePointer needleSize={needleSize} />
        </GaugeContainer>
    );
};

const GaugeComponent = ({
    needleSize,
    GaugeType,
    fontWeight,
    unit,
}: GaugePointerProps) => {
    // const needleSize = 5; // 2,3,5
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
                        fontColor="white"
                        fontSize={40}
                        backgroundColor="black"
                        unit={unit}
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

export default GaugeComponent;
