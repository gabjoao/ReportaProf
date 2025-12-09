import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itens: {
        marginTop: 60,
        display: 'flex',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        width: width*6, // aumenta a largura pra garantir rotação (para telas maiores)
        height: height,
        top: -100.27,
        left: -50.96,
        transform: [{ rotate: '30deg' }],
        backgroundColor: 'red',
    },

    h1: {
        fontSize: 24,
        fontFamily: 'Lexend',
        color: 'white',
        fontWeight: '400',
    },
    content: {
        position: 'absolute',
        top: 150,
        display: 'flex',
        marginTop: 40,
        width: '80%',
        justifyContent: 'space-around',
        height: 400,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    h2: {
        fontSize: 24,
        fontFamily: 'Lexend',
        color: '#c02623',
        fontWeight: '700',
        textAlign: 'center',
    },
    inputArea: {
        display: 'flex',
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: 'Lexend',
        color: 'black',
        fontWeight: '800',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        marginTop: 5,
        paddingHorizontal: 10,
        
    },
    inputInside: {
        flex: 1, 
        height: '100%',
        fontSize: 16,
    },
});