import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MyTabBar from './myTabBar';
import Home from '../screens/Home';
import Notifications from '../screens/Notifications';
import Profile from '../screens/Profile';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import BodyMassage from '../screens/BodyMassage';
import Reflexology from '../screens/Reflexology';
import Calendar from '../screens/Calendar';
import ForgotPassword from '../screens/ForgotPassword';
import ChangePassword from '../screens/ChangePassword';

const MainNavigator = () => {
  const value = useSelector(state => state.auth.value);
  const mainValue = value;
  const Auth = createNativeStackNavigator();
  const Main = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  const Authentication = () => {
    return (
      <Auth.Navigator initialRouteName="Login">
        <Auth.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Auth.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{headerShown: false}}
        />
      </Auth.Navigator>
    );
  };

  const MyTabs = () => {
    return (
      <Tab.Navigator
        initialRouteName="HomePage"
        tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen
          name="HomePage"
          component={Home}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Notifications"
          component={Notifications}
          options={{headerShown: false}}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
      </Tab.Navigator>
    );
  };

  const MainStack = () => {
    return (
      <Main.Navigator initialRouteName="TabScreens">
        <Main.Screen
          name="TabScreens"
          component={MyTabs}
          options={{headerShown: false}}
        />
        <Main.Screen
          name="Body"
          component={BodyMassage}
          options={{headerShown: false}}
        />
        <Main.Screen
          name="Reflex"
          component={Reflexology}
          options={{headerShown: false}}
        />
        <Main.Screen
          name="Calendar"
          component={Calendar}
          options={{headerShown: false}}
        />
      </Main.Navigator>
    );
  };

  return (
    <NavigationContainer>
      {!mainValue ? <Authentication /> : <MainStack />}
    </NavigationContainer>
  );
};

export default MainNavigator;
