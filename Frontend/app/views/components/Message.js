import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import Colors from '../../config/Colors';

function Message(props) {
    const {content, sent} = props

    return (
        <View style={[styles.message, sent ? styles.sentMessage : '']}>
            <Text style={styles.messageText}>{content}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.Gray,
        borderRadius: 25,
        flex: 1,

        margin: 5,
        padding: 15,
        maxWidth: '75%'
    },
    messageText: {
        fontSize: 20,
        color: Colors.White
    },
    sentMessage: {
        alignSelf: 'flex-end',
        backgroundColor: Colors.Blue,
    },
})

export default Message;