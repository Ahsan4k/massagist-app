import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import BackButton from '../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const BodyMassage = props => {
  const {useState} = React;
  const value = props.route.params;
  const [selectedValue, setSelectedValue] = useState({id: 0, time: '30 minutes', price: '45', hands:'2'});

  const [twoHands] = useState([
    {
      status: 'radio-btn-passive',
      time: '30 minutes',
      price: '45',
      hands: '2',
    },
    {
      status: 'radio-btn-passive',
      time: '60 minutes',
      price: '70',
      hands: '2',
    },
    {
      status: 'radio-btn-passive',
      time: '90 minutes',
      price: '100',
      hands: '2',
    },
    {
      status: 'radio-btn-passive',
      time: '120 minutes',
      price: '130',
      hands: '2',
    },
  ]);

  const [fourHands] = useState([
    {
      status: 'radio-btn-passive',
      time: '60 minutes',
      price: '130',
      hands: '4',
    },
    {
      status: 'radio-btn-passive',
      time: '90 minutes',
      price: '200',
      hands: '4',
    },
  ]);

  const selectOptionHandler = (item: any, index: any) => {
     setSelectedValue({
      hands: item.hands,
      time: item.time,
      price: item.price,
      id: index
     })
  }

  return (
    <SafeAreaView style={styles.window}>
      <View style={{marginHorizontal: 10}}>
      <BackButton onPress={() => props.navigation.goBack()}/>
      </View>
      <Image source={require('../assets/back_massage.jpg')} style={styles.img} />
      <Text style={styles.four}>2 Hands</Text>
      {twoHands.map((item, index) => (
        <View style={styles.radio} key={index}>
          <TouchableOpacity
            onPress={() => selectOptionHandler(item, index)}
            style={styles.btn}>
            <Fontisto name={item.time === selectedValue.time && index === selectedValue.id ? 'radio-btn-active' : 'radio-btn-passive'} color="maroon" size={20} />
            <Text style ={{marginLeft: 10}}>{item.time}</Text>
          </TouchableOpacity>
          <Text>${item.price}</Text>
        </View>
      ))}
      <Text style={styles.four}>4 Hands</Text>
      {fourHands.map((item, index) => (
        <View style={styles.radio} key={index}>
          <TouchableOpacity
            onPress={() => selectOptionHandler(item, index)}
            style={styles.btn}>
            <Fontisto name={item.time === selectedValue.time && index === selectedValue.id ? 'radio-btn-active' : 'radio-btn-passive'} color="maroon" size={20} />
            <Text style ={{marginLeft: 10}}>{item.time}</Text>
          </TouchableOpacity>
          <Text>${item.price}</Text>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Calendar', {value, selectedValue})
        }
        style={styles.book}>
        <Text style={styles.now}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default BodyMassage;

const styles = StyleSheet.create({
  window: {
    width: width,
    height: height,
  },
  img: {
    width: width * 0.95,
    height: height * 0.3,
    marginTop: 30,
    alignSelf: 'center',
  },
  radio: {
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.9,
    justifyContent: 'space-between',
    marginTop: 20,
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.27,
  },
  four: {
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 20,
  },
  book: {
    marginTop: 50,
    alignSelf: 'center',
    backgroundColor: 'maroon',
    width: width * 0.9,
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  now: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'SF-Pro-Text-Bold',
  },
});
