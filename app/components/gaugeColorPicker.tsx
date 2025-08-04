import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Context as DataContext } from '../context/dataContext';

const THEME_COLORS = [
    '#ff1a1a', // BMW Classic Red
    '#3399ff', // VW Blue
    '#ffbf00', // Lexus Amber
    '#00ccff', // Subaru Ice Blue
    '#000000',
    '#ffffff', // Porsche White
    '#ff0000', // Dodge Red
    // '#ffbf00' green
];

type colorProps = {
    label: string;
    onPress: (key: string, color: string) => void;
    active: string;
    colorKey: string;
};
type Props = {
    updateColor: (key: string, color: string) => void;
    colors: string[];
    gaugeFace: string;
};

const ColorSwatchRow = ({ label, active, colorKey, onPress }: colorProps) => {
    return (
        <View style={styles.rowContainer}>
            <Text style={styles.label}> {label}</Text>
            <View style={styles.swatchRow}>
                {THEME_COLORS.map((color) => {
                    return (
                        <TouchableOpacity
                            key={color}
                            onPress={() => onPress(colorKey, color)}
                            style={[
                                styles.swatch,
                                {
                                    backgroundColor: color,
                                    borderWidth: active === color ? 3 : 0,
                                },
                            ]}
                        />
                    );
                })}
            </View>
        </View>
    );
};

const GaugeColorPicker = ({ updateColor, colors, gaugeFace }: Props) => {
    const handlePress = (colorKey: string, color: string) => {
        updateColor(colorKey, color);
    };

    const [backgroundColor, secondaryColor, fontColor] = colors;
    console.log(gaugeFace);

    const swatches = [
        {
            label: 'Foreground color',
            key: 'backgroundColor',
            activeColor: backgroundColor,
        },
        {
            label: 'Background color',
            key: 'secondaryColor',
            activeColor: secondaryColor,
        },
        {
            label: gaugeFace == 'Default' ? 'Pointer color' : 'Font color',
            key: 'fontColor',
            activeColor: fontColor,
        },
    ];

    return (
        //

        <View style={styles.container}>
            {/*  */}
            {swatches.map((el) => (
                <ColorSwatchRow
                    label={el.label}
                    colorKey={el.key}
                    active={el.activeColor}
                    onPress={handlePress}
                />
            ))}
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
