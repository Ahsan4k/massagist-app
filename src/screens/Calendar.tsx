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
import {COLORS} from '../consts/colors';
import InnerLoader from '../components/InnerLoader';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

const Book = props => {
  const {useState, useEffect} = React;
  const type = props.route.params.value.type;
  const duration = props.route.params?.selectedValue;
  console.log(duration);
  const [selectedDay, setSelectedDay] = useState({
    dateString: moment(new Date()).format('YYYY-MM-DD'),
  });
  const [timeSlots, setTimeSlots] = useState<any>([]);
  const [selectedTime, setSelectedTime] = useState('');
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const user = useSelector((state: any) => state.auth.data)
  const value = useSelector((state: any) => state.auth.value)
  console.log("USER ", value)

  const onDayPress = (selectDay: any) => {
    console.log(selectDay);
    setSelectedDay(selectDay);
  };

  const GetTimeSlots = async () => {
    isLoading(true);
    try {
      const response = await get(
        `timeslots/availableslots/?date=${selectedDay.dateString}&duration=${duration.time}`,
      );
      setData(response.data);
      setTimeSlots(response.data);
    } catch (error) {
      console.log('geterror=========>', error);
    }
    isLoading(false);
  };

  useEffect(() => {
    GetTimeSlots();
  }, [selectedDay]);

  const bookAppointmentHandler = async () => {
    setInnerLoading(true);
    try {
      const response = await post('book/bookDate', {
        type,
        startTime,
        endTime,
        date: selectedDay.dateString,
        duration: duration,
        count: 1,
        token: user?.data?.token
      });
      if (response?.data?.status === 'Success') {
        setInnerLoading(false);
        Alert.alert('Success', 'Your appointment has been booked!', [
          {onPress: () => GetTimeSlots()},
        ]);
      }
    } catch (error) {
      setInnerLoading(false);
      console.log(error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  const _listEmptyComponent = () => {
    return (
      <View style={{marginHorizontal: 10}}>
        <Text> No slot found for this date.</Text>
      </View>
    );
  };

  return (
    <SafeAreaView
      style={{width: width, height: height, backgroundColor: '#fff'}}>
      <Calendar
        minDate={moment(new Date()).format('YYYY-MM-DD')}
        onDayPress={onDayPress}
        current={moment(new Date()).format('YYYY-MM-DD')}
        theme={{
          calendarBackground: '#fff',
          dayTextColor: 'blue',
          arrowColor: 'blue',
          todayTextColor: COLORS.primary,
        }}
      />
      <View
        style={{
          marginHorizontal: 10,
          marginTop: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#eee',
          paddingBottom: 5,
        }}>
        <Text style={{color: '#000', fontWeight: 'bold', fontSize: 17}}>
          {' '}
          Available Slots{' '}
        </Text>
      </View>
      <FlatList
        data={timeSlots}
        ListEmptyComponent={_listEmptyComponent}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setStartTime(item?.startTime);
                setEndTime(item?.endTime);
                setSelectedTime(`${item?.startTime} - ${item?.endTime}`);
              }}
              style={[
                styles.timeslot,
                {
                  backgroundColor:
                    selectedTime === `${item?.startTime} - ${item?.endTime}`
                      ? COLORS.primary
                      : '#fff',
                },
              ]}>
              <Text
                style={{
                  color:
                    selectedTime === `${item?.startTime} - ${item?.endTime}`
                      ? '#fff'
                      : COLORS.primary,
                }}>
                {' '}
                {item?.startTime} - {item?.endTime}{' '}
              </Text>
            </TouchableOpacity>
          );
        }}
        numColumns={2}
      />
      <TouchableOpacity onPress={bookAppointmentHandler} style={styles.book}>
        {innerLoading ? (
          <InnerLoader loading={innerLoading} />
        ) : (
          <Text style={styles.now}>Book Now</Text>
        )}
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
    borderColor: COLORS.primary,
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
  loader: {
    width: width,
    height: height,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    backgroundColor: '#fff',
  },
});
