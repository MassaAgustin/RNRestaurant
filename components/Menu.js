import React from 'react'
import { connect } from 'react-redux'

import { FlatList } from 'react-native'
import { Tile } from 'react-native-elements'

import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {
    return {
        dishes: state.dishes
    }
}

const Menu = (props) => {

    const { navigate } = props.navigation

    const renderMenuItem = ({ item, index }) => {

        const imageUrl = `${baseUrl}${item.image}`
        return (
            <Tile
                key={index}
                onPress={() => navigate('DishDetail', { dishId: item.id })}
                title={item.name}
                caption={item.subtitle}
                imageSrc={{ uri: imageUrl }}
                featured
                bottomDivider
            />
        )
    }

    return (
        <FlatList
            data={props.dishes.dishes}
            renderItem={renderMenuItem}
            keyExtractor={item => item.id.toString()}
        />
    )
}

export default connect(mapStateToProps)(Menu);
