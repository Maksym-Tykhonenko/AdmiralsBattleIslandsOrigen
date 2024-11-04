import React from 'react';
import { StyleSheet, View, ImageBackground, TouchableOpacity, Text, Alert } from 'react-native';
import { useAppContextProvider } from '../../store/context';

const LevelMarker = ({ number, isActive, top, left }) => (
  <View style={[
    styles.marker, 
    { top, left },
    isActive ? styles.activeMarker : styles.inactiveMarker
  ]}>
    <Text style={[
      styles.markerText,
      isActive ? styles.activeMarkerText : styles.inactiveMarkerText
    ]}>{number}</Text>
  </View>
);

const TotalScoreDisplay = ({ score }) => (
  <View style={styles.scoreContainer}>
    <Text style={styles.scoreText}>Total Score: {score}</Text>
  </View>
);

const TabQuizScreen = ({ navigation }) => {
  const { quizData, totalScore, unlockLevelWithScore } = useAppContextProvider();

  const levels = [
    { number: 1, top: '15%', left: '20%' },
    { number: 2, top: '15%', left: '80%' },
    { number: 3, top: '32%', left: '65%' },
    { number: 4, top: '40%', left: '80%' },
    { number: 5, top: '45%', left: '50%' },
    { number: 6, top: '40%', left: '15%' },
    { number: 7, top: '60%', left: '20%' },
    { number: 8, top: '60%', left: '60%' },
    { number: 9, top: '80%', left: '20%' },
    { number: 10, top: '80%', left: '70%' },
  ];

  const handleLevelPress = (levelNumber) => {
    const quizLevel = quizData.find(quiz => quiz.id === levelNumber);
    if (quizLevel.isActive) {
      // console.log(`Level ${levelNumber} selected`);
      navigation.navigate('StackQuizScreen', { levelNumber });
    } else {
      Alert.alert(
        "Unlock Level",
        "Do you want to unlock this level for 20 scores?",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          { 
            text: "Unlock", 
            onPress: () => handleUnlockLevel(levelNumber)
          }
        ]
      );
    }
  };

  const handleUnlockLevel = async (levelNumber) => {
    const success = await unlockLevelWithScore(levelNumber);
    if (success) {
      Alert.alert("Success", "Level unlocked successfully!");
    } else {
      Alert.alert("Error", "Not enough score to unlock this level.");
    }
  };

  return (
    <ImageBackground 
      source={require('../../assets/image/bg/map.png')} 
      style={styles.image}
    >
      <TotalScoreDisplay score={totalScore} />
      {levels.map((level) => {
        const quizLevel = quizData.find(quiz => quiz.id === level.number);
        const isActive = quizLevel ? quizLevel.isActive : false;

        return (
          <TouchableOpacity
            key={level.number}
            style={[styles.levelArea, { top: level.top, left: level.left }]}
            onPress={() => handleLevelPress(level.number)}
          >
            <LevelMarker 
              number={level.number} 
              isActive={isActive}
              top={0} 
              left={0} 
            />
          </TouchableOpacity>
        );
      })}
    </ImageBackground>
  );
};

export default TabQuizScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    resizeMode: 'cover',
  },
  levelArea: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  marker: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeMarker: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
  },
  inactiveMarker: {
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
  },
  markerText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeMarkerText: {
    color: '#000',
  },
  inactiveMarkerText: {
    color: '#555',
  },
  scoreContainer: {
    // position: 'absolute',
    // top: 50,
    // left: 0,
    // right: 0,
    // alignItems: 'center',
    zIndex: 1,
    marginTop: '12%',
    borderRadius: 15,
    overflow: 'hidden',
    marginHorizontal: '30%',
   
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    textAlign: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.5)',
  },
});
