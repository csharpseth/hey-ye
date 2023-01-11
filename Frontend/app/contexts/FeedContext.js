import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { BASEURL } from "../config/URLs";

export const FeedContext = createContext()

export const FeedProvider = ({ children }) => {

    const [feed, setFeed] = useState([])
    const [statement, setStatement] = useState('')
    const [waitingOnResponse, setWaitingOnResponse] = useState(false)

    const GetQuote = () => {
        axios.get(`https://api.kanye.rest/`)
        .then(r => {
            setStatement(r.data.quote)
        }).catch(e => {
            console.log(`Error: ${e}`);
        })
    }

    const GetImage = () => {
        const num = RandomNumber(1, 13)

        axios.get(`${BASEURL}/kanye/kanye-${num}.jpg`)
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

    const SendText = (message) => {
        GetQuote()
        AddMessage(message, true)
        setWaitingOnResponse(true)
        setTimeout(() => AddMessage(statement, false), RandomNumber(2000, 8000))
    }

    const SendImage = (base64, width, height) => {
        axios.post(`${BASEURL}/saveimage`, { imagesrc: base64, width, height })
        .then(res => {
            GetQuote()
            AddImageMessage(res.data, true)
            setWaitingOnResponse(true)
            setTimeout(() => AddMessage(statement, false), RandomNumber(2000, 8000))
        }).catch(e => {
            console.log(`Failed To Save Image: ${e}`)
        })
    }

    useEffect(() => {
        GetQuote()
    }, [])

    return (
        <FeedContext.Provider value={{ feed, waitingOnResponse, SendText, SendImage }}>
            {children}
        </FeedContext.Provider>
    )
}