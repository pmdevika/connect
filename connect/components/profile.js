import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { jwtDecode } from "jwt-decode";
import AsyncStorage from '@react-native-async-storage/async-storage';

// Then use AsyncStorage in your code as needed

import { useNavigation } from '@react-navigation/native';

const WorkerDetailsPage = () => {
  const [workerData, setWorkerData] = useState({});
  const navigation = useNavigation();
  const [uid, setUid] = useState();
  const [username, setUserName] = useState('');
  const [email,setEmail]=useState('');
const [phone,setPhone]=useState()
const [address,setAddress]=useState('')

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        console.log('Token retrieved successfully');
        const decodedToken = jwtDecode(token);
        console.log("decodeToken", decodedToken)
        setUserName(decodedToken.username);
        setUid(decodedToken.userId)
        setEmail(decodedToken.email);
        setPhone(decodedToken.phone);
        setAddress(decodedToken.address);
        console.log("uid", uid)
        console.log("username", username);
        return userId;
      } else {
        console.log('Token not found');
        return null;
      }
    } catch (error) {
      console.error('Failed to retrieve token', error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await retrieveToken();
    };
    fetchData();
  }, []);

  const handleHomePress = () => {
    navigation.navigate('list');
  };
  const handleHistoryPress = () => {
    navigation.navigate('active');
  };

  const handleProfilePress = () => {
    navigation.navigate('profile');
  };

  // useEffect(() => {
  //   const fetchWorkerDetails = async () => {
  //     try {
  //       const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/workerDetails`); // Replace with your API endpoint
  //       const fetchedWorkerData = response.data;
  //       setWorkerData(fetchedWorkerData);
  //     } catch (error) {
  //       console.error('Error fetching worker data:', error);
  //     }
  //   };

  //   fetchWorkerDetails();
  // }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Personal Details</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{username}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{workerData.age}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{email}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{phone}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{uid}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{address}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Profession:</Text>
        <Text style={styles.value}>{workerData.Profession}</Text>
      </View>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHomePress}>
          <Ionicons name="home-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHistoryPress}>
          <Ionicons name="list" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleProfilePress}>
          <Ionicons name="person-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    width:460,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    top:50,
  },
  heading: {
    color: 'white',
    fontSize: 10,
     fontWeight: 'bold',
  },
  headingContainer: {
    position: 'absolute',
    width: 455,
    height: 40,
   left:3,
    top: 2,
    bottom:100,
    backgroundColor: 'black',
    justifyContent: 'center',
     alignItems: 'left',
     padding:20,
     borderRadius:10,
     height:50
   
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333333',
  },
  value: {
    fontSize: 16,
    // color: '#666666',
    color:"black"
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    width: 460,
    height: 50,
    position: 'absolute',
    bottom: 6,
    
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  navbarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 1,
  },
});

export default WorkerDetailsPage;
