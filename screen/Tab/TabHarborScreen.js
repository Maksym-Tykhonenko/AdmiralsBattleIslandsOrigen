import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';

const TabHarborScreen = () => {
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const savedName = await AsyncStorage.getItem('userName');
      const savedImage = await AsyncStorage.getItem('userImage');
      if (savedName) setUserName(savedName);
      if (savedImage) setUserImage(savedImage);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  const saveUserData = async () => {
    try {
      await AsyncStorage.setItem('userName', userName);
      if (userImage) {
        await AsyncStorage.setItem('userImage', userImage);
      }
      setIsEditing(false);
      Alert.alert('Success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Error saving user data:', error);
      Alert.alert('Error', 'Failed to save profile changes.');
    }
  };

  const selectImage = () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        return;
      }
      if (response.errorCode) {
        Alert.alert('Error', 'ImagePicker Error: ' + response.errorMessage);
        return;
      }
      if (response.assets && response.assets[0]) {
        setUserImage(response.assets[0].uri);
      }
    });
  };

  const deleteProfile = async () => {
    Alert.alert(
      'Delete Profile',
      'Are you sure you want to delete your profile?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            try {
              await AsyncStorage.removeItem('userName');
              await AsyncStorage.removeItem('userImage');
              setUserName('');
              setUserImage(null);
              Alert.alert('Success', 'Profile deleted successfully!');
            } catch (error) {
              console.error('Error deleting profile:', error);
              Alert.alert('Error', 'Failed to delete profile.');
            }
          },
        },
      ],
    );
  };

  return (
    <ImageBackground
      // source={require('../../assets/image/bg/userBG.png')}
      source={require('../../assets/image/bg/admiralBg.png')}
      style={styles.container}>
      <LinearGradient
        colors={['rgba(0,0,0,0.1)', 'rgba(0,0,0,0.3)']}
        style={styles.overlay}>
        <View style={styles.profileContainer}>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={selectImage}
            disabled={!isEditing}>
            {userImage ? (
              <Image source={{uri: userImage}} style={styles.profileImage} />
            ) : (
              <View style={styles.placeholderImage}>
                <Text style={styles.placeholderText}>Add Photo</Text>
              </View>
            )}
            {isEditing && (
              <View style={styles.editOverlay}>
                <Text style={styles.editText}>Change Photo</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.infoContainer}>
            {isEditing ? (
              <TextInput
                style={styles.nameInput}
                value={userName}
                onChangeText={setUserName}
                placeholder="Enter your name"
                placeholderTextColor="#666"
              />
            ) : (
              <Text style={styles.userName}>
                {userName || 'Anonymous Admiral'}
              </Text>
            )}
          </View>

          <View style={styles.buttonContainer}>
            {isEditing ? (
              <>
                <TouchableOpacity style={styles.button} onPress={saveUserData}>
                  <LinearGradient
                    colors={['#4a4a4a', '#2a2a2a']}
                    style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>Save</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsEditing(false)}>
                  <LinearGradient
                    colors={['#4a4a4a', '#2a2a2a']}
                    style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>Cancel</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setIsEditing(true)}>
                  <LinearGradient
                    colors={['#4a4a4a', '#2a2a2a']}
                    style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.button, styles.deleteButton]}
                  onPress={deleteProfile}>
                  <LinearGradient
                    colors={['#8B0000', '#4a0000']}
                    style={styles.buttonGradient}>
                    <Text style={styles.buttonText}>Delete Profile</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    // padding: 20,
    
  },
  profileContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(40, 40, 40, 0.6)', // Increased opacity for better contrast
    borderRadius: 25, // Increased border radius
    borderWidth: 1,
    borderColor: '#DAA520',
    width: '90%', // Added width constraint
    alignSelf: 'center', // Center the container
  },
  imageContainer: {
    width: 150, // Reduced size for better proportion
    height: 150, // Reduced size for better proportion
    borderRadius: 75,
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 3, // Increased border width
    borderColor: '#DAA520',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2a2a2a',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#666',
    fontSize: 16,
  },
  editOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.0)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editText: {
    color: '#fff',
    fontSize: 14,
  },
  infoContainer: {
    width: '100%',
    marginBottom: 20,
  },
  userName: {
    color: '#DAA520',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameInput: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    padding: 10,
    borderRadius: 5,
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#DAA520',
  },
  buttonContainer: {
    width: '100%',
    gap: 15, // Increased gap between buttons
    paddingHorizontal: 20, // Increased horizontal padding
  },
  button: {
    borderRadius: 15, // Increased border radius to match design
    overflow: 'hidden',
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#DAA520',
    elevation: 3, // Added elevation for shadow effect
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonGradient: {
    // padding: 12, // Adjusted padding
    alignItems: 'center',
    width: '100%', // Ensure gradient fills button width
  },
  buttonText: {
    color: '#fff',
    fontSize: 18, // Increased font size
    fontWeight: '600',
    letterSpacing: 0.5, // Added letter spacing
    paddingVertical: 10,
  },
  deleteButton: {
    marginTop: 5, // Adjusted margin
  },
});

export default TabHarborScreen;
