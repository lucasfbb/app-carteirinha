import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IP_PORTA } from 'react-native-dotenv';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const login = async () => {
    try {
      const response = await axios.post(`${IP_PORTA}/login`, {
        username,
        password
      });
      const { access_token } = response.data;
      await AsyncStorage.setItem('token', access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${access_token}`;
      navigation.reset({
        index: 0,
        routes: [{ name: 'PilhaPrincipal' }],
      });
    } catch (error) {
      setError('Credenciais inválidas');
    }
  };

  return (
    <View style={styles.container}>
    
      <Image source={require('../../assets/images/teste1.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.inputPassword}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.buttonEntrar} onPress={login}>
          <Text style={styles.buttonText}>Entrar</Text>
        </TouchableOpacity>
        {error ? <Text style={styles.error}>{error}</Text> : null}
        
        
        {/* <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}>Primeira vez no sistema? Registre-se</Text>
        </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#e6f7ff'
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 60,
  },
  // headerContainer: {
  //   position: 'absolute',
  //   top: 120,
  //   alignItems: 'center',
  // },
  title: {
    fontSize: 24,
    marginBottom: 50,
    fontFamily: 'NeueMachina'
  },
  input: {
    width: '80%',
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  inputPassword: {
    width: '80%',
    padding: 10,
    marginTop:10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  error: {
    color: 'red',
    marginTop: 10,
  },
  registerText: {
    marginTop: 20,
    color: '#0066cc',
    textDecorationLine: 'underline',
  },
  button: {
    backgroundColor: '#392de9',
    width: '40%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 10,
    marginBottom: 18,
    fontFamily: 'NeueMachina',
  },
  buttonText: {
    color: 'white',
    fontSize: 17,
    fontFamily: 'NeueMachina',
  },
  buttonEntrar:{
    backgroundColor: '#392de9',
    width:'30%',
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    marginTop:30,
    fontFamily: 'NeueMachina'
  }
});

export default LoginScreen;
