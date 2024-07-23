import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_PORTA } from 'react-native-dotenv';

axios.defaults.timeout = 20000; // 20 segundos

const CardScreen = ({ navigation }) => {
  const [matricula, setMatricula] = useState('');
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState('');

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await AsyncStorage.getItem('token');
  //     if (!token) {
  //       navigation.navigate('Login');
  //     }
  //     axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  //   };
  //   getToken();
  // }, []);

  const generateQRCode = async () => {
    try {
      setError('');
      console.log('Fetching user data...');
      const response = await axios.post(`${IP_PORTA}/fetchUser`, { matricula });
      console.log('Response status:', response.status);
      console.log('Response data:', response.data);
      const userData = response.data;

      if (response.status !== 200 || userData.error) {
        throw new Error(userData.error || 'Erro ao buscar dados do usuário');
      }

      console.log('Generating QR code...');
      const qrResponse = await axios.post(`${IP_PORTA}/generate`, { matricula });

      if (qrResponse.data.error) {
        throw new Error(qrResponse.data.error);
      }

      const tokenJWT = qrResponse.data.tokenJWT;
      console.log('QR Code Token:', tokenJWT);

      setUserInfo({
        ...userData,
        tokenJWT: tokenJWT
      });

      console.log('QR code generated successfully');

    } catch (error) {
      setError(`Não existe um funcionário com a matrícula ${matricula}`);
      console.error('Erro ao gerar QR Code:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carteirinha Digital</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua matrícula"
        value={matricula}
        onChangeText={setMatricula}
      />

      <TouchableOpacity style={styles.button} onPress={generateQRCode}>
        <Text style={styles.buttonText}>Gerar Carteirinha</Text>
      </TouchableOpacity>

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}
      
      {userInfo && (
        <View style={styles.card}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.info}>{userInfo.nome}</Text>
          
          <Text style={styles.label}>Matrícula:</Text>
          <Text style={styles.info}>{userInfo.matricula}</Text>

          <Text style={styles.label}>Cargo:</Text>
          <Text style={styles.info}>{userInfo.cargo}</Text>

          <Text style={styles.label}>Data de Entrada:</Text>
          <Text style={styles.info}>{userInfo.dataEntrada}</Text>

          <View style={styles.qrCodeContainer}>
            <QRCode value={userInfo.tokenJWT} size={100} />
          </View>
        </View>
      )}

      

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e6f7ff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#003366',
    fontFamily: 'NeueMachina'
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    marginBottom: 20,
  },
  label: {
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
  },
  info: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    width: '80%',
    paddingHorizontal: 10,
    borderRadius:10
  },
  qrCodeContainer: {
    alignItems: 'center',
    marginTop: 20,
    fontFamily: 'NeueMachina'
  },
  error: {
    color: 'red',
    marginBottom: 10,
    fontFamily: 'NeueMachina'
  },
  button:{
    backgroundColor: '#392de9',
    width:'40%',
    height:50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    marginTop:10,
    marginBottom:18,
    fontFamily: 'NeueMachina'
  },
  buttonText:{
    color:'white',
    fontSize:15,
    fontFamily: 'NeueMachina'
  }
});

export default CardScreen;
