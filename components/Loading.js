import React from 'react'
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native'

export const Loading = () => {
    return (
        <View style={styles.loadingView}>
            <ActivityIndicator size='large' color='#7843A8' />
            <Text style={styles.loadingText}>L o a d i n g  . . .</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    loadingView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    loadingText: {
        color: 'black',
        fontSize: 14,
        fontWeight: 'bold'
    }
})
