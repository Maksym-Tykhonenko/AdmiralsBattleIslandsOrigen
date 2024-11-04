import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  FlatList,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { battleShips } from '../../data/battleShips';

const { width, height } = Dimensions.get('window');
const cardWidth = width * 0.85;
const cardHeight = height * 0.25;

const ShipCard = ({ ship, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    <ImageBackground
      source={ship.enemyShip}
      style={styles.cardBackground}
      resizeMode="cover"
    >
      <View style={styles.cardOverlay}>
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>Level {ship.id}</Text>
          <Text style={styles.cardSubtitle}>
            {ship.name || `Ship ${ship.id}`}
          </Text>
        </View>
      </View>
    </ImageBackground>
  </TouchableOpacity>
);

const TabShipsBattle = ({ navigation }) => {
  const startBattle = (ship) => {
   
    navigation.navigate('StackShipsBattle', {
      enemyShip: ship.enemyShip,
      playerShip: ship.playerShip,
      level: ship.id,
    });
  };

  return (
    <ImageBackground
      source={require('../../assets/image/bg/admiralBg.png')}
      style={styles.backgroundImage}
      blurRadius={1}
    >
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Choose Your Battle</Text>
          <FlatList
            data={battleShips}
            renderItem={({ item }) => (
              <ShipCard ship={item} onPress={() => startBattle(item)} />
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={styles.cardList}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </SafeAreaView>
      <View style={{ height: 120 }}></View>
    </ImageBackground>
  );
};

export default TabShipsBattle;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
  cardList: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  card: {
    width: cardWidth,
    height: cardHeight,
    marginBottom: 20,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cardBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  cardContent: {
    padding: 15,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  cardTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardSubtitle: {
    color: '#ddd',
    fontSize: 18,
  },
});
