// import React from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';  
// export default function Home() {
   
  
//   return (
//     <View style={styles.container}>
      
       
//       <Text>hi</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
 

//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#ffffff',
//   },
   
// });

import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import axios from 'axios';
//import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwt_decode from "jwt-decode";
//import { useTranslation } from 'react-i18next';

export default function Login() {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const navigation = useNavigation();
  // const { t, i18n } = useTranslation();

  // const storeToken = async (token) => {
  //   try {
  //     await AsyncStorage.setItem('token', token);
  //     console.log('Token stored successfully');
  //     console.log(token)

     

  //   } catch (error) {
  //     console.error('Failed to store token', error);
  //   }
  // };

  // const retrieveToken = async () => {
  //   try {
  //     const token = await AsyncStorage.getItem('token');
  //     // const userId = await AsyncStorage.getItem('userId');
  //     // const username = await AsyncStorage.getItem('username');
  //     if (token) {
  //       console.log('Token retrieved successfully');
  //       return token;
  //     } else {
  //       console.log('Token not found');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Failed to retrieve token', error);
  //     return null;
  //   }
  // };

  // const removeToken = async () => {
  //   try {
  //     await AsyncStorage.removeItem('token');
  //     console.log('Token removed successfully');
  //   } catch (error) {
  //     console.error('Failed to remove token', error);
  //   }
  // };


  const handleNameChange = (value) => {
    setName(value);
  };

  const handleIdChange = (value) => {
    setId(value);
  };

  const handleButtonPress = () => {
    axios.post('https://backendshg-0jzh.onrender.com/login', { name, id })
      .then(response => {
        // Handle the response from the server
        // setName({ name });
        // console.log(name);
        console.log(response)
        if (response.data.status) {
          // Login successful, navigate to the next screen
          const token = response.data.token;
          storeToken(token)

          navigation.navigate('feed');
        } else {
          console.log('login unsuccessful');
        }
      })
      .catch(error => {
        console.log('error');
      });

  };


  return (
    <View style={styles.container}>
      <View style={styles.label}>
        <Text style={styles.loginText1}>login</Text>
        <TextInput
          style={styles.inputname}
          placeholder="Enter Name"
          placeholderTextColor="#9B6D92"
          value={name}
          onChangeText={handleNameChange}
        />
        <TextInput
          style={styles.inputname}
          placeholder="Enter Id"
          placeholderTextColor="#9B6D92"
          value={id}
          secureTextEntry={true} 
          onChangeText={handleIdChange}
        />
        <TouchableOpacity style={styles.loginbtn} onPress={handleButtonPress}>
          <Text style={styles.loginText}>login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    borderWidth: 2,
    borderColor: '#0E576D',
    width: 309,
    height: 607,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  inputname: {
    width: 243,
    height: 41,
    borderRadius: 20,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    lineHeight: 18,
    color: '#0E576D',
    padding: 10,
    fontSize: 12,
    borderWidth: 0.5,
    borderColor: '#433C41',
    marginTop: 10,
  },
  loginbtn: {
    backgroundColor: '#0E576D',
    borderRadius: 10,
    padding: 5,
    width: 100,
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText1: {
    top: -100,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#0E576D'
  }
});