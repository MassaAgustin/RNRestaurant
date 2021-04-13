import React from 'react'
import { connect } from 'react-redux'

import { FlatList } from 'react-native'
import { Tile } from 'react-native-elements'

import * as Animatable from 'react-native-animatable'

import { baseUrl } from '../shared/baseUrl'

import { Loading } from './Loading'

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const Menu = (props) => {

    const { navigate } = props.navigation

    const { isLoading, errMess, dishes } = props.dishes

    const renderMenuItem = ({ item, index }) => {

        const imageUrl = `${baseUrl}${item.image}`

        return (
            <Animatable.View animation="fadeInRightBig" duration={2000} delay={1000}>
                <Tile
                    key={index}
                    onPress={() => navigate('DishDetail', { dishId: item.id })}
                    title={item.name}
                    caption={item.description}
                    imageSrc={{ uri: imageUrl }}
                    featured
                    bottomDivider
                />
            </Animatable.View>

        )
    }

    if (isLoading) {
        return (
            <Loading />
        )
    } else {
        if (errMess) {
            return (
                <View>
                    <Text>{errMess}</Text>
                </View>
            )
        } else {
            return (
                <FlatList
                    data={dishes}
                    renderItem={renderMenuItem}
                    keyExtractor={item => item.id.toString()}
                />
            )
        }
    }

}

export default connect(mapStateToProps)(Menu);
