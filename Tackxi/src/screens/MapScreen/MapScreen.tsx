import React, {useEffect, useState} from 'react';
import NaverMapView from 'react-native-nmap';
import {styled} from './styles';
import {Animated, TouchableOpacity, View} from 'react-native';
import {Suggestion} from '../../components';
import {mock} from './mock';
import {SuggestionStore} from '../../stores';
import {IconChevronDown, IconChevronUp, IconX} from 'tabler-icons-react-native';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {SuggestionStackParamList} from '../../navigator/Stacks/SuggestionStack/SuggestionStack';

interface MapScreenProps {}

export interface LatLongType {
  latitude: number;
  longitude: number;
}

const MapScreen: React.FC<MapScreenProps> = () => {
  const suggestionNavigation =
    useNavigation<NativeStackNavigationProp<SuggestionStackParamList>>();
  const {infoId} = SuggestionStore();
  const [isOpen, setIsOpen] = useState(false);
  const [centerPoint, setCenterPoint] = useState<LatLongType>({
    latitude: 37.564362,
    longitude: 126.977011,
  });

  useEffect(() => {
    return () => {
      setIsOpen(false);
    };
  }, []);

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigate = () => {
    suggestionNavigation.navigate('suggestion');
  };

  return (
    <View style={styled(isOpen).container}>
      <NaverMapView
        style={styled(isOpen).map}
        showsMyLocationButton={true}
        center={{...centerPoint, zoom: 14}}
      />
      <TouchableOpacity onPress={handleNavigate} style={styled(isOpen).icon}>
        <IconX />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={1}
        onPress={handleOpen}
        style={styled(isOpen).body}>
        <Animated.View>
          <View style={styled(isOpen).bodyHeader}>
            {isOpen ? <IconChevronDown /> : <IconChevronUp />}
          </View>
          <Suggestion info={mock.infoList[infoId]} />
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default MapScreen;
