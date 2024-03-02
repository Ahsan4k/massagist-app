import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';
import React, { useEffect } from 'react';
import { post } from '../networkcalls/requests';
import { COLORS } from '../consts/colors';
import InnerLoader from '../components/InnerLoader';
import { useSelector } from 'react-redux';

const {width, height} = Dimensions.get('window');

const ChangePassword = props => {
  const {useState} = React;
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [innerLoading, setInnerLoading] = useState(false);
  const user = useSelector((state: any) => state.auth.data);

  console.log(email)

  const validator = () => {
    if (newPassword === '') {
      Alert.alert('Info', 'New password is required.');
      return false;
    }
    if (confirmPassword === '') {
      Alert.alert('Info', 'Re-enter new password is required.');
      return false;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert('Info', "Re-enter new password doesn't match");
      return false;
    }
    return true;
  };

  const changePasswordHandler = async () => {
    if (validator()) {
      setInnerLoading(true);
      try {
        const response = await post('auth/forgotpassword', {
         email: email,
         password: newPassword
        });
        console.log(response?.data);
        if (response?.data?.success) {
          setInnerLoading(false);
          Alert.alert('Success', response?.data?.message, [
            {onPress: () => {
              if(props.route.params?.email){
                props.navigation.navigate('Login')
              }else{
                props.navigation.goBack()
              }
             
            }},
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

  useEffect(() => {
    if(props.route.params?.email){
      setEmail(props.route.params?.email)
    }else{
      setEmail(user?.data?.email)
    }
  },[])

  return (
    <View style={styles.view}>
      <Image source={require('../assets/loginIcon.png')} style={styles.logo} />
      <Text style={styles.head}>Password Change</Text>
      <View style={styles.inner}>
        <KeyboardAvoidingView behavior="padding">
          <Text style={styles.text}>New Password</Text>
          <TextInput
            style={styles.email}
            onChangeText={(pass: string) => setNewPassword(pass)}
            value={newPassword}
            placeholder="Enter New Password"
          />
          <Text style={styles.text}>Re-enter New Password</Text>
          <TextInput
            style={styles.email}
            onChangeText={(pass: string) => setConfirmPassword(pass)}
            value={confirmPassword}
            placeholder="Enter New Password"
          />
        </KeyboardAvoidingView>
        <TouchableOpacity
          style={styles.button}
          onPress={changePasswordHandler}>
          {innerLoading ? (
            <InnerLoader loading={innerLoading} />
          ) : (
            <Text style={styles.btnText}>Change</Text>
          )}
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
    height: height * 0.35,
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
    backgroundColor: COLORS.primary,
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
