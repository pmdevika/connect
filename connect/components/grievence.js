import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Alert } from 'react-native';

const Feedback = () => {
  const [comment, setComment] = useState('');
  
  const handleSubmit = () => {
    // You can handle submission logic here, like sending the feedback to your backend
    if(comment!=''){
    Alert.alert("Your feedback added successfully")
    console.log('Comment:', comment);
    }
    else
    {
      Alert.alert("Please add any comments")
    }
    // Reset fields after submission
  
    setComment('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Feel free to share any grievances you have regarding this customer.</Text>
      
      <TextInput
        placeholder="Enter your comment"
        style={styles.commentInput}
        multiline
        value={comment}
        onChangeText={setComment}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color:"#A06D95"
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  starButton: {
    marginRight: 10,
  },
  commentInput: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#A06D95',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#A06D95',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Feedback;