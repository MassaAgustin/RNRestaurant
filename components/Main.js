import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { View, Image, Text, StyleSheet, ToastAndroid } from 'react-native'
import { Icon } from 'react-native-elements'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { SafeAreaView } from 'react-native-safe-area-context';

import NetInfo from '@react-native-community/netinfo';

import Home from './Home'
import Menu from './Menu';
import DishDetail from './DishDetail';
import { Contact } from './Contact'
import About from './About'

import { Reservation } from './Reservation'
import Favorites from './Favorites'
import Login from './Login'

import { fetchDishes, fetchComments, fetchPromos, fetchLeaders } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    fetchDishes: () => dispatch(fetchDishes()),
    fetchComments: () => dispatch(fetchComments()),
    fetchPromos: () => dispatch(fetchPromos()),
    fetchLeaders: () => dispatch(fetchLeaders())
})

const MenuNav = createStackNavigator()

const HomeNav = createStackNavigator()

const AboutNav = createStackNavigator()

const ContactNav = createStackNavigator()

const ReservationNav = createStackNavigator()

const FavoriteNav = createStackNavigator()

const LoginNav = createStackNavigator()

const Drawer = createDrawerNavigator()

const CustomDrawerContentComponent = (props) => {
    return (
        <DrawerContentScrollView {...props} >
            <SafeAreaView style={styles.container} >
                <View style={styles.drawerHeader}>
                    <View style={{ flex: 1 }}>
                        <Image
                            source={require('../assets/images/logo.png')}
                            style={styles.drawerImage}
                        />
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.drawerHeaderText}>Ristorante Con Fusion</Text>
                    </View>
                </View>
                <DrawerItemList {...props} />
            </SafeAreaView>
        </DrawerContentScrollView>
    )
}

const MainNavigator = () => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <CustomDrawerContentComponent {...props} />} >
            <Drawer.Screen name="Login" component={LoginNavigator} options={({ navigation }) => ({
                drawerIcon: ({ focused }) => (
                    <Icon
                        name='sign-in'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#7843A8' : '#000'}
                    />
                ),
                drawerLabel: ({ focused }) => (
                    <Text style={{ color: focused ? '#7843A8' : '#000' }}>Login</Text>
                )
            })} />
            <Drawer.Screen name="Home" component={HomeNavigator} options={({ navigation }) => ({
                drawerIcon: ({ focused }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#7843A8' : '#000'}
                    />
                ),
                drawerLabel: ({ focused, color }) => (
                    <Text style={{ color: focused ? '#7843A8' : '#000' }}>Home</Text>
                )
            })} />
            <Drawer.Screen name="About us" component={AboutNavigator} options={({ navigation }) => ({
                drawerIcon: ({ focused }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#7843A8' : '#000'}
                    />
                ),
                drawerLabel: ({ focused }) => (
                    <Text style={{ color: focused ? '#7843A8' : '#000' }}>About us</Text>
                )
            })} />
            <Drawer.Screen name="Menu" component={MenuNavigator} options={({ navigation }) => ({
                drawerIcon: ({ focused }) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#7843A8' : '#000'}
                    />
                ),
                drawerLabel: ({ focused }) => (
                    <Text style={{ color: focused ? '#7843A8' : '#000' }}>Menu</Text>
                )
            })} />
            <Drawer.Screen name="Contact us" component={ContactNavigator} options={({ navigation }) => ({
                drawerIcon: ({ focused }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={22}
                        color={focused ? '#7843A8' : '#000'}
                    />
                ),
                drawerLabel: ({ focused }) => (
                    <Text style={{ color: focused ? '#7843A8' : '#000' }}>Contact us</Text>
                )
            })} />
            <Drawer.Screen name="Reservation" component={ReservationNavigator} options={({ navigation }) => ({
                drawerIcon: ({ focused }) => (
                    <Icon
                        name='cutlery'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#7843A8' : '#000'}
                    />
                ),
                drawerLabel: ({ focused }) => (
                    <Text style={{ color: focused ? '#7843A8' : '#000' }}>Reservation</Text>
                )
            })} />
            <Drawer.Screen name="Favorites" component={FavoritesNavigator} options={({ navigation }) => ({
                drawerIcon: ({ focused }) => (
                    <Icon
                        name='heart'
                        type='font-awesome'
                        size={24}
                        color={focused ? '#7843A8' : '#000'}
                    />
                ),
                drawerLabel: ({ focused }) => (
                    <Text style={{ color: focused ? '#7843A8' : '#000' }}>Favorites</Text>
                )
            })} />
        </Drawer.Navigator>
    )
}

const HomeNavigator = () => {

    return (
        <HomeNav.Navigator initialRouteName="Home" screenOptions={({ navigation }) => ({
            headerLeft: ({ tintColor }) => (
                <Icon
                    name="menu"
                    size={24}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />),
            headerStyle: { backgroundColor: '#7843A8' },
            headerTintColor: '#fff'
        })}
        >
            <MenuNav.Screen name="Home" component={Home} />
        </HomeNav.Navigator >
    )
}

const MenuNavigator = () => {

    return (
        <MenuNav.Navigator initialRouteName="Menu" screenOptions={({ navigation }) => ({
            headerLeft: ({ tintColor }) => (
                <Icon
                    name="menu"
                    size={24}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />),
            headerStyle: { backgroundColor: '#7843A8' },
            headerTintColor: '#fff'
        })}
        >
            <MenuNav.Screen name="Menu" component={Menu} />
            <MenuNav.Screen name="DishDetail" component={DishDetail} options={({ navigation }) => ({
                headerLeft: ({ }) => (<Icon
                    name="arrow-left"
                    type='font-awesome'
                    size={22}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.goBack()}
                />)
            })}
            />
        </MenuNav.Navigator >
    )
}

const AboutNavigator = () => {

    return (
        <AboutNav.Navigator screenOptions={({ navigation }) => ({
            headerLeft: ({ tintColor }) => (
                <Icon
                    name="menu"
                    size={24}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />),
            headerStyle: { backgroundColor: '#7843A8' },
            headerTintColor: '#fff'
        })}
        >
            <MenuNav.Screen name="About us" component={About} />
        </AboutNav.Navigator>
    )
}

const ContactNavigator = () => {

    return (
        <ContactNav.Navigator screenOptions={({ navigation }) => ({
            headerLeft: ({ tintColor }) => (
                <Icon
                    name="menu"
                    size={24}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />),
            headerStyle: { backgroundColor: '#7843A8' },
            headerTintColor: '#fff'
        })}
        >
            <MenuNav.Screen name="Contact us" component={Contact} />
        </ContactNav.Navigator>
    )
}

const ReservationNavigator = () => {

    return (
        <ReservationNav.Navigator screenOptions={({ navigation }) => ({
            headerLeft: ({ tintColor }) => (
                <Icon
                    name="menu"
                    size={24}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />),
            headerStyle: { backgroundColor: '#7843A8' },
            headerTintColor: '#fff'
        })}
        >
            <MenuNav.Screen name="Reservation" component={Reservation} />
        </ReservationNav.Navigator>
    )
}

const FavoritesNavigator = () => {

    return (
        <FavoriteNav.Navigator screenOptions={({ navigation }) => ({
            headerLeft: ({ tintColor }) => (
                <Icon
                    name="menu"
                    size={24}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />),
            headerStyle: { backgroundColor: '#7843A8' },
            headerTintColor: '#fff'
        })}
        >
            <MenuNav.Screen name="Favorites" component={Favorites} />
        </FavoriteNav.Navigator>
    )
}

const LoginNavigator = () => {

    return (
        <LoginNav.Navigator screenOptions={({ navigation }) => ({
            headerLeft: ({ tintColor }) => (
                <Icon
                    name="menu"
                    size={24}
                    color='white'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />),
            headerStyle: { backgroundColor: '#7843A8' },
            headerTintColor: '#fff'
        })}
        >
            <MenuNav.Screen name="Login" component={Login} />
        </LoginNav.Navigator>
    )
}

const Main = (props) => {

    useEffect(() => {

        props.fetchDishes()
        props.fetchComments()
        props.fetchPromos()
        props.fetchLeaders()

        NetInfo.fetch()
            .then(state => {
                ToastAndroid.show(`Connection type: ${state.type}, Is connected? ${state.isConnected}`, ToastAndroid.LONG)
            })
        const unsubscribe = NetInfo.addEventListener(state => {
            ToastAndroid.show(`Connection type: ${state.type}, Is connected? ${state.isConnected}`, ToastAndroid.LONG)
        })

        return () => unsubscribe()

    }, [])

    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    drawerHeader: {
        backgroundColor: '#7843A8',
        height: 140,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        flexDirection: 'row'
    },
    drawerHeaderText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 24,
    },
    drawerImage: {
        margin: 10,
        width: 80,
        height: 60
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Main);