import React, { useState } from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Text,Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function Login() {
  const [empid, setEmpid] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleNameChange = (value) => {
    setEmpid(value);
  };

  const handleIdChange = (value) => {
    setPassword(value);
  };

  const storeToken = async (token) => {
    try {
      await AsyncStorage.setItem('token', token);
      console.log('Token stored successfully');
      console.log(token)

      // Decode the token to get user details

      // const decodedToken = jwt_decode(token);
      // const { name, id } = decodedToken;

      // Store user details in AsyncStorage
      // await AsyncStorage.setItem('userId', id);
      // await AsyncStorage.setItem('username', name);

    } catch (error) {
      console.error('Failed to store token', error);
    }
  };

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      // const userId = await AsyncStorage.getItem('userId');
      // const username = await AsyncStorage.getItem('username');
      if (token) {
        console.log('Token retrieved successfully');
        return token;
      } else {
        console.log('Token not found');
        return null;
      }
    } catch (error) {
      console.error('Failed to retrieve token', error);
      return null;
    }
  };

  const removeToken = async () => {
    try {
      await AsyncStorage.removeItem('token');
      console.log('Token removed successfully');
    } catch (error) {
      console.error('Failed to remove token', error);
    }
  };

 
  const handleButtonPress = () => {
    const url = 'https://connect-q46w.onrender.com/emp/login';
  
    const request = axios.post(url, {
      empid,password
      // Include any data you need to send in the request body
      // For example: { username: 'yourUsername', password: 'yourPassword' }
    });
  
    console.log('Request:', request);
  
    request
      .then(response => {
        // Handle the successful response
        console.log('Response:', response.data);
        console.log(123);
        const token=response.data.token;
        storeToken(token)
        console.log("token stored")
        const data=retrieveToken();
       
        console.log(data)
        navigation.navigate('list');
      })
      .catch(error => {
        // Handle errors, including 404 Not Found
        console.error('Error:', error);
      });
  };
  

  return (
    <View style={styles.container}>
     <View style={styles.imageContainer}>
          {/* <Image source={require('../assets/1.png')} style={styles.image} /> */}
        
          <Image source={require('../assets/connect2.png')} style={styles.image} />
       
        </View>
      <View style={styles.label}>
        
        <TextInput
          style={styles.inputname}
          placeholder="Enter employeeid"
          placeholderTextColor="#635555"
          value={empid}
          onChangeText={handleNameChange}
        />
        <TextInput
          style={styles.inputname}
          placeholder="Enter pw"
          placeholderTextColor="#635555"
          value={password}
          secureTextEntry={true}
          onChangeText={handleIdChange}
        />
        <TouchableOpacity style={styles.loginbtn} onPress={handleButtonPress}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Black background color
    alignItems: 'center',
    justifyContent: 'center',
    width:375,
  },
  label: {
    borderWidth: 2,
    borderColor: '#ffffff', // White border color
    width:370,
    height: 300,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputname: {
    width: 300,
    height: 41,
    borderRadius: 8,
    alignSelf: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    lineHeight: 18,
    color: 'black', // White text color
    padding: 10,
    fontSize: 12,
    borderWidth: 0.5,
    borderColor: '010101', // Slightly lighter color for borders
    marginTop: 10,
  },
  loginbtn: {
    backgroundColor: 'black', // White background color
    borderRadius: 10,
    padding: 5,
    width: 100,
    bottom:20,
    justifyContent: 'center',
    alignItems: 'center',
    top: 40,
  },
  loginText: {
    color: 'white', // Black text color
    fontSize: 18,
    fontWeight: 'bold',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText1: {
    top: -100,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff', // White text color
  },
  imageContainer: {
    // flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  
  },
  image: { 
    width: 100,
    height: 100,
    alignSelf: 'center',
    top:1
  },
});