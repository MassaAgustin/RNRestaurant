import React, { useState } from 'react'
import { connect } from 'react-redux'

import { View, Text, ScrollView, FlatList, StyleSheet, Modal, Alert, PanResponder } from 'react-native'
import { Card, Icon, Rating, Input } from 'react-native-elements'

import * as Animatable from 'react-native-animatable'

import { baseUrl } from '../shared/baseUrl'

import { postFavorites, postComment, addFavorite } from '../redux/ActionCreators'

import { Button } from './Button'

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        comments: state.comments,
        favorites: state.favorites
    }
}

const mapDispatchToProps = dispatch => ({
    postFavorites: (dishId) => dispatch(postFavorites(dishId)),
    postComment: (dishId, rating, author, comment) => dispatch(postComment(dishId, rating, author, comment))
})

const DishDetail = (props) => {

    const { dishId } = props.route.params
    const { dishes, favorites, postFavorites, postComment } = props

    const [showModal, setShowModal] = useState(false)

    const [rating, setRating] = useState(1)
    const [author, setAuthor] = useState('')
    const [comment, setComment] = useState('')

    const toggleModal = () => {
        setShowModal(!showModal)
    }

    const markFavorite = () => {
        postFavorites(dishId)
    }

    const resetModal = () => {
        setRating(1)
        setAuthor('')
        setComment('')
    }

    const handleAddComment = () => {
        postComment(dishId, rating, author, comment)
        toggleModal()
    }

    const DishRender = () => {

        const dish = dishes.dishes[+dishId];
        const imageURL = `${baseUrl}${dish.image}`

        const favorite = favorites.some(el => el === dishId)

        const handleViewRef = ref => this.view = ref

        const recognizeDrag = ({ moveX, moveY, dx, dy }) => {
            if (dx < -200) //right to left
                return true
            return false
        }

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (e, gestureState) => {
                return true
            },
            onPanResponderGrant: (e, gestureState) => {
                this.view.rubberBand(1000)
                    .then(endState => console.log(endState.finished ? 'finished' : 'cancelled'))
            },
            onPanResponderEnd: (e, gestureState) => {
                if (recognizeDrag(gestureState))
                    Alert.alert(
                        'Add to Favorites?',
                        'Are you sure you wish to add ' + dish.name + ' to your favorites?',
                        [
                            { text: 'Cancel', style: 'cancel' },
                            { text: 'Ok', onPress: () => { favorite ? alert("Already favorite") : markFavorite() } }
                        ],
                        { cancelable: false }
                    )
                return true
            }
        })
        return dish ?
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000} {...panResponder.panHandlers} ref={handleViewRef}>
                <Card>
                    <Card.Title >{dish.name}</Card.Title>
                    <Card.Image source={{ uri: imageURL }}></Card.Image>
                    <Card.Divider />
                    <Text style={{ margin: 10 }}>{dish.description}</Text>
                    <View style={styles.icons}>
                        <Icon
                            raised
                            reverse
                            name={favorite ? 'heart' : 'heart-o'}
                            type='font-awesome'
                            color='#32A85B'
                            onPress={() => favorite ? alert("Already favorite") : markFavorite()}
                        />
                        <Icon
                            raised
                            reverse
                            name={'pencil'}
                            type='font-awesome'
                            color='#7843A8'
                            onPress={() => setShowModal(true)}
                        />
                    </View>
                </Card>
            </Animatable.View>

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
                    <View style={{ alignItems: 'flex-start', marginLeft: 15 }}>
                        <Rating startingValue={item.rating} imageSize={12} />
                    </View>
                    <Text style={{ fontSize: 12 }}>
                        {`-- ${item.author}, ${item.date}`}
                    </Text>

                </View>
            )
        }

        return (
            <Animatable.View animation="fadeInUp" duration={2000} delay={1000}>
                <Card>
                    <Card.Title>Comments</Card.Title>
                    <FlatList
                        data={commentsDetail}
                        renderItem={renderCommentItem}
                        keyExtractor={item => item.id.toString()}
                    />
                </Card>
            </Animatable.View>
        )
    }

    return (
        <ScrollView>
            <DishRender />
            <RenderComments />
            <Modal
                animationType='slide'
                transparent={false}
                visible={showModal}
                onDismiss={toggleModal}
                onRequestClose={toggleModal}
            >
                <View style={styles.modal}>
                    <View style={{ marginTop: 20 }}>
                        <Rating style startingValue={rating} onFinishRating={(rate) => setRating(rate)} />
                    </View>
                    <View style={styles.modalContainerInput}>

                        <Input leftIcon={<Icon name='user-circle' type='font-awesome' />}
                            style={styles.modalInput}
                            placeholder='Author'
                            value={author}
                            onChangeText={(value) => setAuthor(value)}
                        />
                        <Input leftIcon={<Icon name='comment' type='font-awesome' />}
                            style={styles.modalInput}
                            placeholder='Comment'
                            value={comment}
                            onChangeText={(value) => setComment(value)}
                        />
                    </View>
                    <Button
                        onPress={handleAddComment}
                        textButton='Comment'
                        color='#32A85B'
                    />
                    <View style={{ width: '40%', alignSelf: 'center', marginTop: 10 }}>
                        <Button
                            onPress={toggleModal}
                            textButton='Close'
                            color='#512DA8'
                        />
                    </View>
                </View>
            </Modal>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    icons: {
        flexDirection: 'row',
        justifyContent: 'center'
    },
    modal: {
        justifyContent: 'center',
        margin: 20
    },
    modalContainerInput: {
        marginTop: 20
    },
    modalInput: {
        padding: 10
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(DishDetail);
