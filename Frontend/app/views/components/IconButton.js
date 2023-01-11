import React from 'react';
import { Image, TouchableOpacity, StyleSheet } from 'react-native'

export default function IconButton(props) {
    const {style, source, onPress} = props

    return (
        <TouchableOpacity style={style} onPress={onPress}>
            <Image source={source}  style={styles.fillImage}/>
        </TouchableOpacity>  
    )
}

const styles = StyleSheet.create({
    fillImage:{
        width: '100%',
        height: '100%'
    },
})