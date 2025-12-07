import { Text, View, StyleSheet, TextInput } from "react-native";
import Header from "../components/Header";
import GradientText from "../components/GradientText";
import NavBar from "../components/NavBar";
import BtnOcorrencia from "../components/btnOcorrencia";
import { useState, useEffect } from "react";
import BtnSec from "../components/BtnSec";
import BtnPrim from "../components/btnPrim";
import * as api from '../utils/api'
import { useNavigation } from '@react-navigation/native';
const OcorrenciaClasse = require('../models/Ocorrencia');


export default () => {

    const navigation = useNavigation();

    const [turma, setTurma] = useState(null);
    const [sala, setSala] = useState(null);
    const [estudante, setEstudante] = useState([]);
    const [situacao, setSituacao] = useState([]);
    const [observacao, setObservacao] = useState('');

    const [turmas, setTurmas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [estudantes, setEstudantes] = useState([]);
    const [situacoes, setSituacoes] = useState([]);

    const registrarOcorrencia = async (ocorrencia) =>{
        console.log(ocorrencia);
        try {
            const res = await api.createOcorrencia(ocorrencia);

            if(res.ok) navigation.navigate('NovaOcorrencia');
            else alert('Erro ao registrar ocorrência' + (JSON.stringify(res.body) || ''));
            
        } catch (error) {
            console.log(error);
        }

    }
    const load = async () => {
        try {
            const resTurmas = await api.getTurmas();
            setTurmas(resTurmas.body || resTurmas || []);

            const resSalas = await api.getDependencias();
            setSalas(resSalas.body || resSalas || []);

            const resSituacoes = await api.getSituacoes();
            setSituacoes(resSituacoes.body || resSituacoes || []);

        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    }



    const carregarEstudantes = async (turmaSelecionada) => {
        if (turmaSelecionada && turmaSelecionada.id) {
            try {
                console.log('Buscando estudantes para turma:', turmaSelecionada.id);
                const resEstudantes = await api.getEstudantes(turmaSelecionada.id);
                console.log('Resposta da API estudantes:', resEstudantes);

                // Verifica se a resposta é válida
                if (resEstudantes && resEstudantes.body !== null && resEstudantes.body !== undefined) {
                    setEstudantes(resEstudantes.body || []);
                } else if (Array.isArray(resEstudantes)) {
                    setEstudantes(resEstudantes);
                } else {
                    console.log('Nenhum estudante encontrado para esta turma');
                    setEstudantes([]);
                }
            } catch (error) {
                console.error('Erro ao carregar estudantes:', error);
                setEstudantes([]);
            }
        } else {
            setEstudantes([]);
            setEstudante([]);
        }
    }

    useEffect(() => {
        if (turma) {
            carregarEstudantes(turma);
        } else {
            setEstudantes([]);
            setEstudante([]);
        }

    }, [turma]);

    useEffect(() => {
        load();
    }, []);

    //console.log("Turma selecionada:", turma);
    //console.log("Estudantes disponíveis:", estudantes);

    // válida se o form está preenchido para os botões de Enviar e Cancelar aparecerem
    const formCompleto = turma && estudante.length > 0 && situacao.length > 0;

    return (
        <View style={{ height: '100%' }} >
            <Header />

            <View style={styles.screen}>
                <View style={styles.texts} >
                    <GradientText
                        text="Olá, professor,"
                        style={[{ fontWeight: 800 }, styles.h1]}
                    />
                    <Text style={styles.h1} >registre aqui sua ocorrência.</Text>
                </View>

                <View style={styles.container} >

                    <View style={styles.inputsContainer} >
                        {/* TURMA */}
                        <BtnOcorrencia
                            tipo={'turma'}
                            label={'Turma'}
                            options={turmas}
                            selectedValue={turma}
                            onSelect={(novaTurma) => {
                                console.log("Turma selecionada no onSelect:", novaTurma);
                                setTurma(novaTurma);
                                setSala(null);
                            }}
                            extraOptions={salas}
                            extraTitle="Sala especial?"
                            selectedExtraValue={sala}
                            onSelectExtra={(novaSala) => {
                                console.log("Sala selecionada:", novaSala);
                                setSala(novaSala);
                            }}
                        />

                        {/* ESTUDANTE */}
                        <BtnOcorrencia
                            tipo={'estudante'}
                            label={'Estudante(s) envolvido(s)'}
                            options={estudantes}
                            selectedValue={estudante}
                            onSelect={setEstudante}
                            disable={!turma}
                            multiple={true}
                        />

                        {/* SITUAÇÃO - Transformando strings em objetos */}
                        <BtnOcorrencia
                            tipo={'situacao'}
                            label={'Situação'}
                            options={situacoes}
                            selectedValue={situacao}
                            onSelect={setSituacao}
                            multiple={true}
                        />
                    </View>

                    <TextInput
                        style={styles.observacao}
                        onChangeText={setObservacao}
                        value={observacao}
                        placeholder="Observações (opcional)"
                        multiline={true}
                        textAlignVertical="top"
                    />
                </View>

                {formCompleto && (
                    <View>
                        <BtnPrim text="ENVIAR OCORRÊNCIA" onPress={() => { 
                            const estudantesId = estudante.map(estudante => estudante.id);
                            const situacoesId = situacao.map(situacao => situacao.id)
                            let salaEnviar;
                            
                            if(sala == null) salaEnviar = null;
                            else salaEnviar = sala.id;
                            
                            console.log(salaEnviar);
                            const minhaOcorrencia = new OcorrenciaClasse(observacao, turmas[0].professor.id, turma.id, estudantesId, situacoesId, salaEnviar);
                            registrarOcorrencia(minhaOcorrencia); 
                        }} />
                        <BtnSec text="CANCELAR" onPress={() => {
                            setTurma(null);
                            setSala(null);
                            setEstudante([]);
                            setSituacao([]);
                            setObservacao('');
                        }} />
                    </View>
                )}

            </View>

            <NavBar status="ocorrencia" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        height: '100%',
        gap: 10,
    },
    texts: {
        marginTop: 20,
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
        height: '45%',
        backgroundColor: '#e5e5e7ff',
        width: '85%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    observacao: {
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        width: 300,
        height: 120,
        backgroundColor: 'white',
    },
});