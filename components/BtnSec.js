import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';

export default ({text, onpress}) => {

    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.button}
            onPress={ () => navigation.navigate(onpress)} 
        >
            <LinearGradient 
                colors={['rgba(219, 39, 39, 1)', 'rgba(169, 37, 32, 1)']}        
            />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button:{
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#c02623',
        padding: 15,
        borderRadius: 5,
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
