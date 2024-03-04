import React, {useEffect} from 'react';
import MainNavigator from './src/navigation/MainNavigator';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  useEffect(() => {
    const removeBookingsNot = async () => {
      await AsyncStorage.removeItem('tempBookings');
    };
    removeBookingsNot();
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
