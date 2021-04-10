import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import { View, Image, Text, StyleSheet } from 'react-native'
import { Icon } from 'react-native-elements'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';

import { SafeAreaView } from 'react-native-safe-area-context';

import Home from './Home'
import Menu from './Menu';
import DishDetail from './DishDetail';
import { Contact } from './Contact'
import About from './About'

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
            <Drawer.Screen name="Home" component={HomeNavigator} options={({ navigation }) => ({
                drawerIcon: ({ color }) => (
                    <Icon
                        name='home'
                        type='font-awesome'
                        size={24}
                        color={color}
                    />
                )
            })} />
            <Drawer.Screen name="About us" component={AboutNavigator} options={({ navigation }) => ({
                drawerIcon: ({ color }) => (
                    <Icon
                        name='info-circle'
                        type='font-awesome'
                        size={24}
                        color={color}
                    />
                )
            })} />
            <Drawer.Screen name="Menu" component={MenuNavigator} options={({ navigation }) => ({
                drawerIcon: ({ color }) => (
                    <Icon
                        name='list'
                        type='font-awesome'
                        size={24}
                        color={color}
                    />
                )
            })} />
            <Drawer.Screen name="Contact us" component={ContactNavigator} options={({ navigation }) => ({
                drawerIcon: ({ color }) => (
                    <Icon
                        name='address-card'
                        type='font-awesome'
                        size={22}
                        color={color}
                    />
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
                    color='black'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />)
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
                    color='black'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />)
        })}
        >
            <MenuNav.Screen name="Menu" component={Menu} />
            <MenuNav.Screen name="DishDetail" component={DishDetail} />
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
                    color='black'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />)
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
                    color='black'
                    iconStyle={{ marginLeft: 15 }}
                    onPress={() => navigation.toggleDrawer()}
                />)
        })}
        >
            <MenuNav.Screen name="Contact us" component={Contact} />
        </ContactNav.Navigator>
    )
}

const Main = (props) => {

    useEffect(() => {

        props.fetchDishes()
        props.fetchComments()
        props.fetchPromos()
        props.fetchLeaders()
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