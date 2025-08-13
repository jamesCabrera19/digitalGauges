import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Context as DataContext } from '../context/dataContext';

const AVAILABLE_GAUGE_COLORS = [
    '#ff1a1a', // BMW Classic Red
    '#3399ff', // VW Blue
    '#ffbf00', // Lexus Amber
    '#00ccff', // Subaru Ice Blue
    '#000000',
    '#ffffff', // Porsche White
    '#ff0000', // Dodge Red
];

type ColorSwatchRowProps = {
    label: string;
    onPress: (key: string, color: string) => void;
    active: string;
    colorKey: string;
};

type GaugeColorPickerProps = {
    updateColor: (key: string, color: string) => void;
    colors: string[];
    gaugeFace: string;
};

type ColorSwatchProps = {
    color: string;
};

const ColorSwatchRow = ({
    label,
    active,
    colorKey,
    onPress,
}: ColorSwatchRowProps) => {
    const ColorSwatch = ({ color }: ColorSwatchProps) => (
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

    return (
        <View style={styles.rowContainer}>
            <Text style={styles.label}>{label}</Text>
            <View style={styles.swatchRow}>
                {AVAILABLE_GAUGE_COLORS.map((color) => (
                    <ColorSwatch color={color} />
                ))}
            </View>
        </View>
    );
};

const GaugeColorPicker = ({
    updateColor,
    colors,
    gaugeFace,
}: GaugeColorPickerProps) => {
    const handleColorSelection = (colorKey: string, color: string) => {
        updateColor(colorKey, color);
    };

    const [state, setState] = useState({
        label: 'Foreground color',
        key: 'backgroundColor',
        activeColor: 'red',
    });

    const [foregroundColorValue, backgroundColorValue, textColorValue] = colors;

    const colorOptions = [
        {
            label: 'Foreground color',
            key: 'backgroundColor',
            activeColor: foregroundColorValue,
        },
        {
            label: 'Background color',
            key: 'secondaryColor',
            activeColor: backgroundColorValue,
        },
        {
            label: gaugeFace === 'Default' ? 'Pointer color' : 'Font color',
            key: 'fontColor',
            activeColor: textColorValue,
        },
    ];

    const handlePress = (key: string) => {
        setState(colorOptions.filter((el) => el.key === key)[0]);
    };

    console.log(state);
    return (
        <View style={styles.container}>
            {/* <ColorSwatchRow
                label={state.label}
                colorKey={state.key}
                active={state.activeColor}
                onPress={handleColorSelection}
            /> */}

            {colorOptions.map((option) => (
                <>
                    <TouchableOpacity
                        onPress={() => handlePress(option.key)}
                        style={{
                            borderWidth: 1,
                            borderColor: 'white',
                            padding: 5,
                            backgroundColor: 'skyblue',
                        }}
                    >
                        <Text style={{ color: 'white' }}>{option.label}</Text>
                    </TouchableOpacity>
                </>
            ))}
            <ColorSwatchRow
                label={state.label}
                colorKey={state.key}
                active={state.activeColor}
                onPress={handleColorSelection}
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
        height: 30,
        width: 30,
        borderRadius: 18,
        borderColor: 'yellow',
    },
});
