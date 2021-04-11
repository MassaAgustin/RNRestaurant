import React from 'react'
import { connect } from 'react-redux'

import { View, Text, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import { baseUrl } from '../shared/baseUrl'

import { postFavorites } from '../redux/ActionCreators'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorites: (dishId) => dispatch(postFavorites(dishId))
})

const DishDetail = (props) => {

    const { dishId } = props.route.params
    const { dishes, favorites, postFavorites} = props

    const markFavorite = () => {
        postFavorites(dishId)
    }

    const DishRender = () => {

        const dish = dishes.dishes[+dishId];
        const imageURL = `${baseUrl}${dish.image}`

        const favorite = favorites.some(el => el === dishId)

        return dish ?
            <Card>
                <Card.Title >{dish.name}</Card.Title>
                <Card.Image source={{ uri: imageURL }}></Card.Image>
                <Card.Divider />
                <Text style={{ margin: 10 }}>{dish.description}</Text>
                <Icon
                    raised
                    reverse
                    name={ favorite ? 'heart' : 'heart-o' }
                    type='font-awesome'
                    color='#32A85B'
                    onPress={() => favorite ? alert("Already favorite") : markFavorite()}
                />
            </Card>

            : <View />
    }

    const RenderComments = () => {

        const commentsDetail = props.comments.comments.filter((comment) => comment.dishId === dishId)

        const renderCommentItem = ({ item, index }) => {
            return (
                <View key={`comment-${index}`} style={{ margin: 10 }}>
                    <Text style={{ fontSize: 14 }}>
                        {item.comment}
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                        {item.rating} Stars
                    </Text>
                    <Text style={{ fontSize: 12 }}>
                        {`-- ${item.author}, ${item.date}`}
                    </Text>

                </View>
            )
        }

        return (
            <Card>
                <Card.Title>Comments</Card.Title>
                <FlatList
                    data={commentsDetail}
                    renderItem={renderCommentItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        )
    }

    return (
        <ScrollView>
            <DishRender />
            <RenderComments />
        </ScrollView>
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
