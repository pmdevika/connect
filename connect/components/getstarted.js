import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import CustomButton from './CustomButton';

export default function Home({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.imageContainer}>
          {/* <Image source={require('../assets/1.png')} style={styles.image} /> */}
        
          <Image source={require('../assets/connect1.png')} style={styles.image} />
       
        </View>
      </View>

      <View style={styles.container2}>
        <View>         
          <CustomButton
            title="Get Started"
            onPress={pressHandler}
            textColor="white"
            
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    width:460// Black background color
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container2: {
    backgroundColor: 'white', // Black background color
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    backgroundColor: 'white', // Black background color
    width: '100%',
    height: '60%',
  },
  image: { 
    width: 250,
    height: 250,
    alignSelf: 'center',
    top:40
  },
});