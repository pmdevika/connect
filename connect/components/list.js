import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {jwtDecode} from "jwt-decode";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';



// import { useNavigation } from '@react-navigation/native';


const CustomerListPage = () => {
  // Dummy data for demonstration
  // const customerData = [
  //   { id: '1', name: 'Customer 1', location: 'Location 1' },
  //   { id: '2', name: 'Customer 2', location: 'Location 2' },
  //   { id: '3', name: 'Customer 3', location: 'Location 3' },
  //   // Add more customer data as needed
  // ];
  const[customerData,setCustomerData]=useState([])


  const [userId, setUserId] = useState(null);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        console.log('Token retrieved successfully');
        const decodedToken = jwtDecode(token);
        console.log(decodedToken);
        console.log('Token Expiry:', new Date(decodedToken.exp * 1000)); // Convert to milliseconds

        const { userId, username } = decodedToken;

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


console.log(userId,"3456")

// const fetchCustomerDetails = (userId) => {
//   console.log(2345678)
//   const url = `https://connect-q46w.onrender.com/emp/requests/${userId}`;

//   axios
//     .get(url)
//     .then(response => {
//       console.log(response)
//       const customerData = response.data;
//       const { name, location } = customerData;
//       console.log('Customer Details:', { name, location });
//       // navigation.navigate('', { name, id: customerId, location });
//     })
//     .catch(error => {
//       console.log('Error fetching customer details:', error);
//     });
// };

useEffect(() => {
  const fetchData = async () => {
    const { userId, username } = await retrieveToken();
    if (userId) {
      try {
        const response = await axios.get(
          `https://connect-q46w.onrender.com/emp/requests/${userId}`
        );
        console.log(response.data)
        const fetchedCustomerData = response.data;
        console.log(fetchedCustomerData)
        setCustomerData(fetchedCustomerData);
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    }
  };

  fetchData();
}, []);


console.log(customerData)

  const navigation = useNavigation();
  const handleHomePress = () => {
    navigation.navigate('messages');
  };
  const handleHistoryPress = () => {
    navigation.navigate('history');
  };
  const handleProfilePress = () => {
    navigation.navigate('profile');
  };

  const handleCustomerSelection = (customerId) => {
    // Implement customer selection logic here
    console.log('Selected customer:', customerId);
    fetchCustomerDetails(customerId);
    // You can navigate to another screen or perform other actions
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.customerItem}
      onPress={() => handleCustomerSelection(item.id)}
    >
      <Text style={styles.customerName}>{item.username}</Text>
      <Text style={styles.customerLocation}>{item.location}</Text>
      <Text style={styles.customerLocation}>{item.address}</Text>
      <Text style={styles.customerLocation}>{item.phone}</Text>
      

    </TouchableOpacity>
  );

  // const renderActivityItem = ({ item }) => (
    
  //   <View style={styles.activityItem}>
    
  //     <Text>User: {item.user.username}</Text>
      
  //     <Text>Amount : {item.amount}</Text>
      
  //   </View>
  // );

  return (
   
   
    <View style={styles.container}>
     <View style={styles.headingContainer}>
        <Text style={styles.heading}>Customers List</Text>
       
      </View>
      <View style={styles.listing}>
      <FlatList
        data={customerData}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomerItem}
      />
      </View>

      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHomePress}>
          <Ionicons name="home-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleHistoryPress}>
          <Ionicons name="activity-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navbarButton} onPress={handleProfilePress}>
          <Ionicons name="person-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      {/* You can add more components or actions based on the selected customer */}
    </View>
   
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background color
    padding: 20,
    width:375,
    // justifyContent: 'center',
      alignItems: 'center',
      left:0,

      
      
   
  },
  listing:{
    top:50,
    width:350,

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
       padding:20,
       borderRadius:10,
       height:50
     
    },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Text color
    backgroundColor: 'black', // Background color
    padding: 10,
    marginBottom: 20,
    width:400,
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

  customerItem: {
    backgroundColor: '#fffff9', // Customer item background color
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
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black', // Text color
  },
  customerLocation: {
    fontSize: 14,
    color: 'black', // Text color
    marginTop: 8,
  },
});

export default CustomerListPage;
