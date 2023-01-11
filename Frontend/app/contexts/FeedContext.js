import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../config/URLs";

export const FeedContext = createContext()

export const FeedProvider = ({ children }) => {
    //STATEFUL VARIABLES
    const [feed, setFeed] = useState([])
    const [waitingOnResponse, setWaitingOnResponse] = useState(false)
    
    //STATELESS VARIABLES
    let statement = ''
    let photo = undefined

    //CONFIG VARIABLES
    const responseConfig = {
        chanceOfQuote: 85,
        chanceOfImage: 15,
        minResponseDelay: 1000,
        maxResponseDelay: 6000
    }

    //UTILITY FUNCTIONS
    const RandomNumber = (min, max) => {
        return Math.floor(Math.random() * max) + min
    }
    const ClearFeed = () => {
        setFeed([])
        setWaitingOnResponse(false)
        statement = ''
        photo = undefined

        GetQuote()
        GetImage()
    }
    const IsCommand = (input) => {
        return input.startsWith(':')
    }
    const RunCommand = (input) => {
        const str = input.toLowerCase()
        switch (str) {
            case ':clear':
                ClearFeed()
                break;
        
            default:
                break;
        }
    }

    //RESPONSE MANAGEMENT FUNCTIONS
    const GetQuote = () => {
        axios.get(`${BASEURL}/quote`)
        .then(r => {
            if(r.data.error !== undefined) {
                console.log(r.data.error)
                return
            }
            statement = r.data.quote
        }).catch(e => {
            console.log(`Error: ${e}`);
        })
    }
    const GetImage = () => {
        axios.get(`${BASEURL}/image`)
        .then(res => {
            if(res.data.error !== undefined) {
                console.log(res.data.error)
                return
            }
            photo = res.data
        }).catch(e => {
            console.log(`Error: ${e}`);
        })
    }
    const GetResponse = () => {
        const total = responseConfig.chanceOfImage + responseConfig.chanceOfQuote
        const poll = RandomNumber(0, total)
        const delay = RandomNumber(responseConfig.minResponseDelay, responseConfig.maxResponseDelay)
        
        if(poll <= responseConfig.chanceOfQuote) {
            setTimeout(() => AddMessage(statement, false), delay)
            GetQuote()
        } else {
            setTimeout(() => AddImageMessage(photo, false), delay)
            GetImage()
        }
    }

    //FEED FUNCTIONS
    const AddMessage = (content, sent) => {
        let currentFeed = feed
        currentFeed.push({
            sent: sent,
            content: content,
            isPhoto: false,
            photo: {}
        })

        if(sent === false) {
            setWaitingOnResponse(false)
        }
        setFeed(currentFeed)
        setFeed(feed => {
            return feed
        })
    }
    const AddImageMessage = (photo, sent) => {
        let currentFeed = feed
        currentFeed.push({
            sent: sent,
            content: '',
            isPhoto: true,
            photo: photo
        })

        if(sent === false) {
            setWaitingOnResponse(false)
        }
        setFeed(currentFeed)
        setFeed(feed => {
            return feed
        })
    }

    //USER INPUT FUNCTIONALITY
    const SendText = (message) => {
        if(IsCommand(message))
        {
            RunCommand(message)
            return
        }

        GetResponse()
        setWaitingOnResponse(true)

        AddMessage(message, true)
    }
    const SendImage = (base64, width, height) => {
        axios.post(`${BASEURL}/saveimage`, { imagesrc: base64, width, height })
        .then(res => {
            GetResponse()
            setWaitingOnResponse(true)

            AddImageMessage(res.data, true)
        }).catch(e => {
            console.log(`Failed To Save Image: ${e}`)
        })
    }

    //STARTUP FUNCTIONS
    useEffect(() => {
        GetImage()
        GetQuote()
    }, [])

    return (
        <FeedContext.Provider value={{ feed, waitingOnResponse, SendText, SendImage }}>
            {children}
        </FeedContext.Provider>
    )
}