import {StyleSheet, Text, View, Dimensions} from 'react-native';
import React from 'react';

const {width, height} = Dimensions.get('window');

const Notifications = () => {
  return (
    <View style={styles.main}>
      <View style={styles.margin} />
      <View style={styles.box}>
        <View style={styles.point} />
        <View style={styles.tab}>
          <Text style={styles.msg}>
            Your appointment has been booked for Feburary 29, 2024 from 9am-10am
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
  },
  tab: {
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 5,
    backgroundColor: 'white',
  },
  margin: {
    marginTop: 50,
  },
  msg: {
    fontSize: 15,
    color: 'maroon',
    fontFamily: 'SF-Pro-Text-Light',
  },
  point: {
    borderRadius: 100,
    width: width * 0.03,
    height: width * 0.03,
    backgroundColor: 'maroon',
    marginLeft: 5,
  },
  box: {
    flexDirection: 'row',
    justifyContnet: 'space-between',
    alignItems: 'center',
  },
});
