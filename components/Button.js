import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

export const Button = (props) => {

    const { onPress, textButton, color, fontSize } = props

    const styles = StyleSheet.create({
        button:{
            backgroundColor: color,
            borderRadius: 25,
        },
        textButton: {
            color: '#fff',
            fontSize: fontSize,
            padding: 10,
            textAlign: 'center'
        }
    })

    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.textButton}>{textButton}</Text>
        </TouchableOpacity>
    )
}


