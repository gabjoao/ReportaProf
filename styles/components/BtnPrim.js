import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button:{
        width: 250,
        alignSelf: 'center',
        backgroundColor: '#55cc47',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText:{
        color: 'white',
        fontFamily: 'Lexend',
        fontWeight: '700',
        fontSize: 16,
    }
});
