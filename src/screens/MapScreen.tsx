import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParam } from "./HomeScreen";
import { Button } from "react-native";
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

<NaverMapView style={{width: '100%', height: '80%'}}
                         showsMyLocationButton={true}
                         center={{...P0, zoom: 16}}
                         onTouch={e => console.warn('onTouch', JSON.stringify(e.nativeEvent))}
                         onCameraChange={e => console.warn('onCameraChange', JSON.stringify(e))}
                         onMapClick={e => console.warn('onMapClick', JSON.stringify(e))}>
    </NaverMapView>


    
    
</SafeAreaView>
    </>)
}