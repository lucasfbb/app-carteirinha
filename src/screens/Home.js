import React, { useState, useCallback, useEffect } from 'react';
import { View, Button, Text, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen({navigation}) {
  
  const logout = async () => {
    await AsyncStorage.removeItem('token');
    navigation.reset({    // usado para redefinir a pilha de navegação, garantindo que a tela de login seja exibida corretamente
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  return (
    <View style={styles.container} >
      <Text style={styles.title}>
        Bem-vindo ao App de Carteirinhas Digitais da PGM!
      </Text>
      <Text style={styles.content}>
        Nosso aplicativo permite que você gere e escaneie carteirinhas digitais para acessar seu estabelecimento de maneira fácil e segura.
        Gere seu QR Code: Insira sua matrícula e gere um QR code personalizado que representa sua carteirinha digital.
        Escaneie QR Codes: Utilize a câmera do seu dispositivo para escanear QR codes e verificar o status de ativação diretamente com nosso sistema.
        Experimente a conveniência das carteirinhas digitais e mantenha seu acesso sempre atualizado!
      </Text>

      <TouchableOpacity style={styles.buttonSair} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e6f7ff'
  },
  title: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 14,
    fontFamily: 'NeueMachina'
  },
  content: {
    fontSize: 15,
    textAlign: 'center',
    margin: 20,
    color: 'adaptative',
    fontFamily: 'NeueMachina'
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  buttonSair:{
    backgroundColor: 'red',
    width:'30%',
    height:40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:8,
    marginTop:5,
    marginBottom:18,
    fontFamily: 'NeueMachina'
  },
  buttonText:{
    color:'white',
    fontSize:15,
    fontFamily: 'NeueMachina'
  }
});
