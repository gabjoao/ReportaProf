import { View } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';
import { LinearGradient } from 'expo-linear-gradient';

import { 
    FontAwesome, 
    Ionicons, 
    MaterialCommunityIcons, 
    AntDesign,
    MaterialIcons
} from '@expo/vector-icons';

const IconFamilies = {
    FontAwesome: FontAwesome,
    Ionicons: Ionicons,
    MaterialCommunityIcons: MaterialCommunityIcons,
    AntDesign: AntDesign,
    MaterialIcons: MaterialIcons,
};

export default({ 
    family = 'MaterialCommunityIcons',
    name, 
    size, 
    colors, 
    style 
})  =>{
  
        const IconComponent = IconFamilies[family];

        if (!IconComponent) {
            console.log(`Família de ícone "${family}" não encontrada.`);
            return null;
        }

        const containerSize = size + 4;

        return (
            <MaskedView
            style={{ 
                width: containerSize, 
                height: containerSize,
                ...style 
            }}
            maskElement={
                <View style={{ backgroundColor: 'transparent', justifyContent: 'center', alignItems: 'center' }}>
                
                <IconComponent 
                    name={name} 
                    size={size} 
                    color="black" 
                />
                </View>
            }

            >
            <LinearGradient
                colors={colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={{ flex: 1 }}
            />
        </MaskedView>
        ) ;
}   