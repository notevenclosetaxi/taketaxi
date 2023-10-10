import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Button, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParam = {
    Home : undefined;
    Login : undefined;
    SignUp : undefined;
    Map : undefined;
}



export const HomeScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();


    const getTokenValue = async () => {
        try {
            const value = await AsyncStorage.getItem('Tokens');
            console.log(value);
        } catch (error) {
            console.error(error);
        }
    }
    // getTokenValue();

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: 'black', fontSize: 30 }}>Main</Text>


        
        <Button 
          title="Go to Login" 
          onPress={() => navigation.navigate('Login')} 
          />
          <Button
          title="Go to SignUp"
          onPress={() => navigation.navigate('SignUp')}/>


          <Button
          title="맵 테스트"
          onPress={() => navigation.navigate('Map')}/>

          {/* <Button title="토큰 확인" onPress={getTokenValue}/> */}

      </View>
    )
}