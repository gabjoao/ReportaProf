import Header from "../components/Header";
import NavBar from "../components/NavBar";
import { View } from "react-native";

export default () =>{
    return(
        <View style={{height: '100%'}} >
            <Header />
            <NavBar status="historico" />
        </View>


    );
}