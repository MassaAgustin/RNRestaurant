import React, { useState } from 'react'
import { StyleSheet, Text, View, Switch, ScrollView, Modal, Platform, Alert } from 'react-native'

import { RNDateTimePicker } from './RNDateTimePicker'

import { Picker } from '@react-native-picker/picker'

import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import * as Calendar from 'expo-calendar';

import * as Animatable from 'react-native-animatable'

import { Button } from './Button'

export const Reservation = () => {

    const [guest, setGuest] = useState(1)
    const [smoking, setSmoking] = useState(false)
    const [date, setDate] = useState(new Date())
    const [showModal, setShowModal] = useState(false)
    const [showDatePicker, setShowDatePicker] = useState(false)

    const obtainNotificationPermission = async () => {

        let permission = await Permissions.getAsync(Permissions.USER_FACING_NOTIFICATIONS)

        if (permission.status !== 'granted') {
            permission = await Permissions.askAsync(Permissions.USER_FACING_NOTIFICATIONS)
            if (permission.status !== 'granted')
                Alert.alert("Permission no granted to show notifications")
        }

        return permission
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
            shouldShowAlert: true,
            shouldPlaySound: false,
            shouldSetBadge: false,
        }),
    });

    const presentLocalNotification = async () => {
        await obtainNotificationPermission()
        Notifications.scheduleNotificationAsync({
            content: {
                title: 'Your reservation',
                body: `Reservation for day ${date.toLocaleDateString()} at ${date.toLocaleTimeString()}hs requested`,
            },
            trigger: null
        })
    }

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

    const handleSubmitReserve = async (event) => {
        Alert.alert(
            'Your Reservation OK?',
            `Number of Guest: ${guest}\n
            Smoking? ${smoking ? 'Yes' : 'No'}\n
            Date: ${date.toLocaleDateString()} \n
            Time: ${date.toLocaleTimeString()}`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Ok', onPress: async () => {
                        presentLocalNotification()
                        await obtainCalendarPermissions()
                        addReservationToCalendar()
                        resetForm()
                    }
                }
            ],
            { cancelable: false }
        )
    }

    const obtainCalendarPermissions = async () => {
        const { status } = await Calendar.requestCalendarPermissionsAsync()

        return status
    }

    const getDefaultCalendarSource = async () => {
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        const defaultCalendars = calendars.filter(each => each.source.name === 'Default');
        console.log(defaultCalendars)
        return defaultCalendars[0].source;
    }

    const addReservationToCalendar = async () => {

        const defaultCalendarSource = Platform.OS === 'ios' ? await getDefaultCalendarSource() : { isLocalAccount: true, name: 'Expo Calendar' };
        const startDate = Date.parse(date)
        const endDate = startDate + (2 * 60 * 60 * 1000)

        const newCalendarId = await Calendar.createCalendarAsync({
            title: 'Expo Calendar',
            color: 'blue',
            entityType: Calendar.EntityTypes.EVENT,
            sourceId: defaultCalendarSource.id,
            source: defaultCalendarSource,
            name: 'internalCalendarName',
            ownerAccount: 'personal',
            accessLevel: Calendar.CalendarAccessLevel.OWNER,
        })

        const EventCalendarId = await Calendar.createEventAsync(
            newCalendarId,
            {
                title: 'Con Fusion Table Reservation',
                startDate: startDate,
                endDate: endDate,
                timeZone: 'Asia/Hong_Kong',
                location: '121, Clear Water Bay Road, Clear Water Bay, Kowloon, Hong Kong'
            }
        )
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
            <Animatable.View animation="zoomIn" duration={2000} delay={1000}>
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
            </Animatable.View>
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
