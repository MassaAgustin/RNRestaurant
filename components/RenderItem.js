import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, Animated, Easing, useWindowDimensions } from 'react-native'
import { Card } from 'react-native-elements'

import { baseUrl } from '../shared/baseUrl'

import { Loading } from './Loading'

export const RenderItem = ({ item, isLoading, errMess, pos }) => {

    const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))

    const { width } = useWindowDimensions()

    const getPos = () => {

        switch (pos) {
            case 1:
                const xpos1 = animatedValue.interpolate({
                    inputRange: [0, 1, 3, 5, 8],
                    outputRange: [1200, 600, 0, -600, -1200]
                })
                return xpos1

            case 2:
                const xpos2 = animatedValue.interpolate({
                    inputRange: [0, 2, 4, 6, 8],
                    outputRange: [1200, 600, 0, -600, -1200]
                })
                return xpos2

            case 3:
                const xpos3 = animatedValue.interpolate({
                    inputRange: [0, 3, 5, 7, 8],
                    outputRange: [1200, 600, 0, -600, -1200]
                })
                return xpos3

            default:
                break;
        }
    }

    useEffect(() => {

        function animate() {

            animatedValue.setValue(0)

            Animated.timing(
                animatedValue, {
                toValue: 8,
                duration: 8000,
                easing: Easing.linear,
                useNativeDriver: true
            }).start(({ finished }) => animate())
        }

        animate()

    }, [])

    if (isLoading) {
        return (
            <Card>
                <Loading />
            </Card>
        )
    } else {
        if (errMess) {
            return (
                <Card>
                    <Text>{errMess}</Text>
                </Card>
            )
        } else {
            return (
                <Animated.View style={{ width: '100%', transform: [{ translateX: getPos() }] }}>
                    <Card>
                        <Card.Image source={{ uri: baseUrl + item.image }} style={{ alignItems: 'center', justifyContent: 'center' }}>
                            <Card.FeaturedTitle >{item.name}</Card.FeaturedTitle>
                            <Card.FeaturedSubtitle >{item.designation}</Card.FeaturedSubtitle>
                        </Card.Image>
                        <Text style={{ margin: 10 }}>{item.description}</Text>
                    </Card>
                </Animated.View>
            )
        }
    }
}

const styles = StyleSheet.create({})
