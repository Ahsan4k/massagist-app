import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import {phoneNumberRegex} from '../consts/baseUrl';

const {width, height} = Dimensions.get('window');

const SignUp = props => {
  const {useState} = React;
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  return (
    <View style={styles.view}>
      <Image source={require('../assets/loginIcon.png')} style={styles.logo} />
      <Text style={styles.head}>SignUp</Text>
      <View style={styles.inner}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.email}
            onChange={(email: string) => setEmail(email)}
            value={email}
            placeholder="Enter Email"
          />
          <Text style={styles.text}>Phone number</Text>
          <TextInput
            style={styles.email}
            onChange={(phone: string) =>
              phone.match(phoneNumberRegex) ? setPhoneNumber(phone) : null
            }
            value={phoneNumber}
            placeholder="Enter Phone number"
            maxLength={9}
            inputMode="numeric"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.email}
            onChange={(pass: string) => setPassword(pass)}
            value={password}
            placeholder="Enter Password"
          />
          <Text style={styles.text}>Re-enter Password</Text>
          <TextInput
            style={styles.email}
            onChange={(pass: string) => setConfirmPassword(pass)}
            value={confirmPassword}
            placeholder="Retype Password"
          />
        </KeyboardAvoidingView>
        <Pressable style={styles.button} onClick={() => {}}>
          <Text style={styles.btnText}>SignUp</Text>
        </Pressable>
      </View>
      <View style={styles.dont}>
        <Text style={{color: 'white', fontFamily: 'SF-Pro-Text-Light'}}>
          Already have an account?
        </Text>
        <Text
          style={{
            color: 'white',
            fontFamily: 'SF-Pro-Text-Light',
            textDecorationLine: 'underline',
          }}
          onPress={() => props.navigation.navigate('Login')}>
          Login
        </Text>
      </View>
    </View>
  );
};

export default SignUp;

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
    height: height * 0.48,
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
    height: height * 0.05,
    borderBottomWidth: 2,
    borderColor: 'grey',
    alignSelf: 'center',
  },
  text: {
    marginLeft: 10,
    marginTop: 10,
    fontFamily: 'SF-Pro-Text-Light',
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
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 18,
  },
  dont: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.58,
  },
});
