import React from 'react'
import { connect } from 'react-redux'

import { View, Text, FlatList, ScrollView, Animated, StyleSheet, I18nManager, Alert } from 'react-native'
import { ListItem, Avatar } from 'react-native-elements'

import Swipeable from 'react-native-gesture-handler/Swipeable'
import { RectButton } from 'react-native-gesture-handler'

import * as Animatable from 'react-native-animatable'

import { deleteFavorite } from '../redux/ActionCreators'

import { baseUrl } from '../shared/baseUrl'

import { Loading } from './Loading'



const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    deleteFavorite: (dishId) => dispatch(deleteFavorite(dishId))
})

const Favorites = (props) => {

    const { navigate } = props.navigation

    const { dishes, favorites, deleteFavorite } = props

    const dataFavorites = dishes.dishes.filter(dish => favorites.some(el => el === dish.id))

    const renderFavItem = ({ item, index }) => {


        const handleDeleteFavorite = () => {
            Alert.alert(
                'Delete favorite?',
                'Are you sure you wish to delete the favorite dish ' + item.name + '?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    { text: 'Delete', onPress: () => deleteFavorite(item.id) }
                ],
                { cancelable: false }
            )
        }

        const renderRightAction = (text, color, x, progress) => {
            const trans = progress.interpolate({
                inputRange: [0, 1],
                outputRange: [x, 0],
            });
            return (
                <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
                    <Animated.View style={{ flex: 1, transform: [{ translateX: 0 }] }}>
                        <RectButton
                            style={[styles.rightAction, { backgroundColor: color }]}
                            onPress={handleDeleteFavorite}
                        >
                            <Text style={styles.actionText}>{text}</Text>
                        </RectButton>
                    </Animated.View >
                </Animatable.View>

            );
        };

        const renderRightActions = progress => (
            <View style={{ width: 192, flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row' }}>
                {/* {renderRightAction('More', '#C8C7CD', 192, progress)} */}
                {/* {renderRightAction('Flag', '#ffab00', 128, progress)} */}
                {renderRightAction('Delete', '#dd2c00', 64, progress)}
            </View>
        );

        return (
            <Swipeable renderRightActions={renderRightActions}>
                <ListItem
                    key={`itemFavorite-${index}`}
                    onPress={() =>
                        navigate('Menu', {
                            screen: 'DishDetail',
                            params: { dishId: item.id }
                        })
                    }
                >
                    <Avatar source={{ uri: `${baseUrl}${item.image}` }} />
                    <ListItem.Content>
                        <ListItem.Title>{item.name}</ListItem.Title>
                        <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                    </ListItem.Content>
                    <ListItem.Chevron color='black' />
                </ListItem >
            </Swipeable>
        )
    }

    if (dishes.isLoading) {
        return <Loading />
    } else {
        if (dishes.errMess) {
            return (
                <View>
                    <Text>{dishes.errMess}</Text>
                </View>
            )
        } else {
            return (
                <ScrollView>
                    <FlatList
                        data={dataFavorites}
                        renderItem={renderFavItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </ScrollView>
            )
        }
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center'
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites)