import { View, Text } from 'react-native';
import Header from '../components/Header';
import NavBar from '../components/NavBar';
import GradientIcon from '../components/GradientIcon';
import GradientText from '../components/GradientText';
import BtnNovaOcorrencia from '../components/BtnNovaOcorrencia';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../styles/screens/NovaOcorrencia';

export default () => {
    const navigation = useNavigation();

    return (
        <View style={{ height: '100%' }}>
            <Header />
            <View style={styles.container}>
                <GradientIcon
                    name="check-circle"
                    family="AntDesign"
                    size={160}
                    colors={['#235723ff', '#5ee24f']}
                />

                <View>
                    <GradientText
                        text="Sua ocorrência foi enviada!"
                        style={[{ fontWeight: 800 }, styles.h1]}
                    />

                    <Text style={styles.h2}>
                        Avisaremos você quando um orientador responder.
                    </Text>
                </View>

                <View>
                    <BtnNovaOcorrencia
                        text="VIZUALIZAR OCORRÊNCIA"
                        onPress={() => navigation.navigate('Historico')}
                    />
                    <BtnNovaOcorrencia
                        text="VOLTAR AO INÍCIO"
                        onPress={() => navigation.navigate('Home')}
                    />
                </View>
            </View>
            <NavBar />
        </View>
    );
};
