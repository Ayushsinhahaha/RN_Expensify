import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = props => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/welcome.png')}
          style={styles.image}
        />
        <Text style={styles.header}>Expensify</Text>
      </View>
      <View style={styles.imgContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignIn')}
          style={styles.btn}>
          <Text style={styles.btnText}>Sign In</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.btn}>
          <Text style={styles.btnText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'dodgerblue',
  },
  imgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  image: {height: 250, width: 250},
  header: {
    fontSize: 40,
    fontWeight: '900',
  },
  btn: {
    width: '90%',
    height: 60,
    borderWidth: 1,
    justifyContent: 'center',
    borderRadius: 20,
    marginTop: 20,
  },
  btnText: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: 'grey',
  },
});
