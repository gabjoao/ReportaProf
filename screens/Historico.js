import Header from '../components/Header';
import NavBar from '../components/NavBar';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import * as api from '../utils/api';
import { format } from 'date-fns';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { styles } from '../styles/screens/Historico';

export default () => {
    const [ocorrencias, setOcorrencias] = useState(null);

    const load = async () => {
        try {
            const resOcorrencias = await api.getMinhasOcorrencias();
            setOcorrencias(resOcorrencias.body);
        } catch (error) {
            console.error('Erro ao carregar dados:', error);
        }
    };

    useEffect(() => {
        load();
    }, []);

    console.log(ocorrencias);

    return (
        <View style={{ height: '100%' }}>
            <Header />

            <View style={styles.screen}>
                <Text style={styles.h1}>Histórico de ocorrências</Text>

                <View style={styles.container}>
                    <FlatList
                        style={styles.itensContainer}
                        data={ocorrencias}
                        keyExtractor={(ocorrencia) => String(ocorrencia.id)}
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.itemContainer}>
                                <Text style={styles.itemH1}>AGUARDANDO</Text>

                                <Text
                                    style={[styles.textos, { fontWeight: 700 }]}
                                >
                                    {' '}
                                    {format(
                                        item.data_hora,
                                        'dd/MM/yyyy',
                                    )} - {item.turma.nome}{' '}
                                </Text>

                                <View>
                                    <Text
                                        style={[
                                            styles.textos,
                                            { fontWeight: 700 },
                                        ]}
                                    >
                                        Estudante(s):{' '}
                                    </Text>
                                    <FlatList
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                        data={item.estudantes}
                                        keyExtractor={(estudante) =>
                                            String(estudante.id)
                                        }
                                        renderItem={({ item }) => (
                                            <Text style={styles.textos}>
                                                {item.nome}{' '}
                                            </Text>
                                        )}
                                    />
                                </View>

                                <View>
                                    <Text
                                        style={[
                                            styles.textos,
                                            { fontWeight: 700 },
                                        ]}
                                    >
                                        Situações:
                                    </Text>
                                    <FlatList
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                        }}
                                        data={item.situacao}
                                        keyExtractor={(situacao) =>
                                            String(situacao.id)
                                        }
                                        renderItem={({ item }) => (
                                            <Text style={styles.textos}>
                                                {item.nome}{' '}
                                            </Text>
                                        )}
                                    />
                                </View>

                                <FontAwesome6
                                    style={styles.icon}
                                    name="arrow-right-to-bracket"
                                    size={24}
                                    color="#6f6f6f"
                                />
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </View>

            <NavBar status="historico" />
        </View>
    );
};
