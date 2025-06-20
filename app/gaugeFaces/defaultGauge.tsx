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
    const backgroundColor = '#52b202';
    const secondaryColor = '#ffbf00';
    return (
        <GaugeContainer
            width={200}
            height={200}
            startAngle={-100}
            endAngle={100}
            value={currentVal}
            valueMin={minVal}
            valueMax={maxVal}
            innerRadius="80%" // thickness of the gauge
            outerRadius="90%"
            cornerRadius="0%" // round or sharp edges
        >
            <GaugeReferenceArc />
            <GaugeValueArc />
            <GaugePointer needleSize={needleSize} />
        </GaugeContainer>
    );
};

export default DefaultGauge;
