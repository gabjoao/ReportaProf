import { View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StyleSheet } from "react-native";

export default function Header() {
  const insets = useSafeAreaInsets();

  return (
    <View  style={{ paddingTop: insets.top }}>
        <LinearGradient 
            colors={['rgba(219, 39, 39, 1)', 'rgba(169, 37, 32, 1)']}
            style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 100 }}
        />
  
      <View style={styles.content}>
        <Text style={styles.title}>ReportaProf</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    height: 70, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Nunito',
    color: 'white',
    fontWeight: '500',
    fontSize: 18,
  }
});