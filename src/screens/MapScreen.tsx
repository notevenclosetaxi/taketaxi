import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "./HomeScreen";
import { Button, StyleSheet, TextInput } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import NaverMapView, {Circle, Marker, Path, Polyline, Polygon} from "react-native-nmap";



export const MapScreen = () => {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParam>>();


    const P0 = {latitude: 37.564362, longitude: 126.977011};





    return(<>
    <SafeAreaView>
    <Button 
    title="Home"
    onPress={() => navigation.navigate('Home')}/>

    <TextInput 
    style={styles.input}
    placeholder="출발지"/>

    <TextInput
    style={styles.input}
    placeholder="목적지"/>




<NaverMapView style={{width: '100%', height: '60%'}}
                         showsMyLocationButton={true}
                         center={{...P0, zoom: 16}}
                        //  onTouch={e => console.log('onTouch', JSON.stringify(e.nativeEvent))}
                        //  onCameraChange={e => console.log('onCameraChange', JSON.stringify(e))}
                         onMapClick={e => console.log('onMapClick', JSON.stringify(e))}>
    </NaverMapView>


    
    
</SafeAreaView>
    </>)
}


const styles = StyleSheet.create({
    input: {
      height: 40,
      width: '75%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });