import React, {useEffect, useRef, useState} from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import notifee, {AndroidImportance} from '@notifee/react-native';

const App = () => {
  const navigationRef = useRef();
  const [navigateTo, setNavigateTo] = useState();

  useEffect(() => {
    const unsubscribed = messaging().onMessage(async message => {
      await notifee.requestPermission();

      const channelId = await notifee.createChannel({
        id: 'important',
        name: 'Important Notifications',
        importance: AndroidImportance.HIGH,
      });

      await notifee.displayNotification({
        title: message.notification.title,
        body: message.notification.body,
        android: {
          channelId,
          importance: AndroidImportance.HIGH,
        },
      });
    });
    const removeBookingsNot = async () => {
      await AsyncStorage.removeItem('tempBookings');
    };
    removeBookingsNot();
    return unsubscribed;
  }, []);
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <MainNavigator />
      </PersistGate>
    </Provider>
  );
};

export default App;
