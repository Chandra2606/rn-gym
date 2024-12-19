import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
} from 'react-native';
import {Card, Avatar} from 'react-native-elements';
import {apiImage, apiUrl} from '../config';
import defaultAvatar from './img/avatar.png';
import ActionButton from './ActionButton';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DetailMahasiswa = ({route}) => {
  const {kodeteknisi} = route.params;
  const [teknisi, setTeknisi] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const goToPageFormUpload = () => {
    navigation.navigate('FormUpload', {
      kodeteknisi: kodeteknisi,
      foto: teknisi.foto_thumb,
    });
  };

  useEffect(() => {
    const unsubcribe = navigation.addListener('focus', () => {
      const fetchData = async () => {
        try {
          token = await AsyncStorage.getItem('userToken');
          const response = await fetch(`${apiUrl}teknisi/${kodeteknisi}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const json = await response.json();
          setTeknisi(json);
        } catch (error) {
          setError('Tidak dapat memuat data');
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    });
    return unsubcribe;
  }, [navigation, kodeteknisi]);

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
          {teknisi && (
            <Card>
              <Avatar
                size="xlarge"
                rounded
                source={
                  teknisi.foto
                    ? {uri: `${apiImage}${teknisi.foto_thumb}`}
                    : defaultAvatar
                }
                containerStyle={styles.avatarContainer}
                onPress={goToPageFormUpload}
              />
              <Card.Title style={styles.title}>
                {teknisi.kodeteknisi}
              </Card.Title>
              <Card.Divider />
              <Text style={styles.detail}>Nama:</Text>
              <Text style={styles.detailData}>{teknisi.nama_lengkap}</Text>
              <Text style={styles.detail}>Jenkel:</Text>
              <Text style={styles.detailData}>
                {teknisi.jenis_kelamin == 'L' ? 'Laki-Laki' : 'Perempuan'}
              </Text>
              <Text style={styles.detail}>Tanggal/Tgl.Lahir:</Text>
              <Text style={styles.detailData}>
                {teknisi.tmp_lahir} / {teknisi.tgl_lahir}
              </Text>
              <Text style={styles.detail}>Alamat:</Text>
              <Text style={styles.detailData}>{teknisi.alamat}</Text>
              <Text style={styles.detail}>Telp/Hp:</Text>
              <Text style={styles.detailData}>{teknisi.notelp}</Text>
            </Card>
          )}
        </View>
      </ScrollView>
      <ActionButton kodeteknisi={teknisi.kodeteknisi} />
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
export default DetailMahasiswa;
