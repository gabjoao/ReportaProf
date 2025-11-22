import { View, Text, TextInput} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Alert } from "react-native";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import BtnSec from "../components/BtnSec";
import { useNavigation } from '@react-navigation/native';

export default () =>{

    const navigation = useNavigation();

    const [cpf, setCpf] = useState('');
    const [senha, setSenha] = useState('');

    const handleLogin = () => {
        if (cpf.trim() === '' || senha.trim() === '') {
            Alert.alert('Atenção', 'Por favor, preencha o CPF e a senha.');
            return;
        }

        // lógica de validação do login....

        navigation.navigate('Home');
  }

    return (
        <SafeAreaView>
            <View style={styles.container} >
                <LinearGradient 
                    colors={['rgba(219, 39, 39, 1)', 'rgba(169, 37, 32, 1)']}
                    style={styles.background}
                />

                <View  style={styles.itens}>
                    <AntDesign name="alert" size={40} color="white" />
                    <Text style={styles.h1} >ReportaProf</Text>
                </View>
               

                <View style ={styles.content} >
                    <Text style={styles.h2} >Login</Text>

                    <View style={styles.inputArea} >
                        <Text style={styles.inputLabel} >CPF</Text>
                        <TextInput 
                            style={styles.input}
                            value={cpf}
                            onChangeText={setCpf}
                            keyboardType="numeric"
                            placeholder="000.000.000-00"
                        />

                        <Text style={styles.inputLabel} >Senha</Text>
                        <TextInput 
                            style={styles.input}
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={true}
                            placeholder="********"  
                        />

                    </View>
                    <BtnSec text="ENTRAR" onPress={handleLogin}   />
                </View>
            </View>
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    itens:{
        marginTop: 60,
        display: 'flex',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        width: 630,
        height: 370,
        top: -70.27,
        left: -78.96,
        transform: [{ rotate: '30deg'}],
        backgroundColor: 'red',
    },

    h1: {
        fontSize: 24,
        fontFamily: 'Lexend',
        color: 'white',
        fontWeight: '400',
    },
    content:{
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
    h2:{
        fontSize: 24,
        fontFamily: 'Lexend',
        color: '#c02623',
        fontWeight: '700',
        textAlign: 'center',
    },
    inputArea:{
        display: 'flex',
    },
    inputLabel:{
        fontSize: 16,
        fontFamily: 'Lexend',
        color: 'black',
        fontWeight: '800',
        marginTop: 10,
    },
    input:{
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
});