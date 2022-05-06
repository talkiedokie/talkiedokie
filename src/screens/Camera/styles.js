import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    container:{ 
        // alignContent: 'center',
        // textAlign: 'center',
        flex: 1,
        flexDirection: 'column',
        backgroundColor: 'black',
    },

    preview:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },

    buttonRecord :{
        alignSelf: 'center',
        marginVertical: 10,
        height: 50,
        width: 50,
        borderRadius: 25,
        borderWidth: 10,
        borderColor: 'rgba(255, 255, 255, 0.7)',
        backgroundColor: '#ff4343',
        alignItems: 'center',
        alignContent: 'center',
    },

    buttonStop:{
        alignSelf: 'center',
        marginVertical: 2,
        height: 30,
        width: 30,
        borderRadius: 3,
        borderColor: 'rgba(255, 255, 255, 0.8)',
        backgroundColor: '#ff4343',
    },

    chooseGallery: {
        // alignSelf: 'flex-start',
        position: 'absolute',
        left: 0,
        bottom: 10,
        // marginVertical: 10,
    },

    flipCamera:{
        position: 'absolute',
        right: 0,
        top: 20,
        // height: 60,
        // width: 60,
        // borderRadius: 25,
        // borderWidth: 1,
        // borderColor: 'rgba(255, 255, 255, 0.2)',
        // backgroundColor: 'green',
    },

    

    closeWindow:{
        position: 'absolute',
        left: 0,
        top: 20,
    },

    iconTransparent: {
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        padding: 10,
        borderRadius: 100,
        borderWidth: 1,
        borderColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,
        elevation: 24,
    },

    uploadButton: {

    },
});

export default styles;