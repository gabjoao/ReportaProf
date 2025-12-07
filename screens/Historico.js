import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import * as api from '../utils/api'
import { format } from 'date-fns';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default () =>{

    const [ocorrencias, setOcorrencias] = useState(null);

    const load = async () => {
        try {
            const resOcorrencias = await api.getMinhasOcorrencias();
            setOcorrencias(resOcorrencias.body);

        
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }

    useEffect(() => {
        load();
    }, []);

    console.log(ocorrencias);

    return(
        <View style={{height: '100%'}} >
            <Header />

            <View style={styles.screen}>
                <Text style={styles.h1} >Histórico de ocorrências</Text>

                <View style={styles.container}>
                    <FlatList
                        style = {styles.itensContainer}
                        data = {ocorrencias}
                        keyExtractor={ocorrencia => String(ocorrencia.id)}
                        renderItem={({item}) => (
                            <TouchableOpacity style={styles.itemContainer} >
                                <Text style = {styles.itemH1} >AGUARDANDO</Text>

                                <Text style = {[styles.textos, {fontWeight: 700}]}> {format(item.data_hora, 'dd/MM/yyyy')} - {item.turma.nome} </Text>

                                <View>
                                    <Text style = {[styles.textos, {fontWeight: 700}]}>Estudante(s): </Text>
                                    <FlatList
                                        style = {{display: 'flex', flexDirection: 'column'}}
                                        data = {item.estudantes}
                                        keyExtractor={estudante => String(estudante.id)}
                                        renderItem={({item}) => (
                                            <Text style = {styles.textos}>{item.nome}  </Text>
                                        )}
                                    />
                                </View>
                                

                                <View>
                                    <Text style = {[styles.textos, {fontWeight: 700}]} >Situações:</Text>
                                    <FlatList 
                                        style = {{display: 'flex', flexDirection: 'column'}}
                                        data = {item.situacao}
                                        keyExtractor={situacao => String(situacao.id)}
                                        renderItem={({item}) => (
                                        <Text style = {styles.textos}>{item.nome}  </Text>
                                    )}
                               />
                                </View>
                               
                                <FontAwesome6 style = {styles.icon}  name="arrow-right-to-bracket" size={24} color="#6f6f6f" />

                            </TouchableOpacity>
                    )}
                    />
            
                </View>

            </View>
           
            <NavBar status="historico" />
        </View>


    );
}

const styles = StyleSheet.create({
    screen: {
        justifyContent: 'center',
        gap: 50
    },
    h1: {
        fontSize: 24,
        fontFamily: 'Lexend',
        textAlign: 'center',
        height: 30,
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: 20,
        justifyContent: 'center',
        height: '70%',
        backgroundColor: '#f9f9f9',
        width: '90%',
        alignSelf: 'center',
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        gap: 30,
    },
    itemContainer: {
        backgroundColor: '#ffff',
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        display: 'flex',
        gap: 5,
        width: 300,
        marginTop: 10,
    },
    itemH1: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: '700',
        color: '#c02623'
    },
    itensContainer: {
        display: 'flex',
        marginTop: 20
    },
    textos: {
        fontFamily: 'Lexend',
        fontSize: 16,
        color: 'black',
        fontWeight: '600'
    },
    icon :{
        position: 'absolute',
        right: 15,
        top: '50%'
    }
});