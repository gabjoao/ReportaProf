import { useState, useEffect } from 'react';
import {
    Modal,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import GradientIcon from './GradientIcon';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '@styles-components/SelectionModal';

/**
 * possivelmente o componente mais complexo do app!
 * Funciona como um "Select" turbinado.
 *
 * props principais:
 * - multiple: Se true, permite selecionar vários (checkbox). Se false, apenas um (radio).
 * - extraOptions: Se passado, ativa o modo de 'navegação em 2 passos' (ex: Escolher Turma -> Escolher Sala).
 */
const SelectionModal = ({
    visible,
    onClose,
    title,
    options,
    onSelect, // callback para salvar o valor principal (Turma/Estudante)
    multiple,
    selectedValues,
    extraOptions, // Lista secundária (Salas)
    extraTitle,
    onSelectExtra, // callback para salvar o valor secundário (Sala)
    selectedExtraValue,
}) => {
    // estados locais para controle interno do modal
    //  estados servem para que o usuário possa marcar/desmarcar itens
    // SEM afetar a tela pai imediatamente. A alteração só sobe quando ele clica em "CONFIRMAR".

    const [localSelected, setLocalSelected] = useState([]); // armazena a seleção principal temporária
    const [localExtraSelected, setLocalExtraSelected] = useState(null); // armazena a sala temporária

    // controla qual tela o modal está mostrando:
    // false = Lista Principal (Turmas/Alunos)
    // true  = Lista Extra (Salas)
    const [isShowingExtra, setIsShowingExtra] = useState(false);

    /**
     * parte de sincronização entre Pai e Filho:
     * toda vez que o modal abre (visible = true), copia o valor
     * que veio do Pai (selectedValues) para o nosso estado Local.
     * serve pro modal abrir com os itens que já marcados.
     */
    useEffect(() => {
        if (visible) {
            setIsShowingExtra(false); // Sempre reseta para a primeira tela
            const initial = selectedValues
                ? Array.isArray(selectedValues)
                    ? selectedValues
                    : [selectedValues]
                : [];
            setLocalSelected(initial);
            setLocalExtraSelected(selectedExtraValue);
        }
    }, [visible, selectedValues, selectedExtraValue, options]);

    /**
     * Botão de Voltar/Cancelar no topo.
     * tem comportamento duplo dependendo da tela que está
     */
    const handleTopButton = () => {
        if (isShowingExtra) {
            setIsShowingExtra(false); // Se está na Sala, volta para Turma
        } else {
            onClose(); // se está na Turma, fecha o modal (Cancela)
        }
    };

    // lógica CENTRAL da seleção

    const handlePress = (item) => {
        // caso estar na tela secundária (Sala)
        // lógica simples: Seleciona e pronto (é sempre único).
        if (isShowingExtra) {
            setLocalExtraSelected(item);
        }
        //caso estar na tela principal
        else {
            if (multiple) {
                // PAra os itens de múltipla escolha
                // Verifica se o item já está na lista (por referência ou por ID)
                const isAlreadySelected = localSelected.some(
                    (selected) =>
                        selected === item || selected?.id === item?.id,
                );

                if (isAlreadySelected) {
                    // REMOVER: Filtra a lista mantendo tudo que é diferente do item clicado
                    setLocalSelected(
                        localSelected.filter(
                            (selected) =>
                                selected !== item && selected?.id !== item?.id,
                        ),
                    );
                } else {
                    // ADICIONAR: Cria um novo array com tudo que tinha antes + o novo item
                    setLocalSelected([...localSelected, item]);
                }
            } else {
                // lógica para seleção única
                if (extraOptions) {
                    // se existe opção de Sala, apenas selecionamos visualmente.
                    // Não fechamos o modal porque o usuário pode querer clicar em 'Sala Especial?'
                    setLocalSelected([item]);
                } else {
                    // comportamento padrão: Seleciona e já fecha e salva.
                    onSelect(item);
                    onClose();
                }
            }
        }
    };

    //Pega o estado local (temporário) e manda para o Pai via callback.

    const confirmSelection = () => {
        // Envia Principal
        if (multiple) {
            onSelect(localSelected);
        } else {
            onSelect(localSelected[0] || null);
        }

        // Envia Secundário (se for o caso)
        if (extraOptions && onSelectExtra) {
            onSelectExtra(localExtraSelected);
        }

        onClose();
    };

    // variáveis auxiliares para saber o que renderizar no FlatList
    const currentList = isShowingExtra ? extraOptions : options;
    const currentTitleDisplay = isShowingExtra ? 'Selecione a Sala' : title;

    // Gera um ID único para o react não se perder na lista
    const getKey = (item, index) => {
        if (!item) return `null-${index}`;
        if (typeof item === 'string') return `${item}-${index}`;
        if (item.id) return String(item.id);
        return `item-${index}`;
    };

    // le o nome do item independente do formato que veio da API
    const getItemText = (item) => {
        if (!item) return 'Item inválido';

        //lista simples de strings
        if (typeof item === 'string') return item;

        // quando tem objeto dentro de objeto (Turmas com Disciplina) fica Turma - Disciplina
        if (item.turma && item.disciplina) {
            return `${item.turma.nome} - ${item.disciplina.nome}`;
        }

        // objetos simples (Estudantes, Situações)
        if (item.nome) return item.nome;
        if (item.name) return item.name;

        return 'Item sem nome';
    };

    // verifica se o item deve aparecer marcado
    const isItemSelected = (item) => {
        if (isShowingExtra) {
            return (
                localExtraSelected === item ||
                localExtraSelected?.id === item?.id
            );
        } else {
            if (multiple) {
                // varre o array procurando o item
                return localSelected.some(
                    (selected) =>
                        selected === item || selected?.id === item?.id,
                );
            } else {
                const selected = localSelected[0];
                return selected === item || selected?.id === item?.id;
            }
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>
                    {/* Botão de Navegação (Voltar ou Cancelar) */}
                    <TouchableOpacity
                        style={styles.closeBtn}
                        onPress={handleTopButton}
                    >
                        <GradientIcon
                            name="arrow-back"
                            family="MaterialIcons"
                            size={20}
                            colors={['#cb2625', '#af1919ff']}
                        />
                        <Text style={styles.closeText}>
                            {isShowingExtra ? 'Voltar para Turmas' : 'Cancelar'}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>{currentTitleDisplay}</Text>

                    {/* lista dinâmica para renderizar ou Turmas ou Salas */}
                    <FlatList
                        data={currentList || []}
                        keyExtractor={(item, index) => getKey(item, index)}
                        renderItem={({ item, index }) => {
                            const isSelected = isItemSelected(item);
                            const itemText = getItemText(item);

                            return (
                                <TouchableOpacity
                                    style={[
                                        styles.item,
                                        isSelected && styles.itemSelected,
                                    ]}
                                    onPress={() => handlePress(item)}
                                >
                                    <Text
                                        style={[
                                            styles.itemText,
                                            isSelected && {
                                                fontWeight: 'bold',
                                            },
                                        ]}
                                    >
                                        {itemText}
                                    </Text>

                                    {isSelected && (
                                        <GradientIcon
                                            family="AntDesign"
                                            name="check-circle"
                                            size={20}
                                            colors={['#010201', '#5ee24f']}
                                        />
                                    )}
                                </TouchableOpacity>
                            );
                        }}
                    />

                    {/* botão de 'Sala Especial só aparece se NÃO está na tela de salas, 
                    se EXISTE opção de salas, e se já tem uma turma selecionada.
                    aqui usa o && também para fazer um 'if' 
                */}
                    {!isShowingExtra &&
                        extraOptions &&
                        localSelected.length > 0 && (
                            <TouchableOpacity
                                style={styles.specialBtn}
                                onPress={() => setIsShowingExtra(true)}
                            >
                                <GradientIcon
                                    family="Ionicons"
                                    name="create-outline"
                                    size={20}
                                    colors={['#000000ff', '#0f2005ff']}
                                />
                                <Text style={styles.specialText}>
                                    {localExtraSelected
                                        ? `Sala: ${getItemText(
                                              localExtraSelected,
                                          )}`
                                        : extraTitle}
                                </Text>
                            </TouchableOpacity>
                        )}

                    {/* botão de confirmar que comita as alterações locais para o Pai */}
                    {(multiple || extraOptions) && (
                        <TouchableOpacity
                            style={styles.confirmBtn}
                            onPress={confirmSelection}
                        >
                            <LinearGradient
                                colors={['#55cc47', '#3d9233']}
                                style={StyleSheet.absoluteFill}
                                start={{ x: 0, y: 0 }}
                                end={{ x: 0, y: 1 }}
                            />
                            <Text style={styles.confirmText}>SELECIONAR</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default SelectionModal;
