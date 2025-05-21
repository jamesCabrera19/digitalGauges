import { View, Text, Button, StyleSheet, TextInput } from 'react-native';
import {
    GaugeContainer,
    GaugeValueArc,
    GaugeReferenceArc,
    useGaugeState,
    Gauge,
    gaugeClasses,
} from '@mui/x-charts/Gauge';

type defaultProps = {
    currentVal: number;
    minVal: number;
    maxVal: number;
    needleSize: number;
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

export default DefaultGauge;
