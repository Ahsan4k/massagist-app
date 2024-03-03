import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
  Image,
  Alert,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import Modal from 'react-native-modal';
import {useDispatch, useSelector} from 'react-redux';
import {COLORS} from '../consts/colors';
import {del, patch, post} from '../networkcalls/requests';
import {login, logout, updateUser} from '../redux/authSlice';
import InnerLoader from '../components/InnerLoader';

const {width, height} = Dimensions.get('screen');

const Profile = props => {
  const {useState} = React;
  const [visible, setVisible] = useState<boolean>(false);
  const user = useSelector((state: any) => state.auth.data);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [innerLoading, setInnerLoading] = useState(false);
  const dispatch = useDispatch();
  console.log(user);

  const logoutHandler = async () => {
    setInnerLoading(true);
    try {
      const response = await post('auth/logout', {token: user.token});
      if (response?.data?.success) {
        dispatch(logout([]));
        setInnerLoading(false);
      } else {
        setInnerLoading(false);
        Alert.alert('Failed', response?.data?.reason);
      }
    } catch (error) {
      setInnerLoading(false);
      console.log(error);
    }
  };

  const updateNumber = async () => {
    setInnerLoading(true)
      try {
        const res = await patch('auth/changeNumber', {
          email: user.email,
          number: phoneNumber,
        });
        if(res){
          setInnerLoading(false)
          setVisible(false);
          dispatch(updateUser({phoneNumber: phoneNumber}));
          Alert.alert('Message', 'Your phone number is updated successfully.', [
            {text: 'Ok'},
          ]);
        }
      } catch (error) {
        console.log(error);
        setInnerLoading(false)
        setVisible(false);
        Alert.alert('Message', 'Sorry, there was some error', [{text: 'Ok'}]);
      }
    }

  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.window}>
        <View style={styles.inner}>
          <View style={styles.circle}>
            <Text style={styles.name}>{`${user.firstName.slice(
              0,
              1,
            )}${user.lastName.slice(0, 1)}`}</Text>
          </View>
          <Text style={styles.des}>{`${user.firstName} ${user.lastName}`}</Text>
          <Text style={styles.des}>{user.email}</Text>
          <Text style={styles.des}>{phoneNumber}</Text>
        </View>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          style={[styles.tab, {marginTop: 30}]}>
          <Text style={styles.text}>Change Phone number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChangePassword')}
          style={styles.tab}>
          <Text style={styles.text}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('BookingHistory')}
          style={styles.tab}>
          <Text style={styles.text}>Booking History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab} onPress={logoutHandler}>
          {innerLoading ? (
            <InnerLoader loading={innerLoading} />
          ) : (
            <Text style={styles.text}>Logout</Text>
          )}
        </TouchableOpacity>
      </View>
      <Modal isVisible={visible}>
        <View style={styles.modal}>
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.close}>
            <Image
              source={require('../assets/close.png')}
              style={{width: 35, height: 35}}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Phone Number"
            placeholderTextColor="#ccc"
            onChangeText={phone => setPhoneNumber(phone)}
            value={phoneNumber}
            style={styles.input}
          />
          <TouchableOpacity onPress={updateNumber} style={styles.btn}>
            {innerLoading ? (
              <InnerLoader loading={innerLoading} />
            ) : (
              <Text style={styles.btnText}>Update</Text>
            )}
          </TouchableOpacity>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  main: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    flex: 1,
  },
  window: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 10,
  },
  inner: {
    alignItems: 'center',
  },
  circle: {
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    width: width * 0.2,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
    marginBottom: 10,
  },
  name: {
    color: 'white',
    fontFamily: 'sF-Pro-Text-Bold',
    fontSize: 30,
  },
  tab: {
    backgroundColor: COLORS.primary,
    width: width * 0.7,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    borderRadius: 15
  },
  text: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 20,
  },
  des: {
    fontSize: 18,
    fontFamily: 'SF-Pro-Text-Bold',
  },
  modal: {
    width: width * 0.8,
    height: height * 0.22,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    height: '25%',
    marginTop: 10,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    borderRadius: 5,
    paddingLeft: 10,
  },
  btn: {
    width: '50%',
    height: '25%',
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  btnText: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 20,
  },
  close: {
    fontSize: 22,
    alignSelf: 'flex-end',
    marginRight: 10,
    marginTop: 10,
  },
});
