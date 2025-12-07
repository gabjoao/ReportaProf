import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import NavBar from "../components/NavBar";
import GradnentIcon from '../components/GradnentIcon';
import GradientText from "../components/GradientText";
import BtnNovaOcorrencia from "../components/btnNovaOcorrencia";
import { useNavigation } from '@react-navigation/native';

export default () => {

    const navigation = useNavigation();

    return(
        <View style={{height: '100%'}} >
            <Header />
            <View style={styles.container} >
    
            <GradnentIcon
                    name='check-circle'
                    family='AntDesign'
                    size={160}
                    colors={['#235723ff', '#5ee24f']}
                />

                <View>
                    <GradientText
                        text="Sua ocorrência foi enviada!"
                        style={[{ fontWeight: 800 }, styles.h1]}
                    />

                    <Text style={styles.h2} >Avisaremos você quando um orientador responder.</Text>
                </View>
               

                <View>
                    <BtnNovaOcorrencia text='VIZUALIZAR OCORRÊNCIA' onPress={() => navigation.navigate('Historico')} />
                    <BtnNovaOcorrencia text='VOLTAR AO INÍCIO' onPress={() => navigation.navigate('Home')} />
                </View>
                

            </View>
            <NavBar />
        </View>

    );

}

const styles = StyleSheet.create({
    container:{
        alignItems: 'center',
        marginTop: 80,
        gap: 20,
    },

    h1: {
        fontSize: 24,
        fontFamily: 'Lexend',
        textAlign: 'center',
        height: 30,
    },
    h2: {
        fontSize: 20,
        fontFamily: 'Lexend',
        textAlign: 'center',
        
    },
});