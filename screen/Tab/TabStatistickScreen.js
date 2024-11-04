import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ImageBackground,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {useAppContextProvider} from '../../store/context';
import LinearGradient from 'react-native-linear-gradient';
import {shipQuizData} from '../../data/shipQuiz';
import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';

const {width} = Dimensions.get('window');
const cardWidth = width * 0.9;
const cardHeight = 550;

const AdmiralCard = ({admiral, quizId, isActive, onPress}) => {
  if (!admiral) return null;

  const originalQuiz = shipQuizData.find(quiz => quiz.id === quizId);
  const admiralImage = originalQuiz?.admiralInfo?.image;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      disabled={!isActive}>
      <ImageBackground
        source={admiralImage}
        style={styles.admiralImage}
        resizeMode="cover">
        {!isActive && (
          <BlurView
            style={styles.blurView}
            blurType="dark"
            blurAmount={6}
            reducedTransparencyFallbackColor="black"
          />
        )}
        <LinearGradient
          colors={['transparent', 'rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.95)']}
          style={styles.cardGradient}>
          <View style={styles.cardContent}>
            <Text style={styles.admiralName}>{admiral.name}</Text>
            <Text style={styles.admiralDescription}>{admiral.description}</Text>
            <View style={styles.quoteContainer}>
              <Text style={styles.quoteText}>"{admiral.famousQuote}"</Text>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const TabStatistickScreen = () => {
  const {quizData} = useAppContextProvider();
  const navigation = useNavigation();

  const admiralsData = quizData
    .filter(quiz => quiz.admiralInfo)
    .map(quiz => ({
      admiral: quiz.admiralInfo,
      quizId: quiz.id,
      isActive: quiz.isActive,
    }));

  const handleAdmiralPress = (admiral, quizId) => {
    navigation.navigate('StackAdmiralScreen', {
      admiral,
      quizId,
    });
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/bg/admiralBg.png')}
        style={{flex: 1}}>
        {/* <LinearGradient
          colors={['#1a2a6c', '#b21f1f', '#fdbb2d']}
          style={styles.background}> */}
          <Text style={styles.title}>Famous Admirals</Text>
          <ScrollView
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}>
            {admiralsData.map(({admiral, quizId, isActive}, index) => (
              <AdmiralCard
                key={index}
                admiral={admiral}
                quizId={quizId}
                isActive={isActive}
                onPress={() => handleAdmiralPress(admiral, quizId)}
              />
            ))}
          </ScrollView>
          <View style={{height: 120}} />
        {/* </LinearGradient> */}
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    marginTop: 50,
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 100,
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    marginVertical: 10,
    borderRadius: 15,
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
  admiralImage: {
    width: '100%',
    height: '100%',
  },
  blurView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  cardGradient: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardContent: {
    padding: 20,
  },
  admiralName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  admiralDescription: {
    fontSize: 16,
    color: '#ddd',
    lineHeight: 24,
    marginBottom: 15,
    textAlign: 'justify',
  },
  quoteContainer: {
    borderLeftWidth: 3,
    borderLeftColor: '#4ECDC4',
    paddingLeft: 10,
    marginTop: 10,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#4ECDC4',
    lineHeight: 24,
  },
});

export default TabStatistickScreen;
