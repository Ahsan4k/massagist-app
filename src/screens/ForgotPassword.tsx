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
import {post} from '../networkcalls/requests';
import InnerLoader from '../components/InnerLoader';
import BackButton from '../components/BackButton';
import {SafeAreaView} from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window');

const ForgotPassword = props => {
  const {useState} = React;
  const [email, setEmail] = useState('');
  const [innerLoading, setInnerLoading] = useState(false);

  const validator = () => {
    if (email === '') {
      Alert.alert('Info', 'Email is required.');
      return false;
    }
    return true;
  };

  const otpRequestHandler = async () => {
    if (validator()) {
      setInnerLoading(true);
      try {
        const response = await post('auth/requestotp', {
          email: email.toLowerCase(),
        });
        console.log(response?.data);
        if (response?.data?.success) {
          setInnerLoading(false);
          Alert.alert('Success', response?.data?.message, [
            {
              onPress: () =>
                props.navigation.navigate('Otp', {
                  email: email.toLowerCase(),
                }),
            },
          ]);
        }
      } catch (error) {
        setInnerLoading(false);
        console.log(error);
      }
    }
  };

  return (
    <SafeAreaView style={styles.view}>
      <View style={{marginHorizontal: 10}}>
        <BackButton onPress={() => props.navigation.goBack()} />
      </View>
      <View style={{marginTop: width / 4, alignItems: 'center'}}>
        <Image
          source={require('../assets/loginIcon.png')}
          style={styles.logo}
        />
        <Text style={styles.head}>OTP</Text>
        <View style={styles.inner}>
          <KeyboardAvoidingView behavior="padding">
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.email}
              onChangeText={(email: string) => setEmail(email)}
              value={email}
              placeholder="Enter Email"
            />
          </KeyboardAvoidingView>

          <TouchableOpacity style={styles.button} onPress={otpRequestHandler}>
            {innerLoading ? (
              <InnerLoader loading={innerLoading} />
            ) : (
              <Text style={styles.btnText}>Request OTP</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#AE1F31',
    flex: 1,
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
