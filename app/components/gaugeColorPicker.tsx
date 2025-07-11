import React, { useContext, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { Context as DataContext } from '../context/dataContext';

const COLOR_OPTIONS = [
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
            <Text style={styles.label}>{label}</Text>
            <View style={styles.swatchRow}>
                {COLOR_OPTIONS.map((color) => (
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
                ))}
            </View>
        </View>
    );
};

const GaugeColorPicker = ({ updateColor, colors, gaugeFace }: Props) => {
    const handlePress = (colorKey: string, color: string) => {
        updateColor(colorKey, color);
    };

    const [backgroundColor, fontColor, secondaryColor] = colors;

    //
    const [selectedTarget, setSelectedTarget] = useState<
        'background' | 'foreground' | 'text'
    >('background');

    const [themeColors, setThemeColors] = useState({
        background: backgroundColor,
        foreground: secondaryColor,
        text: fontColor,
    });

    const handleColorChange = (target: string, color: string) => {
        console.log(target);
        setThemeColors((prev) => ({ ...prev, [target]: color }));
    };

    //

    return (
        <View style={styles.container}>
            {/*  */}
            <View
                style={{
                    flexDirection: 'row', // lay children out horizontally
                    justifyContent: 'space-around', // distribute space evenly
                    alignItems: 'center', // vertically center buttons
                    marginTop: 8, // a bit of breathing room under the text
                }}
            >
                <Button
                    title="Background"
                    onPress={() => handleColorChange('background', 'red')}
                    // disabled={state ? false : true}
                />
                <Button
                    title="Foreground"
                    onPress={() => handleColorChange('foreground', 'green')}
                    // disabled={state ? false : true}
                />
                <Button
                    title="Font Color"
                    onPress={() => handleColorChange('text', 'blue')}
                    // disabled={state ? false : true}
                />
            </View>
            <Text style={{ color: themeColors.background }}>
                {themeColors.background}
            </Text>
            <Text style={{ color: themeColors.foreground }}>
                {themeColors.foreground}
            </Text>
            <Text style={{ color: themeColors.text }}>{themeColors.text} </Text>

            {/*  */}
            <ColorSwatchRow
                label="Progress color"
                colorKey="backgroundColor"
                onPress={handlePress}
                active={backgroundColor}
            />
            {gaugeFace.toLowerCase() !== 'simple' ? (
                <ColorSwatchRow
                    label="Background color"
                    colorKey="secondaryColor"
                    onPress={handlePress}
                    active={secondaryColor}
                />
            ) : null}
            <ColorSwatchRow
                label={
                    gaugeFace.toLowerCase() === 'default'
                        ? 'Pointer Color'
                        : 'Font color'
                }
                colorKey="fontColor"
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
