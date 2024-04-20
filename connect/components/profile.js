import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet,Image} from 'react-native';
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
  const [empid, setempid] = useState();
  const [username, setUserName] = useState('');
  const [email,setEmail]=useState('');
const [phone,setPhone]=useState()
const [address,setAddress]=useState('')
const [details,setDetails]=useState([]);
  const retrieveToken = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      if (token) {
        console.log('Token retrieved successfully');
        const decodedToken = jwtDecode(token);
        console.log("decodeToken", decodedToken)
        setUserName(decodedToken.username);
        setUid(decodedToken.userId)
        console.log("uid", uid)
        console.log("username", username);
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
  const handleHistoryyPress = () => {
    navigation.navigate('history');
  };
  // setempid(userId)
  useEffect(() => {
    const fetchWorkerDetails = async () => {
      try {
        if(uid)
        {
        const empid=uid;
        console.log(empid)
        console.log(`${process.env.EXPO_PUBLIC_API_URL}/emp/workers/${empid}`)
        const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/emp/workers/${empid}`); // Replace with your API endpoint
         
        setDetails(response.data);
      
        console.log('details of ',details)}
      } catch (error) {
        console.error('Error fetching worker data:', error);
      }
    };

    fetchWorkerDetails();
  }, [uid]);

  return (
    <View style={styles.container}>
      {/* <View style={styles.headingContainer}>
        <Text style={styles.heading}>Personal Details</Text>
      </View> */}
      <View style={styles.profileContainer}>
      <Ionicons name="person-outline" size={100} color="#a06d95" />
        <Text style={styles.userName}>{details.username}</Text>  
        </View>

        <View style={styles.bottom}>
      <View style={styles.detailContainer}>
            <View>
              <Text style={styles.semilight}>Profession</Text>
              <Text style={styles.light}>{details.profession}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View>
              <Text style={styles.semilight}>EMPID</Text>
              <Text style={styles.light}>{details.empid}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View>
              <Text style={styles.semilight}>Email</Text>
              <Text style={styles.light}>{details.email}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View>
              <Text style={styles.semilight}>Phone</Text>
              <Text style={styles.light}>{details.phone}</Text>
            </View>
            <View style={styles.horizontalLine} />
            <View>  
            {/* <TouchableOpacity style={styles.button} onPress={handleHistory}>
                <Text style={styles.buttonText}>History</Text>
            </TouchableOpacity> */}
            </View>
          </View>
      </View>

        {/* <View>
              <Text style={styles.semilight}>EmpId</Text>
              <Text style={styles.light}>{details.empid}</Text>
            </View> */}
      {/* <View style={styles.detailItem}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{workerData.age}</Text>
      </View> */}
      {/* <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{details.email}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{details.phone}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>EmpID:</Text>
        <Text style={styles.value}>{details.empid}</Text>
      </View> */}
      {/* <View style={styles.detailItem}>
        <Text style={styles.label}>Address:</Text>
        <Text style={styles.value}>{workerData.address}</Text>
      </View> */}
      {/* <View style={styles.detailItem}>
        <Text style={styles.label}>Profession:</Text>
        <Text style={styles.value}>{details.profession}</Text>
      </View> */}
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
    backgroundColor: '#A06D95',
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
  head: {
    backgroundColor: 'white',
    width: '100%',
    height: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
   
  }, 
  profileContainer: {
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  semilight: {
    fontSize: 16,
    fontWeight: '200',
    marginBottom: 4,
    color: '#333',
  },
  light: {
    fontSize: 16,
    fontWeight: '400',
    marginBottom: 10,
    color: 'black',
  },
  detailContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'left',
    paddingHorizontal: 20,
  },
  bottom:{
    marginTop:50,
  },
  horizontalLine: {
    borderBottomColor: '#a06d95',
    borderBottomWidth: 1,
    width: '100%',
    marginVertical: 10,
  },
});

export default WorkerDetailsPage;
