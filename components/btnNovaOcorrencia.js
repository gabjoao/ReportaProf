import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default ({text, onPress}) => {

    return (
        <TouchableOpacity style={styles.button}
            onPress={onPress} 
        >
            <LinearGradient 
                colors={['#ffffffff', '#dbdbdbff']}
                style={StyleSheet.absoluteFill} 
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        width: 325,
        alignSelf: 'center',
        backgroundColor: '#ffffffff',
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
        color: '#525252ff',
        fontFamily: 'Lexend',
        fontWeight: '700',
        fontSize: 16,
    }
});
