import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        height: '100%',
        gap: 10,
    },
    texts: {
        marginTop: 20,
    },
    h1: {
        fontSize: 24,
        fontFamily: 'Lexend',
        textAlign: 'center',
        height: 30,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
        height: '45%',
        backgroundColor: '#e5e5e7ff',
        width: '85%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    observacao: {
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        width: 300,
        height: 120,
        backgroundColor: 'white',
    },
});
