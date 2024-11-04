import { StyleSheet, Text, View , TouchableOpacity, Image} from 'react-native'
import { useNavigation } from '@react-navigation/native';

const BackIcon = () => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
        <Image source={require('../../assets/icons/back.png')} style={styles.image} />
    </TouchableOpacity>
  )
}

export default BackIcon

const styles = StyleSheet.create({
    backIcon: {
        position: 'absolute',
        bottom: 50,
        right: 70,
    },  
    image: {
        width: 44,
        height: 44,
        tintColor: '#fff',
        }
})