import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const Home = props => {
  const list = [
    {
      image: require('../assets/body_massage.jpg'),
      text: 'Body Massage',
    },
    {
      image: require('../assets/foot_massage.jpg'),
      text: 'Reflexology(Foot)',
    },
  ];

  const onPress = (item: string) => {
    item == 'Body Massage'
      ? props.navigation.navigate('Body', {type: 'Body'})
      : props.navigation.navigate('Reflex', {type: 'Reflexology'});
  };
  return (
    <SafeAreaView style={styles.window}>
      {list.map((item, index) => (
        <TouchableOpacity
          key={index}
          style={styles.option}
          onPress={() => onPress(item.text)}>
          <Image source={item.image} style={styles.img} />
          <Text style={styles.text}>{item.text}</Text>
        </TouchableOpacity>
      ))}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  window: {
    width: width,
    height: height,
    alignItems: 'center',
    backgroundColor: '#AE1F31',
  },
  option: {
    marginTop: 20,
    alignItems: 'center',
  },
  img: {
    width: width * 0.9,
    height: height * 0.3,
    borderRadius: 10,
  },
  text: {
    marginTop: 10,
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 15,
    color: 'white',
  },
});
