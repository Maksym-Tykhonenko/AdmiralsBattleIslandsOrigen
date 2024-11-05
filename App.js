import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {AppContextProvider} from './store/context';
import {
  View,
  StyleSheet,
  Platform,
  Image,
  TouchableOpacity,
  Text,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SoundControl from './components/userSoundControl/SoundControl';
import {useState, useEffect, useRef} from 'react';
import {AppState} from 'react-native';
import {
  setupPlayer,
  playBackgroundMusic,
  pauseBackgroundMusic,
} from './components/userSoundControl/player';
import AdmiralsBattleIslandsOrigenProdactScreen from './screen/AdmiralsBattleIslandsOrigenProdactScreen';
import WelcomeScreen from './screen/Stack/StackWelcomeScreen';
import {
  TabHarborScreen,
  TabQuizScreen,
  TabShipsBattle,
  TabStatistickScreen,
} from './screen/Tab';
import {
  StackAdmiralScreen,
  StackBattleDetail,
  StackBattleScreen,
  StackQuizScreen,
  StackShipsBattle,
} from './screen/Stack';
import {toggleBackgroundMusic} from './components/userSoundControl/player';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const [isSoundOn, setIsSoundOn] = useState(true);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active' && isSoundOn) {
        playBackgroundMusic();
      } else if (nextAppState === 'background' || nextAppState === 'inactive') {
        pauseBackgroundMusic();
      }
    });

    // Initialize sound when app starts
    const initSound = async () => {
      await setupPlayer();
      await playBackgroundMusic();
      setIsSoundOn(true);
    };

    initSound();

    return () => {
      subscription.remove();
      pauseBackgroundMusic();
    };
  }, []);

  const handleSoundToggle = () => {
    const newState = toggleBackgroundMusic();
    setIsSoundOn(newState);
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        animation: 'fade',
        animationDuration: 1000,
        tabBarStyle: styles.tabBar,
        tabBarBackground: () => (
          <LinearGradient
            colors={['rgba(0, 0, 0, 0.8)', 'rgba(0, 0, 0, 0.95)']}
            style={styles.tabBarGradient}
          />
        ),
        tabBarIcon: ({focused}) => {
          let iconSource;

          switch (route.name) {
            case 'TabQuizScreen':
              iconSource = require('./assets/icons/book.png');
              break;
            case 'TabHarborScreen':
              iconSource = require('./assets/icons/boat.png');
              break;
            case 'TabShipsBattle':
              iconSource = require('./assets/icons/game-controller.png');
              break;
            case 'TabStatistickScreen':
              iconSource = require('./assets/icons/history.png');
              break;
            case 'Sound':
              iconSource = require('./assets/icons/melody.png');
              break;
          }

          return (
            <Image
              source={iconSource}
              style={[
                styles.tabIcon,
                {
                  tintColor: focused ? '#4ECDC4' : '#95A5A6',
                  // For sound icon, use the sound state instead of focused
                  ...(route.name === 'Sound' && {
                    tintColor: isSoundOn ? '#4ECDC4' : '#95A5A6',
                  }),
                },
              ]}
              resizeMode="contain"
            />
          );
        },
        tabBarActiveTintColor: '#4ECDC4',
        tabBarInactiveTintColor: '#95A5A6',
        tabBarLabelStyle: styles.tabBarLabel,
        tabBarItemStyle: styles.tabBarItem,
      })}>
      <Tab.Screen
        name="TabHarborScreen"
        component={TabHarborScreen}
        options={{tabBarLabel: 'Harbor'}}
      />
      <Tab.Screen
        name="TabQuizScreen"
        component={TabQuizScreen}
        options={{tabBarLabel: 'Quiz'}}
      />
      <Tab.Screen
        name="TabShipsBattle"
        component={TabShipsBattle}
        options={{tabBarLabel: 'Battle'}}
      />
      <Tab.Screen
        name="TabStatistickScreen"
        component={TabStatistickScreen}
        options={{tabBarLabel: 'History'}}
      />
      <Tab.Screen
        name="Sound"
        component={EmptyComponent}
        options={{
          tabBarLabel: 'Sound',
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={handleSoundToggle}
              style={styles.tabBarItem}>
              <Image
                source={require('./assets/icons/melody.png')}
                style={[
                  styles.tabIcon,
                  {tintColor: isSoundOn ? '#4ECDC4' : '#95A5A6'},
                ]}
                resizeMode="contain"
              />
              <Text
                style={[
                  styles.tabBarLabel,
                  {color: isSoundOn ? '#4ECDC4' : '#95A5A6'},
                ]}>
                Sound
              </Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};
import ReactNativeIdfaAaid, {
  AdvertisingInfoResponse,
} from '@sparkfabrik/react-native-idfa-aaid';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {LogLevel, OneSignal} from 'react-native-onesignal';
import appsFlyer from 'react-native-appsflyer';
import DeviceInfo from 'react-native-device-info';
import AppleAdsAttribution from '@hexigames/react-native-apple-ads-attribution';

const Loaders = [
  require('./assets/image/loader/admiral1.png'),
  require('./assets/image/loader/admiral2.png'),
];

const EmptyComponent = () => null;

function App() {
  const [route, setRoute] = useState(true);
  //console.log('route==>', route)
  const [idfa, setIdfa] = useState();
  //console.log('idfa==>', idfa);
  const [appsUid, setAppsUid] = useState(null);
  const [sab1, setSab1] = useState();
  const [pid, setPid] = useState();
  //console.log('appsUid==>', appsUid);
  //console.log('sab1==>', sab1);
  //console.log('pid==>', pid);
  const [adServicesToken, setAdServicesToken] = useState(null);
  ////console.log('adServicesToken', adServicesToken);
  const [adServicesAtribution, setAdServicesAtribution] = useState(null);
  const [adServicesKeywordId, setAdServicesKeywordId] = useState(null);
  //////////
  const [customerUserId, setCustomerUserId] = useState(null);
  //console.log('customerUserID==>', customerUserId);
  const [idfv, setIdfv] = useState();
  //console.log('idfv==>', idfv);

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [
    idfa,
    appsUid,
    sab1,
    pid,
    adServicesToken,
    adServicesAtribution,
    adServicesKeywordId,
    customerUserId,
    idfv,
  ]);

  const setData = async () => {
    try {
      const data = {
        idfa,
        appsUid,
        sab1,
        pid,
        adServicesToken,
        adServicesAtribution,
        adServicesKeywordId,
        customerUserId,
        idfv,
      };
      const jsonData = JSON.stringify(data);
      await AsyncStorage.setItem('App', jsonData);
      //console.log('Дані збережено в AsyncStorage');
    } catch (e) {
      //console.log('Помилка збереження даних:', e);
    }
  };

  const getData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem('App');
      if (jsonData !== null) {
        const parsedData = JSON.parse(jsonData);
        console.log('Дані дістаються в AsyncStorage');
        console.log('parsedData in App==>', parsedData);
        setIdfa(parsedData.idfa);
        setAppsUid(parsedData.appsUid);
        setSab1(parsedData.sab1);
        setPid(parsedData.pid);
        setAdServicesToken(parsedData.adServicesToken);
        setAdServicesAtribution(parsedData.adServicesAtribution);
        setAdServicesKeywordId(parsedData.adServicesKeywordId);
        setCustomerUserId(parsedData.customerUserId);
        setIdfv(parsedData.idfv);
      } else {
        await fetchIdfa();
        await requestOneSignallFoo();
        await performAppsFlyerOperations();
        await getUidApps();
        await fetchAdServicesToken(); // Вставка функції для отримання токену
        await fetchAdServicesAttributionData(); // Вставка функції для отримання даних

        onInstallConversionDataCanceller();
      }
    } catch (e) {
      console.log('Помилка отримання даних:', e);
    }
  };

  ///////// Ad Attribution
  //fetching AdServices token
  const fetchAdServicesToken = async () => {
    try {
      const token = await AppleAdsAttribution.getAdServicesAttributionToken();
      setAdServicesToken(token);
      //Alert.alert('token', adServicesToken);
    } catch (error) {
      await fetchAdServicesToken();
      //console.error('Помилка при отриманні AdServices токену:', error.message);
    }
  };

  //fetching AdServices data
  const fetchAdServicesAttributionData = async () => {
    try {
      const data = await AppleAdsAttribution.getAdServicesAttributionData();
      const attributionValue = data.attribution ? '1' : '0';
      setAdServicesAtribution(attributionValue);
      setAdServicesKeywordId(data.keywordId);
      //Alert.alert('data', data)
    } catch (error) {
      console.error('Помилка при отриманні даних AdServices:', error.message);
    }
  };

  ///////// AppsFlyer
  // 1ST FUNCTION - Ініціалізація AppsFlyer
  const performAppsFlyerOperations = async () => {
    try {
      await new Promise((resolve, reject) => {
        appsFlyer.initSdk(
          {
            devKey: 'y9ZBeXMVZhN22hnmxzqQja',
            appId: '6737478778',
            isDebug: true,
            onInstallConversionDataListener: true,
            onDeepLinkListener: true,
            timeToWaitForATTUserAuthorization: 10,
          },
          resolve,
          reject,
        );
      });
      console.log('App.js AppsFlyer ініціалізовано успішно');
      // Отримуємо idfv та встановлюємо його як customerUserID
      const uniqueId = await DeviceInfo.getUniqueId();
      setIdfv(uniqueId); // Зберігаємо idfv у стейті

      appsFlyer.setCustomerUserId(uniqueId, res => {
        console.log('Customer User ID встановлено успішно:', uniqueId);
        setCustomerUserId(uniqueId); // Зберігаємо customerUserID у стейті
      });
    } catch (error) {
      console.log(
        'App.js Помилка під час виконання операцій AppsFlyer:',
        error,
      );
    }
  };

  // 2ND FUNCTION - Ottrimannya UID AppsFlyer
  const getUidApps = async () => {
    try {
      const appsFlyerUID = await new Promise((resolve, reject) => {
        appsFlyer.getAppsFlyerUID((err, uid) => {
          if (err) {
            reject(err);
          } else {
            resolve(uid);
          }
        });
      });
      //console.log('on getAppsFlyerUID: ' + appsFlyerUID);
      //Alert.alert('appsFlyerUID', appsFlyerUID);
      setAppsUid(appsFlyerUID);
    } catch (error) {
      //console.error(error);
    }
  };

  // 3RD FUNCTION - Отримання найменування AppsFlyer
  const onInstallConversionDataCanceller = appsFlyer.onInstallConversionData(
    res => {
      try {
        const isFirstLaunch = JSON.parse(res.data.is_first_launch);
        if (isFirstLaunch === true) {
          if (res.data.af_status === 'Non-organic') {
            const media_source = res.data.media_source;
            console.log('App.js res.data==>', res.data);

            const {campaign, pid, af_adset, af_ad, af_os} = res.data;
            setSab1(campaign);
            setPid(pid);
          } else if (res.data.af_status === 'Organic') {
            console.log('App.js res.data==>', res.data);
            const {af_status} = res.data;
            console.log('This is first launch and a Organic Install');
            setSab1(af_status);
          }
        } else {
          console.log('This is not first launch');
        }
      } catch (error) {
        console.log('Error processing install conversion data:', error);
      }
    },
  );

  ///////// OneSignall
  // 35eeea62-7733-47f4-8e50-156f0ef2e931
  const requestPermission = () => {
    return new Promise((resolve, reject) => {
      try {
        OneSignal.Notifications.requestPermission(true);
        resolve(); // Викликаємо resolve(), оскільки OneSignal.Notifications.requestPermission не повертає проміс
      } catch (error) {
        reject(error); // Викликаємо reject() у разі помилки
      }
    });
  };

  // Виклик асинхронної функції requestPermission() з використанням async/await
  const requestOneSignallFoo = async () => {
    try {
      await requestPermission();
      // Якщо все Ok
    } catch (error) {
      //console.log('err в requestOneSignallFoo==> ', error);
    }
  };

  // Remove this method to stop OneSignal Debugging
  OneSignal.Debug.setLogLevel(LogLevel.Verbose);

  // OneSignal Initialization
  OneSignal.initialize('35eeea62-7733-47f4-8e50-156f0ef2e931');

  OneSignal.Notifications.addEventListener('click', event => {
    //console.log('OneSignal: notification clicked:', event);
  });
  //Add Data Tags
  OneSignal.User.addTag('key', 'value');

  ///////// IDFA
  const fetchIdfa = async () => {
    try {
      const res = await ReactNativeIdfaAaid.getAdvertisingInfo();
      if (!res.isAdTrackingLimited) {
        setIdfa(res.id);
        //console.log('setIdfa(res.id);');
      } else {
        //console.log('Ad tracking is limited');
        setIdfa(true); //true
        //setIdfa(null);
        fetchIdfa();
        //Alert.alert('idfa', idfa);
      }
    } catch (err) {
      //console.log('err', err);
      setIdfa(null);
      await fetchIdfa(); //???
    }
  };

  ///////// Route useEff
  // awesome-mega-happiness.space
  useEffect(() => {
    const checkUrl = `https://awesome-mega-happiness.space/VHZLH6GL`;

    const targetData = new Date('2024-11-08T10:00:00'); //дата з якої поч працювати webView
    const currentData = new Date(); //текущая дата

    if (currentData <= targetData) {
      setRoute(false);
    } else {
      fetch(checkUrl)
        .then(r => {
          if (r.status === 200) {
            //console.log('status==>', r.status);
            setRoute(true);
          } else {
            setRoute(false);
          }
        })
        .catch(e => {
          //console.log('errar', e);
          setRoute(false);
        });
    }
  }, []);

  ///////// Route
  const Route = ({isFatch}) => {
    if (isFatch) {
      return (
        <Stack.Navigator>
          <Stack.Screen
            initialParams={{
              idfa: idfa,
              sab1: sab1,
              pid: pid,
              uid: appsUid,
              adToken: adServicesToken,
              adAtribution: adServicesAtribution,
              adKeywordId: adServicesKeywordId,
              customerUserId: customerUserId,
              idfv: idfv,
            }}
            name="AdmiralsBattleIslandsOrigenProdactScreen"
            component={AdmiralsBattleIslandsOrigenProdactScreen}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      );
    }
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          animation: 'fade',
          animationDuration: 1000,
        }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        <Stack.Screen name="StackQuizScreen" component={StackQuizScreen} />
        <Stack.Screen name="StackShipsBattle" component={StackShipsBattle} />
        <Stack.Screen
          name="StackAdmiralScreen"
          component={StackAdmiralScreen}
        />
        <Stack.Screen name="StackBattleDetail" component={StackBattleDetail} />
        <Stack.Screen name="StackBattleScreen" component={StackBattleScreen} />
      </Stack.Navigator>
    );
  };

  ///////// Louder
  const [louderIsEnded, setLouderIsEnded] = useState(false);
  const appearingAnim = useRef(new Animated.Value(0)).current;
  const appearingSecondAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(appearingAnim, {
      toValue: 1,
      duration: 3500,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      Animated.timing(appearingSecondAnim, {
        toValue: 1,
        duration: 3500,
        useNativeDriver: true,
      }).start();
      //setLouderIsEnded(true);
    }, 3500);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLouderIsEnded(true);
    }, 8000);
  }, []);

  return (
    <AppContextProvider>
      <NavigationContainer>
        {!louderIsEnded ? (
          <View
            style={{
              position: 'relative',
              flex: 1,
              //backgroundColor: 'rgba(0,0,0)',
            }}>
            <Animated.Image
              source={require('./assets/image/loader/admiral1.png')}
              style={{
                //...props.style,
                opacity: appearingAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            <Animated.Image
              source={require('./assets/image/loader/admiral2.png')}
              style={{
                //...props.style,
                opacity: appearingSecondAnim,
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
          </View>
        ) : (
          <Route isFatch={route} />
        )}
      </NavigationContainer>
    </AppContextProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: Platform.OS === 'ios' ? 24 : 16,
    left: 10,
    right: 10,
    height: 85,
    borderRadius: 15,
    backgroundColor: 'transparent',
    elevation: 0,
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    paddingBottom: 10,
  },
  tabBarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 15,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: '600',
    marginTop: 5,
  },
  tabBarItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
  },
  tabIcon: {
    width: 44,
    height: 45,
    // marginTop: 12,
  },
});

//<Stack.Navigator
//  screenOptions={{
//    headerShown: false,
//    animation: 'fade',
//    animationDuration: 1000,
//  }}>
//  {currentLoader < 2 ? (
//    <Stack.Screen name="Welcome" options={{headerShown: false}}>
//      {() => (
//        <View style={{flex: 1}}>
//          <Animated.Image
//            source={Loaders[0]}
//            style={[
//              {width: '100%', height: '100%', position: 'absolute'},
//              {opacity: fadeAnim1},
//            ]}
//          />
//          <Animated.Image
//            source={Loaders[1]}
//            style={[
//              {width: '100%', height: '100%', position: 'absolute'},
//              {opacity: fadeAnim2},
//            ]}
//          />
//        </View>
//      )}
//    </Stack.Screen>
//  ) : (
//    <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
//    // <Stack.Screen name="TabNavigator" component={TabNavigator} />
//  )}
//  {/* <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} /> */}
//  <Stack.Screen name="TabNavigator" component={TabNavigator} />
//  <Stack.Screen name="StackQuizScreen" component={StackQuizScreen} />
//  <Stack.Screen name="StackShipsBattle" component={StackShipsBattle} />
//  <Stack.Screen name="StackAdmiralScreen" component={StackAdmiralScreen} />
//  <Stack.Screen name="StackBattleDetail" component={StackBattleDetail} />
//  <Stack.Screen name="StackBattleScreen" component={StackBattleScreen} />
//</Stack.Navigator>;

export default App;
