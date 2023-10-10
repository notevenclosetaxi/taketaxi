import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useState } from "react";
import { Alert, Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import InputField from "../interface/InputField";
import { RootStackParam } from "./HomeScreen";
import axios from "axios"
import { jsonResType } from "../type/jsonResType";
import Toast from 'react-native-toast-message'
import AsyncStorage from "@react-native-async-storage/async-storage";



export const LoginScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();

    const [touched, setTouched] = useState({});

    const [values, setValues] = useState<{username : string, password : string}>({
        username: "",
        password: "",
      });
    
      const handleChangeText = (name: 'username' | 'password', text: string): void => {
        setValues({
          ...values,
          [name]: text,
        });
      };

      const [resdata, setResdata] = useState<any | jsonResType>()

      


      const handlerSubmit = async () => {
        
        const body = {
          'username' : values.username,
          'password' : values.password
        }
        const url = 'https://6gsbmtye9b.execute-api.ap-northeast-2.amazonaws.com/new_prod/signin'

        try{

        const res = await axios.post(url, body)

        // console.log(res.data.body.token)

        
        const showToast = () => {
          Toast.show({
            type: 'success',
            text1: `${res.data.body.nickname}님 로그인에 성공하셨습니다.`
          })
        }



        if(res.data.body.success === true){

          // setResdata(res.data.body)
          try {
            await AsyncStorage.setItem('Tokens', JSON.stringify({'tokens' : res.data.body.token, 'nickname' : res.data.body.nickname}));
            console.log('Data stored successfully');
            showToast();
            navigation.navigate('Home');
          } catch (error) {
            console.error("Error saving data", error);
          }
        }
        else if(res.data.statusCode === 400){
          Alert.alert('로그인 실패')
        }
      }
      catch(error){console.log(error)
        }
      }
      


    const handleBlur = (name : string) => {
        setTouched({
            ...touched,
            [name] : true,
        })
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


            <Button title="로그인" onPress={() => handlerSubmit()}></Button>
         
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

