import { Text, View, StyleSheet, TextInput } from "react-native";
import Header from "../components/Header";
import GradientText from "../components/GradientText";
import NavBar from "../components/NavBar";
import BtnOcorrencia from "../components/btnOcorrencia";
import { useState } from "react";
import BtnSec from "../components/BtnSec";
import BtnPrim from "../components/btnPrim";

export default () =>{

    const [sala, setSala] = useState(null);
    const [turma, setTurma] = useState(null);

    const [estudante, setEstudante] = useState([]);
    const [situacao, setSituacao] = useState([]);

    const [observacao, setObservacao] = useState('');
    
    // dados temprários, depois virão da API
    const turmaList = ['101','102','103','201','202','203','301','302','303',];
    const salasList = ['Sala 16', 'Biblioteca', 'Quadra', 'Auditório'];
    const estudanteList = ['João Silva','Maria Oliveira','Pedro Santos','Ana Costa','Lucas Pereira'];
    const situacaoList = ['Desobediência','Desrespeito ao Professor','Desrespeito aos colegas','Bullying','Dano ao patrimônio', 'Agressão', 'Outro'];

    // válida se o form está preenchido para os botões de Enviar e Cancelar aparecerem
    const formCompleto = turma && estudante.length > 0 && situacao.length > 0;

    return (
        <View style={{height: '100%'}} >
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
                        {/*options manda a lista, selectValue é o valor já que foi selecionado, onSelect recebe a escolha e salva no estado */}
                        <BtnOcorrencia tipo={'turma'} label={'Turma'} options={turmaList} selectedValue={turma} onSelect={(novaTurma) => {
                            setTurma(novaTurma);
                            // lógica da API: Se o usuário NÃO escolheu sala especial,
                            // puxar a sala que está vinculada àquela turma
                        }}
                            // sala especial ativa apenas se escolheu turma
                            extraOptions={salasList}           
                            extraTitle="Sala especial?"         
                            selectedExtraValue={sala}           
                            onSelectExtra={setSala} 
                        />
                        <BtnOcorrencia tipo={'estudante'} label={'Estudante(s) envolvido(s)'} options={estudanteList} selectedValue={estudante} onSelect={setEstudante} disable={!turma} multiple={true} />
                        <BtnOcorrencia tipo={'situacao'} label={'Situação'} options={situacaoList} selectedValue={situacao} onSelect={setSituacao} multiple={true} />
                    </View>

                    <TextInput 
                        style={styles.observacao}
                        onChangeText={setObservacao}
                        value={observacao}
                        placeholder="Observações (opcional)"
                
                    />
                </View>
                    
                {formCompleto && (
                    <View>
                        <BtnPrim text="ENVIAR OCORRÊNCIA" onPress={() => {console.log('enviar')}} ></BtnPrim>
                        <BtnSec text="CANCELAR" onPress={() => {console.log('cancelar')}} />
                    </View>  
                )}    
                 
            </View>

            <NavBar status="ocorrencia" />
        </View>
    );
}

const styles = StyleSheet.create({
    screen:{
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
    observacao:{
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