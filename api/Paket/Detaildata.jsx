import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card, Avatar} from 'react-native-elements';
import {apiUrl} from '../config';
import ActionButton from './ActionButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailMatkul = ({route}) => {
  const {kdpaket} = route.params;
  const [paket, setPaket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        let token = await AsyncStorage.getItem('userToken');
        try {
          const response = await fetch(`${apiUrl}paket/${kdpaket}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          setPaket(json);
        } catch (error) {
          setError('Tidak dapat memuat data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return unsubcribe;
  }, [navigation, kdpaket]);
  if (loading) {
    return <ActivityIndicator size="large" />;
  }
  if (error) {
    return <Text>{error}</Text>;
  }
  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          {paket && (
            <Card>
              <Card.Divider />
              <Text style={styles.detail}>Kode Paket:</Text>
              <Text style={styles.detailData}>
                {paket.kdpaket}
              </Text>
              <Text style={styles.detail}>Nama Paket:</Text>
              <Text style={styles.detailData}>
                {paket.namapaket}
              </Text>
              <Text style={styles.detail}>Durasi Paket:</Text>
              <Text style={styles.detailData}>{paket.durasi} Bulan</Text>
              <Text style={styles.detail}>Harga Paket:</Text>
              <Text style={styles.detailData}>Rp. {paket.harga}</Text>
            </Card>
          )}
        </View>
      </ScrollView>
      <ActionButton kdpaket={paket.kdpaket} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
  avatarContainer: {
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  detail: {
    fontSize: 14,
    marginBottom: 5,
    color: '#ccd',
    fontWeight: 'bold',
    marginTop: 10,
  },
  detailData: {
    fontSize: 18,
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    color: 'black',
    fontWeight: 'bold',
  },
});
export default DetailMatkul;
