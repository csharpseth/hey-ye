import React, { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Colors from '../../config/Colors';
import PulsingBubble from './PulsingBubble';

function Typing(props) {

    

    return (
        <View style={{
            alignSelf: 'flex-start',
            backgroundColor: Colors.Gray,
            borderRadius: 25,
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            
            margin: 5,
            width: 90,
            height: 40
        }}>
            
            <PulsingBubble delay={0} />
            <PulsingBubble delay={200}  />
            <PulsingBubble delay={400}  />
        </View>
    );
}

export default Typing;