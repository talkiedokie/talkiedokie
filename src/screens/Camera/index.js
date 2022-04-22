import React, {useEffect, useState, useRef} from 'react';
import {View, Text, TouchableOpacity, } from 'react-native';
import { RNCamera } from 'react-native-camera';


import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

import { useNavigation } from '@react-navigation/native';





const Camera = () => {

    const navigation = useNavigation();
    const [isRecording, setIsRecording] = useState(false);
    const [cameraType, setCameraType] = useState('front');
    const camera = useRef();

    const onRecord = async () => {
        if (isRecording){
            camera.current.stopRecording();
            
        }else{
            const data = await camera.current.recordAsync();
            console.log("VIDEO URI: " + data.uri)
            uploadToStorage(data.uri)
        }
    }

    const flipCamera = () => {
        if (cameraType == "front"){
            setCameraType("back")
        }else{
            setCameraType("front")
        }
    }

    const closeWindow = () => {
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
          <RNCamera  
            ref={camera}
            onRecordingStart={() => setIsRecording(true)}
            onRecordingEnd={() => setIsRecording(false)}
            style={styles.preview}
            type={cameraType}
          />
          <TouchableOpacity 
            onPress={onRecord} 
            style={isRecording ? styles.buttonStop : styles.buttonRecord}> 
          </TouchableOpacity>


          <TouchableOpacity 
            onPress={closeWindow} 
            style={styles.closeWindow}>
                <View style={styles.iconTransparent}>
                    <AntDesign name={'close'} size={20} color="white" />
                </View> 
          </TouchableOpacity>

          <TouchableOpacity 
            onPress={flipCamera} 
            style={styles.flipCamera}> 
            <View style={styles.iconTransparent}>
                <Ionicons name={'md-camera-reverse-outline'} size={20} color="white" />
            </View>
          </TouchableOpacity>
      </View>
    );
};

export default Camera;
