import React from 'react'
import { connect } from 'react-redux'

import { Text, FlatList, ScrollView } from 'react-native'
import { Card, ListItem, Avatar } from 'react-native-elements'

import { ASSIGNMENT } from '../shared/assignment'

import { baseUrl } from '../shared/baseUrl'

const mapStateToProps = state => {
    return {
        leaders: state.leaders
    }
}

const About = (props) => {

    const historys = ASSIGNMENT[1].text

    const { leaders } = props.leaders

    const History = () => {
        return (
            <Card>
                <Card.Title>{ASSIGNMENT[1].title}</Card.Title>
                <Card.Divider></Card.Divider>
                {historys.map((history, index) => {
                    return <Text key={`textAbout-${index}`}>{history}</Text>
                })}
            </Card>
        )
    }

    const renderLeaderItem = ({ item, index }) => {

        //I cant use item.image, if i did have an error 'invalid call in line 31'
        const avatarAlberto = `${baseUrl}${item.image}`

        console.log(avatarAlberto)

        return (
            <ListItem key={`itemAbout-${index}`}>
                <Avatar source={{ uri: avatarAlberto }} rounded/>
                <ListItem.Content>
                    <ListItem.Title>{item.name}</ListItem.Title>
                    <ListItem.Subtitle>{item.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }

    return (
        <ScrollView>
            <History />
            <Card containerStyle={{flex: 1, marginBottom: 5 }} wrapperStyle={{ flex: 1, marginBottom: 5 }}>
                <Card.Title>Corporate Leadership</Card.Title>
                <Card.Divider />
                <FlatList
                    data={leaders}
                    renderItem={renderLeaderItem}
                    keyExtractor={item => item.id.toString()}
                />
            </Card>
        </ScrollView>
    )
}

export default connect(mapStateToProps)(About)