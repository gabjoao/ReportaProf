import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import GradientIcon from './GradientIcon';
import { useState } from 'react';
import SelectionModal from './SelectionModal';
import { styles } from '../styles/components/BtnOcorrencia';

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
    tipo,
    label,
    options,
    onSelect,
    selectedValue,
    multiple,
    disable,
    extraOptions,
    onSelectExtra,
    selectedExtraValue,
    extraTitle,
}) => {
    const [modalVisible, setModalVisible] = useState(false);
    const iconData = ICON_CONFIG[tipo];

    if (!iconData) {
        console.log(`Tipo de ícone "${tipo}" não configurado.`);
        return null;
    }

    const formatItem = (item) => {
        if (!item) return '';

        // 1. Caso Especial: TURMA (Objeto Complexo da API)
        if (item.turma && item.disciplina) {
            return `${item.turma.nome} - ${item.disciplina.nome}`;
        }

        // 2. Casos Padrões (Estudante, Situação, etc)
        if (item.nome) return item.nome;
        if (item.name) return item.name;

        // 3. Último recurso (evita o [object Object])
        return String(item);
    };

    const getDisplayText = () => {
        // Se não tem nada selecionado, mostra o Label (ex: "Turma")
        if (!selectedValue) return label;

        // SE FOR ARRAY (Múltipla escolha)
        if (Array.isArray(selectedValue)) {
            if (selectedValue.length === 0) return label;

            // Se tiver mais de 1, mostra a contagem
            if (selectedValue.length > 1) {
                return `${selectedValue.length} selecionados`;
            }

            // Se tiver apenas 1 item no array, formata ele bonitinho
            return formatItem(selectedValue[0]);
        }

        // SE FOR ÚNICO (Escolha simples)
        return formatItem(selectedValue);
    };

    return (
        <>
            <TouchableOpacity
                style={[
                    styles.input,
                    disable && { opacity: 0.5, backgroundColor: '#f0f0f0' },
                ]}
                onPress={() => {
                    if (!disable) setModalVisible(true);
                }}
                activeOpacity={disable ? 1 : 0.7}
            >
                <View style={styles.itens}>
                    <GradientIcon
                        family={iconData.family}
                        name={iconData.name}
                        size={20}
                        colors={['#010201', '#5ee24f']}
                    />
                    <Text style={styles.label} numberOfLines={1}>
                        {getDisplayText()}
                    </Text>
                </View>

                <Entypo name="magnifying-glass" size={20} color="#4a4a4a" />
            </TouchableOpacity>

            <SelectionModal
                visible={modalVisible}
                onClose={() => setModalVisible(false)}
                title={`Selecione: ${label}`}
                options={options}
                onSelect={onSelect}
                selectedValue={selectedValue} // valor cru, o Modal trata array/single
                selectedValues={selectedValue} // mantendo compatibilidade
                multiple={multiple}
                // lógica da sala especial
                extraOptions={extraOptions}
                extraTitle={extraTitle}
                onSelectExtra={onSelectExtra}
                selectedExtraValue={selectedExtraValue}
            />
        </>
    );
};

export default BtnOcorrencia;
