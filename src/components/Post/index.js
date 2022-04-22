import React, {useState} from 'react';
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


import Bunny from '../../assets/videos/bunny.mp4'
import VideoItem from '../../assets/videos/bunny.mp4'


import { useNavigation } from '@react-navigation/native';

const Post = (props) => {

  //const {post} = props;
  const [post, setPost] = useState(props.post);
  const [paused, setPaused] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const navigation = useNavigation();

  const onPlayPausePress = () => {
    //console.warn('Post');
    setPaused(!paused);
  };

  const onLikePress = () => {
    const likesToAdd = isLiked ? -1 : 1;
    setPost({...post, likes: post.likes + likesToAdd});
    setIsLiked(!isLiked);
  }


  const uploadVideo = () => {
    navigation.navigate("Camera")
  }



  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={onPlayPausePress}>
        <View >
          <Video
            source={{uri: post.videoUri}}
            //source={post.videoUri}
            style={styles.video}
            resizeMode={'cover'}
            repeat={true}
            paused={paused}
          />
          <View style={styles.overlay}></View>
          

          <View style={styles.uiContainer}>
            <View style={styles.topContainer}>
                <TouchableOpacity style={styles.iconContainer} >
                    <View style={styles.iconTransparent}>
                      <Ionicons name={'person'} size={20} color="white"/>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} >
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
                
                <View style={styles.iconContainer}>
                    <View style={styles.iconTransparent}>
                      <FontAwesome name={'share'} size={20} color='white' />
                    </View>
                    <Text style={styles.statsLabel}>{post.shares}K</Text>
                </View>

                <View style={styles.iconContainer}>
                    <View style={styles.iconTransparent}>
                      <FontAwesome name={'commenting'} size={20} color='white' />
                    </View>
                    <Text style={styles.statsLabel}>{post.comments}</Text>
                </View>
            </View>

            <View style={styles.detailsContainer}>
              <View>
                <Text style={styles.handle}>@{post.user.username}</Text>
                <Text style={styles.description} >{post.description}</Text>
                <View style={styles.songRow}>
                  <Text style={styles.hashtags}>{post.hashtags}</Text>
                    {/* <Entypo name={"beamed-note"} size={24} color="white"/>*/}
                    
                </View>
              </View>
              
            </View>


            <View style={styles.bottomContainer}>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTransparent}>
                    <Entypo name={'home'} size={20} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer} onPress={uploadVideo}>
                  <View style={styles.iconTransparent}>
                    <AntDesign name={'plus'} size={30} color="white" />
                  </View>
                </TouchableOpacity>
                <TouchableOpacity style={styles.iconContainer}>
                  <View style={styles.iconTransparent}>
                    <Entypo name={'info'} size={20} color="white" />
                  </View>
                </TouchableOpacity>
            </View>
          </View>

        </View>
        
      </TouchableWithoutFeedback>


      

    </View>
  );

}
export default Post;