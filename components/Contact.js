import React from 'react'
import { Text, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'

import * as Animatable from 'react-native-animatable'

import { ASSIGNMENT } from '../shared/assignment'

export const Contact = (props) => {

    const contacts = ASSIGNMENT[0].text

    return (
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card>
                    <Card.Title>{ASSIGNMENT[0].title}</Card.Title>
                    <Card.Divider />
                    {contacts.map((contact, index) => {
                        return <Text key={`contactText-${index}`}>{contact}</Text>
                    })}
                </Card>
            </Animatable.View>
        </ScrollView>

    )
}
