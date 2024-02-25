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

const {width, height} = Dimensions.get('window');

const BodyMassage = props => {
  const {useState} = React;
  const value = props.route.params;
  const [selectedValue, setSelectedValue] = useState({time: '', price: ''});

  const [twoHands, setTwoHands] = useState([
    {
      status: 'radio-btn-passive',
      time: '30',
      price: '45',
      hands: '2',
    },
    {
      status: 'radio-btn-passive',
      time: '60',
      price: '70',
      hands: '2',
    },
    {
      status: 'radio-btn-passive',
      time: '90',
      price: '100',
      hands: '2',
    },
    {
      status: 'radio-btn-passive',
      time: '120',
      price: '130',
      hands: '2',
    },
  ]);

  const [fourHands, setFourHands] = useState([
    {
      status: 'radio-btn-passive',
      time: '60',
      price: '130',
      hands: '4',
    },
    {
      status: 'radio-btn-passive',
      time: '90',
      price: '200',
      hands: '4',
    },
  ]);

  const twoHandsOption = (item, index) => {
    setFourHands(
      fourHands.map(four =>
        Object.assign({}, four, {
          status:
            four.status == 'radio-btn-active'
              ? (four.status = 'radio-btn-passive')
              : four.status,
        }),
      ),
    );
    setTwoHands(
      twoHands.map((two, number) => {
        if (index == number) {
          setSelectedValue(two);
          return Object.assign({}, two, {status: 'radio-btn-active'});
        } else {
          return Object.assign({}, two, {status: 'radio-btn-passive'});
        }
      }),
    );
  };

  const fourHandsOption = (item, index) => {
    setTwoHands(
      twoHands.map(two =>
        Object.assign({}, two, {
          status:
            two.status == 'radio-btn-active'
              ? (two.status = 'radio-btn-passive')
              : two.status,
        }),
      ),
    );
    setFourHands(
      fourHands.map((four, number) => {
        if (index == number) {
          setSelectedValue(four);
          return Object.assign({}, four, {status: 'radio-btn-active'});
        } else {
          return Object.assign({}, four, {status: 'radio-btn-passive'});
        }
      }),
    );
  };

  return (
    <View style={styles.window}>
      <Image source={require('../assets/Rectangle6.png')} style={styles.img} />
      {twoHands.map((item, index) => (
        <View style={styles.radio} key={index}>
          <TouchableOpacity
            onPress={() => twoHandsOption(item, index)}
            style={styles.btn}>
            <Fontisto name={item.status} color="maroon" size={20} />
            <Text style={{marginLeft: 10}}>{item.time} minutes</Text>
          </TouchableOpacity>
          <Text>${item.price}</Text>
        </View>
      ))}
      <Text style={styles.four}>4 Hands</Text>
      {fourHands.map((item, index) => (
        <View style={styles.radio} key={index}>
          <TouchableOpacity
            onPress={() => fourHandsOption(item, index)}
            style={styles.btn}>
            <Fontisto name={item.status} color="maroon" size={20} />
            <Text style={{marginLeft: 10}}>{item.time} minutes</Text>
          </TouchableOpacity>
          <Text>${item.price}</Text>
        </View>
      ))}
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('Calendar', {value, selectedValue})
        }
        style={styles.book}>
        <Text style={styles.now}>Book Now</Text>
      </TouchableOpacity>
    </View>
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
    marginTop: 50,
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
