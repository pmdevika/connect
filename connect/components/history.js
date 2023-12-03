import React from 'react';
import { FlatList } from 'react-native';

import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CustomerListPage = () => {
  // Dummy data for demonstration
  const customerData = [
    { id: '1', name: 'Customer 1', location: 'Location 1', amountPaid: 100 },
    { id: '2', name: 'Customer 2', location: 'Location 2', amountPaid: 150 },
    { id: '3', name: 'Customer 3', location: 'Location 3', amountPaid: 120 },
    // Add more customer data as needed
  ];
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

  const handleCustomerSelection = (customerId) => {
    // Implement customer selection logic here
    console.log('Selected customer:', customerId);
    // You can navigate to another screen or perform other actions
  };

  const renderCustomerItem = ({ item }) => (
    <TouchableOpacity
      style={styles.customerItem}
      onPress={() => handleCustomerSelection(item.id)}
    >
      <Text style={styles.customerName}>{item.name}</Text>
      <Text style={styles.customerAmount}>Amount Paid: ${item.amountPaid}</Text>
      <Text style={styles.customerLocation}>Location: {item.location}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Activities</Text>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    width: 400,
    alignItems: 'center',
    left: 500,
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
    width: 390,
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

  customerItem: {
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
  customerName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  customerAmount: {
    fontSize: 14,
    color: 'black',
    marginTop: 8,
  },
  customerLocation: {
    fontSize: 14,
    color: 'black',
    marginTop: 8,
  },
});

export default CustomerListPage;
