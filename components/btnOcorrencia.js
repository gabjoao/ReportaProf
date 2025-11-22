import { Text, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import Entypo from '@expo/vector-icons/Entypo';
import GradnentIcon from "./GradnentIcon";
import { useState } from "react";
import SelectionModal from "./SelectionModal";

const ICON_CONFIG = {
    turma: {
        family: "FontAwesome",
        name: "graduation-cap"
    },
    estudante: {
        family: "Ionicons",
        name: "person"
    },
    situacao: {
        family: "MaterialCommunityIcons",
        name: "alert-octagon-outline"
    }
};

export default ({tipo, label, options, onSelect, selectedValue, multiple, disable, extraOptions, onSelectExtra, selectedExtraValue, extraTitle}) => {

    const [modalVisible, setModalVisible] = useState(false);
    const iconData = ICON_CONFIG[tipo];

    if (!iconData) {
        console.log(`Tipo de ícone "${tipo}" não configurado.`);
        return null; 
    }


const getDisplayText = () => {
    if (!selectedValue) return label;
    if (Array.isArray(selectedValue)) {
        if (selectedValue.length === 0) return label;
        return selectedValue.length > 1 
          ? `${selectedValue.length} selecionados` 
          : selectedValue[0];
        }
    return selectedValue;
    };

    return (
    <>
        <TouchableOpacity style={[styles.input, disable && {opacity: 0.5, backgroundColor: '#f0f0f0'}]} 
        onPress={ () =>{
            if(!disable) setModalVisible(true);
            }
            }
            activeOpacity={disable ? 1 : 0.7} >

            <View style={styles.itens} >
                <GradnentIcon family={iconData.family} name={iconData.name} size={20} colors={['#010201', '#5ee24f']}  />
                <Text style={styles.label} numberOfLines={1} >{getDisplayText()}</Text>
            </View>
            
            <Entypo name="magnifying-glass" size={20} color="#4a4a4a"/>
        </TouchableOpacity>


        <SelectionModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            title={`Selecione: ${label}`}
            options={options}
            onSelect={onSelect}
            selectedValue={selectedValue} // Note que aqui passo o valor cru, o Modal trata array/single
            selectedValues={selectedValue} // Mantendo compatibilidade
            multiple={multiple}

            // lógica da sala especial
            extraOptions={extraOptions}
            extraTitle={extraTitle}
            onSelectExtra={onSelectExtra}
            selectedExtraValue={selectedExtraValue}
      />
    </>
    );
}

const styles = StyleSheet.create({
    input: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#878787',
        borderRadius: 5,
        padding: 10,
        marginTop: 20,
        width: 300,
        height: 45,
        justifyContent: 'space-between',
        backgroundColor: 'white',
    },
    itens:{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    label:{
        fontFamily: 'Lexend',
        fontSize: 14,
        color: 'black',
        fontWeight: '700',
    }
});