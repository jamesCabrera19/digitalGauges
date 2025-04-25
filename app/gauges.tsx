import { View, Text } from 'react-native';

const Gauge = () => {
    return (
        <View>
            <Text>Gauge or current face goes here</Text>
        </View>
    );
};

const GaugeStyle = () => {
    return (
        <View>
            <Text>gauge style choices: ROUND, ARC, BAR </Text>
        </View>
    );
};
const NeedleStyle = () => {
    return (
        <View>
            <Text>gauge needle choices: THIN, THICK, CUSTOM? </Text>
        </View>
    );
};

const GaugeRange = () => {
    return (
        <View>
            <Text>gauge range choice: </Text>
            <Text>
                MIN: color (dark, custom)?, 100?, MAX: 240 color (dark, custom)?
            </Text>
            <Text>RED ZONE: 220-260?</Text>
        </View>
    );
};

const GaugeLabels = () => {
    return (
        <View>
            <Text> labels? true || false</Text>
            <Text> Unit display? F or C</Text>
        </View>
    );
};

export default function GaugesScreen() {
    return (
        <View>
            <Gauge />
            <GaugeStyle />
            <NeedleStyle />
            <GaugeRange />
            <GaugeLabels />
        </View>
    );
}
