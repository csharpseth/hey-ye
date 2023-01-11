import React from 'react';
import { View } from 'react-native';
import Colors from '../../config/Colors';
import PulsingBubble from './PulsingBubble';

export default function TypingIndicator() {
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
            width: 60,
            height: 30
        }}>
            
            <PulsingBubble delay={0} />
            <PulsingBubble delay={200}  />
            <PulsingBubble delay={400}  />
        </View>
    );
}