import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        gap: 50
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
        height: '70%',
        backgroundColor: '#f9f9f9',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 30,
    },
    itemContainer: {
        backgroundColor: '#ffff',
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        gap: 5,
        width: 300,
        marginTop: 10,
    },
    itemH1: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#c02623'
    },
    itensContainer: {
        display: 'flex',
        marginTop: 20
    },
    textos: {
        fontFamily: 'Lexend',
        fontSize: 16,
        color: 'black',
        fontWeight: '600'
    },
    icon :{
        position: 'absolute',
        right: 15,
        top: '50%'
    }
});