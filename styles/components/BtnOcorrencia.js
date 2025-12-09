import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        width: 300,
        height: 45,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    itens: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    label: {
        fontFamily: 'Lexend',
        fontSize: 14,
        color: 'black',
        fontWeight: '700',
    }
});