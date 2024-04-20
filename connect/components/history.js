import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity,TouchableWithoutFeedback, FlatList, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


 

export default function Active() {
  const [activeCustomers, setActiveCustomers] = useState([]);
  const [uid, setUid] = useState();
  const [username, setUserName] = useState('');
  const navigation = useNavigation();
  const handleHistoryyPress = () => {
    navigation.navigate('history');
  };

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        console.log('Token retrieved successfully');
        const decodedToken = jwtDecode(token);
        setUid(decodedToken.userId)
        console.log("decodeToken", decodedToken)
        
        return userId;
      } else {
        console.log('Token not found');
        return null;
      }
    } catch (error) {
      // console.error('Failed to retrieve token', error);
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
  const handleCustomerSelection=()=>{
    navigation.navigate('grievence');
  }
  useEffect(() => {
    const fetchActiveWorkers = async () => {
      console.log('id', uid);
      try {
        if (uid) {
          const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/appointment/worker-history/${uid}`);
          console.log('successfully listed active customers', response.data);
          setActiveCustomers(response.data);
        }
      } catch (error) {
        console.error('Error fetching active cutomers:', error);
      }
    };

    fetchActiveWorkers();
  }, [uid]);

  return (
    <View style={styles.container}>
      <View style={styles.workerListContainer}>
        {/* <Text style={styles.heading}>Active Appointments</Text> */}

        
        <FlatList
  data={activeCustomers}
  renderItem={({ item }) => (
    <View style={styles.workerContainer}>
     
        <TouchableOpacity style={styles.workerItem}>
          <View style={styles.workerInfoContainer}>
            <View style={styles.workerNameContainer}>
            </View>
            
            <Text style={styles.light}>{item.worker.profession}</Text>
            <Text style={styles.workeramount}>{item.user.username}</Text>
            <Text style={styles.light}>Amount Paid:Rs.{item.amount}</Text>
            <Text style={styles.light}>email: {item.user.email}</Text>

            <Text style={styles.light}>Appointment on {item.date}</Text>
            
          </View>
          <TouchableOpacity
        style={styles.chatButton}
        onPress={() => handleCustomerSelection()}

      >
        <Text style={styles.chatButtonText}>Submit Grievence</Text>
      </TouchableOpacity>

        </TouchableOpacity>
     
    </View>
  )}
/>
          
      

      </View>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHomePress}>
          <Ionicons name="home-outline" size={24} color="#FFFFFF" />
          <Text style={styles.iconText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHistoryPress}>
          <Ionicons name="list" size={24} color="#FFFFFF" />
          <Text style={styles.iconText}>Active</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleProfilePress}>
          <Ionicons name="person-outline" size={20} color="#FFFFFF" />
          <Text style={styles.iconText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHistoryyPress}>
          <Ionicons name="time-outline" size={20} color="#FFFFFF" />
          <Text style={styles.iconText}>History</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  workerListContainer: {
    flex: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#fff',
    padding: 16,
    marginTop: -20,
  },
  workerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'rgba(255, 255, 255, 1.5)',
    shadowColor: '#8B1874',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 12,
  },
  workerInfoContainer: {
    flex: 1,
    marginLeft: 12,
  },
  workerNameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'grey', // Darker text color
    padding:5
  },
  workeramount: {
    marginLeft:"0%",
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 1,
    color: '#d6c25a', // Darker text color
  },
  light: {
    fontSize: 14,
    fontWeight: '300',
    marginBottom: 4,
    color: '#333', // Darker text color
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8B1874',
    width: 460,
    height: 55,
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
  iconText: {
    color: '#FFFFFF',
    marginTop: 5, // Adjust as needed
  },
  chatButton: {
    backgroundColor: '#A06D95',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    marginLeft:100
  },
  chatButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
