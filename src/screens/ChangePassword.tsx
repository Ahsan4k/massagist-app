import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import {useDispatch} from 'react-redux';
import {login} from '../redux/authSlice';

const {width, height} = Dimensions.get('window');

const ChangePassword = props => {
  const {useState} = React;
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();
  return (
    <View style={styles.view}>
      <Image source={require('../assets/loginIcon.png')} style={styles.logo} />
      <Text style={styles.head}>Password Change</Text>
      <View style={styles.inner}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>Old Password</Text>
          <TextInput
            style={styles.email}
            onChange={(pass: string) => setOldPassword(pass)}
            value={oldPassword}
            placeholder="Enter Old Password"
          />
          <Text style={styles.text}>New Password</Text>
          <TextInput
            style={styles.email}
            onChange={(pass: string) => setNewPassword(pass)}
            value={newPassword}
            placeholder="Enter New Password"
          />
          <Text style={styles.text}>Re-enter New Password</Text>
          <TextInput
            style={styles.email}
            onChange={(pass: string) => setConfirmPassword(pass)}
            value={confirmPassword}
            placeholder="Enter New Password"
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.button}
          onPress={() => dispatch(login())}>
          <Text style={styles.btnText}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangePassword;

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
    height: height * 0.45,
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
  dont: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: width * 0.58,
  },
});
