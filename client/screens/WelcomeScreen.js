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
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {GoogleAuthProvider, signInWithCredential} from 'firebase/auth';
import {auth} from '../config/firebase';

GoogleSignin.configure({
  webClientId:
    '598068866759-tn1vf529eujqndof6fv7hnflmj1n2qf6.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
});

const WelcomeScreen = props => {
  const navigation = useNavigation();

  // import statusCodes along with GoogleSignin

  // Somewhere in your code
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const {idToken} = await GoogleSignin.signIn();
      const googleCredentials = GoogleAuthProvider.credential(idToken);
      await signInWithCredential(auth, googleCredentials);
      // if (isSuccessResponse(response)) {
      //   setState({userInfo: response.data});
      // // }
      // else {
      //   // sign in was cancelled by user
      // }
    } catch (error) {
      console.log('signin error', error.message);
      // if (isErrorWithCode(error)) {
      //   switch (error.code) {
      //     case statusCodes.IN_PROGRESS:
      //       // operation (eg. sign in) already in progress
      //       break;
      //     case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      //       // Android only, play services not available or outdated
      //       break;
      //     default:
      //     // some other error happened
      //   }
      // } else {
      //   // an error that's not related to google sign in occurred
      // }
    }
  };

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
        <TouchableOpacity onPress={() => signIn()} style={styles.btn}>
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
            <Image
              source={require('../assets/images/googleIcon.png')}
              style={{height: 30, width: 30}}
            />
            <Text style={styles.btnText}>SignIn with Google</Text>
          </View>
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
