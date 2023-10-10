import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from './src/screens/HomeScreen';
import { LoginScreen } from './src/screens/LoginScreen';
import { SignUpScreen } from './src/screens/SignUpScreen';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { MapScreen } from './src/screens/MapScreen';

const Stack = createNativeStackNavigator();



function App() {

  return (
    <>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Map" component={MapScreen}/>



      </Stack.Navigator>
    </NavigationContainer>
         <Toast/>
         </>
 
  );
}

export default App;