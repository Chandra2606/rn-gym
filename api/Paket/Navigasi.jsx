import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Data from './Data';
import DetailData from './Detaildata';
import {StatusBar} from 'react-native';
import FormTambah from './FormTambah';
import FormEdit from './FormEdit';

export default function Navigasi() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer independent={true}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#211C6A"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataPaket">
        <Stack.Screen
          name="DataPaket"
          component={Data}
          options={{
            headerTitle: 'Data Paket',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
          }}
        />
        <Stack.Screen
          name="DetailPaket"
          component={DetailData}
          options={{
            headerTitle: 'Detail Paket',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
          }}
        />
        <Stack.Screen
          name="FormTambah"
          component={FormTambah}
          options={{
            headerTitle: 'Tambah Paket',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
          }}
        />
        <Stack.Screen
          name="FormEdit"
          component={FormEdit}
          options={{
            headerTitle: 'Edit Paket',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
