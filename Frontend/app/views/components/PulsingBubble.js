import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Colors from '../../config/Colors';

function PulsingBubble(props) {

    const { delay } = props

    const scale = useRef(new Animated.Value(1)).current
    let getBig = true

    const StartAnimating = () => {
        if(getBig)
        {
            Animated.timing(
                scale,
                {
                    toValue: 1.5,
                    useNativeDriver: true
                }
            ).start(StartAnimating)
            getBig = false
        }else{
            Animated.timing(
                scale,
                {
                    toValue: 1,
                    useNativeDriver: true
                }
            ).start(StartAnimating)
            getBig = true
        }
    }

    useEffect(() => {
        setTimeout(StartAnimating, delay)
    }, [])

    return (
        <Animated.View style={{
            width: 6,
            height: 6,
            borderRadius: 50,
            backgroundColor: Colors.LightGray,
            margin: 3,
            transform: [{scale: scale}]
        }} />
    );
}

export default PulsingBubble;