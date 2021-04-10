import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, Text, ScrollView, FlatList } from 'react-native'
import { Card, Icon } from 'react-native-elements'

import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments
    }
}

const DishDetail = (props) => {

    const [favorites, setFavorites] = useState([])

    const { dishId } = props.route.params


    const markFavorite = () => {
        setFavorites(favorites.concat(dishId))
    }

    const DishRender = () => {

        const dish = props.dishes.dishes[+dishId];
        const imageURL = `${baseUrl}images/uthappizza.png`

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

export default connect(mapStateToProps)(DishDetail);
