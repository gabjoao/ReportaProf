import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import GradientIcon from './GradientIcon';
import { useState } from 'react';
import SelectionModal from './SelectionModal';
import { styles } from '@styles-components/BtnOcorrencia';

// mapeia o tipo de botão para o ícone correspondente, família e nome do ícone, usado no GradientIcon
const ICON_CONFIG = {
    turma: {
        family: 'FontAwesome',
        name: 'graduation-cap',
    },
    estudante: {
        family: 'Ionicons',
        name: 'person',
    },
    situacao: {
        family: 'MaterialCommunityIcons',
        name: 'alert-octagon-outline',
    },
};

const BtnOcorrencia = ({
    tipo, // chave para buscar o ícone (turma, estudante, situacao)
    label, // texto de placeholder (quando vazio)
    options, // lista de dados para o modal
    onSelect, // Função para atualizar o estado no Pai
    selectedValue, //Valor atual selecionado
    multiple, // Boolean: permite seleção múltipla?
    disable, // Boolean: botão travado?
    extraOptions, // (Opcional) Dados para seleção secundária (Sala)
    onSelectExtra,
    selectedExtraValue,
    extraTitle,
}) => {
    // estado local controla apenas a visibilidade do modal.
    // Os dados selecionados ficam no componente Pai (Home.js)
    const [modalVisible, setModalVisible] = useState(false);

    const iconData = ICON_CONFIG[tipo];

    // se passar um tipo inválido, não quebra a tela, só não renderiza nada
    if (!iconData) {
        console.log(`Tipo de ícone "${tipo}" não configurado.`);
        return null;
    }

    //como backend entrega objetos com estruturas diferentes,
    //converte qualquer objeto em uma String legível para o usuário.
    const formatItem = (item) => {
        if (!item) return '';

        // caso da turma com disciplina
        if (item.turma && item.disciplina) {
            return `${item.turma.nome} - ${item.disciplina.nome}`;
        }

        // casos mais genéricos
        if (item.nome) return item.nome;
        if (item.name) return item.name;

        // fallback: tenta converter para string se for primitivo
        return String(item);
    };

    // lógica de Apresentação do input
    // define o que aparece escrito dentro do botão

    const getDisplayText = () => {
        // mostra o label (definimos lá em Home.js na chamada do componente) se não tiver nada selecionado
        if (!selectedValue) return label;

        // array para seleção múltipla
        if (Array.isArray(selectedValue)) {
            if (selectedValue.length === 0) return label;

            // se tiver muitos itens, mostra apenas a quantidade
            if (selectedValue.length > 1) {
                return `${selectedValue.length} selecionados`;
            }

            // se tiver só 1 item no array, mostra o nome dele
            return formatItem(selectedValue[0]);
        }

        // mostra o nome formatado
        return formatItem(selectedValue);
    };

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.input,
                    // feedback visual se estiver desabilitado (cinza e transparente)
                    disable && { opacity: 0.5, backgroundColor: '#f0f0f0' },
                ]}
                onPress={() => {
                    // Só abre o modal se não estiver desabilitado
                    if (!disable) setModalVisible(true);
                }}
                // remove o efeito de clique se estiver disable
                activeOpacity={disable ? 1 : 0.7}
            >
                <View style={styles.itens}>
                    <GradientIcon
                        family={iconData.family}
                        name={iconData.name}
                        size={20}
                        colors={['#010201', '#5ee24f']}
                    />
                    {/* numberOfLines={1} garante que o texto não quebre linha e estrague o layout */}
                    <Text style={styles.label} numberOfLines={1}>
                        {getDisplayText()}
                    </Text>
                </View>

                {/* icone de Lupa fixo na direita */}
                <Entypo name="magnifying-glass" size={20} color="#4a4a4a" />
            </TouchableOpacity>

            <SelectionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={`Selecione: ${label}`}
                options={options}
                onSelect={onSelect}
                selectedValue={selectedValue}
                selectedValues={selectedValue} // redundância para compatibilidade
                multiple={multiple}
                // Props opcionais para a lógica de "Sala Especial"
                extraOptions={extraOptions}
                extraTitle={extraTitle}
                onSelectExtra={onSelectExtra}
                selectedExtraValue={selectedExtraValue}
            />
        </>
    );
};

export default BtnOcorrencia;
