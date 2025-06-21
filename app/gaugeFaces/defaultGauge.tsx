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
    colors: string[];
};

const GaugePointer = ({ needleSize, colors }: gaugePointerProps) => {
    const { valueAngle, outerRadius, cx, cy } = useGaugeState();

    if (valueAngle === null) {
        // No value to display
        return null;
    }

    const target = {
        x: cx + outerRadius * Math.sin(valueAngle),
        y: cy - outerRadius * Math.cos(valueAngle),
    };
    const [stem, root] = colors;
    return (
        <g>
            <circle cx={cx} cy={cy} r={5} fill={root} />
            <path
                d={`M ${cx} ${cy} L ${target.x} ${target.y}`}
                stroke={stem}
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
    const [backgroundColor, secondaryColor] = colors;

    return (
        <GaugeContainer
            width={200}
            height={200}
            startAngle={-100}
            endAngle={100}
            value={temperature}
            valueMin={minVal}
            valueMax={maxVal}
            innerRadius="65%" // thickness of the gauge
            outerRadius="80%"
            cornerRadius="0%" // round or sharp edges
            sx={(theme) => ({
                [`& .${gaugeClasses.valueText}`]: {
                    fontSize: 40,
                },
                [`& .${gaugeClasses.valueArc}`]: {
                    fill: '#52b202',
                },
                [`& .${gaugeClasses.referenceArc}`]: {
                    fill: theme.palette.text.disabled,
                },
            })}
        >
            <GaugeReferenceArc style={{ fill: secondaryColor }} />
            <GaugeValueArc style={{ fill: backgroundColor }} />
            <GaugePointer needleSize={needleSize} colors={['red', 'green']} />
        </GaugeContainer>
    );
};

export default DefaultGauge;
