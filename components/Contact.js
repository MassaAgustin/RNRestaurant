import React from 'react'
import { Text, ScrollView } from 'react-native'
import { Card } from 'react-native-elements'

import { ASSIGNMENT } from '../shared/assignment'

export const Contact = (props) => {

    const contacts = ASSIGNMENT[0].text

    return (
        <ScrollView>
            <Card>
                <Card.Title>{ASSIGNMENT[0].title}</Card.Title>
                <Card.Divider />
                {contacts.map((contact,index) => {
                    return <Text key={`contactText-${index}`}>{contact}</Text>
                })}
            </Card>
        </ScrollView>

    )
}
