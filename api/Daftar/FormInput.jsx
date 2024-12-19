import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {Button, Input} from 'react-native-elements';
import DateTimePicker from '@react-native-community/datetimepicker';
import {Picker} from '@react-native-picker/picker';
import ModalDataMember from './ModalDataMember';
import ModalDataPaket from './ModalDataPaket';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {apiUrl} from '../config';
import {useNavigation} from '@react-navigation/native';

export default function FormInput() {

  const navigation = useNavigation();
  const [modalMemberVisible, setModalMemberVisible] = useState(false);
  const [modalPaketVisible, setModalPaketVisible] = useState(false);
  const [kddaftar, setKdDaftar] = useState('');
  const [tglmulai, setTglMulai] = useState(new Date());
  const [selectMember, setSelectedMember] = useState({kdmember: '', nama: ''});
  const [selectedPaket, setSelectedPaket] = useState({
    kode: '',
    nama: '',
    harga:'',
  });
  const [showPicker, setShowPicker] = useState(false);
  const [currentPicker, setCurrentPicker] = useState('start');
  const [keterangan, setKeterangan] = useState('');
  const [harga, setHarga] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [datePickerVisible, setDatePickerVisible] = useState(false);


  const onMemberSelected = (kdmember, nama) => {
    setSelectedMember({kdmember, nama});
    setModalMemberVisible(false); // Menutup modal setelah pemilihan
  };
  const onPaketSelected = (kode, nama, harga) => {
    setSelectedPaket({kode, nama, harga});
    setModalPaketVisible(false); // Menutup modal setelah pemilihan
  };

  const onDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || tglmulai;
    setDatePickerVisible(Platform.OS === 'ios');
    setTglMulai(currentDate);
  };
  const formatDate = date => {
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  const modalSearchMember = () => {
    setModalMemberVisible(true); // Buka hanya modal dosen
  };
  const modalSearchPaket = () => {
    setModalPaketVisible(true); // Buka hanya modal matakuliah
  };
  const submitServis = async () => {
    setLoading(true);
    setValidationErrors({});
    const dataToSend = {
      kddaftar: kddaftar, // Ambil dari state atau Input component
      memberkd: selectMember.kdmember,
      paketkd: selectedPaket.kode,
      tglmulai: tglmulai.toISOString().split('T')[0], // Ambil dari state atau Input component
    };
    let token = await AsyncStorage.getItem('userToken');
    fetch(`${apiUrl}pendaftaran`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(dataToSend),
    })
      .then(async response => {
        const data = await response.json();
        if (!response.ok) {
          setLoading(false);
          // Jika ada kesalahan validasi, akan masuk ke sini
          if (response.status === 422) {
            // Handle validation errors
            let errors = {};
            Object.keys(data.errors).forEach(key => {
              errors[key] = data.errors[key][0]; // Ambil hanya pesan pertama untuk setiapfield;
            });
            setValidationErrors(errors);
          } else {
            throw new Error(
              data.message || 'Terjadi kesalahan saat menyimpan data.',
            );
          }
          return;
        }
        setLoading(false);
        Alert.alert('Berhasil', 'Data Pendaftaran berhasil disimpan', [
          {
            text: 'Ok',
            onPress: () => {
              setKdDaftar('');
              setSelectedMember({kdmember: '', nama: ''});
              setSelectedPaket({kode: '', nama: '', harga:''});
              setShowPicker(false);
              setHarga('');
              setValidationErrors({});
              navigation.navigate('DataDaftar', {dataAdded: true});
            },
          },
        ]);
      })
      .catch(error => {
        // Handle failure
        console.log(`Gagal Simpan Data : ${error}`);
      });
  };
  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : 0}
        style={styles.container}>
        <Input
          value={kddaftar}
          onChangeText={setKdDaftar}
          label="Kode Pendaftaran"
          labelStyle={styles.labelInput}
          placeholder="Input Kode Pendaftaran..."
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
          errorMessage={validationErrors.kddaftar}
        />
        <View style={styles.inputRow}>
          <View style={{flex: 4, marginRight: 10}}>
            <Input
              label="Kode Member"
              labelStyle={styles.labelInput}
              placeholder="Cari Member..."
              disabled={true}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              value={`${selectMember.kdmember} - ${selectMember.nama}`}
              errorMessage={validationErrors.memberkd}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Cari"
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                height: 50,
                backgroundColor: '#65B741',
                borderRadius: 10,
              }}
              onPress={modalSearchMember}
            />
            <ModalDataMember
              isVisible={modalMemberVisible}
              onClose={() => setModalMemberVisible(false)}
              onMemberSelected={onMemberSelected} // Memberikan callback ke ModalDataMember
            />
          </View>
        </View>
        <View style={styles.inputRow}>
          <View style={{flex: 4, marginRight: 10}}>
            <Input
              label="Kode Paket"
              labelStyle={styles.labelInput}
              placeholder="Cari Paket..."
              disabled={true}
              inputContainerStyle={styles.inputContainer}
              inputStyle={styles.inputText}
              value={`${selectedPaket.kode} - ${selectedPaket.nama}`}
              errorMessage={validationErrors.paketkd}
            />
          </View>
          <View style={{flex: 1}}>
            <Button
              title="Cari"
              containerStyle={styles.buttonContainer}
              buttonStyle={{
                height: 50,
                backgroundColor: '#492e87',
                borderRadius: 10,
              }}
              onPress={modalSearchPaket}
            />

            <ModalDataPaket
              isVisible={modalPaketVisible}
              onClose={() => setModalPaketVisible(false)}
              onPaketSelected={onPaketSelected} // Memberikan callback ke
              ModalDataMember
            />
          </View>
        </View>
        <Input
          value={`${selectedPaket.harga}`}
          onChangeText={setHarga}
          label="Harga Paket"
          labelStyle={styles.labelInput}
          disabled={true}
          inputContainerStyle={styles.inputContainer}
          inputStyle={styles.inputText}
        />
        <View style={styles.dateContainer}>
          <Button
            title="Pilih Tanggal Mulai Fitnes"
            onPress={() => setDatePickerVisible(true)}
          />
          {datePickerVisible && (
            <DateTimePicker
              value={tglmulai}
              mode="date"
              display="default"
              onChange={onDateChange}
            />
          )}
          <Text style={styles.dateDisplay}>
            Tanggal Mulai: {formatDate(tglmulai)}
          </Text>
        </View>
        <Button
          title={loading ? 'Tunggu...' : 'Simpan Data'}
          disabled={loading}
          onPress={submitServis}
          buttonStyle={{marginHorizontal: 10}}
        />
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 15,
    marginBottom: 5,
  },
  labelInput: {
    color: '#7071e8',
    borderBottomColor: '#7071e8',
    marginBottom: 2,
    fontWeight: 'bold',
  },
  labelInputHari: {
    color: '#7071e8',
    borderBottomColor: '#7071e8',
    marginBottom: 2,
    fontWeight: 'bold',
    paddingLeft: 10,
    fontSize: 16,
  },
  inputContainer: {
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    paddingLeft: 10,
    elevation: 3,
  },
  inputText: {
    color: '#000',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonContainer: {
    flex: 1,
    marginRight: 10,
    marginTop: 25,
  },
  pickerContainer: {
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    elevation: 3,
    marginBottom: 20,
  },
  picker: {
    color: 'black',
    fontWeight: 'bold',
  },

  dateContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
  },
  dateDisplay: {
    fontSize: 16,
    marginTop: 10,
  },  
});
