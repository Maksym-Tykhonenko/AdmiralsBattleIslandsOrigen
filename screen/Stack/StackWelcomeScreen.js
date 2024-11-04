import { StyleSheet, Text, View, ImageBackground, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import LinearGradient from 'react-native-linear-gradient';

const WelcomeScreen = ({ navigation }) => {
  // Animation values
  const welcomeOpacity = useRef(new Animated.Value(0)).current;
  const welcomeTranslateY = useRef(new Animated.Value(-50)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleScale = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    // Welcome text animation
    Animated.sequence([
      Animated.parallel([
        Animated.timing(welcomeOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(welcomeTranslateY, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
      // Title animation starts after welcome text
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(titleScale, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Navigation timer
    const timer = setTimeout(() => {
      navigation.replace('TabNavigator');
    }, 2500); // Increased to 2.5s to allow animations to complete

    return () => clearTimeout(timer);
  }, [navigation, welcomeOpacity, welcomeTranslateY, titleOpacity, titleScale]);

  return (
    <ImageBackground 
      // source={require('../../assets/image/bg/welcome.png')} 
      source={require('../../assets/image/bg/admiralBg.png')}
      style={styles.container}
    >
      <LinearGradient
        colors={['rgba(0,0,0,0.3)', 'rgba(0,0,0,0.5)']}
        style={styles.overlay}
      >
        <View style={styles.contentContainer}>
          <Animated.Text 
            style={[
              styles.welcomeText,
              {
                opacity: welcomeOpacity,
                transform: [{ translateY: welcomeTranslateY }]
              }
            ]}
          >
            Welcome to the
          </Animated.Text>
          <Animated.View
            style={{
              opacity: titleOpacity,
              transform: [{ scale: titleScale }]
            }}
          >
            <Text style={styles.titleText}>Admiral's</Text>
            <Text style={styles.titleText}>Battle Islands</Text>
          </Animated.View>
        </View>
      </LinearGradient>
    </ImageBackground>
  )
}

export default WelcomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 30,
    backgroundColor: 'rgba(40, 40, 40, 0.75)',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#DAA520',
    alignItems: 'center',
    width: '90%',
    // Added shadow for more depth
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  welcomeText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
    // Added text shadow
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  titleText: {
    color: '#DAA520',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
});
