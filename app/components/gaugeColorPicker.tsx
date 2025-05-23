import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Context as DataContext } from '../context/dataContext';

const COLOR_OPTIONS = [
    '#ff1a1a', // BMW Classic Red
    '#3399ff', // VW Blue
    '#ffbf00', // Lexus Amber
    '#00ccff', // Subaru Ice Blue
    '#ffffff', // Porsche White
    '#ff0000', // Dodge Red
];
type colorProps = {
    label: string;
    onPress: (color: string) => void;
    active: string;
    keyType: string;
};
type ColorKey = 'backgroundColor' | 'fontColor';

const ColorSwatchRow = ({ label, onPress, active, keyType }: colorProps) => {
    return (
        <View style={{ marginTop: 10 }}>
            <Text style={{ color: 'white' }}>{label}</Text>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    marginTop: 10,
                }}
            >
                {COLOR_OPTIONS.map((color) => (
                    <TouchableOpacity
                        key={color}
                        onPress={() => onPress(keyType, color)}
                        style={{
                            backgroundColor: color,
                            height: 36,
                            width: 36,
                            borderRadius: 18,
                            borderWidth: active === color ? 3 : 0,
                            borderColor: 'yellow',
                        }}
                    />
                ))}
            </View>
        </View>
    );
};
const GaugeColorPicker = () => {
    const { state: data, updateData } = useContext(DataContext);

    const handlePress = (key: ColorKey, color: string) => {
        // const data: Partial<Record<ColorKey, string>> = { [key]: color };

        const data = { [key]: color };
        console.log(data);
        // updateData(data);
    };
    // console.log(data);
    return (
        <View
            style={{
                width: 300,
                backgroundColor: 'black',
                borderRadius: 10,
                padding: 10,
                margin: 10,
            }}
        >
            <ColorSwatchRow
                label="Background color"
                keyType="backgroundColor"
                onPress={handlePress}
                active={data.backgroundColor}
            />
            <ColorSwatchRow
                label="Font color"
                keyType="fontColor"
                onPress={handlePress}
                active={data.fontColor}
            />
        </View>
    );
};

export default GaugeColorPicker;
