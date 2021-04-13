import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch, ScrollView, Modal, Platform } from 'react-native'

import { RNDateTimePicker } from './RNDateTimePicker'

import { Picker } from '@react-native-picker/picker'

import { Button } from './Button'

export const Reservation = () => {

    const [guest, setGuest] = useState(1)
    const [smoking, setSmoking] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)

    const handleChangePickerGuest = (itemValue, itemIndex) => {
        setGuest(itemValue)
    }

    const handleChangeSwitchSmoking = (value) => {
        setSmoking(value)
    }

    const handleChangeDatePicker = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(Platform.OS === 'ios')
        setDate(currentDate);
    };

    const handleSubmitReserve = (event) => {
        toggleModal()
    }

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const resetForm = () => {
        setGuest(1)
        setSmoking(false)
        setDate(new Date())
        setShowModal(false)
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
                    trackColor={{ false: '#3D1C5C', true: '#7843A8' }}
                    thumbColor={smoking ? '#fff' : '#7843a8'}
                    onValueChange={handleChangeSwitchSmoking}
                />
            </View>
            <View style={styles.formRow}>
                <RNDateTimePicker
                    date={date}
                    onChange={handleChangeDatePicker}
                    textLabel={'Date and time'}
                    show={showDatePicker}
                    setShow={setShowDatePicker}
                />
            </View>
            <View style={styles.formRow}>
                <View style={{ width: '90%' }}>
                    <Button
                        textButton="Reserve"
                        onPress={handleSubmitReserve}
                        color='#7843A8'
                        fontSize={22}
                    />
                </View>
            </View>
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onDismiss={toggleModal}
                onRequestClose={toggleModal}
            >
                <View style={styles.modal}>
                    <Text style={styles.modalTitle}>Your reservation</Text>
                    <Text style={styles.modalText}>Number of Guest: {guest}</Text>
                    <Text style={styles.modalText}>Smoking? : {smoking ? 'Yes' : 'No'}</Text>
                    <Text style={styles.modalText}>Date: {date.toLocaleDateString()}</Text>
                    <Text style={styles.modalText}>Time: {date.toLocaleTimeString()}</Text>
                    <View style={{ margin: 10 }}>
                        <Button
                            onPress={resetForm}
                            textButton='Close'
                            color='#7843A8'
                        />
                    </View>
                </View>
            </Modal>
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
        flex: 2
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        backgroundColor: '#7843A8',
        borderRadius: 25,
        textAlign: 'center',
        color: 'white',
        marginBottom: 20,
        padding: 7
    },
    modalText: {
        fontSize: 18,
        margin: 10
    }
})
