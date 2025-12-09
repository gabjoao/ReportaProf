import { View, Text, Pressable } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { styles } from '@styles-components/NavBar';

const NavBar = ({ status }) => {
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    return (
        <View style={[styles.container, { paddingBottom: insets.bottom }]}>
            {status === 'ocorrencia' ? (
                <LinearGradient
                    colors={['#7f1616', '#e73030']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 100,
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            ) : (
                <LinearGradient
                    colors={['#e73030', '#7f1616']}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 0,
                        height: 100,
                    }}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                />
            )}

            <View style={styles.content}>
                <Pressable
                    style={{ alignItems: 'center' }}
                    onPress={() => navigation.navigate('Home')}
                >
                    {status === 'ocorrencia' ? (
                        <>
                            <AntDesign name="alert" size={30} color="white" />
                            <Text style={[styles.text, { color: 'white' }]}>
                                Ocorrência
                            </Text>
                        </>
                    ) : (
                        <>
                            <AntDesign name="alert" size={30} color="#ff9191" />
                            <Text style={[styles.text, { color: '#ff9191' }]}>
                                Ocorrência
                            </Text>
                        </>
                    )}
                </Pressable>

                <Pressable
                    style={{ alignItems: 'center' }}
                    onPress={() => navigation.navigate('Historico')}
                >
                    {status === 'ocorrencia' ? (
                        <>
                            <AntDesign
                                name="history"
                                size={30}
                                color="#ff9191"
                            />
                            <Text style={[styles.text, { color: '#ff9191' }]}>
                                Histórico
                            </Text>
                        </>
                    ) : (
                        <>
                            <AntDesign name="history" size={30} color="white" />
                            <Text style={[styles.text, { color: 'white' }]}>
                                Histórico
                            </Text>
                        </>
                    )}
                </Pressable>
            </View>
        </View>
    );
};

export default NavBar;