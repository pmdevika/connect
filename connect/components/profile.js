import React from 'react';
import { FlatList } from 'react-native';

import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { MaterialIcons,Ionicons  } from '@expo/vector-icons';
// import Popover from 'react-native-popover-view';
import { useNavigation } from '@react-navigation/native';


const WorkerDetailsPage = () => {
  // Dummy worker data for demonstration
  const workerData = {
    name: 'John Doe',
    age: 30,
    email: 'john.doe@example.com',
    phone: '+1234567890',
    id: 'W12345',
    experience: '5 years',
  };
  const navigation = useNavigation();
  const handleHomePress = () => {
    navigation.navigate('list');
  };
  const handleHistoryPress = () => {
    navigation.navigate('history');
  };
  const handleProfilePress = () => {
    navigation.navigate('profile');
  };

  return (
    <View style={styles.container}>
    <View style={styles.headingContainer}>
        <Text style={styles.heading}>Personal Details</Text>
       
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{workerData.name}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Age:</Text>
        <Text style={styles.value}>{workerData.age}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{workerData.email}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{workerData.phone}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>ID:</Text>
        <Text style={styles.value}>{workerData.id}</Text>
      </View>
      <View style={styles.detailItem}>
        <Text style={styles.label}>Experience:</Text>
        <Text style={styles.value}>{workerData.experience}</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
    width:400,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    top:50,
  },
  heading: {
    color: 'white',
    fontSize: 20,
     fontWeight: 'bold',
  },
  headingContainer: {
    position: 'absolute',
    width: 390,
    height: 40,
   
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
    color: '#666666',
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
});

export default WorkerDetailsPage;
