import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CustomButton = ({ title, onPress, textColor }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={[styles.buttonText, { color: textColor }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#8B1874',
    borderRadius: 8, 
    alignItems: 'center',
    justifyContent: 'center',
    height:50,
    width:200
  },
  buttonText: {  
    fontStyle: 'normal',
    fontSize: 18, 
    fontWeight:400
  },
});

export default CustomButton;