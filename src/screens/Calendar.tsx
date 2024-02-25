import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView,
} from 'react-native';
import React, {useCallback} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {post, get} from '../networkcalls/requests';
import axios from 'axios';
import { COLORS } from '../consts/colors';

const {width, height} = Dimensions.get('window');

const Book = props => {
  const {useState, useEffect} = React;
  const type = props.route.params.value.type;
  const duration = props.route.params?.selectedValue;
  const [selectedDay, setSelectedDay] = useState({});
  const [timeSlots, setTimeSlots] = useState<any>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);

  const onDayPress = (selectDay: any) => {
    console.log(selectDay)
    setSelectedDay(selectDay);
  };

  const GetTimeSlots = async () => {
    isLoading(true);
    try {
      const response = await get(`timeslots/availableslots/?date=${selectedDay.dateString}&duration=${duration.time}`);
      setData(response.data);
      setTimeSlots(response.data)
    } catch (error) {
      console.log('geterror=========>', error);
    }
    isLoading(false);
  };

  useEffect(() => {
    GetTimeSlots();
  },[selectedDay])

  const SetBookingTime = async (startTime: any, endTime: any) => {
    const startHours = startTime.slice(0, 2);
    const startMinutes = startTime.slice(3);
    const startDate = new Date(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day,
      startHours,
      startMinutes,
    );
    startDate.setTime(
      startDate.getTime() - startDate.getTimezoneOffset() * 60 * 1000,
    );
    const endHours = endTime.slice(0, 2);
    const endMinutes = endTime.slice(3);
    const endDate = new Date(
      selectedDay.year,
      selectedDay.month,
      selectedDay.day,
      endHours,
      endMinutes,
    );
    endDate.setTime(
      endDate.getTime() - endDate.getTimezoneOffset() * 60 * 1000,
    );
    try {
      const response = await post('book/bookDate', {
        type,
        startDate,
        endDate,
        date: selectedDay.dateString,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMjQtMDItMTRUMTc6NTI6MTEuMDcwWiIsInVzZXJuYW1lIjoiYWJkdWwgYmFzaXQiLCJpYXQiOjE3MDc5MzMxMzF9.mtYAQELcbjqAREFfFSTg4RdpFunTLaWVCeeUET9-U3o',
      });
      console.log(response.data);
    } catch (error) {
      Alert;
    }
  };

  if (loading) {
    return (
      <View
        style={{
          width: width,
          height: height,
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
        }}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

 const  _listEmptyComponent = () => {
    return (
        <View style={{marginHorizontal: 10}}>
            <Text> No slot found for this date.</Text>
        </View>
    )
}

  return (
    <SafeAreaView style={{width: width, height: height, backgroundColor: '#fff'}}>
      <Calendar
        minDate={moment(new Date()).format('YYYY-MM-DD')}
        onDayPress={onDayPress}
        current={moment(new Date()).format('YYYY-MM-DD')}
        theme={{
          calendarBackground: '#fff',  
          dayTextColor: 'blue',
          arrowColor: "blue",
          todayTextColor: COLORS.primary,
        }}
      />
      <View style ={{marginHorizontal: 10, marginTop: 20, borderBottomWidth: 1, borderBottomColor: '#eee', paddingBottom: 5}}>
       <Text style={{color: '#000', fontWeight: 'bold', fontSize: 17}}> Available Slots </Text>
      </View>
      <FlatList
        data={timeSlots}
        ListEmptyComponent={_listEmptyComponent}
        renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedTime(`${item?.startTime} - ${item?.endTime}`);
                  SetBookingTime(item?.startTime, item?.endTime);
                }}
                style={[styles.timeslot, { backgroundColor: selectedTime === `${item?.startTime} - ${item?.endTime}` ? 'blue' : COLORS.primary}]}>
                <Text style={{color: '#fff'}}> {item?.startTime} - {item?.endTime} </Text>
              </TouchableOpacity>
            );
        }}
        numColumns={2}
      />
        <TouchableOpacity
        onPress={() =>{}}
        style={styles.book}>
        <Text style={styles.now}>Book Now</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default Book;

const styles = StyleSheet.create({
  timeslot: {
    width: width * 0.45,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'blue',
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
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
