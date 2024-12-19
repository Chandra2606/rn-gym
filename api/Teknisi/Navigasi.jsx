import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Data from './Data';
import DetailData from './Detaildata';
import {StatusBar} from 'react-native';
import FormTambah from './FormTambah';
import FormEdit from './FormEdit';
import FormUpload from './FormUpload';

export default function Navigasi() {
  const Stack = createNativeStackNavigator();
  return (
    // <NavigationContainer independent={true}>
    <>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#211C6A"
        translucent={true}
      />
      <Stack.Navigator initialRouteName="DataTeknisi">
        <Stack.Screen
          name="DataTeknisi"
          component={Data}
          options={{
            headerTitle: 'Data Teknisi',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
          }}
        />
        <Stack.Screen
          name="DetailTeknisi"
          component={DetailData}
          options={{
            headerTitle: 'Detail Teknisi',
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
            headerTitle: 'Tambah Teknisi',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormEdit"
          component={FormEdit}
          options={{
            headerTitle: 'Edit Teknisi',
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#211C6A',
            },
            headerTitleAlign: 'center',
          }}
        />
        <Stack.Screen
          name="FormUpload"
          component={FormUpload}
          options={{
            headerTitle: 'Update Foto Teknisi',
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
