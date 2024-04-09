import React, { useState, useEffect } from 'react';
import { FlatList, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwtDecode from 'jwt-decode';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const CustomerListPage = () => {
  const [activityHistory, setActivityHistory] = useState([]);
  const [userId, setUserId] = useState(null);
  const navigation = useNavigation();

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        console.log('Token retrieved successfully');
        const decodedToken = jwt_decode(token);
        console.log(decodedToken);
        console.log('Token Expiry:', new Date(decodedToken.exp * 1000)); // Convert to milliseconds

        const { userId, username } = decodedToken;
        console.log("history page")
        console.log("decoded token")
        return { userId, username };
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
      const { userId, username } = await retrieveToken();
      setUserId(userId);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const { userId, username } = await retrieveToken();
  
      if (userId) {
        try {
          const response = await fetch(
           ` https://connect-q46w.onrender.com/appointment/appointments-history/${userId}`
          );
          const history = await response.json();
          console.log(history);
          setActivityHistory(history);
        } catch (error) {
          console.error('Error fetching activity history:', error);
        }
      } else {
        console.log('User ID is null or undefined');
      }
    };
  
    fetchData();
  }, [userId]);

  useEffect(() => {
    console.log("Updated activity history in useEffect:", activityHistory);
  }, [activityHistory]);
  
  const handleHomePress = () => {
    navigation.navigate('list');
  };
  const handleHistoryPress = () => {
    navigation.navigate('history');
  };
  const handleProfilePress = () => {
    navigation.navigate('profile');
  };
  console.log(567)
  const renderActivityItem = ({ item }) => (
    
    <View style={styles.activityItem}>
    
      <Text>User: {item.user.username}</Text>
      
      <Text>Amount : {item.amount}</Text>
      
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Activities</Text>
      </View>
      <View style={styles.listing}>
        <FlatList
          data={activityHistory}
          keyExtractor={(item) => item._id.toString()}
          renderItem={renderActivityItem}
        />
      </View>
      
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHomePress}>
          <Ionicons name="home-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.navbarButton} onPress={handleHistoryPress}>
          <Ionicons name="activity-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity> */}
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
    backgroundColor: 'white',
    padding: 20,
    width: 375,
    alignItems: 'center',
    left:0,
  },
  listing: {
    top: 50,
    width: 350,
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  headingContainer: {
    position: 'absolute',
    width: 370,
    height: 40,
    top: 2,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'left',
    padding: 20,
    borderRadius: 10,
    height: 50,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'black',
    padding: 10,
    marginBottom: 20,
    width: 400,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    width: 350,
    height: 39,
    position: 'absolute',
    bottom: 10,

    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: 'hidden',
  },
  navbarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },

  activityItem: {
    backgroundColor: '#fffff9',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#7198A4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default CustomerListPage;
