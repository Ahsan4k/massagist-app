import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {post} from '../networkcalls/requests';
import {useSelector} from 'react-redux';
import BackButton from '../components/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import {COLORS} from '../consts/colors';

const {width, height} = Dimensions.get('window');

const BookingHistory = props => {
  const {useState, useEffect} = React;
  const email = useSelector((state: any) => state.auth.data.email);
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);

  const getBookingHistory = async () => {
    console.log('email========>', email);
    try {
      isLoading(true);
      const response = await post('book/getBookingHistory', {email});
      console.log('res======>', response.data.data);
      setData(response.data.data);
    } catch (error) {
      console.log('error======>', error);
    }
    isLoading(false);
  };

  useEffect(() => {
    getBookingHistory();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator color="blue" size="large" />
      </View>
    );
  }

  if (data?.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}>
        <Text style={{color: '#888', fontSize: 20}}> No Booking History</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <View style={{marginHorizontal: 10}}>
        <BackButton onPress={() => props.navigation.goBack()} />
      </View>
      <FlatList
        style={styles.list}
        data={data.reverse()}
        keyExtractor={(item, index) => index}
        renderItem={({item, index}) =>
          item.type == 'Body Massage' ? (
            <View style={styles.card}>
              <View style={styles.direction}>
                <Text style={styles.margin}>Type: {item.type}</Text>
                <Text style={styles.text}>No. of Hands: {item.hands}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={styles.margin}>Date: {item.date}</Text>
                <Text style={styles.text}>Duration: {item.duration}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={styles.margin}>Start Time: {item.startTime}</Text>
                <Text style={styles.text}>End Time: {item.endTime}</Text>
              </View>
              <Text style={styles.rate}>Price: ${item.price}</Text>
            </View>
          ) : (
            <View style={styles.card}>
              <View style={styles.direction}>
                <Text style={styles.margin}>Type: {item.type}</Text>
                <Text style={styles.text}>No. of Hands: {item.hands}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={styles.margin}>Date: {item.date}</Text>
                <Text style={styles.text}>Duration: {item.duration}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={styles.margin}>Start Time: {item.startTime}</Text>
                <Text style={styles.text}>End Time: {item.endTime}</Text>
              </View>
              <View style={styles.direction}>
                <Text style={[styles.rate, {marginTop: 0}]}>
                  Price: ${item.price}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  flexDirection: 'row',
                  alignItems: 'flex-end',
                  justifyContent: 'space-between',
                }}>
                <View>
                  <Text
                    style={[styles.text, {textDecorationLine: 'underline'}]}>
                    Add ons:
                  </Text>
                  {item.addons.map((e: any) => (
                    <View style={{marginTop: 5}}>
                      <Text style={{color: '#fff'}}>Item: {e?.value} </Text>
                      <Text style={{color: '#fff'}}>Price: ${e.price} </Text>
                    </View>
                  ))}
                </View>
                <Text style={styles.text}>
                  Total: ${item.addons.map((e: any) => +e.price + +item.price)}
                </Text>
              </View>
            </View>
          )
        }
      />
    </SafeAreaView>
  );
};

export default BookingHistory;

const styles = StyleSheet.create({
  main: {
    width: width,
    height: height,
    backgroundColor: 'white',
  },
  card: {
    width: width * 0.9,
    backgroundColor: COLORS.primary,
    alignSelf: 'center',
    marginTop: 20,
    padding: 20,
    paddingTop: 12,
    borderRadius: 10,
  },
  list: {
    marginTop: 20,
  },
  type: {
    flexDirection: 'row',
  },
  direction: {
    flexDirection: 'row',
    width: width * 0.8,
    justifyContent: 'space-between',
    marginTop: 10,
  },
  margin: {
    // marginLeft: 23,
    color: 'white',
  },
  text: {
    color: 'white',
  },
  size: {
    marginLeft: 23,
    color: 'white',
  },
  rate: {
    marginTop: 10,
    color: 'white',
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
