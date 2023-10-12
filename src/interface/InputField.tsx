import { Colors } from "react-native/Libraries/NewAppScreen";
import { StyleSheet, Text, TextInput, TextInputProps, View } from "react-native";

interface InputFieldProps extends TextInputProps {
    touched?: boolean;
    error?: string;
  }
  
function InputField({ touched, error, ...props}: InputFieldProps){

    return(
        <View style={styles.container}>
        <TextInput
          placeholderTextColor={Colors.GRAY}
          {...props}

        />
        {touched && error && <Text style={styles.error}>{error}</Text>}
      </View>

    )
}


const styles = StyleSheet.create({
    container: {
      marginBottom: 10,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      paddingLeft: 10,
      
    },
    error: {
      color: 'red',
      marginTop: 5,
    },
  });


export default InputField