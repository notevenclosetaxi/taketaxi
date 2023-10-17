import React, { useState } from 'react';
import { BaseView, IconContainer } from '../../components';
import { Button, TextInput, View } from 'react-native';
import { styled } from './styles';
import { SignInInfo } from '../../interface';
import { AuthService, TokenService } from '../../service';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackParamList } from '../../navigator/AppStack';
import { AuthStackParamList } from '../../navigator/Stacks/AuthStack/AuthStack';

const LoginScreen: React.FC = () => {
  const appNavigation = useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const authNavigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();
  const [userInfo, setUserInfo] = useState<SignInInfo>({
    userId: '',
    password: '',
  });

  const handleSignIn = async () => {
    if (!userInfo.userId || !userInfo.password) {
      return;
    }

    try {
      const token = await AuthService.signIn(userInfo);
      await TokenService.setTokens(token);

      appNavigation.navigate('transportationStack');
    } catch (error) {
      await TokenService.removeToken();
      console.log(error);
    }
  };

  return (
    <BaseView style={styled.container}>
      <View style={styled.login}>
        <View style={styled.input}>
          <TextInput
            style={styled.id}
            placeholder="  id"
            onChangeText={(e) => {
              setUserInfo((prev) => ({ ...prev, userId: e }));
            }}
          />
          <TextInput
            style={styled.pw}
            placeholder="  password"
            onChangeText={(e) => {
              setUserInfo((prev) => ({ ...prev, password: e }));
            }}
          />
        </View>
        <View style={styled.button}>
          <IconContainer
            name="login"
            size={30}
            style={styled.icon}
            onPress={handleSignIn}
          />
          <IconContainer
            name="adduser"
            size={30}
            style={styled.icon}
            onPress={() => authNavigation.navigate('signUp')}
          />
        </View>
      </View>
      <Button title="go map" onPress={() => appNavigation.navigate('routeStack')} />
    </BaseView>
  );
};

export default LoginScreen;
