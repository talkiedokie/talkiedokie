import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity
} from 'react-native';

import Video from 'react-native-video';
import styles from './styles';


import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';
import { Storage } from 'aws-amplify';

import VisibilitySensor from '@svanboxel/visibility-sensor-react-native';

import * as GlobalVariable from '../../Strings';

const Post = (props) => {

  //const {post} = props;
  const [post, setPost] = useState(props.post);
  const [paused, setPaused] = useState(true);
  const [isLiked, setIsLiked] = useState(post.is_liked);
  const [videoUri, setVideoUri] = useState('');

  const navigation = useNavigation();

  const onPlayPausePress = () => {
    //console.warn('Post');
    setPaused(!paused);
  };

  const onProfilePress = () => {
  }

  const onSearchPress = () => {
  }

  const onHomePress = () => {
  }

  const onInfoPress = () => {
  }


  const onLikePress = async () => {

    const POST_URL = GlobalVariable.base_url+'ajax.php';
    var details = {
      'action': 'like',
      'id': post.id,
      'operation': isLiked ? 'minus' : 'add',
    };

    var formBody = [];
    for (var property in details) {
        var encodedKey = encodeURIComponent(property);
        var encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    
    var final_url = POST_URL+"?"+formBody;
    console.log("Like Function URL : " + final_url);

    const result = await fetch( final_url, {
        method: 'GET',
        headers: {
            //'Content-Type': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
    });
    const json = await result.json();
  
    if(json){
        console.log("LIKE json " + json.message);
        if(json.status['status_code'] == "1"){
            console.warn(json.message);
            console.warn(json.likes);
            setPost({...post, likes: json.likes}); //setPost({...post, likes: post.likes + likesToAdd});
        }else{
            console.warn(json.message);
        }
    }else{
        console.log('Unable to send data!');
    }
    setIsLiked(!isLiked);
  }

  const onSharePress = () => {
  }

  const onCommentPress = () => {
    navigation.navigate("Comments", {video_id: post.id});
  }


  const uploadVideo = () => {
    navigation.navigate("Camera")
  }


  const getVideoUri = async () => {
    if (post.video_uri.startsWith('http')){
      console.log("Starts with HTTP: " + post.video_uri);
      setVideoUri(post.video_uri);
      console.log(videoUri);
    }else{
      setVideoUri(await Storage.get(post.video_uri));
      const NEW_VIDEO_URI = GlobalVariable.s3_uri+post.video_uri;
      console.log("NEW VIDEO URI: " + NEW_VIDEO_URI);
      setVideoUri(NEW_VIDEO_URI);
    }
  }



  useEffect( () => {
    getVideoUri();
  }, []);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
      <VisibilitySensor 
        onChange={ (isVisible) => { 
            return(
              console.log("isVisible "+ post.description + " ------ " + isVisible),
              isVisible?setPaused(false):setPaused(true)
            )  
          }
        }
      >
        <View >
          <Video
            // source={{uri: post.video_uri}} 
            source={{uri: videoUri}} // for s3
            //source={post.videoUri}
            style={styles.video}
            resizeMode={'cover'}
            repeat={true}
            paused={paused}
            playInBackground={false}
            ignoreSilentSwitch="ignore"
          />
          <View style={styles.overlay}></View>
          

          <View style={styles.uiContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={onProfilePress}>
                    <View style={styles.iconTransparent}>
                      <Ionicons name={'person'} size={20} color="white"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={onSearchPress}>
                  <View style={styles.iconTransparent}>
                    <AntDesign name={'search1'} size={20} color="white" />
                  </View>
                </TouchableOpacity>
            </View>
            <View style={styles.rightContainer}>
                {/* <Image 
                  style={styles.profilePicture} 
                  source={{uri: post.user.imageUri}} 
                /> */}
                <TouchableOpacity style={styles.iconContainer} onPress={onLikePress}>
                  <View style={styles.iconTransparent}>
                    <AntDesign name={'star'} size={20} color={isLiked ? 'yellow':'white'} />
                  </View>
                  <Text style={styles.statsLabel}>{post.likes}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={onSharePress}>
                  <View style={styles.iconTransparent}>
                    <FontAwesome name={'share'} size={20} color='white' />
                  </View>
                  <Text style={styles.statsLabel}>{post.shares}K</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.iconContainer} onPress={onCommentPress}>
                  <View style={styles.iconTransparent}>
                    <FontAwesome name={'commenting'} size={20} color='white' />
                  </View>
                  <Text style={styles.statsLabel}>{post.comments}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.handle}>@{post.author}</Text>
                <Text style={styles.description} >{post.description}</Text>
                <View style={styles.songRow}>
                  <Text style={styles.hashtags}>{post.hashtags}</Text>
                    {/* <Entypo name={"beamed-note"} size={24} color="white"/>*/}
                    
                </View>
              </View>
              
            </View>


            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.iconContainer} onPress={onHomePress}>
                  <View style={styles.iconTransparent}>
                    <Entypo name={'home'} size={20} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={uploadVideo}>
                  <View style={styles.iconTransparent}>
                    <AntDesign name={'plus'} size={30} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={onInfoPress}>
                  <View style={styles.iconTransparent}>
                    <Entypo name={'info'} size={20} color="white" />
                  </View>
                </TouchableOpacity>
            </View>
          </View>

        </View>
        </VisibilitySensor>
      </TouchableWithoutFeedback>


      

    </View>
  );

}
export default Post;