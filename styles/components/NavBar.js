import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container:{
        position: 'absolute',
        height: 100,
        width: '100%',
        bottom: 0,
    },
    content: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '100%',
        paddingTop: 15,
    },
    text :{
        color: 'white',
        fontFamily: 'Lexend'
    }
});