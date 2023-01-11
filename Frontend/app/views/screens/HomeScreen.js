//REACT::
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, Image } from 'react-native';
import { useContext, useRef, useState } from 'react';

//EXPO::
import { BlurView } from 'expo-blur';

//CONTEXT::
import { FeedContext } from '../../contexts/FeedContext';

//COMPONENTS::
import Message from '../components/Message';
import TypingIndicator from '../components/TypingIndicator';
import ImageMessage from '../components/ImageMessage';

//CONFIG::
import Colors from '../../config/Colors';
import IconButton from '../components/IconButton';

export default function HomeScreen({navigation}) {
    //Stateful Variables
    const [textInput, setTextInput] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    
    //Reference Variables
    const scrollRef = useRef(null)

    //Context Variables
    const { feed, waitingOnResponse, SendText } = useContext(FeedContext)


    //Helper Functions
    const SendAText = () => {
        let cachedText = textInput
        setTextInput('')
        SendText(cachedText)
    }
    const ScrollToEnd = () => {
        scrollRef.current.scrollToEnd({ animated: true })
    }

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container} on>

            <ScrollView style={styles.scrollFeed}
            ref={scrollRef}
            onLayout={ScrollToEnd}
            onContentSizeChange={ScrollToEnd}>
            
            {/*  */}
            <View style={styles.messageFeed}>
                {/* 
                Creates a Message component for each message in the Feed.
                Determines whether the message is a photo or text
                and inserts the proper Component accordingly.

                Styling is handled inside the Message Components themselves
                */}
                {feed.map((message, index) => message.isPhoto ?
                    <ImageMessage photo={message.photo} sent={message.sent} key={index} />
                    :
                    <Message content={message.content} sent={message.sent} key={index} />)}
                
                {/* Shows animated typing bubble while waiting for response. */}
                {waitingOnResponse ? <TypingIndicator /> : ''}
            </View>
            </ScrollView>
            
            
            <BlurView intensity={65} tint={'dark'} style={[styles.messageBar]}>
                <IconButton style={styles.cameraButton}
                    source={require('../../assets/camera-icon.png')}
                    onPress={() => navigation.navigate('Camera')} />

                <TextInput style={[styles.messageInputField]}
                    value={textInput}
                    placeholder='Message...'
                    placeholderTextColor={Colors.Gray}
                    keyboardAppearance={'dark'}
                    onChangeText={content => setTextInput(content)}
                    onFocus={() => {setInputFocused(true)}} onBlur={() => setInputFocused(false)} />

                {/* Shows the send button only when you're typing and there is a message to send */}
                {inputFocused && textInput !== '' ? 
                <IconButton style={styles.messageSendButton}
                    source={require('../../assets/send-icon.png')}
                    onPress={SendAText} />
                :''
                }
            </BlurView>

            <BlurView intensity={90} tint={'dark'} style={styles.headerContact}>
                <IconButton style={styles.backArrow} source={require('../../assets/back-icon.png')} />

                <View style={styles.contactImg}>
                    <Image source={require('../../assets/ye.png')} style={styles.fillImage} />
                </View>
                <Text style={styles.contactText}>Kanye</Text>
            </BlurView>

        </KeyboardAvoidingView>
    );
}

const headerHeight = 100

const styles = StyleSheet.create({
    //Screen and other containment styles
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Background,
        paddingTop: headerHeight
    },
    messageFeed: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingBottom: 60,
        zIndex: 1,
    },
    scrollFeed: {
        flex: 1,
        width: '100%',
        overflow: 'visible'
    },
    //Generic Style for all Icons/Other Images I want kept in their container
    fillImage:{
        width: '100%',
        height: '100%'
    },
    //Heading Contains: ( Back Arrow, Contact Image, and Contact Text )
    headerContact: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: headerHeight,
        zIndex: 4,
        paddingTop: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
    contactImg: {
        width: 55,
        height: 55,
        overflow: 'hidden',
        borderRadius: 30
    },
    contactText: {
        color: Colors.White,
        marginTop: 3
    },
    backArrow: {
        position: 'absolute',
        left: 10,

        width: 30,
        height: 30
    },

    //Message Input Field ( Where you type a new message )
    messageBar: {
        bottom: 0,
        width: '100%',
        backgroundColor: Colors.Field,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    messageInputField: {
        borderColor: Colors.Gray,
        borderWidth: 1,
        width: '100%',
        flexShrink: 1,
        color: Colors.White,
        padding: 10,
        paddingLeft: 15,
        paddingRight: 40,
        fontSize: 18,
        borderRadius: 100,
        textAlign: 'left',
        textAlignVertical: 'center',
        alignItems: 'center',
        justifyContent: 'center',
    },
    messageSendButton: {
        position: 'absolute',
        right: 16,
        bottom: 16,
        width: 30,
        height: 30,
        overflow: 'hidden',
        borderRadius: 50,
        backgroundColor: Colors.Blue
    },
    cameraButton: {
        width: 30,
        height: 30,
        overflow: 'hidden',
        marginRight: 10
    },

})