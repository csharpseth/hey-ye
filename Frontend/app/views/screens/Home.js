import { Text, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, TouchableOpacity, Image } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';

import { BlurView } from 'expo-blur';

import Colors from '../../config/Colors';
import Message from '../components/Message';
import Typing from '../components/Typing';

function HomeScreen() {

    const [statement, setStatement] = useState('')
    const [feed, setFeed] = useState([])

    const [textInput, setTextInput] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const [waitingOnResponse, setWaitingOnResponse] = useState(false)
    const scrollRef = useRef(null)

    const GetQuote = () => {
        axios.get(`https://api.kanye.rest/`)
        .then(r => {
            setStatement(r.data.quote)
        }).catch(e => {
            console.log(`Error: ${e}`);
        })
    }
    
    const RandomNumber = (min, max) => {
        return Math.floor(Math.random() * max) + min
    }

    const AddMessage = (content, sent) => {
        let currentFeed = feed
        currentFeed.push({
            sent,
            content
        })
        if(sent === false) {
            setWaitingOnResponse(false)
        }

        setFeed(currentFeed)
    }

    const SendText = () => {
        GetQuote()
        let cachedText = textInput
        setTextInput('')
        AddMessage(cachedText, true)
        setWaitingOnResponse(true)
        setTimeout(() => AddMessage(statement, false), RandomNumber(2000, 10000))
    }

    useEffect(() => {
        GetQuote()
    }, [])

    return (
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}  style={styles.container}>

            

            <ScrollView style={{ flex: 1, width: '100%', overflow: 'visible' }} ref={scrollRef} showsVerticalScrollIndicator={true} onContentSizeChange={() => {
                scrollRef.current.scrollToEnd({ animated: true })
            }}>
            
            
            <View style={styles.messageFeed}>
                {feed.map((message, index) => <Message content={message.content} sent={message.sent} key={index} />)}
                
                {waitingOnResponse ? <Typing /> : ''}
            </View>
            </ScrollView>
            
            
            <BlurView intensity={65} tint={'dark'} style={[styles.newMessageContainer]}>
                <TextInput style={[styles.inputField]}
                    value={textInput}
                    placeholder='Message...'
                    placeholderTextColor={Colors.LightGray}
                    keyboardAppearance={'dark'}
                    onChangeText={content => setTextInput(content)}
                    onFocus={() => {scrollRef.current.scrollToEnd({ animated: true }); setInputFocused(true)}} onBlur={() => setInputFocused(false)} />
                {inputFocused && textInput !== '' ? 
                <TouchableOpacity style={styles.sendButton} onPress={SendText}>
                    <Image source={require('../../assets/send-icon.png')}  style={styles.sendButtonImg}/>
                </TouchableOpacity>    
                :''
                }
            </BlurView>

            <BlurView intensity={90} tint={'dark'} style={styles.header}>
                
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
    newMessageContainer: {
        bottom: 0,
        width: '100%',
        backgroundColor: Colors.Field,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    inputField: {
        borderColor: Colors.Gray,
        borderWidth: 1,
        width: '100%',
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
    message: {
        alignSelf: 'flex-start',
        backgroundColor: Colors.Gray,
        borderRadius: 25,
        flex: 1,

        margin: 10,
        padding: 15,
        maxWidth: '75%'
    },
    messageText: {
        fontSize: 20,
        color: Colors.White
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
    sendButtonImg: {
        width: '100%',
        height: '100%'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: headerHeight,
        zIndex: 4,
    }
})

export default HomeScreen;