import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {categories} from '../constants';
import {useNavigation} from '@react-navigation/native';
import Snackbar from 'react-native-snackbar';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../config/firebase';
import loading from '../components/loading';
import {useDispatch, useSelector} from 'react-redux';
import Loading from '../components/loading';
import {setUserLoading} from '../redux/slices/user';

const SignIn = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const handleSignIn = async () => {
    if (email && password) {
      try {
        dispatch(setUserLoading(true));
        await signInWithEmailAndPassword(auth, email, password);
        dispatch(setUserLoading(false));
      } catch (error) {
        dispatch(setUserLoading(false));
        Snackbar.show({
          text: error.message,
          backgroundColor: 'red',
        });
      }
    } else {
      Snackbar.show({
        text: 'Email and Password are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Sign In</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}>
          <Icon name="arrow-left" size={40} color={'#000'} />
        </TouchableOpacity>
      </View>
      {/* Image */}
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/login.png')}
          style={styles.image}
        />
      </View>

      {/* TextInputs */}
      <View style={styles.textContainer}>
        <Text style={styles.textInput}>Email</Text>
        <TextInput
          value={email}
          onChangeText={txt => setEmail(txt)}
          style={styles.input}></TextInput>
        <Text style={styles.textInput}>Password</Text>
        <TextInput
          secureTextEntry
          value={password}
          onChangeText={txt => setPassword(txt)}
          style={styles.input}></TextInput>
      </View>

      {/* Add Button */}
      <View style={{alignItems: 'center', bottom: 50}}>
        {userLoading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            onPress={() => handleSignIn()}
            style={styles.inputBtn}>
            <Text style={styles.inputText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    height: 70,
    width: '100%',
    // backgroundColor: 'grey',
    justifyContent: 'center',
    flexDirection: 'row-reverse',

    // alignItems:'center'
  },
  headerText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
    color: '#000',
    top: 15,
  },
  arrow: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    left: 10,
    top: 10,
  },
  imgContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 300,
    width: 300,
  },
  textContainer: {
    alignItems: 'center',
  },
  textInput: {
    fontSize: 20,
    fontWeight: '800',
    color: '#000',
    marginTop: 10,
    textAlign: 'left',
  },
  input: {
    width: '90%',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#fff',
    // marginTop: 10,
    textAlign: 'center',
    // marginBottom: 20,
  },
  inputText: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '900',
  },
  inputBtn: {
    marginTop: 200,
    borderWidth: 1,
    width: '80%',
    alignItems: 'center',
    borderRadius: 20,
    justifyContent: 'center',
    height: 60,
    backgroundColor: 'dodgerblue',
    // marginBottom: 30,
    // left:50
  },
});
