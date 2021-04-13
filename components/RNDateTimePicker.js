import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import { Button } from './Button'

export const RNDateTimePicker = (props) => {

    const { date, onChange, textLabel, show, setShow } = props

    const [mode, setMode] = useState('date');

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    return (
        <View>

            <Text style={styles.textLabel}>{textLabel}</Text>

            <View style={styles.containerButton}>
                <View style={{ marginLeft: 20, width: '40%' }}>
                    <Button onPress={showDatepicker} textButton={date.toLocaleDateString()} color='#3D1C5C' fontSize={12} />
                </View>
                <View style={{ marginLeft: 20, width: '40%' }}>
                    <Button onPress={showTimepicker} textButton={date.toLocaleTimeString()} color='#3D1C5C' fontSize={12} />
                </View>
            </View>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={date}
                    mode={mode}
                    is24Hour={true}
                    display="default"
                    onChange={onChange}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    containerButton: {
        flexDirection: 'row',
    },
    textLabel: {
        textAlign: 'center',
        fontSize: 18,
        marginBottom: 10
    }
})
