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
  Alert,
  TouchableOpacity,
} from 'react-native';
import {phoneNumberRegex} from '../consts/baseUrl';
import {post} from '../networkcalls/requests';
import InnerLoader from '../components/InnerLoader';

const {width, height} = Dimensions.get('window');

const SignUp = props => {
  const {useState} = React;
  const [email, setEmail] = useState<string>('');
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [innerLoading, setInnerLoading] = useState(false);

  const validator = () => {
    if (
      firstName === '' &&
      lastName === '' &&
      email === '' &&
      phoneNumber === '' &&
      password === '' &&
      confirmPassword === ''
    ) {
      Alert.alert('Info', 'All fields are required.');
      return false;
    }
    if (firstName === '') {
      Alert.alert('Info', 'First name is required.');
      return false;
    }
    if (lastName === '') {
      Alert.alert('Info', 'Last name is required.');
      return false;
    }
    if (email === '') {
      Alert.alert('Info', 'Email is required.');
      return false;
    }
    if (phoneNumber === '') {
      Alert.alert('Info', 'Phone number is required.');
      return false;
    }
    if (password === '') {
      Alert.alert('Info', 'Password is required.');
      return false;
    }
    if (confirmPassword === '') {
      Alert.alert('Info', 'Confirm password is required.');
      return false;
    }
    if (password !== confirmPassword) {
      Alert.alert('Info', 'Confirm password is not same.');
      return false;
    }
    return true;
  };

  const signUpHandler = async () => {
    if (validator()) {
      setInnerLoading(true);
      try {
        const response = await post('auth/signup', {
          firstName: firstName,
          lastName: lastName,
          email: email.toLowerCase(),
          phoneNumber: phoneNumber,
          password: password,
        });
        console.log(response?.data);
        if (response?.data?.success) {
          setInnerLoading(false);
          Alert.alert(
            'Success',
            'Your account has been successfully created!',
            [{onPress: () => props.navigation.navigate('Login')}],
          );
        } else {
          setInnerLoading(false);
          Alert.alert('Failed', response?.data?.reason);
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
      <Text style={styles.head}>SignUp</Text>
      <View style={styles.inner}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>First Name</Text>
          <TextInput
            style={styles.email}
            onChangeText={(email: string) => setFirstName(email)}
            value={firstName}
            placeholder="Enter First Name"
          />
          <Text style={styles.text}>Last Name</Text>
          <TextInput
            style={styles.email}
            onChangeText={(email: string) => setLastName(email)}
            value={lastName}
            placeholder="Enter Last Name"
          />
          <Text style={styles.text}>Email</Text>
          <TextInput
            style={styles.email}
            onChangeText={(email: string) => setEmail(email)}
            value={email}
            placeholder="Enter Email"
          />
          <Text style={styles.text}>Phone number</Text>
          <TextInput
            style={styles.email}
            onChangeText={(phone: string) => setPhoneNumber(phone)}
            value={phoneNumber}
            placeholder="Enter Phone number i.e (555) 555-1234"
            maxLength={14}
            keyboardType="numeric"
          />
          <Text style={styles.text}>Password</Text>
          <TextInput
            style={styles.email}
            onChangeText={(pass: string) => setPassword(pass)}
            value={password}
            placeholder="Enter Password"
          />
          <Text style={styles.text}>Re-enter Password</Text>
          <TextInput
            style={styles.email}
            onChangeText={(pass: string) => setConfirmPassword(pass)}
            value={confirmPassword}
            placeholder="Re-enter Password"
          />
        </KeyboardAvoidingView>
        <TouchableOpacity style={styles.button} onPress={signUpHandler}>
          {innerLoading ? (
            <InnerLoader loading={innerLoading} />
          ) : (
            <Text style={styles.btnText}>SignUp</Text>
          )}
        </TouchableOpacity>
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
    height: height * 0.6,
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
    height: height * 0.045,
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
