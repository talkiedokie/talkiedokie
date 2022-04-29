import React, {useRef, useState, useEffect} from 'react';
import {View, FlatList, Dimensions} from 'react-native';
import Post from '../../components/Post';
import posts from '../../../data/posts';
import styles from '../../components/Post/styles.js';
import * as GlobalVariable from '../../Strings';

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [seed, setSeed] = useState(0);
    const [refreshing, setRefreshing] = useState(false);

    useEffect( () => {
        //get list of videos
        getVideos();
        console.log("SEED : " + seed);
    }, [seed]);

    handleRefresh = () => {
        console.log("HANDLE REFRESH");
        setRefreshing(true);
        //getVideos();
        const new_seed = seed +  1;
        setSeed(new_seed);
    };


    const getVideos = async () => {
        const POST_URL = GlobalVariable.base_url+'ajax.php';
        try {
            console.log("GET VIDEOS (WEB SERVICE)");
            var details = {
                'action': 'list_videos',
            };

            var formBody = [];
            for (var property in details) {
                var encodedKey = encodeURIComponent(property);
                var encodedValue = encodeURIComponent(details[property]);
                formBody.push(encodedKey + "=" + encodedValue);
            }
            formBody = formBody.join("&");
            
            var final_url = POST_URL+"?"+formBody;
            console.log("GET VIDEOS (Final url) : " + final_url);

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
                setPosts(json.videos);
            }else{
                console.log('Unable to send data!');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View >
            
            <FlatList
                data={posts}
                renderItem={({item}) => <Post post={item} />}
                showsVerticalScrollIndicator={false}
                snapToInterval={Dimensions.get('window').height - 20}
                snapToAlignment={'start'}
                decelerationRate={'fast'}
                refreshing={refreshing}
                onRefresh={this.handleRefresh}
            />
            
        </View>
    );
}

export default Home;