import { useState } from "react";
import { View, Text, Button, StyleSheet, TextInput } from "react-native";

type gaugeProps = {
    temperature: number;
    unit: string;
    needleSize: number; // 2,3,5
    colors: string[];
    operatingLimit: number;
};

const SimpleGauge = ({
    temperature,
    unit,
    needleSize,
    colors,
    operatingLimit,
}: gaugeProps) => {
    let weight = 400;
    if (needleSize === 2) {
        weight = 100;
    } else if (needleSize === 3) {
        weight = 500;
    } else {
        weight = 600;
    }

    const [backgroundColor, secondaryColor, fontColor] = colors;

    return (
        <View
            style={{
                backgroundColor: backgroundColor,
                width: 200,
                height: 200,
                borderRadius: 100,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <View
                style={{
                    backgroundColor:
                        temperature > operatingLimit
                            ? "#ff1a1a"
                            : backgroundColor,
                    width: 165,
                    height: 165,
                    borderRadius: 100,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                }}
            >
                <Text
                    style={{
                        fontWeight: weight,
                        fontSize: 40,
                        color:
                            temperature > operatingLimit
                                ? "#ff1a1a"
                                : fontColor,
                        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                    }}
                >
                    {temperature}° {unit}
                </Text>
            </View>
        </View>
    );
};

export default SimpleGauge;
