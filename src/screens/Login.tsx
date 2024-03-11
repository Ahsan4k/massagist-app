import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Pressable,
  Platform,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice';
import InnerLoader from '../components/InnerLoader';
import {post} from '../networkcalls/requests';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Entypo from 'react-native-vector-icons/Entypo';
import messaging from '@react-native-firebase/messaging';

const {width, height} = Dimensions.get('window');

const Login = props => {
  const {useState} = React;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [innerLoading, setInnerLoading] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);

  const dispatch = useDispatch();

  const validator = () => {
    if (email === '' && password === '') {
      Alert.alert('Info', 'Email and password are required.');
      return false;
    }
    if (email === '') {
      Alert.alert('Info', 'Email is required.');
      return false;
    }
    if (password === '') {
      Alert.alert('Info', 'Password is required.');
      return false;
    }
    return true;
  };

  const loginHandler = async () => {
    if (validator()) {
      setInnerLoading(true);
      try {
        const getToken = await messaging().getToken();
        console.log('fcmToken=============>', getToken);
        const response = await post('auth/login', {
          email: email.toLowerCase(),
          password: password,
          fcmToken: getToken,
        });
        console.log(response?.data);
        if (response?.data?.success) {
          setInnerLoading(false);
          dispatch(login(response?.data?.data));
        } else {
          setInnerLoading(false);
          Alert.alert('Failed', response?.data?.reason);
        }
      } catch (error) {
        setInnerLoading(false);
        console.log('LoginError', error);
      }
    }
  };

  return (
    <KeyboardAwareScrollView
      enableOnAndroid={true}
      contentContainerStyle={{flexGrow: 1}}>
      <View style={styles.view}>
        <Image
          source={require('../assets/loginIcon.png')}
          style={styles.logo}
        />
        <Text style={styles.head}>Login</Text>
        <View style={styles.inner}>
          <View>
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.email}
              onChangeText={(email: string) => setEmail(email)}
              value={email}
              placeholder="Enter Email"
            />
            <Text style={styles.text}>Password</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                width: width * 0.84,
              }}>
              <TextInput
                style={styles.password}
                onChangeText={(pass: string) => setPassword(pass)}
                value={password}
                placeholder="Enter Password"
                secureTextEntry={hidePassword}
              />
              <Pressable
                style={{
                  borderBottomWidth: 2,
                  borderColor: 'grey',
                }}
                onPress={() => setHidePassword(!hidePassword)}>
                {hidePassword ? (
                  <View
                    style={{
                      bottom: 15,
                    }}>
                    <Entypo name="eye-with-line" color="maroon" size={20} />
                  </View>
                ) : (
                  <View
                    style={{
                      bottom: 15,
                    }}>
                    <Entypo name="eye" color="maroon" size={20} />
                  </View>
                )}
              </Pressable>
            </View>
            <TouchableOpacity style={styles.button} onPress={loginHandler}>
              {innerLoading ? (
                <InnerLoader loading={innerLoading} />
              ) : (
                <Text style={styles.btnText}>Login</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.dont}>
          <Text style={{color: 'white', fontFamily: 'SF-Pro-Text-Light'}}>
            Don't have an account?
          </Text>
          <Text
            style={{
              color: 'white',
              fontFamily: 'SF-Pro-Text-Light',
              textDecorationLine: 'underline',
            }}
            onPress={() => props.navigation.navigate('SignUp')}>
            SignUp
          </Text>
        </View>
        <Text
          style={{
            marginTop: 20,
            color: 'white',
            fontFamily: 'SF-Pro-Text-Light',
          }}
          onPress={() => props.navigation.navigate('ForgotPassword')}>
          Forgot Password?
        </Text>
      </View>
    </KeyboardAwareScrollView>
  );
};

export default Login;

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
    height: height * 0.37,
    borderRadius: 10,
    marginTop: 20,
    // alignItems: 'center',
    paddingTop: 30,
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
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 15,
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
    fontFamily: 'SF-Pro-Text-Light',
    fontSize: 18,
  },
  dont: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.58,
  },
  password: {
    width: width * 0.81,
    height: height * 0.08,
    borderBottomWidth: 2,
    borderColor: 'grey',
    left: 10,
  },
});
