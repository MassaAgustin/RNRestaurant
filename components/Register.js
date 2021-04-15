import React, { useState } from 'react'
import { StyleSheet, View, ScrollView, Image } from 'react-native'
import { Button, Input, CheckBox, Icon } from 'react-native-elements'

import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import * as SecureStore from 'expo-secure-store'

import { baseUrl } from '../shared/baseUrl'

export const Register = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    //const [remember, setRemember] = useState(false)
    const [imageUrl, setImageUrl] = useState(baseUrl+'/images/logo.png')

    const getImageFromCamera = async () => {

        const { status } = await Camera.requestPermissionsAsync();
        if (status === 'granted') {
            let capturedImage = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                aspect: [4, 3]
            })
            if (!capturedImage.cancelled) {
                setImageUrl(capturedImage.uri)
            }
        }
    }

    const handleRegister = async () => {
        console.log(username, password, firstName, lastName, email, imageUrl)

        /* if (remember) {
            await SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: username, password: password })
            )
                .catch(err => console.log("could not save user info", err))
        } else {
            await SecureStore.deleteItemAsync('userinfo')
                .catch(err => console.log("could not delete user info", err))
        } */
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageContainer} >
                    <Input
                        placeholder="First Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(firstname) => setFirstName(firstname)}
                        value={firstName}
                        containerStyle={styles.formInput}
                    />
                    <Button
                        title="Camera"
                        onPress={() => getImageFromCamera()}
                    />
                </View>
                <View style={styles.imageContainer}>
                    <Input
                        placeholder="Last Name"
                        leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                        onChangeText={(lastname) => setLastName(lastname)}
                        value={lastName}
                        containerStyle={styles.formInput}
                    />
                    <Image
                        loadingIndicatorSource={require('../assets/images/logo.png')}
                        source={{ uri: imageUrl }}
                        style={styles.image}
                        onMagicTap={() => getImageFromCamera()}
                    />
                </View>
                <Input
                    placeholder="Username"
                    leftIcon={{ type: 'font-awesome', name: 'user-o' }}
                    onChangeText={(username) => setUsername(username)}
                    value={username}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Password"
                    leftIcon={{ type: 'font-awesome', name: 'key' }}
                    onChangeText={(password) => setPassword(password)}
                    value={password}
                    containerStyle={styles.formInput}
                />
                <Input
                    placeholder="Email"
                    leftIcon={{ type: 'font-awesome', name: 'envelope-o' }}
                    onChangeText={(email) => setEmail(email)}
                    value={email}
                    containerStyle={styles.formInput}
                />
                {/* <CheckBox
                    title="Remember Me"
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckBox}
                /> */}
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleRegister()}
                        title='Register'
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                size={24}
                                color='white'
                                style={{ marginRight: 10 }}
                            />
                        }
                        buttonStlye={{ backgroundColor: 'black' }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
        marginTop: 0
    },
    formCheckBox: {
        backgroundColor: null
    },
    formInput: {
        flex: 1,
    },
    formButton: {
        marginTop: 5
    },
    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    image: {
        width: 80,
        height: 60,
        marginBottom: 0,
        borderColor: '#7843A8',
        borderWidth: 5,
        borderStyle: 'solid'
    }
})
