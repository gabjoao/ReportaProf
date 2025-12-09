import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../styles/components/BtnSec';

export default ({ text, onPress }) => {
    return (
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <LinearGradient
                colors={['rgba(219, 39, 39, 1)', 'rgba(169, 37, 32, 1)']}
                style={StyleSheet.absoluteFill}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
            />
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
};
