import React, {useRef, useState, useEffect} from 'react';
import {View, Text, TextInput, TouchableOpacity, Switch, Modal, Alert} from 'react-native';
import { Storage } from 'aws-amplify';
import {useRoute, useNavigation} from '@react-navigation/native';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import styles from './styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { ModalPicker } from './ModalPicker';

import * as GlobalVariable from '../../Strings';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



import { Video } from 'react-native-compressor';

const CreatePost = () => {
    const route = useRoute();
    const [description, setDescription] = useState('');
    const [hashtags, setHashtags] = useState('');
    const [notes, setNotes] = useState('');
    const [videoKey, setVideoKey] = useState(null);
    const [toggled, setToggled] = useState(true);
    const navigation = useNavigation();



    toggleSwitch = (value) => {
        //this.setState({toggled: value})
        setToggled(value);
    }

    useEffect( () => {
        //const file = compressVideo(route.params.videoUri);
        testCompress(route.params.videoUri);
        //console.log("COMPRESSED VIDEO: " + file.path);
        // uploadToStorage(route.params.videoUri);
    }, []);

    const uploadToStorage = async (imagePath) => {
        
        try {

          const response = await fetch(imagePath);
          console.log("Fetch Response: " + response);
          const blob = await response.blob();
          console.log("BLOB: " + blob);
      
          const filename = `${uuidv4()}.mp4`;
          console.log("Filename: " + filename);
          console.warn("Video has been successfully uploaded to AWS S3 Server");
      
          const s3Response = await Storage.put(filename, blob);
          
      
          console.log("S3 RESPONSE" + s3Response);
          console.log("S3 RESPONSE KEY" + s3Response.key);
           
          setVideoKey(s3Response.key);
          //Alert.alert("Video has been successfully uploaded to AWS S3 Server")
      
      
        } catch (e) {
          console.error(e)
        }
      
    }

   


    const testCompress = async (sourceVideo) => {
        console.log("TEST COMPRESS");
        console.log("sourceVideo: " + sourceVideo);
        if (!sourceVideo) return;
        try {
          const dstUrl = await Video.compress(
            sourceVideo,
            {
              compressionMethod: 'auto',
              minimumFileSizeForCompress: 0,
              //getCancellationId: (cancellationId) =>
                //(cancellationIdRef.current = cancellationId),
            },
            (progress) => {
                //setCompressingProgress(progress);
            }
          );
          console.log({ dstUrl }, 'compression result');


          const response = await fetch(dstUrl);
          console.log("CV Fetch Response: " + response);
          const blob = await response.blob();
          console.log("CV  BLOB: " + blob);
      
          const filename = `${uuidv4()}.mp4`;
          console.log("CV Filename: " + filename);
          console.warn("CV Video has been successfully uploaded to AWS S3 Server");
      
          const s3Response = await Storage.put(filename, blob);
          
      
          console.log("CV  S3 RESPONSE" + s3Response);
          console.log("CV S3 RESPONSE KEY" + s3Response.key);
           
          setVideoKey(s3Response.key);
          
        } catch (error) {
          console.log({ error }, 'compression error');
          
        }
    };

    

    const onPublish = async () => {

        
        //POST API

        if(!videoKey){
            console.warn("Video is not yet uploaded");
            return;
        }

        const POST_URL = GlobalVariable.base_url+'ajax.php';
        try {
            console.log("NATIVE LOGIN (WEB SERVICE)");

            
            var details = {
                'action': 'add_video',
                'description': description,
                'hashtags': hashtags,
                'videoKey': videoKey,
                'notes': notes,
                'audience': chooseData,
                'comments_allowed': toggled,
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            var final_url = POST_URL+"?"+formBody;
            console.log("NATIVE LOGIN (Final url) : " + final_url);
            
           

            const result = await fetch( final_url, {
                method: 'GET',
                headers: {
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            });
            const json = await result.json();
            
            if(json){
                console.log("json " + json.message);

                if(json.status['status_code'] == "1"){
                    console.warn(json.message);

                    Alert.alert(
                        'Success',
                        'Video has been successfully published', // <- this part is optional, you can pass an empty string
                        [
                            {text: 'OK', onPress: () => navigation.navigate("Home", {screen: "Home"})},
                        ],
                        {cancelable: false},
                    );
                }else{
                    console.warn(json.message);
                    Alert.alert(
                        'Error Encountered',
                        'Failed to publish video', // <- this part is optional, you can pass an empty string
                        [
                          {text: 'OK', onPress: () => console.log('OK Pressed')},
                        ],
                        {cancelable: false},
                    );
                }
                
            }else{
                console.log('Unable to send data!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const [chooseData, setChooseData] = useState('Everyone');
    const [isModalVisible, setisModalVisible] = useState(false);

    console.log("isModalVisible: " + isModalVisible);
    const changeModalVisibility = (bool) => {
        setisModalVisible(bool);
    }

    console.log("Choose Data: " + chooseData);

    const setData = (option) => {
        setChooseData(option)
    }
    return (
        <KeyboardAwareScrollView>
            <View style={styles.container}>
                <TextInput
                    value={description}
                    placeholder={"Add Description"}
                    onChangeText={setDescription}
                    numberOfLines={5}
                    style={styles.textInput}
                />
                <TextInput
                    value={hashtags}
                    placeholder={"Hashtags"}
                    onChangeText={setHashtags}
                    numberOfLines={1}
                    style={styles.textInputHashtag}
                />
                

                <View style={styles.viewers}>
                    <Text style={styles.viewersText}>Who Can Watch the Video? </Text>
                    <TouchableOpacity
                        style={styles.viewersTouchable} 
                        onPress={() => changeModalVisibility(true)}>
                        <Text style={styles.viewersTouchableText}>{chooseData} <AntDesign name={'right'} size={14} color="black" /></Text>
                    </TouchableOpacity>
                </View>

                <Modal
                    transparent={true}
                    animationType='fade'
                    visible={isModalVisible} 
                    onRequestClose={() => changeModalVisibility(false)}
                >
                    <ModalPicker
                        changeModalVisibility={changeModalVisibility}
                        setData={setData}
                    />
                </Modal>

                <View style={styles.comments}>
                    <Text style={styles.commentsText}>Allow Comments</Text>
                    <Switch onValueChange={this.toggleSwitch} value={toggled} style={styles.commentsSwitch}/>
                </View>

                <TextInput
                    value={notes}
                    placeholder={"Add Notes"}
                    onChangeText={setNotes}
                    numberOfLines={5}
                    style={styles.textInput}
                />


                <TouchableOpacity style={styles.publishButton} onPress={onPublish}>
                    <Text style={styles.publishText}>PUBLISH</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAwareScrollView>
    );
};

export default CreatePost;