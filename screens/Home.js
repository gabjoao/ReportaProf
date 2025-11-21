import { Text, View, StyleSheet } from "react-native";
import Header from "../components/Header";
import GradientText from "../components/GradientText";
import NavBar from "../components/NavBar";

export default () =>{
    return (
        <View style={{height: '100%'}} >
            <Header />
            <View style={styles.container} >
                <View style={styles.texts} >
                <GradientText 
                    text="Olá, professor,"
                    style={[{ fontWeight: 800 }, styles.h1]} 
                />
                <Text style={styles.h1} >registre aqui sua ocorrência.</Text>
                </View>
            </View>
            <NavBar status="ocorrencia" />
        </View>

    );
}

const styles = StyleSheet.create({
    texts: {
        
    },
    
    h1: {
        fontSize: 24,
        fontFamily: 'Lexend',
        textAlign: 'center',
    },

}); 