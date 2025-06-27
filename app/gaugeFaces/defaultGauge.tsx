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
    minVal: number;
    maxVal: number;
    needleSize: number;
    colors: string[];
    temperature: number;
};
type gaugePointerProps = {
    needleSize: number;
    color: string;
};

const GaugePointer = ({ needleSize, color }: gaugePointerProps) => {
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
            <circle cx={cx} cy={cy} r={5} fill={color} />
            <path
                d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                stroke={color}
                strokeWidth={needleSize}
            />
        </g>
    );
};

const DefaultGauge = ({
    minVal,
    maxVal,
    needleSize,
    colors,
    temperature,
}: defaultProps) => {
    const [backgroundColor, secondaryColor, fontColor] = colors;

    return (
        <GaugeContainer
            width={200}
            height={200}
            startAngle={-100}
            endAngle={100}
            value={temperature}
            valueMin={minVal}
            valueMax={maxVal}
            // innerRadius="65%" // thickness of the gauge
            // outerRadius="80%"
            // cornerRadius="0%" // round or sharp edges
        >
            <GaugeReferenceArc style={{ fill: secondaryColor }} />
            <GaugeValueArc style={{ fill: backgroundColor }} />
            <GaugePointer needleSize={needleSize} color={fontColor} />
        </GaugeContainer>
    );
};

export default DefaultGauge;
