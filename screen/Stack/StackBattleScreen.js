import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

const { width } = Dimensions.get('window');
const imageHeight = width * 0.9;

const StackBattleScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { battle, admiralName } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Image
          source={battle.image}
          style={styles.battleImage}
          resizeMode="cover"
        />

        <View style={styles.contentContainer}>
          <LinearGradient
            colors={['#1a2a6c', '#b21f1f']}
            style={styles.content}
          >
            <Text style={styles.battleName}>{battle.name}</Text>
            <Text style={styles.admiralName}>Admiral {admiralName}</Text>
            <Text style={styles.date}>{battle.date}</Text>

            <View style={styles.separator} />

            <Text style={styles.description}>{battle.description}</Text>

            {/* Return Button - At the bottom of content */}
            <TouchableOpacity 
              style={styles.returnButton}
              onPress={() => navigation.goBack()}
            >
              <LinearGradient
                colors={['#4ECDC4', '#45b1a8']}
                style={styles.returnButtonGradient}
              >
                <Text style={styles.returnButtonText}>
                  Return to Admiral Profile
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  
  },
  scrollContent: {
    flexGrow: 1,
    backgroundColor: '#000',
    paddingBottom: 20, // Add padding to bottom
  },
  battleImage: {
    width: width,
    height: imageHeight ,
  },
  contentContainer: {
    marginTop: -20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
    // paddingHorizontal: 20,
  },
  content: {
    padding: 20,
    minHeight: 450,
    
  },
  // Battle info styles
  battleName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  admiralName: {
    fontSize: 18,
    color: '#4ECDC4',
    textAlign: 'center',
    marginBottom: 5,
  },
  date: {
    fontSize: 16,
    color: '#ddd',
    textAlign: 'center',
    marginBottom: 20,
  },
  separator: {
    height: 2,
    backgroundColor: '#4ECDC4',
    width: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 16,
    color: '#fff',
    lineHeight: 24,
    textAlign: 'justify',
    marginBottom: 20, // Added margin to separate from return button
    paddingHorizontal: 10,
  },
  // Back button styles - Top left corner
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
    borderRadius: 25,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  backButtonGradient: {
    width: 50,
    // height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 25,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  // Return button styles - Bottom of content
  returnButton: {
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginHorizontal: 20,
  },
  returnButtonGradient: {
    padding: 15,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.25)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    paddingVertical: 10,
  },
});

export default StackBattleScreen;
