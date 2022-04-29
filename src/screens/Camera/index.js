import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
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
    if (isRecording) {
      camera.current.stopRecording();

    } else {
      const data = await camera.current.recordAsync({
        quality: RNCamera.Constants.VideoQuality['1080p'],
        maxDuration: 300, //30 Seconds
        maxFileSize: 50*1024*1024, //up to 20 MB
        orientation: "portrait",
      }).then(data => {
        console.log('data of startRecording', data)
        console.log("VIDEO URI: " + data.uri)

        
        setIsRecording(false) //automatically stop the video

        navigation.navigate("CreatePost", {videoUri: data.uri});
        // navigation.goBack();
      }).catch(e => {
        console.log('catch of startRecording', e)
      })
      
      
    }
  }



  const flipCamera = () => {
    if (cameraType == "front") {
      setCameraType("back")
    } else {
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
