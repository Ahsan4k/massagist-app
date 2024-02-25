import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import React, {useCallback} from 'react';
import {Calendar} from 'react-native-calendars';
import moment from 'moment';
import {post, get} from '../networkcalls/requests';

const {width, height} = Dimensions.get('window');

const Book = props => {
  const {useState, useEffect} = React;
  const interval = props.route.params.selectedValue.time;
  const type = props.route.params.value.type;
  const [selectedDay, setSelectedDay] = useState({});
  const [timeSlot, setTimeSlot] = useState(null);
  const [timeSlots, setTimeSlots] = useState<any>([]);
  // const [visible, isVisible] = useState(false);
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);

  const onDayPress = selectDay => {
    setSelectedDay(selectDay);
  };

  const filterArray = (arr: any) => {
    if (arr.length > 0) {
      return arr.filter(
        (item: any, index: number) => arr.indexOf(item.startTime) != index,
      );
    } else {
      return [];
    }
  };
  const GetTimeSlots = async () => {
    isLoading(true);
    try {
      const response = await post('book/getDate', {
        date: selectedDay.dateString,
      });
      setData(response.data.data);
    } catch (error) {
      console.log('geterror=========>', error);
    }
    isLoading(false);
  };

  const selectedDate = useCallback(() => {
    GetTimeSlots();
  }, [selectedDay]);

  const createTimeSlots = (interval: string) => {
    let startTime = moment('09:00', 'HH:mm');
    let endTime = moment('21:30', 'HH:mm');
    const filterArr = filterArray(data);
    let arr = [];
    while (startTime <= endTime) {
      for (let i = 0; i <= filterArr.length; i++) {
        if (
          startTime >= filterArr[i]?.startTime &&
          startTime <= filterArr[i]?.endTime
        ) {
          arr.push(null);
          startTime.add(interval, 'minutes');
          return;
        }
      }
      arr.push(new moment(startTime).format('HH:mm'));
      startTime.add(interval, 'minutes');
    }
    return arr;
  };

  useEffect(() => {
    setTimeSlots(createTimeSlots(interval));
    selectedDate();
  }, [selectedDay]);

  const SetBookingTime = async (startTime: any, endTime: any) => {
    console.log('payload======>', startTime, endTime);
    isLoading(true);
    try {
      const response = await post('book/bookDate', {
        type,
        startTime,
        endTime,
        date: selectedDay.dateString,
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjIwMjQtMDItMTRUMTc6NTI6MTEuMDcwWiIsInVzZXJuYW1lIjoiYWJkdWwgYmFzaXQiLCJpYXQiOjE3MDc5MzMxMzF9.mtYAQELcbjqAREFfFSTg4RdpFunTLaWVCeeUET9-U3o',
      });
      console.log(response.data);
    } catch (error) {
      Alert;
    }
    isLoading(false);
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

  return (
    <View style={{width: width, height: height}}>
      <Calendar
        minDate={moment(new Date()).format('YYYY-MM-DD')}
        onDayPress={onDayPress}
        current={moment(new Date()).format('YYYY-MM-DD')}
        // theme={{
        //   backgroundColor: '#ffffff',
        //   calendarBackground: '#AE1F31',
        //   selectedDayBackgroundColor: '#ffffff',
        //   selectedDayTextColor: '#AE1F31',
        // }}
      />
      <FlatList
        data={timeSlots}
        renderItem={({item, index}) => {
          if (timeSlots[index + 1]) {
            return (
              <TouchableOpacity
                onPress={() => {
                  SetBookingTime(timeSlots[index], timeSlots[index + 1]);
                }}
                style={styles.timeslot}>
                <Text>
                  {timeSlots[index + 1]
                    ? item + '-' + timeSlots[index + 1]
                    : null}
                </Text>
              </TouchableOpacity>
            );
          } else {
            null;
          }
        }}
        numColumns={2}
      />
    </View>
  );
};

export default Book;

const styles = StyleSheet.create({
  timeslot: {
    width: width * 0.45,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
