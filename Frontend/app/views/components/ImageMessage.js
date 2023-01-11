import React from 'react';
import { View, StyleSheet, Image } from 'react-native'
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
        overflow: 'hidden',
        borderRadius: 25,
        flex: 1,
        margin: 5,
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