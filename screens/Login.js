import { View, Text, TextInput } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, Alert } from "react-native";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import BtnSec from "../components/BtnSec";
import { useNavigation } from '@react-navigation/native';
import * as api from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage';

export var KEY;

export default () => {

    const navigation = useNavigation();

    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');

    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
        }     catch (e) {
        // saving error
            console.error("Error saving data:", e);
        }
    }

    const handleLogin = async () => {
        if (user.trim() === '' || senha.trim() === '') {
            Alert.alert('Atenção', 'Por favor, preencha o usuário e a senha.');
            return;
        }

        const loginJson = { "username": user, "password": senha }
       
        KEY = await login(loginJson);

        if(KEY){
            await storeData('KEY', KEY);
            navigation.navigate("Home");
        }
        else Alert.alert('Atenção', 'Credenciais inválidas!');

    };
        
    const login = async (loginJson) => {
        try {
            const res = await api.fazerLogin(loginJson);
            const key = res.body;
            //console.log(key.access)
            return key.access;

        } catch (error) {
            console.error('Erro ao carregar dados:', error);
            return null;
        }
        
    }

    return (
        <SafeAreaView>
            <View style={styles.container} >
                <LinearGradient
                    colors={['rgba(219, 39, 39, 1)', 'rgba(169, 37, 32, 1)']}
                    style={styles.background}
                />

                <View style={styles.itens}>
                    <AntDesign name="alert" size={40} color="white" />
                    <Text style={styles.h1} >ReportaProf</Text>
                </View>


                <View style={styles.content} >
                    <Text style={styles.h2} >Login</Text>

                    <View style={styles.inputArea} >
                        <Text style={styles.inputLabel} >Usuário</Text>
                        <TextInput
                            style={styles.input}
                            value={user}
                            onChangeText={setUser}
                            placeholder="Usuario"
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
                    <BtnSec text="ENTRAR" onPress={handleLogin} />
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
    itens: {
        marginTop: 60,
        display: 'flex',
        alignItems: 'center',
    },
    background: {
        position: 'absolute',
        width: 1000,
        height: 570,
        top: -100.27,
        left: -50.96,
        transform: [{ rotate: '30deg' }],
        backgroundColor: 'red',
    },

    h1: {
        fontSize: 24,
        fontFamily: 'Lexend',
        color: 'white',
        fontWeight: '400',
    },
    content: {
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
    h2: {
        fontSize: 24,
        fontFamily: 'Lexend',
        color: '#c02623',
        fontWeight: '700',
        textAlign: 'center',
    },
    inputArea: {
        display: 'flex',
    },
    inputLabel: {
        fontSize: 16,
        fontFamily: 'Lexend',
        color: 'black',
        fontWeight: '800',
        marginTop: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        marginTop: 5,
    },
});

