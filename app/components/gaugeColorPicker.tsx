import React, { useContext, useEffect, useState, useMemo } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Button } from "react-native";
import { HuePicker, AlphaPicker } from "react-color";

type HueOnlyPickerProps = {
    onChangeComplete: (color: string) => void;
    activeColor: string;
};

type GaugeKey = "backgroundColor" | "secondaryColor" | "fontColor";

type GaugeColorPickerProps = {
    updateColor: (key: GaugeKey, color: string) => void;
    colors: [foreground: string, background: string, text: string];
    gaugeFace: string;
};

const ColorPicker = ({ onChangeComplete, activeColor }: HueOnlyPickerProps) => {
    const [color, setColor] = useState<{ hex: string }>({
        hex: activeColor || "#0006",
    });

    // keeping up with upper state updates
    useEffect(() => {
        setColor({ hex: activeColor || "#0006" });
    }, [activeColor]);

    return (
        <View style={{ marginTop: 10 }}>
            <HuePicker
                width={280}
                color={color.hex}
                onChange={(col: any) => setColor({ hex: col.hex })}
                onChangeComplete={() => onChangeComplete(color.hex)}
            />
        </View>
    );
};
const GaugeColorPicker = ({
    updateColor,
    colors,
    gaugeFace,
}: GaugeColorPickerProps) => {
    const [foreground, background, text] = colors;
    const [selectedKey, setSelectedKey] = useState<GaugeKey>("backgroundColor");

    const colorOptions = useMemo(
        () => [
            {
                label: "Foreground",
                key: "backgroundColor" as const,
                activeColor: foreground,
            },
            {
                label: "Background",
                key: "secondaryColor" as const,
                activeColor: background,
            },
            {
                label: gaugeFace === "Default" ? "Pointer" : "Font",
                key: "fontColor" as const,
                activeColor: text,
            },
        ],
        [foreground, background, text, gaugeFace]
    );

    // memoize results
    const colorOptionsFiltered = useMemo(
        () =>
            colorOptions.filter(
                (obj) =>
                    !(obj.key === "secondaryColor" && gaugeFace === "Simple")
            ),
        [colorOptions, gaugeFace]
    );

    // if selected option disappears (Simple face), fall back safely
    useEffect(() => {
        if (gaugeFace === "Simple" && selectedKey === "secondaryColor") {
            setSelectedKey("backgroundColor");
        }
    }, [gaugeFace, selectedKey]);
    const selected = colorOptions.find((el) => el.key === selectedKey);

    // state key selector
    const handlePress = (key: GaugeKey) => setSelectedKey(key);

    // onPress function
    const handleColorChange = (color: string) => {
        // const hex = color.hex;
        if (selected) {
            updateColor(selected.key, color);
        }
    };

    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignItems: "flex-start",
                    marginTop: 8,
                    gap: 8,
                    flexWrap: "wrap",
                }}
            >
                {colorOptionsFiltered.map((item) => (
                    <Button
                        key={item.key}
                        title={item.label}
                        onPress={() => handlePress(item.key)}
                    />
                ))}
            </View>
            {selected && (
                <ColorPicker
                    onChangeComplete={handleColorChange}
                    activeColor={selected.activeColor}
                />
            )}
        </View>
    );
};

export default GaugeColorPicker;

const styles = StyleSheet.create({
    container: {
        width: 300,
        backgroundColor: "black",
        borderRadius: 10,
        padding: 10,
        margin: 10,
    },
    rowContainer: {
        marginTop: 10,
    },
    label: {
        color: "white",
    },
    swatchRow: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        marginTop: 10,
    },
    swatch: {
        height: 30,
        width: 30,
        borderRadius: 18,
        borderColor: "yellow",
    },
});
