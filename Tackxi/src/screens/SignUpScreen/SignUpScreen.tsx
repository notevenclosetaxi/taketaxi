import React, {useState} from 'react';
import {BaseView, IconContainer} from '../../components';
import {TextInput, View} from 'react-native';
import {styled} from './styles';
import {SignUpInfo} from '../../interface';
import {AuthService} from '../../service';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {AuthStackParamList} from '../../navigator/Stacks/AuthStack/AuthStack';

const SignUpScreen: React.FC = () => {
  const authNavigation =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [userInfo, setUserInfo] = useState<SignUpInfo>({
    name: '',
    userId: '',
    password: '',
  });

  const handleSignUp = async () => {
    if (!userInfo.name || !userInfo.userId || !userInfo.password) {
      return;
    }

    try {
      await AuthService.signUp(userInfo);
      authNavigation.navigate('login');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <BaseView style={styled.container}>
      <View style={styled.login}>
        <View style={styled.input}>
          <TextInput
            style={styled.id}
            placeholder="  name"
            onChangeText={e => {
              setUserInfo(prev => ({...prev, name: e}));
            }}
          />
          <TextInput
            style={styled.id}
            placeholder="  id"
            onChangeText={e => {
              setUserInfo(prev => ({...prev, userId: e}));
            }}
          />
          <TextInput
            style={styled.pw}
            placeholder="  password"
            onChangeText={e => {
              setUserInfo(prev => ({...prev, password: e}));
            }}
          />
        </View>
        <View style={styled.button}>
          <IconContainer
            name="back"
            size={30}
            style={styled.icon}
            onPress={() => authNavigation.navigate('login')}
          />
          <IconContainer
            name="adduser"
            size={30}
            style={styled.icon}
            onPress={handleSignUp}
          />
        </View>
      </View>
    </BaseView>
  );
};

export default SignUpScreen;
