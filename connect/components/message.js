import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput } from 'react-native';
import { MaterialIcons,Ionicons  } from '@expo/vector-icons';
// import Popover from 'react-native-popover-view';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window');

const MyScreen = () => {
  const navigation = useNavigation();
  const [menuVisible, setMenuVisible] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const handleMenuPress = () => {
    setMenuVisible(true);
  };

  const handleHomePress = () => {
    navigation.navigate('home');
  };
  const handleHistoryPress = () => {
    navigation.navigate('history');
  };
  const handleProfilePress = () => {
    navigation.navigate('profile');
  };

  

  const handleAddMessage = () => {
    if (newMessage.trim() !== '') {
      setMessages([...messages, { content: newMessage, agreed: false }]);
      setNewMessage('');
    }
  };

  const handleAgree = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].agreed = !updatedMessages[index].agreed;
    setMessages(updatedMessages);
  };
  
  const handleDisagree = (index) => {
    const updatedMessages = [...messages];
    updatedMessages[index].agreed = false;
    setMessages(updatedMessages);
  };
  
  

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Customer1</Text>
       
      </View>
      
      <View style={styles.messageBox}>
  {messages.map((message, index) => (
    <View key={index} style={[styles.messageItem, styles.messageContainer]}>
      <Text style={styles.messageContent}>{message.content}</Text>
      <View style={styles.iconsContainer}>
       
      </View>
    </View>
  ))}
</View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="let's fix the pay"
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleAddMessage}>
          <MaterialIcons name="send" size={20} color="white" />
        </TouchableOpacity>
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
    // alignItems: 'center',
    backgroundColor: '#F5F5F5',
    left:2,
  },
  headingContainer: {
    position: 'absolute',
    width: 365,
    height: 40,
    left: 500,
    top: 0,
    backgroundColor: 'black',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  navbar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: 'black',
    width: 350,
    height: 39,
    position: 'absolute',
    bottom: 10,
    left:500,
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
  heading: {
    color: 'white',
    fontSize: 20,
    // fontWeight: 'bold',
  },
  menuIconContainer: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  menuPopover: {
    width: 150,
    borderRadius: 4,
    elevation: 4,
  },
  menuItem: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  overlayStyle: {
    flex: 1,
    width: width,
    height: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    backgroundColor: 'transparent',
  },
  messageBox: {
    position: 'absolute',
    width: 365,
    height: 500,
    left: 500,
    top: 58,
    borderRadius: 8,
    padding: 10,
   backgroundColor:'white'
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 10,
    bottom:0,
    shadowColor: '#8B1874',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: '#FFFFFF',
  },
  messageContent: {
    color: 'black',
    marginRight: 10,
 
  },
  messageContainer: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    shadowColor: '#7198A4',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  iconsContainer: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#8B1874',
    marginLeft: 8, // Adjust the value as needed
  },
 

  inputContainer: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    width: 350,
    height: 40,
    left: 500,
    
    bottom:60,
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    borderRadius: 8,
    backgroundColor: 'white',
    paddingHorizontal: 10,
    borderWidth: 2,
    borderColor: 'black',
  },
  sendButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
});

export default MyScreen;