import { useState, useEffect } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet} from 'react-native';
import GradnentIcon from './GradnentIcon';
import { LinearGradient } from 'expo-linear-gradient';


export default ({ visible, onClose, title, options, onSelect, multiple, selectedValues, extraOptions, extraTitle, onSelectExtra, selectedExtraValue }) => {

    const [localSelected, setLocalSelected] = useState([]);
    //estado para controlar se estamos vendo 'turmas' ou 'extras'
    const [isShowingExtra, setIsShowingExtra] = useState(false);
    const [localExtraSelected, setLocalExtraSelected] = useState(null);

    // carregar o que já estava selecionado quando o modal abrir
    useEffect(() => {
        if (visible) {
            // reseta a visualização para a principal sempre que abre
            setIsShowingExtra(false);
            // garante que seja sempre um array

            const initial = Array.isArray(selectedValues) ? selectedValues : (selectedValues ? [selectedValues] : []);
            setLocalSelected(initial);
            setLocalExtraSelected(selectedExtraValue);
        }
    }, [visible, selectedValues]);

    // função para o botão do topo (Cancelar ou Voltar)
    const handleTopButton = () => {
        if (isShowingExtra) {
            setIsShowingExtra(false); // Se ta na sala, volta pra turma
        } else {
            onClose(); // se ta na turma, fecha o modal
        }
    }

    const handlePress = (item) => {
        if (isShowingExtra) 
            setLocalExtraSelected(item);
        else {
            if (multiple) {
                if (localSelected.includes(item)) {
                    setLocalSelected(localSelected.filter(i => i !== item));
                } else {
                    setLocalSelected([...localSelected, item]);
                }
            } else {
                if (extraOptions) {
                    setLocalSelected([item]); 
                } else {
                    onSelect(item);
                    onClose();
                }
            }
        }
    };

    const confirmSelection = () => {
        //primeiro salva a turma
        if (multiple) {
            onSelect(localSelected);
        } else {
            onSelect(localSelected[0] || null);
        }

        if (extraOptions && onSelectExtra) {
            onSelectExtra(localExtraSelected); 
        }

        onClose();
    }

    const currentList = isShowingExtra ? extraOptions : options;
    const currentTitleDisplay = isShowingExtra ? "Selecione a Sala" : title;

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.content}>

                    {/* botão Cancelar / Voltar (se tiver em turma ou sala) */}
                    <TouchableOpacity style={styles.closeBtn} onPress={handleTopButton}>
                        <GradnentIcon 
                            name='arrow-back' 
                            family='MaterialIcons' 
                            size={20} 
                            colors={['#cb2625', '#af1919ff']} 
                        />
                        {/* Muda o texto dependendo da tela */}
                        <Text style={styles.closeText}>
                            {isShowingExtra ? "Voltar para Turmas" : "Cancelar"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>{currentTitleDisplay}</Text>
                    
                    <FlatList
                        data={currentList}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => {
                            // verifica seleção (Turma ou Sala)
                            const isSelected = isShowingExtra 
                                ? item === localExtraSelected
                                : (multiple ? localSelected.includes(item) : localSelected[0] === item);

                            return (
                                <TouchableOpacity 
                                    style={[styles.item, isSelected && styles.itemSelected]} 
                                    onPress={() => handlePress(item)}
                                >
                                    <Text style={[styles.itemText, isSelected && { fontWeight: 'bold' }]}>
                                        {item}
                                    </Text>
                                    
                                    {isSelected && <GradnentIcon 
                                        family="AntDesign" 
                                        name="check-circle" 
                                        size={20} 
                                        colors={['#010201', '#5ee24f']} 
                                    />}
                                </TouchableOpacity>
                            )
                        }}
                    />
                    
                    {/* BOTÃO SALA ESPECIAL */}
                    {/* só vai aparecer na tela principal (Turma) e se já tiver selecionado uma turma */}
                    {!isShowingExtra && extraOptions && localSelected.length > 0 && (
                        <TouchableOpacity 
                            style={styles.specialBtn} 
                            onPress={() => setIsShowingExtra(true)}
                        >
                            <GradnentIcon family="Ionicons" name="create-outline" size={20} colors={['#000000ff', '#0f2005ff']} />
                            <Text style={styles.specialText}>
                                {localExtraSelected ? `Sala: ${localExtraSelected}` : extraTitle}
                            </Text> 
                        </TouchableOpacity>
                    )}

                    {/* Aparece se for múltiplo OU se tiver escolha de sala */}
                    {(multiple || extraOptions) && (
                        <TouchableOpacity style={styles.confirmBtn} onPress={confirmSelection}>
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
}   

const styles = StyleSheet.create({
    overlay: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center', 
        padding: 20 
    },
    content: { 
        backgroundColor: '#f9f9f9', 
        borderRadius: 15, 
        padding: 20, 
        maxHeight: '80%',
        gap: 10
    },
    title: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        textAlign: 'center',
        marginTop: 40,
    },
    item: {
        padding: 12,
        borderWidth: 1,
        borderColor: '#878787',
        marginTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5,
    },
    itemSelected: {
        borderWidht: 1,
        borderColor: '#309130ff',
        backgroundColor: '#f3f8f2ff',
    },
    itemText: { 
        fontSize: 16 
    },
    confirmBtn: {
        marginTop: 15,
        padding: 8,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#c02623',
        height: 50,
        justifyContent: 'center',
    },
    confirmText: { 
        color: 'white', 
        fontWeight: 'bold' 
    },
    closeBtn: {
        marginTop: 10, 
        alignItems: 'center', 
        padding: 10,
        position: 'absolute', 
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
        display: 'flex',
        flexDirection: 'row',
        gap: 10,

    },
    closeText: { 
        color: '#af1919ff',
        fontSize: 14,
        fontWeight: 'bold', 
    },
    specialBtn: {
        marginTop: 5,
        marginBottom: 5,
        padding: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
    },
    specialText: {
        fontWeight: '600'
    },
});