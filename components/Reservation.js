import React, { guest, smoking } from 'react'
import { StyleSheet, Text, View, Switch, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'

import { Picker } from '@react-native-picker/picker'
import DateTimePicker from '@react-native-community/datetimepicker';

export const Reservation = () => {

    const [guest, setGuest] = useState(1)
    const [smoking, setSmoking] = useState(false)
    const [state, setstate] = useState(initialState)

    const handleChangePickerGuest = (itemValue, itemIndex) => {
        setGuest(itemValue)
    }

    const handleChangeSwitchSmoking = (value) => {
        setSmoking(value)
    }

    return (
        <ScrollView>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Number of Guest</Text>
                <Picker
                    style={styles.formItem}
                    selectedValue={guest}
                    onValueChange={handleChangePickerGuest}
                >
                    <Picker.Item label="1" value="1" />
                    <Picker.Item label="2" value="2" />
                    <Picker.Item label="3" value="3" />
                    <Picker.Item label="4" value="4" />
                    <Picker.Item label="5" value="5" />
                    <Picker.Item label="6" value="6" />
                </Picker>
            </View>
            <View style={styles.formRow}>
                <Text style={styles.formLabel}>Smoking / Non-Smoking?</Text>
                <Switch
                    style={styles.formItem}
                    value={smoking}
                    trackColor={{ false: '#000', true: '#fff' }}
                    onValueChange={handleChangeSwitchSmoking}
                />
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    formRow: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row',
        margin: 20
    },
    formLabel: {
        fontSize: 18,
        flex: 2
    },
    formItem: {
        flex: 1
    }
})
