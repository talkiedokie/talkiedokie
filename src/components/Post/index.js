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

const Post = (props) => {

  //const {post} = props;
  const [post, setPost] = useState(props.post);
  const [paused, setPaused] = useState(true);
  const [isLiked, setIsLiked] = useState(false);
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

  const onLikePress = () => {
    //disabled for now
    // const likesToAdd = isLiked ? -1 : 1;
    // setPost({...post, likes: post.likes + likesToAdd});
    // setIsLiked(!isLiked);
  }

  const onSharePress = () => {
  }

  const onCommentPress = () => {
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
                    <AntDesign name={'star'} size={20} color={isLiked ? 'red':'white'} />
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