import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View,Alert } from "react-native";
import InputField from "../interface/InputField";
import { RootStackParam } from "./HomeScreen"
import { useForm, Resolver, } from "react-hook-form"
import axios from "axios"
import { Toast } from "react-native-toast-message/lib/src/Toast";




export const SignUpScreen = () =>{
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

    const [touched, setTouched] = useState({});

    const [values, setValues] = useState<{username : string, password : string, email : string, nickname : string}>({
        username: "",
        password: "",
        email:"",
        nickname:'',
      });
    
      const handleChangeText = (name: 'username' | 'password' | 'email' | 'nickname', text: string): void => {
        setValues({
          ...values,
          [name]: text,
        });
      };

    const handleBlur = (name : 'username' | 'password' | 'email' | 'nickname'): void => {
        setTouched({
            ...touched,
            [name] : true,
        })
    }


    const handlerSignUpSubmit = async (): Promise<void> => {
        
      const body = {
        'username' : values.username,
        'password' : values.password,
        'email' : values.email,
        'nickname' : values.nickname
      }


      const showToast = () => {
        Toast.show({
          type: 'success',
          text1: `${body.nickname}님 회원가입에 성공하셨습니다.`
        })
      }

      const url = 'https://6gsbmtye9b.execute-api.ap-northeast-2.amazonaws.com/new_prod/signup'

      try{

      const res = await axios.post(url, body)

      console.log(res.data.body)

      if(res.data.body.success === true){
        // Alert.alert('회원가입 성공')
        showToast()
        navigation.navigate('Login')
      }

      else if(res.data.body.errorMessage === 'already exist username.')
      {Alert.alert('이미 존재하는 아이디입니다')}


      else if(res.data.body.errorMessage === 'already exist email.')
      {Alert.alert('이미 존재하는 이메일입니다.')}

      else if(res.data.body.errorMessage === 'already exist nickname.')
      {Alert.alert('이미 존재하는 닉네임입니다')}



      }
    
    catch(error){console.log(error)
      }
    }





    return (
        <SafeAreaView style = {{ flex : 1}}>
          <View style={{justifyContent: 'center', flexGrow : 1}}>
          <View style={styles.inputContainer}>

            <InputField
            style={styles.input}
            placeholder="아이디"
            value={values.username}
            onBlur={() => handleBlur("username")}
            onChangeText={text => handleChangeText("username", text)}
            />

            <InputField
            style={styles.input}
            placeholder="비밀번호"
            value={values.password}
            secureTextEntry={true}
            onBlur={() => handleBlur("password")}
            onChangeText={text => handleChangeText("password", text)}
            />

            
          <InputField
            style={styles.input}
            placeholder="닉네임"
            value={values.nickname}
            onBlur={() => handleBlur("nickname")}
            onChangeText={text => handleChangeText("nickname", text)}
            />

            <InputField
            style={styles.input}
            placeholder="이메일"
            value={values.email}
            onBlur={() => handleBlur("email")}
            onChangeText={text => handleChangeText("email", text)}
            keyboardType='email-address'
            />


            <Button title="회원가입" onPress={() => handlerSignUpSubmit()}></Button>
         
          </View>
          </View>

    
        </SafeAreaView>
      );
    };


    const styles = StyleSheet.create({
        input: {
          height: 40,
          margin: 12,
          borderWidth: 1,
          padding: 10,
        },

        inputContainer: {
            alignSelf: 'stretch',
            paddingHorizontal: 15,
            paddingVertical : 10
          },
      });

