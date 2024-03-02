import {StyleSheet, Text, View, Dimensions, FlatList} from 'react-native';
import React, {useState, useCallback} from 'react';
import {COLORS} from '../consts/colors';
import {useFocusEffect} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const {width, height} = Dimensions.get('window');

const Notifications = () => {
  const [savedBookings, setSavedBookings] = useState([]);
  console.log("SAVED BOOKINGS ", savedBookings)

  useFocusEffect(
    useCallback(() => {
      const getBookings = async () => {
        const bookings = await AsyncStorage.getItem('tempBookings');
        const parsed = bookings !== null ? JSON.parse(bookings) : null
        if (parsed) {
          setSavedBookings(parsed);
        }
      };
      getBookings();
    }, []),
  );

  

  if (savedBookings?.length === 0) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: '#888', fontSize: 20}}> No new notifications</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <FlatList
      contentContainerStyle={{paddingBottom:60}}
      data={savedBookings.reverse()}
      renderItem={({item, index}) => (
        <View style={styles.box} key={index}>
        <View style={styles.point} />
        <View style={styles.tab}>
          <Text style={styles.msg}>
            Your appointment has been booked for {item?.date} from{' '}
            {item?.startTime} to {item?.endTime}
          </Text>
        </View>
      </View>
      )}
      />
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
  },
  tab: {
    width: width / 1.1,
    borderWidth: 1,
    borderColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginRight: 10,
    marginLeft: 10,
    backgroundColor: 'white',
  },
  margin: {
    marginTop: 50,
  },
  msg: {
    fontSize: 15,
    color: COLORS.primary,
    fontFamily: 'SF-Pro-Text-Light',
  },
  point: {
    borderRadius: 100,
    width: width * 0.03,
    height: width * 0.03,
    backgroundColor: 'pink',
    marginLeft: 5,
    marginTop: 20,
  },
  box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
