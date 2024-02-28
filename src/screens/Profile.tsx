import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import React from 'react';
import Modal from 'react-native-modal';

const {width, height} = Dimensions.get('screen');

const Profile = props => {
  const {useState} = React;
  const [visible, setVisible] = useState<boolean>(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  return (
    <SafeAreaView style={styles.main}>
      <View style={styles.window}>
        <View style={styles.inner}>
          <View style={styles.circle}>
            <Text style={styles.name}>AH</Text>
          </View>
          <Text style={styles.des}>Ahsan Hussain</Text>
          <Text style={styles.des}>ahsanhussain123@gmail.com</Text>
          <Text style={styles.des}>090078601</Text>
        </View>
        <TouchableOpacity onPress={() => setVisible(true)} style={styles.tab}>
          <Text style={styles.text}>Change Phone number</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('ChangePassword')}
          style={styles.tab}>
          <Text style={styles.text}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.text}>Booking History</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
      </View>
      <Modal isVisible={visible}>
        <View style={styles.modal}>
          <Text onPress={() => setVisible(false)} style={styles.close}>
            X
          </Text>
          <TextInput
            onChange={phone => setPhoneNumber(phone)}
            value={phoneNumber}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => {}} style={styles.btn}>
            <Text style={styles.btnText}>Change</Text>
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
    backgroundColor: 'maroon',
    flex: 1,
  },
  window: {
    width: '90%',
    height: '90%',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  inner: {
    alignItems: 'center',
  },
  circle: {
    backgroundColor: 'maroon',
    borderRadius: 50,
    width: width * 0.2,
    height: width * 0.2,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  name: {
    color: 'white',
    fontFamily: 'sF-Pro-Text-Bold',
    fontSize: 30,
  },
  tab: {
    backgroundColor: 'maroon',
    width: width * 0.7,
    height: height * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontFamily: 'SF-Pro-Text-Bold',
    fontSize: 20,
  },
  des: {
    fontSize: 18,
    fontFamilt: 'SF-Pro-Text-Bold',
  },
  modal: {
    width: width * 0.8,
    height: height * 0.2,
    backgroundColor: 'white',
    alignSelf: 'center',
    alignItems: 'center',
  },
  input: {
    borderWidth: 1,
    width: '80%',
    alignSelf: 'center',
    height: '25%',
    marginTop: 20,
    backgroundColor: 'lightgrey',
  },
  btn: {
    width: '70%',
    height: '25%',
    backgroundColor: 'maroon',
    alignItems: 'center',
    justifyContent: 'center',
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
  },
});
