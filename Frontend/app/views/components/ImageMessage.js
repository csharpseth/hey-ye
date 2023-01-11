import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native'
import Colors from '../../config/Colors';
import { BASEURL } from '../../config/URLs';

export default function ImageMessage(props) {
    const {photo, sent} = props

    return (
        <View style={[styles.message, sent ? styles.sentMessage : '']}>
            <Image source={{ uri: `${BASEURL}/${photo.fileName}` }} width={photo.width} height={photo.height} style={styles.messageImage} />
        </View>
    )
}

const styles = StyleSheet.create({
    message: {
        alignSelf: 'flex-start',
        borderColor: Colors.Gray,
        borderWidth: 1,
        borderRadius: 5,
        flex: 1,
        margin: 5,
        padding: 2,
        width: '60%',
        maxHeight: 400
    },
    messageImage: {
        width: '100%',
        height: '100%',
    },
    sentMessage: {
        alignSelf: 'flex-end',
    },
})