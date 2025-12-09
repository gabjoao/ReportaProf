import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    button: {
        width: 325,
        alignSelf: 'center',
        backgroundColor: '#ffffffff',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonText: {
        color: '#525252ff',
        fontFamily: 'Lexend',
        fontWeight: '700',
        fontSize: 16,
    },
});
