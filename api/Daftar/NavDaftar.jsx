import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import FormInput from './FormInput';
import DataDaftar from './DataDaftar';
import DetailDaftar from './DetailData';
export default function NavDaftar() {
  const Stack = createNativeStackNavigator();
  return (
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#211C6A"
        translucent={true}
      />

      <Stack.Navigator initialRouteName="DataDaftar">
        <Stack.Screen
          name="DataDaftar"
          component={DataDaftar}
          options={{
            headerTitle: 'Data Daftar',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="DetailData"
          component={DetailDaftar}
          options={{
            headerTitle: 'Detail Daftar',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
          }}
        />
        <Stack.Screen
          name="FormInput"
          component={FormInput}
          options={{
            headerTitle: 'Input Daftar',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
            headerTitleAlign: 'center',
          }}
        />
      </Stack.Navigator>
    </>
  );
}

const styles = StyleSheet.create({});
