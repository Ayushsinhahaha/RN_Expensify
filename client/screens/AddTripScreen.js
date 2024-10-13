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
import Loading from '../components/loading';
import Snackbar from 'react-native-snackbar';
import {addDoc} from 'firebase/firestore';
import {tripsRef} from '../config/firebase';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

const AddTripScreen = () => {
  const [place, setPlace] = useState('');
  const [state, setState] = useState('');
  const [loading, setLoading] = useState(false);
  const {user} = useSelector(state => state.user);
  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && state) {
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        state,
        userId: user.uid,
      });
      setLoading(false);
      if (doc && doc.id) {
        navigation.navigate('Home');
      }
    } else {
      Snackbar.show({
        text: 'Place and State are required!',
        backgroundColor: 'red',
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Trip</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}>
          <Icon name="arrow-left" size={40} color={'#000'} />
        </TouchableOpacity>
      </View>
      {/* Image */}
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/4.png')}
          style={styles.image}
        />
      </View>

      {/* TextInputs */}
      <View style={styles.textContainer}>
        <Text style={styles.textInput}>Which Place?</Text>
        <TextInput
          value={place}
          onChangeText={txt => setPlace(txt)}
          style={styles.input}></TextInput>
        <Text style={styles.textInput}>Which State?</Text>
        <TextInput
          value={state}
          onChangeText={txt => setState(txt)}
          style={styles.input}></TextInput>
      </View>

      {/* Add Button */}
      <View style={{alignItems: 'center'}}>
        {loading ? (
          <Loading />
        ) : (
          <TouchableOpacity
            onPress={() => handleAddTrip()}
            style={styles.inputBtn}>
            <Text style={styles.inputText}>Add Trip</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
};

export default AddTripScreen;

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
  },
  input: {
    width: '90%',
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginTop: 10,
    textAlign: 'center',
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
    // left:50
  },
});
