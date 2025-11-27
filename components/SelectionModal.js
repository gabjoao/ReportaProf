import { useState, useEffect } from 'react';
import { Modal, View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import GradnentIcon from './GradnentIcon';
import { LinearGradient } from 'expo-linear-gradient';

export default ({ visible, onClose, title, options, onSelect, multiple, selectedValues, extraOptions, extraTitle, onSelectExtra, selectedExtraValue }) => {

    const [localSelected, setLocalSelected] = useState([]);
    const [isShowingExtra, setIsShowingExtra] = useState(false);
    const [localExtraSelected, setLocalExtraSelected] = useState(null);

    useEffect(() => {
        if (visible) {
            setIsShowingExtra(false);
            const initial = selectedValues
                ? (Array.isArray(selectedValues) ? selectedValues : [selectedValues])
                : [];
            setLocalSelected(initial);
            setLocalExtraSelected(selectedExtraValue);

        }
    }, [visible, selectedValues, selectedExtraValue, options]);

    const handleTopButton = () => {
        if (isShowingExtra) {
            setIsShowingExtra(false);
        } else {
            onClose();
        }
    }

    const handlePress = (item) => {
        if (isShowingExtra) {
            setLocalExtraSelected(item);
        } else {
            if (multiple) {
                const isAlreadySelected = localSelected.some(selected =>
                    selected === item || selected?.id === item?.id
                );

                if (isAlreadySelected) {
                    setLocalSelected(localSelected.filter(selected =>
                        selected !== item && selected?.id !== item?.id
                    ));
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

    // função para obter key única
    const getKey = (item, index) => {
        if (!item) return `null-${index}`;
        if (typeof item === 'string') return `${item}-${index}`;
        if (item.id) return String(item.id);
        return `item-${index}`;
    };

    // função para obter texto
    const getItemText = (item) => {
        if (!item) return 'Item inválido';


        if (typeof item === 'string') return item;
        if (item.nome) return item.nome;
        if (item.name) return item.name;
        if (item.home) return item.home;

        return JSON.stringify(item).substring(0, 50) + '...';
    };
    const isItemSelected = (item) => {
        if (isShowingExtra) {
            return localExtraSelected === item || localExtraSelected?.id === item?.id;
        } else {
            if (multiple) {
                return localSelected.some(selected =>
                    selected === item || selected?.id === item?.id
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

                    <TouchableOpacity style={styles.closeBtn} onPress={handleTopButton}>
                        <GradnentIcon
                            name='arrow-back'
                            family='MaterialIcons'
                            size={20}
                            colors={['#cb2625', '#af1919ff']}
                        />
                        <Text style={styles.closeText}>
                            {isShowingExtra ? "Voltar para Turmas" : "Cancelar"}
                        </Text>
                    </TouchableOpacity>

                    <Text style={styles.title}>{currentTitleDisplay}</Text>

                    <FlatList
                        data={currentList || []}
                        keyExtractor={(item, index) => getKey(item, index)}
                        renderItem={({ item, index }) => {
                            const isSelected = isItemSelected(item);
                            const itemText = getItemText(item);

                            return (
                                <TouchableOpacity
                                    style={[styles.item, isSelected && styles.itemSelected]}
                                    onPress={() => handlePress(item)}
                                >
                                    <Text style={[styles.itemText, isSelected && { fontWeight: 'bold' }]}>
                                        {itemText}
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

                    {!isShowingExtra && extraOptions && localSelected.length > 0 && (
                        <TouchableOpacity
                            style={styles.specialBtn}
                            onPress={() => setIsShowingExtra(true)}
                        >
                            <GradnentIcon family="Ionicons" name="create-outline" size={20} colors={['#000000ff', '#0f2005ff']} />
                            <Text style={styles.specialText}>
                                {localExtraSelected
                                    ? `Sala: ${getItemText(localExtraSelected)}`
                                    : extraTitle}
                            </Text>
                        </TouchableOpacity>
                    )}

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
        borderWidth: 1,
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
    debugText: {
        fontSize: 12,
        color: '#666',
        textAlign: 'center',
        fontStyle: 'italic',
    },
});