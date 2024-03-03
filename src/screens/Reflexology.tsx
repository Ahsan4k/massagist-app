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
import BouncyCheckbox from 'react-native-bouncy-checkbox';
import { COLORS } from '../consts/colors';
import BackButton from '../components/BackButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const Reflexology = props => {
  const {useState} = React;
  const value = props.route.params;
  const [selectedValue, setSelectedValue] = useState({
    time: '30 minutes',
    price: '30',
    hands: '2',
    id: 0
  });
  const [checkBoxValue, setCheckBoxValue] = useState<any>([]);

  const [twoHands, setTwoHands] = useState([
    {
      status: 'radio-btn-passive',
      time: '30 minutes',
      price: '30',
      hands: '2',
    },
    {
      status: 'radio-btn-passive',
      time: '60 minutes',
      price: '45',
      hands: '2',
    },
  ]);

  const [checkBox, setCheckbox] = useState([
    {
      status: 'checkbox-passive',
      value: 'Table Shower or Sauna',
      price: '10',
    },
    {
      status: 'checkbox-passive',
      value: 'Deep Tissue',
      price: '10',
    },
  ]);

  const onCheckboxPress = (item, index) => {
    setCheckbox(
      checkBox.map((check, number) => {
        if (index == number && check.status == 'checkbox-passive') {
          setCheckBoxValue(prevState =>
            prevState?.length > 0 ? [...prevState, check] : [check],
          );
          return Object.assign({}, check, {
            status: 'checkbox-active',
          });
        } else if (index == number && check.status == 'checkbox-active') {
          setCheckBoxValue(
            checkBoxValue?.length > 0
              ? checkBoxValue.filter(itm => item.value != itm.value)
              : null,
          );
          return Object.assign({}, check, {
            status: 'checkbox-passive',
          });
        } else {
          return Object.assign({}, check, {status: check.status});
        }
      }),
    );
  };

  const selectOptionHandler = (item: any, index: any) => {
    setSelectedValue({
     hands: item.hands,
     time: item.time,
     price: item.price,
     id: index
    })
 }


  console.log('checkBoxValue', checkBoxValue);

  return (
    <SafeAreaView style={styles.window}>
          <View style={{marginHorizontal: 10}}>
        <BackButton onPress={() => props.navigation.goBack()} />
      </View>
      <Image source={require('../assets/foot_massage2.webp')} style={styles.img} />
      {twoHands.map((item, index) => (
        <View style={styles.radio} key={index}>
        <TouchableOpacity
          onPress={() => selectOptionHandler(item, index)}
          style={styles.btn}>
          <Fontisto name={item.time === selectedValue.time && index === selectedValue.id ? 'radio-btn-active' : 'radio-btn-passive'} color={COLORS.primary} size={20} />
          <Text style ={{marginLeft: 10}}>{item.time}</Text>
        </TouchableOpacity>
        <Text>${item.price}</Text>
      </View>
      ))}
      <Text style={styles.four}>Additional options</Text>
      {checkBox.map((item, index) => (
        <View style={styles.radio} key={index}>
          <TouchableOpacity
            onPress={() => onCheckboxPress(item, index)}
            style={styles.btn2}>
            <Fontisto name={item.status} color={COLORS.primary} size={20} />
            <Text style={{marginLeft: 10}}>{item.value}</Text>
          </TouchableOpacity>
          <Text>${item.price}</Text>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Calendar', {
            value,
            selectedValue,
            checkBoxValue,
          })
        }
        style={styles.book}>
        <Text style={styles.now}>Continue</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Reflexology;

const styles = StyleSheet.create({
  window: {
    width: width,
    height: height,
  },
  img: {
    width: width * 0.95,
    height: height * 0.3,
    marginTop: width / 15,
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
    justifyContent: 'space-between',
    width: width * 0.27,
  },
  btn2: {
    flexDirection: 'row',
    alignItems: 'center',
    width: width * 0.5,
  },
  four: {
    marginTop: 20,
    marginLeft: 20,
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 20,
  },
  book: {
    marginTop: 150,
    alignSelf: 'center',
    backgroundColor: COLORS.primary,
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
