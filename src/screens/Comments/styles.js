import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    // container: {
    //     flex: 1,
    //     // marginTop: StatusBar.currentHeight || 0,
    //     flexDirection: 'column',
    //     justifyContent: 'flex-end',
    //     backgroundColor: 'white',
    // },

    // commentView: {
    //     // flex: 1,
    //     // // marginTop: StatusBar.currentHeight || 0,
    //     // flexDirection: 'column',
    //     // justifyContent: 'space-between',
    //     backgroundColor: 'white',
    //     // marginTop: 0,
    //     zIndex: 1,
    // },  


    // commentList: {
    //     zIndex: 9,
    //     // flex: 1,
    //     // justifyContent: 'flex-end',
    //     //alignItems: 'center',
    // },

    // item: {
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'flex-start',
    //     // alignItems: 'center',
    //     backgroundColor: '#fff',
    //     padding: 5,
    //     marginVertical: 2,
    //     marginHorizontal: 16,
    // },
    

    // dp: {
    //     width: 60,
    //     height: 60, 
    //     resizeMode: 'contain',
    //     borderRadius: 40,
    //     borderWidth: 2,
    //     borderColor: '#4c4c4c',
    // },

    // commentPhoto: {
    //     padding: 10,
    // },

    // commentDetails:{
    //     flex: 1,
    //     flexDirection: 'column',
    //     padding: 10,
    //     marginLeft: 10,
    //     marginRight: 10,
    //     textAlign: 'left', 
    // },

    // content: {
    //     marginTop: 8,
    //     alignContent: 'flex-start', 
    //     fontSize: 14,
    // },

    // author:{
    //     fontSize: 18,
    //     fontWeight: 'bold',
    // },

    // date: {
    //     marginTop: 5,
    //     fontSize: 14,
    //     color: '#5f5f5f'
    // },

    // title: {
    //     fontSize: 32,
    // },


    // bottomContainer: {


    //     // position: 'absolute',
    //     // right: 0,
    //     // left: 0,
    //     // bottom: 0,
    //     // padding: 10,
    //     // width: '100%',
    //     flex: 1,
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     // alignItems: 'flex-end',
    //     // marginBottom: 10,
    //     backgroundColor: '#ffffff',
    //     zIndex: 99,
    //     borderTopWidth: 5,
    //     borderColor: '#4c4c4c',

        
    //   },

    // textInput:{
    //     // width: '100%',
    //     flex: 1,
    //     alignItems: 'flex-start',
    //     height: 60,
    //     backgroundColor: '#e7e7e7',
    //     // margin: 10,
    //     // marginVertical: 8,
    //     // marginHorizontal: 16,
    //     padding: 20,
    //     color: '#4c4c4c',
    //     // width: '100%',
    // },

    // addCommentButton: {
    //     alignItems: 'flex-end',
    //     backgroundColor: '#4c4c4c',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     // margin: 10,
    //     height: 60,
    //     padding: 10,
    //     // width: '100%',
    // },

    // addCommentText:{
    //     color: "#fff",
    //     fontSize: 16,
    //     fontWeight: 'bold',
        
    // },

    keyboardContainer: {
        flex: 1,
        justifyContent: 'flex-start',
    },

    container: {
        justifyContent: 'flex-end',
        flex: 1,
        backgroundColor: 'white',

    },

    containerInput: {
        padding: 10,
        flexDirection: 'row',
        borderTopWidth: 1,
        borderColor: '#4c4c4c',
    },

    input: {
        // backgroundColor: 'lightgrey',
        borderRadius: 4,
        flex: 1,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        height: 60,
        backgroundColor: '#e7e7e7',
        padding: 20,
        color: '#4c4c4c',
    },

    addCommentButton: {
        // alignItems: 'flex-end',
        backgroundColor: '#4c4c4c',
        // alignItems: 'center',
        // justifyContent: 'center',
        // margin: 10,
        height: 60,
        padding: 10,
        // width: '100%',
    },


    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
        padding: 5,
        marginVertical: 2,
        marginHorizontal: 16,
    },

    commentPhoto: {
        padding: 10,
    },

    dp: {
        width: 60,
        height: 60, 
        resizeMode: 'contain',
        borderRadius: 40,
        borderWidth: 2,
        borderColor: '#4c4c4c',
    },

    commentDetails:{
        flex: 1,
        flexDirection: 'column',
        padding: 10,
        marginLeft: 10,
        marginRight: 10,
        textAlign: 'left', 
    },

    author:{
        fontSize: 18,
        fontWeight: 'bold',
    },

    content: {
        marginTop: 8,
        // alignContent: 'flex-start', 
        fontSize: 14,
    },

    date: {
        marginTop: 5,
        fontSize: 14,
        color: '#5f5f5f'
    },
});

export default styles;