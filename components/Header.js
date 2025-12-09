import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styles } from '../styles/components/Header';

export default function Header() {
    const insets = useSafeAreaInsets();

    return (
        <View style={{ paddingTop: insets.top }}>
            <LinearGradient
                colors={['rgba(219, 39, 39, 1)', 'rgba(169, 37, 32, 1)']}
                style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    height: 100,
                }}
            />

            <View style={styles.content}>
                <Text style={styles.title}>ReportaProf</Text>
            </View>
        </View>
    );
}
