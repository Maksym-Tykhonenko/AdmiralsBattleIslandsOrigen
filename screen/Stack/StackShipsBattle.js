import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  Animated,
  PanResponder,
  Image,
  ImageBackground,
  Alert,
  Switch,
} from 'react-native';
import Sound from 'react-native-sound';
import { useAppContextProvider } from '../../store/context';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

// Enable playback in silence mode
Sound.setCategory('Playback');

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');
const SHIP_SIZE = 50;
const BULLET_SIZE = 10;
const INITIAL_ENEMY_COUNT = 3;

const StackShipsBattle = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { enemyShip, playerShip, level } = route.params;
  const { totalScore, updateTotalScore } = useAppContextProvider();
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [enemyCount, setEnemyCount] = useState(INITIAL_ENEMY_COUNT);
  const [shootCount, setShootCount] = useState(3);
  const [useGameScore, setUseGameScore] = useState(false);
  const [finalTotalScore, setFinalTotalScore] = useState(totalScore);
  const playerShipPosition = useRef(
    new Animated.ValueXY({
      x: SCREEN_WIDTH / 2 - SHIP_SIZE / 2,
      y: SCREEN_HEIGHT - SHIP_SIZE * 3, // Adjust this multiplier to move ship up/down
    })
  ).current;
  const [enemyShips, setEnemyShips] = useState(
    Array(INITIAL_ENEMY_COUNT)
      .fill()
      .map(() => ({
        position: new Animated.ValueXY({
          x: Math.random() * (SCREEN_WIDTH - SHIP_SIZE),
          y: Math.random() * (SCREEN_HEIGHT / 3),
        }),
        isAlive: true,
        speed: Math.random() * 0.5 + 0.5,
        direction: Math.random() * 2 * Math.PI,
        image: enemyShip,
      }))
  );
  const [bullets, setBullets] = useState([]);
  const shotSoundEffect = useRef(null);
  const explosionSoundEffect = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const updateScore = useCallback((points) => {
    setScore(prevScore => prevScore + points);
  }, []);

  const handleGameCompletion = useCallback(() => {
    if (!gameOver) {
      const newTotalScore = totalScore + score;
      setGameOver(true);
      setFinalTotalScore(newTotalScore);
      updateTotalScore(newTotalScore);
    }
  }, [totalScore, score, updateTotalScore, gameOver]);

  useEffect(() => {
    // Load the sound files
    Sound.setCategory('Playback');
    shotSoundEffect.current = new Sound(
      require('../../assets/sound/uiSound/shot.mp3'),
      (error) => {
        if (error) {
          console.log('failed to load the shot sound', error);
          return;
        }
        console.log('successfully loaded the shot sound');
      }
    );

    explosionSoundEffect.current = new Sound(
      require('../../assets/sound/uiSound/shipExplosion.mp3'),
      (error) => {
        if (error) {
          console.log('failed to load the explosion sound', error);
          return;
        }
        console.log('successfully loaded the explosion sound');
      }
    );

    return () => {
      if (shotSoundEffect.current) {
        shotSoundEffect.current.release();
      }
      if (explosionSoundEffect.current) {
        explosionSoundEffect.current.release();
      }
    };
  }, []);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gesture) => {
      playerShipPosition.x.setValue(gesture.moveX - SHIP_SIZE / 2);
    },
  });

  useEffect(() => {
    const moveInterval = setInterval(() => {
      setEnemyShips((prevShips) =>
        prevShips.map((ship) => {
          if (!ship.isAlive) return ship;

          const newX =
            ship.position.x._value + Math.cos(ship.direction) * ship.speed;
          const newY =
            ship.position.y._value + Math.sin(ship.direction) * ship.speed;

          // Bounce off the edges
          let newDirection = ship.direction;
          if (newX <= 0 || newX >= SCREEN_WIDTH - SHIP_SIZE) {
            newDirection = Math.PI - newDirection;
          }
          if (newY <= 100 || newY >= SCREEN_HEIGHT / 2) {
            newDirection = -newDirection;
          }

          ship.position.setValue({
            x: Math.max(0, Math.min(newX, SCREEN_WIDTH - SHIP_SIZE)),
            y: Math.max(100, Math.min(newY, SCREEN_HEIGHT / 2)),
          });

          return {
            ...ship,
            direction: newDirection,
            // Occasionally change direction
            ...(Math.random() < 0.02 && {
              direction: Math.random() * 2 * Math.PI,
            }),
          };
        })
      );
    }, 16); // Update every frame (60 FPS)

    return () => clearInterval(moveInterval);
  }, []);

  const shoot = () => {
    if (shootCount > 0) {
      setShootCount(prevCount => prevCount - 1);
      const newBullet = new Animated.ValueXY({
        x: playerShipPosition.x._value + SHIP_SIZE / 2 - BULLET_SIZE / 2,
        y: playerShipPosition.y._value,
      });
      setBullets((prevBullets) => [...prevBullets, newBullet]);

      // Play the shot sound
      if (shotSoundEffect.current) {
        shotSoundEffect.current.play((success) => {
          if (!success) {
            console.log('playback failed due to audio decoding errors');
          }
        });
      }

      Animated.timing(newBullet.y, {
        toValue: -BULLET_SIZE,
        duration: 1500,
        useNativeDriver: false,
      }).start(() => {
        setBullets((prevBullets) =>
          prevBullets.filter((bullet) => bullet !== newBullet)
        );
      });
    } else {
      // Check if user can get more shots
      const currentScore = useGameScore ? score : totalScore;
      const canBuyShots = currentScore >= 10;
      const canConvertScore = score >= 10;

      if (!canBuyShots && !canConvertScore) {
        Alert.alert(
          "Game Over",
          "No more shots available and insufficient score to buy or convert.",
          [
            {
              text: "OK",
              onPress: () => handleGameCompletion()
            }
          ]
        );
      } else {
        Alert.alert(
          "No shots left",
          "Would you like to buy more shots or convert your score?",
          [
            {
              text: "Buy Shot",
              onPress: buyShot,
              disabled: !canBuyShots
            },
            {
              text: "Convert Score",
              onPress: convertScoreToShots,
              disabled: !canConvertScore
            },
            {
              text: "Cancel",
              style: "cancel"
            }
          ]
        );
      }
    }
  };

  const buyShot = () => {
    const currentScore = useGameScore ? score : totalScore;
    if (currentScore >= 10) {
      if (useGameScore) {
        setScore(prevScore => prevScore - 10);
      } else {
        updateTotalScore(totalScore - 10);
      }
      setShootCount(prevCount => prevCount + 1);
    } else {
      Alert.alert("Not enough score", `You need 10 points in your ${useGameScore ? 'game' : 'total'} score to buy a shot.`);
    }
  };

  const convertScoreToShots = () => {
    const shotsToAdd = Math.floor(score / 5);
    if (shotsToAdd > 0) {
      setScore(prevScore => prevScore % 5);
      setShootCount(prevCount => prevCount + shotsToAdd);
      Alert.alert("Shots Added", `Converted ${shotsToAdd * 5} points to ${shotsToAdd} shots.`);
    } else {
      Alert.alert("Not Enough Score", "You need at least 5 points to convert to a shot.");
    }
  };

  const exitGame = () => {
    Alert.alert(
      "Exit Game",
      "Are you sure you want to exit? Your current game progress will be lost.",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Exit", 
          onPress: () => {
            updateTotalScore(totalScore + score);
            navigation.goBack();
          }
        }
      ]
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setBullets((prevBullets) => {
        const updatedBullets = [...prevBullets];
        const bulletsToRemove = [];

        updatedBullets.forEach((bullet) => {
          let bulletHit = false;
          enemyShips.forEach((ship, index) => {
            if (
              !bulletHit &&
              ship.isAlive &&
              Math.abs(bullet.x._value - ship.position.x._value) < SHIP_SIZE &&
              Math.abs(bullet.y._value - ship.position.y._value) < SHIP_SIZE
            ) {
              updateScore(5);
              setEnemyCount((prevCount) => prevCount - 1);
              setEnemyShips((prevShips) =>
                prevShips.map((s, i) =>
                  i === index ? { ...s, isAlive: false } : s
                )
              );
              bulletHit = true;
              bulletsToRemove.push(bullet);

              // Play the explosion sound
              if (explosionSoundEffect.current) {
                explosionSoundEffect.current.play((success) => {
                  if (!success) {
                    console.log(
                      'explosion playback failed due to audio decoding errors'
                    );
                  }
                });
              }
            }
          });
        });

        return updatedBullets.filter(
          (bullet) => !bulletsToRemove.includes(bullet)
        );
      });

      if (enemyCount === 0) {
        handleGameCompletion();
        clearInterval(interval);
      }

      enemyShips.forEach((ship) => {
        if (
          ship.isAlive &&
          Math.abs(ship.position.x._value - playerShipPosition.x._value) < SHIP_SIZE &&
          Math.abs(ship.position.y._value - playerShipPosition.y._value) < SHIP_SIZE
        ) {
          handleGameCompletion();
          clearInterval(interval);
        }
      });
    }, 16);

    return () => clearInterval(interval);
  }, [enemyCount, updateScore, handleGameCompletion]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Add this function to check if the game is lost
  const checkGameOver = useCallback(() => {
    // Check if user has no shots left and can't get more
    const currentScore = useGameScore ? score : totalScore;
    const canBuyShots = currentScore >= 10;
    const canConvertScore = score >= 10;

    if (shootCount === 0 && !canBuyShots && !canConvertScore) {
      handleGameCompletion();
    }
  }, [shootCount, score, totalScore, useGameScore]);

  // Add this to useEffect to check after each shot
  useEffect(() => {
    checkGameOver();
  }, [shootCount, score, totalScore]);

  if (gameOver) {
    return (
      <ImageBackground
        source={require('../../assets/image/bg/battleMap.png')}
        style={styles.container}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.7)', 'rgba(0,0,0,0.9)']}
          style={styles.gameOverContainer}
        >
          <View style={styles.gameOverContent}>
            <Text style={styles.gameOverTitle}>
              {enemyCount === 0 ? '🏆 Victory!' : '💀 Game Over'}
            </Text>
            
            <View style={styles.scoreContainer}>
              <Text style={styles.gameOverText}>Game Score: {score}</Text>
              <Text style={styles.gameOverText}>Total Score: {finalTotalScore}</Text>
              {enemyCount > 0 && (
                <Text style={styles.gameOverReason}>
                  No more shots available and insufficient score to continue
                </Text>
              )}
            </View>

            <TouchableOpacity 
              style={styles.returnButton} 
              onPress={() => navigation.goBack()}
            >
              <LinearGradient
                colors={['#4a0080', '#2d004d']}
                style={styles.returnButtonGradient}
              >
                <Text style={styles.returnButtonText}>Return to Menu</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </ImageBackground>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/image/bg/battleMap.png')}
        style={styles.backgroundImage}
      >
        {/* Game Info - Keep only essential info visible */}
        <View style={styles.gameInfoContainer}>
          <Text style={styles.levelText}>Level: {level}</Text>
          <Text style={styles.shootCountText}>Shots: {shootCount}</Text>
        </View>

        {/* Menu Toggle Button */}
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <LinearGradient
            colors={['#4a0080', '#2d004d']}
            style={styles.menuButtonGradient}
          >
            <Text style={styles.menuButtonText}>{isMenuOpen ? '×' : '☰'}</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Collapsible Menu */}
        {isMenuOpen && (
          <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.menuItem} onPress={convertScoreToShots}>
              <Text style={styles.menuItemText}>Convert Score</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.menuItem} onPress={buyShot}>
              <Text style={styles.menuItemText}>Buy Shot</Text>
            </TouchableOpacity>
            
            <View style={styles.menuItem}>
              <Text style={styles.menuItemText}>Use Score</Text>
              <Switch 
                value={useGameScore} 
                onValueChange={setUseGameScore}
                style={styles.switch}
              />
            </View>

            <TouchableOpacity style={[styles.menuItem, styles.exitMenuItem]} onPress={exitGame}>
              <Text style={styles.menuItemText}>Exit Game</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Shoot Button */}
        <TouchableOpacity style={styles.shootButton} onPress={shoot}>
          <LinearGradient
            colors={['#006400', '#004d00']}
            style={styles.shootButtonGradient}
          >
            <Text style={styles.shootButtonText}>Shoot</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Game Elements */}
        {enemyShips.map((ship, index) =>
          ship.isAlive && (
            <Animated.View key={index} style={[styles.enemyShip, ship.position.getLayout()]}>
              <Image source={ship.image} style={styles.enemyShipImage} />
            </Animated.View>
          )
        )}
        {bullets.map((bullet, index) => (
          <Animated.View key={index} style={[styles.bullet, bullet.getLayout()]} />
        ))}
        <Animated.View {...panResponder.panHandlers} style={[styles.playerShip, playerShipPosition.getLayout()]}>
          <Image source={playerShip} style={styles.playerShipImage} />
        </Animated.View>
      </ImageBackground>
    </View>
  );
};

export default StackShipsBattle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  gameInfoContainer: {
    position: 'absolute',
    top: 40,
    left: 20,
    zIndex: 1,
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  shootCountText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  totalScoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  exitButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    zIndex: 1,
  },
  exitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  menuButton: {
    position: 'absolute',
    top: 40,
    right: 20,
    zIndex: 2,
    borderRadius: 25,
    overflow: 'hidden',
  },
  menuButtonGradient: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  menuContainer: {
    position: 'absolute',
    top: 100,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 10,
    padding: 10,
    zIndex: 2,
    minWidth: 150,
  },
  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  menuItemText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  exitMenuItem: {
    borderBottomWidth: 0,
    marginTop: 5,
  },
  shootButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 35,
    overflow: 'hidden',
  },
  shootButtonGradient: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shootButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  enemyShipImage: {
    width: SHIP_SIZE + 50,
    height: SHIP_SIZE + 50,
  },
  playerShip: {
    width: SHIP_SIZE + 50, // Increased to match image size
    height: SHIP_SIZE + 50, // Increased to match image size
    position: 'absolute',
    bottom: 160, // Adjust this value to move ship up/down
    justifyContent: 'center',
    alignItems: 'center',
  },
  playerShipImage: {
    width: SHIP_SIZE + 50,
    height: SHIP_SIZE + 50,
    resizeMode: 'contain',
  },
  enemyShip: {
    width: SHIP_SIZE,
    height: SHIP_SIZE,
    // backgroundColor: 'red',
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bullet: {
    width: BULLET_SIZE,
    height: BULLET_SIZE,
    backgroundColor: 'black',
    position: 'absolute',
    borderRadius: BULLET_SIZE / 2,
  },
  gameOverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 20,
  },
  gameOverContent: {
    width: '100%',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 15,
    padding: 20,
    borderWidth: 1,
    borderColor: '#DAA520',
  },
  gameOverTitle: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#DAA520',
    marginBottom: 30,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  scoreContainer: {
    width: '100%',
    marginBottom: 30,
  },
  gameOverText: {
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginVertical: 5,
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
  returnButton: {
    width: '80%',
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
  },
  returnButtonGradient: {
    // padding: 15,
    alignItems: 'center',
  },
  returnButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
    paddingVertical: 10,
  },
  switch: {
    transform: [{ scale: 0.8 }],
    marginLeft: 10,
  },
  gameOverReason: {
    fontSize: 16,
    color: '#DAA520',
    textAlign: 'center',
    marginTop: 10,
    fontStyle: 'italic',
    textShadowColor: 'rgba(0,0,0,0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 5,
  },
});
