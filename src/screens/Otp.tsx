import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React from 'react';
import { post } from '../networkcalls/requests';
import InnerLoader from '../components/InnerLoader';

const {width, height} = Dimensions.get('window');

const Otp = props => {
  const {useState} = React;
  const [otp, setOTP] = useState('');
  const [innerLoading, setInnerLoading] = useState(false);

  const validator = () => {
    if (otp === '') {
      Alert.alert('Info', 'OTP is required.');
      return false;
    }
    return true;
  };

  const otpVerifyHandler = async () => {
    if (validator()) {
      setInnerLoading(true);
      try {
        const response = await post('auth/verify', {
          otp: +otp,
        });
        console.log(response?.data);
        if (response?.data?.success) {
          setInnerLoading(false);
          Alert.alert('Success', response?.data?.message, [
            {onPress: () => props.navigation.navigate('ChangePassword', {
              email: props.route.params.email
            })},
          ]);
        }else{
          setInnerLoading(false);
          Alert.alert('Failed', response?.data?.message, [
            {onPress: () => {}},
          ]);
        }
      } catch (error) {
        setInnerLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <View style={styles.view}>
      <Image source={require('../assets/loginIcon.png')} style={styles.logo} />
      <Text style={styles.head}>OTP Verification</Text>
      <View style={styles.inner}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>Otp</Text>
          <TextInput
            style={styles.email}
            onChangeText={(otp: string) => setOTP(otp)}
            value={otp}
            keyboardType='numeric'
            placeholderTextColor={'#ccc'}
            placeholder="Enter Otp"
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.button}
          onPress={otpVerifyHandler}>
           {innerLoading ? (
            <InnerLoader loading={innerLoading} />
          ) : (
            <Text style={styles.btnText}>Verify OTP</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Otp;

const styles = StyleSheet.create({
  view: {
    width: width,
    height: height,
    backgroundColor: '#AE1F31',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    backgroundColor: 'white',
    width: width * 0.9,
    height: height * 0.25,
    borderRadius: 10,
    marginTop: 20,
    // alignItems: 'center',
    paddingTop: 20,
  },
  head: {
    fontSize: 25,
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    marginTop: 20,
  },
  logo: {
    width: 169,
    height: 119,
  },
  email: {
    width: width * 0.83,
    height: height * 0.08,
    borderBottomWidth: 2,
    borderColor: 'grey',
    alignSelf: 'center',
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#AE1F31',
    width: width * 0.5,
    height: height * 0.05,
    alignSelf: 'center',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
  },
  btnText: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 18,
  },
});
