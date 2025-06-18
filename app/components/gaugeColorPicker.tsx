import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Context as DataContext } from '../context/dataContext';

const COLOR_OPTIONS = [
    '#ff1a1a', // BMW Classic Red
    '#3399ff', // VW Blue
    '#ffbf00', // Lexus Amber
    '#00ccff', // Subaru Ice Blue
    '#000000',
    '#ffffff', // Porsche White
    '#ff0000', // Dodge Red
];

type colorProps = {
    label: string;
    onPress: (key: string, color: string) => void;
    active: string;
    key: string;
};
type Props = {
    updateColor: (key: string, color: string) => void;
    backgroundColor: string;
    fontColor: string;
};

const ColorSwatchRow = ({ label, active, key, onPress }: colorProps) => (
    <View style={styles.rowContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.swatchRow}>
            {COLOR_OPTIONS.map((color) => (
                <TouchableOpacity
                    key={color}
                    onPress={() => onPress(key, color)}
                    style={[
                        styles.swatch,
                        {
                            backgroundColor: color,
                            borderWidth: active === color ? 3 : 0,
                        },
                    ]}
                />
            ))}
        </View>
    </View>
);

const GaugeColorPicker = ({
    updateColor,
    backgroundColor,
    fontColor,
}: Props) => {
    const handlePress = (key: string, color: string) => {
        // updateColor(key, color);
        // console.log(backgroundColor, fontColor);
    };

    return (
        <View style={styles.container}>
            <ColorSwatchRow
                label="Background color"
                key="backgroundColor"
                onPress={handlePress}
                active={backgroundColor}
            />
            <ColorSwatchRow
                label="Font color"
                key="fontColor"
                onPress={handlePress}
                active={fontColor}
            />
        </View>
    );
};

export default GaugeColorPicker;

const styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: '#0006',
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    rowContainer: {
        marginTop: 10,
    },
    label: {
        color: 'white',
    },
    swatchRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginTop: 10,
    },
    swatch: {
        height: 36,
        width: 36,
        borderRadius: 18,
        borderColor: 'yellow',
    },
});
