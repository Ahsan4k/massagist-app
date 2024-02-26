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
import {useSelector} from 'react-redux';

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
  const [bookings, setBookings] = useState([]);
  const [loading, isLoading] = useState(false);
  const [innerLoading, setInnerLoading] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const user = useSelector((state: any) => state.auth.data);

  console.log(timeSlots);

  const createTimeSlots = (fromTime: any, toTime: any, duration: string) => {
    let startTime = moment(fromTime, 'hh:mm A');
    let endTime = moment(toTime, 'hh:mm A');
    if (endTime.isBefore(startTime)) {
      endTime.add(1, 'day');
    }
    let arr = [];
    while (startTime <= endTime) {
      arr.push(new moment(startTime).format('hh:mm A'));
      startTime.add(duration.slice(0, 3), 'minutes');
    }
    setTimeSlots(arr);
  };

  useEffect(() => {
    createTimeSlots('09:00 AM', '09:00 PM', duration?.time);
  }, []);

  const onDayPress = (selectDay: any) => {
    console.log(selectDay);
    setSelectedDay(selectDay);
  };

  const getBookings = async () => {
    isLoading(true);
    try {
      const response = await post(`book/getDate`, {
        date: selectedDay?.dateString,
      });
      setBookings(response.data.data);
      console.log('resp=========>', response.data.data);
    } catch (error) {
      console.log('geterror=========>', error);
    }
    isLoading(false);
  };

  useEffect(() => {
    getBookings();
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
        token: user?.data?.token,
      });
      if (response?.data?.status === 'Success') {
        setInnerLoading(false);
        Alert.alert('Success', 'Your appointment has been booked!', [
          {onPress: () => getBookings()},
        ]);
      } else if (response?.data?.status === 'Failed') {
        setInnerLoading(false)
        Alert.alert('Failed', "You or someone has already booked this slot for today", [{onPress: () => {}}]);
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

  const bookedColorHandler = (startTime: string, endTime: string) => {
    if (
      bookings.some(
        (items: any) =>
          items.startTime === startTime &&
          items.endTime === endTime &&
          items.count === 2,
      )
    ) {
      return true;
    } else {
      return false;
    }
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
        data={timeSlots.slice(0, timeSlots.length - 1)}
        ListEmptyComponent={_listEmptyComponent}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              disabled={
                bookedColorHandler(item, timeSlots[index + 1]) ? true : false
              }
              onPress={() => {
                setStartTime(item);
                setEndTime(timeSlots[index + 1]);
                setSelectedTime(`${item} - ${timeSlots[index + 1]}`);
              }}
              style={[
                styles.timeslot,
                {
                  backgroundColor: bookedColorHandler(
                    item,
                    timeSlots[index + 1],
                  )
                    ? '#ccc'
                    : selectedTime === `${item} - ${timeSlots[index + 1]}`
                    ? COLORS.primary
                    : '#fff',
                  borderColor: bookedColorHandler(item, timeSlots[index + 1])
                    ? '#ccc'
                    : COLORS.primary,
                },
              ]}>
              <Text
                style={{
                  color:
                    selectedTime === `${item} - ${timeSlots[index + 1]}` ||
                    bookedColorHandler(item, timeSlots[index + 1])
                      ? '#fff'
                      : COLORS.primary,
                }}>
                {' '}
                {item}
                {timeSlots[index + 1] ? ' - ' + timeSlots[index + 1] : ''}
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
