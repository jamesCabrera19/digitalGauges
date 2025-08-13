import { useState } from 'react';
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity,
    Pressable,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

type gaugeUnitProps = {
    reset: () => void;
    save: () => void;
};

const GaugeUnitComponent = ({ reset, save }: gaugeUnitProps) => {
    return (
        <View style={styles.container}>
            <Button title="Reset" color={'red'} onPress={reset} />

            <Button title="Save Data" color={'blue'} onPress={save} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: 200,
        justifyContent: 'space-between',
    },
});

export default GaugeUnitComponent;
