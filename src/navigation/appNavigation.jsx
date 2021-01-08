import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import SplashScreen from 'screens/splashScreen';
import HomeScreen from 'screens/homeScreen';
import JobDetailScreen from 'screens/jobDetailScreen';
import ProfileScreen from 'screens/profileScreen';
import SignInScreen from 'screens/signInScreen';
import SignUpScreen from 'screens/signUpScreen';

import TabIcon from 'components/tabIcon';

import { USER_AUTHENTICATED } from 'resources/user/user.constants';
import * as userSelectors from 'resources/user/user.selectors';

import { getItem } from 'helpers/storage';
import config from 'resources/config';

import images from 'themes/images';

const prefix = `${config.applicationId}://`;

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const tabBarOptions = {
  keyboardHidesTabBar: true,
};

const tabs = [
  {
    id: 1,
    title: 'Home',
    component: HomeScreen,
    tabIcon: images.home,
    activeTabIcon: images.homeActive,
  },
  {
    id: 3,
    title: 'Profile',
    component: ProfileScreen,
    tabIcon: images.profile,
    activeTabIcon: images.profileActive,
  },
];

const AppNavigation = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const userAuthenticated = useSelector(userSelectors.getUserAuthenticated);

  const getToken = useCallback(async () => {
    const token = await getItem('token');
    config.token = token;
    setIsLoading(false);
    if (token) {
      dispatch({ type: USER_AUTHENTICATED });
    }
  }, [dispatch]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  if (isLoading) {
    return (
      <SplashScreen />
    );
  }

  return (
    <NavigationContainer linking={{ prefixes: [prefix] }}>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="JobDetail" component={JobDetailScreen} />
      </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default AppNavigation;
