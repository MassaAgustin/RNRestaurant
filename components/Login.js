import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native'
import { Icon, CheckBox, Input, Button } from 'react-native-elements'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import * as SecureStore from 'expo-secure-store'

import { Register } from './Register'

const TabLogin = (props) => {

    const { navigate } = props.navigation

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [remember, setRemember] = useState(false)


    const handleLogin = async () => {
        console.log(username, password, remember)

        if (remember) {
            await SecureStore.setItemAsync(
                'userinfo',
                JSON.stringify({ username: username, password: password })
            )
                .catch(err => console.log("could not save user info", err))
        } else {
            await SecureStore.deleteItemAsync('userinfo')
                .catch(err => console.log("could not delete user info", err))
        }
    }

    useEffect(() => {

        SecureStore.getItemAsync('userinfo')
            .then((userdata) => {
                let userInfo = JSON.parse(userdata)
                if (userInfo) {
                    setUsername(userInfo.username)
                    setPassword(userInfo.password)
                    setRemember(true)
                }
            })

    }, [])

    return (
        <ScrollView>


            <View style={styles.container}>
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
                <CheckBox
                    title="Remember Me"
                    center
                    checked={remember}
                    onPress={() => setRemember(!remember)}
                    containerStyle={styles.formCheckBox}
                />
                <View style={styles.formButton}>
                    <Button
                        onPress={() => handleLogin()}
                        title='Login'
                        icon={
                            <Icon
                                name='sign-in'
                                type='font-awesome'
                                size={24}
                                color='white'
                                style={{ marginRight: 10 }}
                            />
                        }
                        buttonStyle={{ backgroundColor: '#333AA8'}}
                    />
                </View>
                <View>
                    <Button
                        onPress={() => navigate("Register")}
                        title='Register'
                        buttonStyle={{ backgroundColor: 'transparent' }}
                        icon={
                            <Icon
                                name='user-plus'
                                type='font-awesome'
                                size={24}
                                color='#333AA8'
                                style={{ marginRight: 10 }}
                            />
                        }
                        titleStyle={{ color: '#333AA8' }}
                    />
                </View>
            </View>
        </ScrollView>
    )
}

const BottomTab = createBottomTabNavigator();

function Login() {
    return (
        <BottomTab.Navigator>
            <BottomTab.Screen
                name="Login"
                component={TabLogin}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        < Icon
                            name='sign-in'
                            type='font-awesome'
                            size={size}
                            iconStyle={{ color: color }}
                        />
                    )
                }}
            />
            <BottomTab.Screen
                name="Register"
                component={Register}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        < Icon
                            name='user-plus'
                            type='font-awesome'
                            size={size}
                            iconStyle={{ color: color }}
                        />
                    )
                }}
            />
        </BottomTab.Navigator >
    );
}

export default Login

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        margin: 20,
    },
    formInput: {
        marginBottom: 5,
    },
    formCheckBox: {
        marginBottom: 10,
        backgroundColor: null
    },
    formButton: {
        marginTop: 10
    }
})
