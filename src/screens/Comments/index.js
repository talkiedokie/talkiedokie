import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TouchableOpacity, Alert, Image, FlatList, TextInput, KeyboardAvoidingView, Keyboard} from 'react-native';

import {useRoute, useNavigation} from '@react-navigation/native';

import * as GlobalVariable from '../../Strings';
import styles from './styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import profile_photo from '../../assets/images/profile.jpeg'


import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';


const Comments = () => {
    const [posts, setPosts] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [seed, setSeed] = useState(0);
    const [refreshing, setRefreshing] = useState(false);
    const route = useRoute();


    const [keyboardStatus, setKeyboardStatus] = useState(false);

    useEffect( () => {
        getComments(route.params.video_id);
    }, [seed]);

    const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
        setKeyboardStatus(true);
        console.log("Keyboard Shown");
    });
    
    const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
        setKeyboardStatus(false);
        console.log("Keyboard Hidden");
    });



    const getComments = async () => {
        const POST_URL = GlobalVariable.base_url+'ajax.php';
        try {
            console.log("GET COMMENTS (WEB SERVICE)");
            var details = {
                'action': 'get_video_comments',
                'video_id': route.params.video_id,
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            var final_url = POST_URL+"?"+formBody;
            console.log("GET VIDEO COMMENTS (Final url) : " + final_url);

            const result = await fetch( final_url, {
                method: 'GET',
                headers: {
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            });
            const json = await result.json();
            setRefreshing(false);
            setPosts([]);
            if(json){
                console.log("json " + json.message);
                setPosts(json.comments);
            }else{
                console.log('Unable to send data!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    const addComment = async () => {

        const POST_URL = GlobalVariable.base_url+'ajax.php';
        try {
            console.log("ADD COMMENT (WEB SERVICE)");
            var details = {
                'action': 'add_comment',
                'video_id': route.params.video_id,
                'content': newComment,
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            var final_url = POST_URL+"?"+formBody;
            console.log("ADD COMMENT (Final url) : " + final_url);

            const result = await fetch( final_url, {
                method: 'GET',
                headers: {
                    //'Content-Type': 'application/json',
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
            });
            const json = await result.json();
            setPosts([]);
            if(json){
                console.log("json " + json.message);
                if(json.status['status_code'] == "1"){
                    const new_seed = seed +  1;
                    setSeed(new_seed);
                    setNewComment("");
                    // Alert.alert(
                    //     'Success',
                    //     'Comment has been successfully added', // <- this part is optional, you can pass an empty string
                    //     [
                    //         {text: 'OK', onPress: () => {
                    //                 const new_seed = seed +  1;
                    //                 setSeed(new_seed);
                    //                 setNewComment("");
                    //             }
                    //         },
                    //     ],
                    //     {cancelable: false},
                    // );
                }else{
                    console.warn(json.message);
                    Alert.alert(
                        'Error Encountered',
                        'Failed to add comment', // <- this part is optional, you can pass an empty string
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

    handleRefresh = () => {
        console.log("HANDLE REFRESH");
        setRefreshing(true);
        //getVideos();
        const new_seed = seed +  1;
        setSeed(new_seed);
    };

    const Item = ({ content, date, author }) => (
        <View style={styles.item}>
            <View style={styles.commentPhoto}>
                <Image source={profile_photo} style={styles.dp} />
            </View>
            <View style={styles.commentDetails}>
                <Text style={styles.author}>{author}</Text>
                <Text style={styles.content}>{content}</Text>
                <Text style={styles.date}>{date}</Text>
            </View>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item content={item.content}  date={item.date_added} author={item.username}/>
    );

    return (
        // <KeyboardAwareScrollView style={{backgroundColor: 'white'}}>
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.keyboardContainer}
         >
            <View style={styles.container}>
                {/* <View style={styles.commentView} > */}
                    {/* <FlatList
                        data={posts}
                        renderItem={({item}) => <Post post={item} />}
                        showsVerticalScrollIndicator={false}
                        snapToInterval={Dimensions.get('window').height - 20}
                        snapToAlignment={'start'}
                        decelerationRate={'fast'}
                        //refreshing={refreshing}
                        //onRefresh={this.handleRefresh}
                    /> */}
                    <FlatList
                        data={posts}
                        renderItem={renderItem}
                        keyExtractor={item => item.id}
                        // snapToAlignment={'start'}
                        // decelerationRate={'fast'}
                        refreshing={refreshing}
                        onRefresh={this.handleRefresh}
                        showsVerticalScrollIndicator={true}
                        // style={{minHeight: '100%'}}
                    />

                    <View style={styles.containerInput}>
                        <TextInput
                            value={newComment}
                            placeholder={"Add Comment..."}
                            onChangeText={setNewComment}
                            numberOfLines={1}
                            style={styles.input}
                        />
                        <TouchableOpacity style={styles.addCommentButton} onPress={addComment}>
                                {/* <Text style={styles.addCommentText}>ADD COMMENT</Text> */}
                                {/* <Feather name={'send'} size={30} color="white"/> */}
                                <Ionicons name="arrow-up-circle" size={35} color={'white'} />
                        </TouchableOpacity>
                    </View>
                    { keyboardStatus && 
                        <View style={{ height: 60 }} />
                    }
                {/* </View> */}
                
            </View>
            </KeyboardAvoidingView>
        // </KeyboardAwareScrollView>
    );
};

export default Comments;
