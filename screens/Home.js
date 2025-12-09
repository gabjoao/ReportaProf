import { Text, View, TextInput } from 'react-native';
import Header from '@components/Header';
import GradientText from '@components/GradientText';
import NavBar from '@components/NavBar';
import BtnOcorrencia from '@components/BtnOcorrencia';
import { useState, useEffect } from 'react';
import BtnSec from '@components/BtnSec';
import BtnPrim from '@components/BtnPrim';
import * as api from '@utils/api';
import { useNavigation } from '@react-navigation/native';
import { styles } from '@styles-screens/Home';

// importação da Classe/Model para garantir que o objeto enviado siga o padrão
const OcorrenciaClasse = require('@models/Ocorrencia');

const Home = () => {
    const navigation = useNavigation();

    // iniciam como null (vazio) ou array vazio []
    const [turma, setTurma] = useState(null);
    const [sala, setSala] = useState(null);
    const [estudante, setEstudante] = useState([]); // começam como um array porque são múltipla escolha
    const [situacao, setSituacao] = useState([]); // começam como um array porque são múltipla escolha
    const [observacao, setObservacao] = useState('');

    // listas que vem da API
    const [turmas, setTurmas] = useState([]);
    const [salas, setSalas] = useState([]);
    const [estudantes, setEstudantes] = useState([]); // muda dinamicamente baseada na turma
    const [situacoes, setSituacoes] = useState([]);

    const registrarOcorrencia = async (ocorrencia) => {
        console.log('Payload enviado:', ocorrencia);
        try {
            const res = await api.createOcorrencia(ocorrencia);

            if (res.ok) navigation.navigate('NovaOcorrencia');
            else
                alert(
                    'Erro ao registrar ocorrência' +
                        (JSON.stringify(res.body) || ''),
                );
        } catch (error) {
            console.log(error);
        }
    };

    // dados iniciais do formulário
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
    };

    // carrega os estudantes sempre que a turma muda,
    // utilizando o id da turma selecionada
    const carregarEstudantes = async (turmaSelecionada) => {
        if (turmaSelecionada && turmaSelecionada.id) {
            try {
                console.log(
                    'Buscando estudantes para turma:',
                    turmaSelecionada.id,
                );
                const resEstudantes = await api.getEstudantes(
                    turmaSelecionada.id,
                );

                // validação defensiva para garantir que tem um array no estado,
                // para evitar erro de .map ou .filter undefined na renderização
                if (resEstudantes && resEstudantes.body) {
                    setEstudantes(resEstudantes.body || []);
                } else if (Array.isArray(resEstudantes)) {
                    setEstudantes(resEstudantes);
                } else {
                    setEstudantes([]);
                }
            } catch (error) {
                console.error('Erro ao carregar estudantes:', error);
                setEstudantes([]);
            }
        } else {
            // se não tem turma selecionada, limpa a lista de estudantes e a seleção
            setEstudantes([]);
            setEstudante([]);
        }
    };

    // o useEffect ta observando a variável 'turma', se ela mudar, roda a função
    useEffect(() => {
        if (turma) {
            carregarEstudantes(turma);
        } else {
            setEstudantes([]);
            setEstudante([]);
        }
    }, [turma]);

    // carrega os dados iniciais ao montar o componente
    useEffect(() => {
        load();
    }, []);

    // validação visual: Os botões de Cancelar e Enviar Ocorr"encia só aparecem se isso for true
    const formCompleto = turma && estudante.length > 0 && situacao.length > 0;

    return (
        <View style={{ height: '100%' }}>
            <Header />

            <View style={styles.screen}>
                <View style={styles.texts}>
                    <GradientText
                        text="Olá, professor,"
                        style={[{ fontWeight: 800 }, styles.h1]}
                    />
                    <Text style={styles.h1}>registre aqui sua ocorrência.</Text>
                </View>

                <View style={styles.container}>
                    <View style={styles.inputsContainer}>
                        {/* esse componente lida com Turma *E* Sala Especial ao mesmo tempo */}
                        <BtnOcorrencia
                            tipo={'turma'}
                            label={'Turma'}
                            options={turmas}
                            selectedValue={turma}
                            onSelect={(novaTurma) => {
                                // Ao trocar de turma, salvamos a turma e resetamos a sala
                                // para evitar inconsistência (ex: Sala da turma antiga)
                                setTurma(novaTurma);
                                setSala(null);
                            }}
                            // Props extras para lógica de Sala Especial dentro do mesmo botão
                            extraOptions={salas}
                            extraTitle="Sala especial?"
                            selectedExtraValue={sala}
                            onSelectExtra={setSala}
                        />

                        <BtnOcorrencia
                            tipo={'estudante'}
                            label={'Estudante(s) envolvido(s)'}
                            options={estudantes} // Lista carregada dinamicamente pelo useEffect
                            selectedValue={estudante}
                            onSelect={setEstudante}
                            disable={!turma} // Bloqueia o campo se não tiver turma selecionada
                            multiple={true}
                        />

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

                {/* botões só aparecem se formCompleto for true,
                esse `fomrCompleto &&` é como se fosse um if que funciona na renderização do componente
                */}
                {formCompleto && (
                    <View>
                        <BtnPrim
                            text="ENVIAR OCORRÊNCIA"
                            onPress={() => {
                                // pegando só os IDs dos estudantes e situações selecionadas
                                const estudantesId = estudante.map((e) => e.id);
                                const situacoesId = situacao.map((s) => s.id);

                                // aqui é para caso a dependência esteja com uma das salas especiais,
                                // se não tiver, envia null
                                let salaEnviar = sala ? sala.id : null;

                                // instanciando o Model para garantir a estrutura do JSON
                                const minhaOcorrencia = new OcorrenciaClasse(
                                    observacao,
                                    turmas[0].professor.id, // pega o ID do professor logado (vinculado à turma)
                                    turma.turma.id, // ID da Turma
                                    estudantesId, // Array de ids
                                    situacoesId, // Array de ids
                                    salaEnviar, // ID da Sala especial ou null
                                );

                                registrarOcorrencia(minhaOcorrencia);
                            }}
                        />
                        <BtnSec
                            text="CANCELAR"
                            onPress={() => {
                                // reset total do formulário
                                setTurma(null);
                                setSala(null);
                                setEstudante([]);
                                setSituacao([]);
                                setObservacao('');
                            }}
                        />
                    </View>
                )}
            </View>

            <NavBar status="ocorrencia" />
        </View>
    );
};

export default Home;
