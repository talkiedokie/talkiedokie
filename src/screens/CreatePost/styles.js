import { StyleSheet } from "react-native";


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        
    },

    textInput:{
        // width: '100%',
        height: 150,
        backgroundColor: '#fff',
        margin: 10,
    },

    textInputHashtag:{
        // width: '100%',
        height: 60,
        backgroundColor: '#fff',
        margin: 10,
    },

    publishButton: {
        backgroundColor: '#a772c4',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10,
        height: 50,
    },

    publishText:{
        color: "#fff",
        fontSize: 16,
        fontWeight: 'bold',
    },

    viewers: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        margin: 10,
        padding: 5,
        zIndex: 9,
    },

    viewersText: {
        // marginVertical: 2,
        fontSize: 14,
        // backgroundColor: 'yellow',
        alignSelf: 'center',
    },


    viewersTouchable: {
        // backgroundColor: 'orange',
        alignSelf: 'center',
        // paddingHorizontal: 20,
     //    marginHorizontal: 20,
    },

    viewersTouchableText:{
        // marginVertical: 0,
        fontSize: 14,
        
    },


    comments: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "#fff",
        margin: 10,
        padding: 5,
    },

    commentsText: {
        alignSelf: 'center',
    },


    commentsSwitch: {
        alignSelf: 'center',
    },


    modalContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
    },
    modal:{
        backgroundColor: 'rgba(167, 114, 196, 0.89)',
        borderRadius: 10,
        zIndex: 9999,
    },

    option: {
        alignItems: 'flex-start',
        zIndex: 999,
    },

    optionsText: {
        margin: 20,
        fontSize: 20,
        // fontWeight: 'bold',
        zIndex: 999,
        color: '#fff',
    },

    

    

});


export default styles;