import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';
import BtnSec from "../components/BtnSec";
import { useNavigation } from '@react-navigation/native';
import * as api from '../utils/api'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { styles } from '../styles/screens/Login'

let KEY;

export default () => {

    const navigation = useNavigation();

    const [user, setUser] = useState('');
    const [senha, setSenha] = useState('');
    const [hidePass, setHidePass] = useState(true);

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
                        <View style={styles.passwordContainer}>
                        <TextInput
                            style={styles.inputInside}
                            value={senha}
                            onChangeText={setSenha}
                            placeholder="********"
        
                            secureTextEntry={hidePass} 
                        />

                        <TouchableOpacity 
                            style={styles.iconButton} 
                            onPress={() => setHidePass(!hidePass)}
                        >
                            <Ionicons 
                                name={hidePass ? "eye-off" : "eye"} 
                                size={24} 
                                color="#878787" 
                            />
                        </TouchableOpacity>
                    </View>

                </View>
                    <BtnSec text="ENTRAR" onPress={handleLogin} />
                </View>
            </View>
        </SafeAreaView>

    );
}

