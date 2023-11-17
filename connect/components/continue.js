import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import CustomButton from './CustomButton';
//import SwitchSelector from 'react-native-switch-selector';
//import { useTranslation } from 'react-i18next';
export default function Continue({ navigation }) {
  const pressHandler = () => {
    navigation.navigate('login');
  };

//   const options = [
//     { label: 'English', value: 'en' },
//     { label: 'Malayalam', value: 'mal' }
//   ];

//   const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.container1}>
        <View style={styles.imageContainer}>
          {/* <Image source={require('../assets/shg.png')} style={styles.image} /> */}
          haii
        </View>
      </View>
      {/* <SwitchSelector options={options} onPress={(language) => { 
        i18n.changeLanguage(language)
      }} style={[styles.toggle, { borderColor: '#8B1874' }]}
      buttonColor="#8B1874" /> */}

      <View style={styles.container2}>
        <View>         
          <CustomButton
            title="Continue"
            onPress={pressHandler}
            textColor="#0E576D"
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  toggle:{ 
    width:160,
    height:20,
    bottom:300,
    left:100
  },

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  topbutton: {
    display: 'flex',
    flexDirection: 'row',
    left: 100,
    bottom: 20,
  },
  topButton: {
    width: 60,
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedButton: {
    backgroundColor: '#A06D95',
  },
  nonselectedButton: {
    borderWidth: 2,
    borderColor: '#0E576D',
  },
  buttonText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#D9D9D9',
    padding: 5,
  },
  selectedButtonText: {
    color: '#fff',
  },
  nonselectedButtonText: {
    color: '#FFFFFF',
  },
  label: {
    borderWidth: 2,
    borderColor: '#0E576D',
    width: 329,
    height: 580,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },
  container2: {
    backgroundColor: '#0E576D',
    width: 500,
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container1: {
    backgroundColor: '#0E576D',
    width: 500,
    height: '50%',
  },
});