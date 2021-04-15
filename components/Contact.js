import React from 'react'
import { Text, ScrollView } from 'react-native'
import { Card, Button, Icon } from 'react-native-elements'

import * as MailComposer from 'expo-mail-composer';

import * as Animatable from 'react-native-animatable'

import { ASSIGNMENT } from '../shared/assignment'

export const Contact = (props) => {

    const contacts = ASSIGNMENT[0].text

    const sendEmail = async () => {
        await MailComposer.composeAsync({
            recipients: ['confusion@food.net'],
            subject: 'Enquiry',
            body: 'To whom it may concern:'
        })
    }

    return (
        <ScrollView>
            <Animatable.View animation="fadeInDown" duration={2000} delay={1000}>
                <Card>
                    <Card.Title>{ASSIGNMENT[0].title}</Card.Title>
                    <Card.Divider />
                    {contacts.map((contact, index) => {
                        return <Text key={`contactText-${index}`}>{contact}</Text>
                    })}
                    <Button
                        title='Send Email'
                        buttonStyle={{ marginTop: 5, backgroundColor: '#7843A8' }}
                        onPress={() => sendEmail()}
                        icon={
                            <Icon name='envelope-o' type='font-awesome' color='white' style={{ marginRight: 10 }}/>
                        }
                    />
                </Card>
            </Animatable.View>
        </ScrollView>

    )
}
