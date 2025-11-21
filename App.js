import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStaticNavigation } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'react-native';
import Login from './screens/Login';
import Home from './screens/Home';

export default function App() {
  return (
    <SafeAreaProvider>
      <Navigation  />
      <StatusBar 
          barStyle="white-content" // Ícones escuros
          backgroundColor="transparent" 
          translucent 
        />
    </SafeAreaProvider>
    
  );
}

const RootStack = createNativeStackNavigator({
  screens:{
    Login: {
      screen: Login,
      options: {headerShown: false},
    },
    Home: {
      screen: Home,
      options: {headerShown: false},

    },
  }
});

const Navigation = createStaticNavigation(RootStack);