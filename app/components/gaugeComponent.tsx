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
};

type defaultProps = {
    currentVal: number;
    minVal: number;
    maxVal: number;
    needleSize: number;
};
// shared // shared
type roundGaugeProps = {
    currentVal: number;
    fontWeight: number;
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

const ArcGauge = () => {
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
                    fill: '#e0e0e0', // grey reference arc
                },
                // foreground (value) arc
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#0076ec', // green value arc
                },
                // target the center-value <text> element
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: '32px', // make the number bigger
                    fill: '#333', // (optional) change color
                    fontWeight: fontWeight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};
const RoundGauge = ({ currentVal, fontWeight }: roundGaugeProps) => {
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
                // target the center-value <text> element
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: '32px', // make the number bigger
                    fill: '#333', // (optional) change color
                    fontWeight: fontWeight, // (optional) make it semibold
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                },
            }}
        />
    );
};

const SimpleGauge = ({ currentVal, fontWeight }: roundGaugeProps) => {
    return (
        <View
            style={{
                width: 200,
                height: 200,
                borderRadius: 100,
                backgroundColor: 'black',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Text
                style={{
                    fontWeight: fontWeight,
                    fontSize: 40,
                    color: 'white',
                    fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
                }}
            >
                {currentVal}
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
}: GaugePointerProps) => {
    // const needleSize = 5; // 2,3,5
    const currentVal = 220;
    const minVal = 0;
    const maxVal = 280;

    const gaugePicker = (gaugeType: string) => {
        switch (gaugeType.toLocaleLowerCase()) {
            case 'arc':
                return <ArcGauge />;
            case 'round':
                return <RoundGauge currentVal={currentVal} />;
            case 'simple':
                return <SimpleGauge />;
            default:
                return <DefaultGauge />;
        }
    };

    return <View>{gaugePicker(GaugeType)}</View>;
};

export default GaugeComponent;
