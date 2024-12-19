import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import Paket from './Paket/Navigasi';
import Member from './Member/Navigasi';
// import Matakuliah from './Matakuliah/Navigasi';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DataUser from './DataUser';
import NavDaftar from './Daftar/NavDaftar';

const Tab = createBottomTabNavigator();

export default function Index(props) {
  const {setUserToken} = props;
  return (
    <Tab.Navigator
      initialRouteName="Paket"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Paket') {
            iconName = focused ? 'barbell' : 'barbell-outline';
          } else if (route.name === 'Member') {
            iconName = focused ? 'people-circle' : 'people-circle-outline';
          } else if (route.name === 'UserAccount') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Daftar') {
            iconName = focused ? 'reader' : 'reader-outline';
          }
          return <IonIcon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#211C6A',
        tabBarInactiveTintColor: '#164863',
      })}>
      <Tab.Screen
        name="Paket"
        component={Paket}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="Member"
        component={Member}
        options={{headerShown: false}}
      />
      {/* <Tab.Screen
        name="Matakuliah"
        component={Matakuliah}
        options={{headerShown: false}}
      /> */}
      <Tab.Screen
        name="Daftar"
        component={NavDaftar}
        options={{headerShown: false}}
      />
      <Tab.Screen
        name="UserAccount"
        options={{headerShown: false, title: 'User'}}>
        {props => <DataUser {...props} setUserToken={setUserToken} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
