//REACT::
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useContext, useEffect, useRef, useState } from 'react';

//EXPO::
import { Camera, CameraType } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library'

//CONTEXT::
import { FeedContext } from '../../contexts/FeedContext';

//CONFIG::
import Colors from '../../config/Colors';

function CameraScreen({navigation}, props) {
    const [hasCameraPermissions, setHasCameraPermissions] = useState()
    const [hasMediaPermissions, setHasMediaPermissions] = useState()
    const [photo, setPhoto] = useState()
    const [type, setType] = useState(CameraType.back)

    const { SendImage } = useContext(FeedContext)

    const cameraRef = useRef(null)

    useEffect(() => {
        (async () => {
            const cameraPermission = await Camera.requestCameraPermissionsAsync()
            const mediaPermission = await MediaLibrary.requestPermissionsAsync()

            setHasCameraPermissions(cameraPermission)
            setHasMediaPermissions(mediaPermission)
        })()
    }, [])

    if (hasCameraPermissions === undefined) {
        return <Text>Requesting Camera Permissions...</Text>
    }else if(hasCameraPermissions === false) {
        return <Text>Requires Permission To Use Camera!</Text>
    }
    
    const SwitchCamera = () => {
        setType(type === CameraType.back ? CameraType.front : CameraType.back)
    }

    const CapturePicture = async() => {
        const options = {
            quality: 1,
            base64: true,
            exif: false,
        }

        const newPhoto = await cameraRef.current.takePictureAsync(options)
        setPhoto(newPhoto)
    }

    if(photo) {

        return (
            <View style={styles.container}>
                <Image style={styles.preview} source={{ uri: "data:image/jpg;base64," + photo.base64 }} />

                <TouchableOpacity style={[styles.icon, styles.accept]} onPress={() => {
                    SendImage(photo.base64, photo.width, photo.height)
                    setTimeout(() => {
                        setPhoto(undefined)
                        navigation.navigate('Home')
                    }, 200)
                }}>
                    <Image source={require('../../assets/accept-icon.png')} style={styles.fillImage} />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.icon, styles.delete]} onPress={() => {
                    setPhoto(undefined)
                }}>
                    <Image source={require('../../assets/delete-icon.png')} style={styles.fillImage} />
                </TouchableOpacity>
            </View>
        )
    }

    return (
        <Camera style={styles.container} type={type} ref={cameraRef}>
            <TouchableOpacity style={styles.backArrow} onPress={() => {navigation.navigate('Home')}}>
                <Image source={require('../../assets/back-icon.png')} style={styles.fillImage} />
            </TouchableOpacity>

            <TouchableOpacity style={styles.switchButton} onPress={SwitchCamera}>
                <Image source={require('../../assets/switch-icon.png')} style={styles.fillImage} />
            </TouchableOpacity>

            <View style={styles.interactionBar}>
                
                <View style={styles.captureButtonHighlight}>
                    <TouchableOpacity style={styles.captureButton} onPress={CapturePicture}/>
                </View>
            </View>
        </Camera>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    interactionBar: {
        position: 'absolute',
        bottom: 15,
        width: '100%',
        height: 70,
        justifyContent: 'center',
        alignItems: 'center'
    },
    captureButton: {
        backgroundColor: Colors.White,
        width: 60,
        height: 60, 
        borderRadius: 30
    },
    captureButtonHighlight: {
        width: 70,
        height: 70,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: Colors.White,

        justifyContent: 'center',
        alignItems: 'center'
    },
    backArrow: {
        position: 'absolute',
        left: 10,
        top: 20,

        width: 30,
        height: 30
    },
    switchButton: {
        position: 'absolute',
        right: 10,
        top: 20,

        width: 30,
        height: 30
    },
    fillImage:{
        width: '100%',
        height: '100%'
    },
    capture: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        zIndex: 10,
        backgroundColor: Colors.White
    },
    icon: {
        width: 60,
        height: 60,
        bottom: 10,
        position: 'absolute',
        overflow: 'hidden',
        borderRadius: 50
    },
    accept: {
        left: 10,
        backgroundColor: Colors.Green
    },
    delete: {
        right: 10,
        backgroundColor: Colors.Red
    },
    preview: {
      alignSelf: 'stretch',
      flex: 1
    }
})

export default CameraScreen;