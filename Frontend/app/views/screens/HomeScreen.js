//REACT::
import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';

//EXPO::
import { BlurView } from 'expo-blur';

//Contexts::
import { FeedContext } from '../../contexts/FeedContext';

//Components & Config::
import Colors from '../../config/Colors';
import Message from '../components/Message';
import Typing from '../components/Typing';
import ImageMessage from '../components/ImageMessage';

function HomeScreen({navigation}) {
    const [textInput, setTextInput] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    
    const scrollRef = useRef(null)

    const { feed, waitingOnResponse, SendText } = useContext(FeedContext)

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

            <ScrollView style={{ flex: 1, width: '100%', overflow: 'visible' }}
            ref={scrollRef}
            onLayout={ScrollToEnd}
            onContentSizeChange={ScrollToEnd}>
            
            
            <View style={styles.messageFeed}>
                {feed.map((message, index) => message.isPhoto ? <ImageMessage photo={message.photo} sent={message.sent} key={index} /> : <Message content={message.content} sent={message.sent} key={index} />)}
                
                {waitingOnResponse ? <Typing /> : ''}
            </View>
            </ScrollView>
            
            
            <BlurView intensity={65} tint={'dark'} style={[styles.newMessageContainer]}>
                <TouchableOpacity style={styles.cameraButton}
                onPress={() => navigation.navigate('Camera')}>
                    <Image source={require('../../assets/camera-icon.png')} style={styles.fillImage} />
                </TouchableOpacity>

                <TextInput style={[styles.inputField]}
                    value={textInput}
                    placeholder='Message...'
                    placeholderTextColor={Colors.Gray}
                    keyboardAppearance={'dark'}
                    onChangeText={content => setTextInput(content)}
                    onFocus={() => {setInputFocused(true)}} onBlur={() => setInputFocused(false)} />
                {inputFocused && textInput !== '' ? 
                <TouchableOpacity style={styles.sendButton} onPress={SendAText}>
                    <Image source={require('../../assets/send-icon.png')}  style={styles.fillImage}/>
                </TouchableOpacity>    
                :''
                }
            </BlurView>

            <BlurView intensity={90} tint={'dark'} style={styles.header}>
                <TouchableOpacity style={styles.backArrow}>
                    <Image source={require('../../assets/back-icon.png')} style={styles.fillImage} />
                </TouchableOpacity>

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
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.Background,
        paddingTop: 0
    },
    messageFeed: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        paddingBottom: 60,
        paddingTop: headerHeight,
        zIndex: 1,
    },
    //Generic Style for all Icons/Other Images I want kept in their container
    fillImage:{
        width: '100%',
        height: '100%'
    },
    //Heading Contains: ( Back Arrow, Contact Image, and Contact Text )
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: headerHeight,
        zIndex: 4,
        paddingTop: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrow: {
        position: 'absolute',
        left: 10,

        width: 30,
        height: 30
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

    //Message Input Field ( Where you type a new message :D )
    newMessageContainer: {
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
    inputField: {
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
    sendButton: {
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

export default HomeScreen;