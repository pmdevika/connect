import React, { useState, useEffect } from 'react';
import { FlatList, ActivityIndicator, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons, Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from "jwt-decode";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/MaterialIcons';
import socket from '../utils/socket';
import { useGlobalContext } from '../GlobalContext';

// import { useNavigation } from '@react-navigation/native';


const CustomerListPage = () => {

  const [customerData, setCustomerData] = useState([])
  const { globalState, updateGlobalState } = useGlobalContext();
  // Access the global state
  const { address } = globalState;
  const [username, setUserName] = useState('');

  const [userId, setUserId] = useState(null);

  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        console.log('Token retrieved successfully');
        const decodedToken = jwtDecode(token);
        setUserName(decodedToken.username);
        console.log('Token Expiry:', new Date(decodedToken.exp * 1000)); // Convert to milliseconds

        const { userId, username } = decodedToken;
        console.log("list page")
        console.log(decodedToken)
        console.log("username", username);
        return { userId, username };
      } else {
        console.log('Token not found');
      }
    } catch (error) {
      console.error('Failed to retrieve token', error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { userId, username } = await retrieveToken();
      setUserId(userId);
    };
    fetchData();
  }, []);

  const handleLocation = () => {
    navigation.navigate('map')
  }
  const handleHistoryyPress = () => {
    navigation.navigate('history');
  };
  // const [selfaddress, setselfAddress] = useState('');

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        // const uid = getUserIdFromToken(); // You need to implement this function
        if (userId) {
        const locationResponse = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/emp/location/${userId}`);
         console.log("LOCATION___________",locationResponse.data)
          // setselfAddress(locationResponse.data.address);
          updateGlobalState({ address: locationResponse.data.address })
          console.log("your address",address)
        }
      } catch (error) {
        console.log("Error fetching location", error);
      }
    };
    fetchLocation();
  }, [userId]);



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
          const response = await axios.post(
            `${process.env.EXPO_PUBLIC_API_URL}/emp/chats/users`, { workerId: userId }
          );
          console.log(response.data)
          const fetchedCustomerData = response.data;
          console.log("customerData", fetchedCustomerData)
          setCustomerData(fetchedCustomerData.users);
        } catch (error) {
          console.error('Error fetching customer data:', error);
        }
      }
    };

    fetchData();
  }, []);


  console.log("customerdata", customerData)

  const navigation = useNavigation();
  const handlependinglistPress = () => {
    navigation.navigate('list');
  };
  const handleHistoryPress = () => {
    navigation.navigate('active');
  };
  const handleProfilePress = () => {
    navigation.navigate('profile');
  };
  const handlechat = (_id) => {
    console.log("Id is", _id)

    navigation.navigate('bidding', { workerId: _id });
  };

  const handleCustomerSelection = (customerId) => {
    // Implement customer selection logic here
    console.log('Selected customer:', customerId);
    socket.emit("createRoom", "65f0a7b6b31b36103dd42af6");
    // fetchCustomerDetails(customerId);
    // console.log(567)
    navigation.navigate('bidding', { workerId: customerId });
    // You can navigate to another screen or perform other actions
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.customerItem}

    >
      <Text style={styles.customerName}>{item.username}</Text>
      {/* <Text style={styles.customerLocation}>{item.location}</Text> */}
      <Text style={styles.customerLocation}>{item.address}</Text>
      <Text style={styles.customerLocation}>{item.phone}</Text>
      <TouchableOpacity
        style={styles.chatButton}
        onPress={() => handleCustomerSelection(item._id)}

      >
        <Text style={styles.chatButtonText}>Chat</Text>
      </TouchableOpacity>


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
    {/* <Icon name="account-circle" size={24} color="#333" style={{ marginRight: 8 }} />
                      <Text style={styles.workerName}>{username}</Text> */}
      <View style={styles.header}>
        <Ionicons name="location" size={24} color="white" style={{ marginLeft: 10, marginTop: 14 }} onPress={handleLocation} />
        <View>
          <Text style={styles.categoryText2}>{address}</Text>
          {/* <Text style={styles.categoryTextsmall}></Text> */}
        </View>
        <View>
           {/* <Icon name="account-circle" size={24} color="#333" style={{ marginLeft:250 ,marginTop:25}} /> */}
                      <Text style={styles.workerName}>{username}</Text>
        </View>
        {/* Add the rest of the header content here */}
      </View>

      {/* <View style={styles.headingContainer}>
        <Text style={styles.heading}>Customers List</Text>
      </View> */}
      <View style={styles.listing}>
        <FlatList
          data={customerData}
          keyExtractor={(item) => item._id}
          renderItem={renderCustomerItem}
        />
      </View>
      {/* {customerData.users?.map(item=>(<Text>{item.username}</Text>))} */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navbarButton} onPress={handlependinglistPress}>
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

      {/* You can add more components or actions based on the selected customer */}
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Background color
    padding: 20,
    width: 460,
    // justifyContent: 'center',
    alignItems: 'center',
    left: 0,
  },
  listing: {
    top: 50,
    marginTop: 10,
    width: 440,

  },
  heading: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 30
  },
  headingContainer: {
    position: 'absolute',
    width: 460,
    height: 20,

    top: 2,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'left',
    padding: 10,
    borderRadius: 8,
    height: 50,
    marginTop: 50,


  },
  categoryTextsmall: {
    fontSize: 12,
    fontWeight: 'normal',
    color: "white",
    marginLeft: -1,
    marginTop: 1,
  },
  pageTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white', // Text color
    backgroundColor: 'black', // Background color
    padding: 10,
    marginBottom: 20,
    width: 400,
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#8B1874',
    width: 450,
    height: 50,
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
    shadowColor: '#8B1874',
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
  chatButton: {
    backgroundColor: '#A06D95',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  chatButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    marginBottom: 0,
    marginTop: 10,
    backgroundColor: "#A06D95",
    width: 450,
    marginTop: -40,
    padding: 10
  },
  categoryText2: {
    fontSize: 16,
    fontWeight: 'normal',
    color: "white",
    marginLeft: 10,
    marginTop: 18
  },
  workerName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 0,
    color: 'white', // Darker text color
    padding:5,
    marginLeft:280,
    // marginTop:25
  },
  iconText: {
    color: '#FFFFFF',
    marginTop: 5, // Adjust as needed
  },
});

export default CustomerListPage;
