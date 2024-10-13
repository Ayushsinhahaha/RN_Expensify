import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import randomImage from '../assets/images/randomImage';
import EmptyList from '../components/emptyList';
import {useSelector} from 'react-redux';
import {signOut} from 'firebase/auth';
import {auth, tripsRef} from '../config/firebase';
import {getDocs, query, where} from 'firebase/firestore';
import {useIsFocused} from '@react-navigation/native';

const handleLogout = async () => {
  return await signOut(auth);
};

const HomeScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const [trips, setTrips] = useState([]);
  const isFocused = useIsFocused();

  const fetchTrips = async () => {
    const q = query(tripsRef, where('userId', '==', user.uid));
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log('DOcumnet DATAAAA', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setTrips(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchTrips();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Expensify</Text>
        <TouchableOpacity onPress={handleLogout} style={styles.logBtn}>
          <Text style={styles.logBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
      {/* image container */}
      <View style={styles.imageContainer}>
        <Image
          source={require('../assets/images/banner.png')}
          style={styles.image}
        />
      </View>
      {/* recent trip header */}
      <View style={styles.tripHeader}>
        <Text style={styles.tripText}>Recent Trips</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('AddTrip')}
          style={styles.addTrip}>
          <Text style={styles.addTripText}>Add Trip</Text>
        </TouchableOpacity>
      </View>

      {/* Flatlist */}
      <FlatList
        data={trips}
        numColumns={2}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <EmptyList message={"You haven't recorded any trips yet"} />
        }
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.card}
              onPress={() => navigation.navigate('TripExpense', {...item})}>
              <View>
                <Image source={randomImage()} style={styles.cardImage} />
                <Text style={styles.placeText}>{item.place}</Text>
                <Text style={styles.stateText}>{item.state}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#000',
    padding: 5,
  },
  logBtn: {
    width: 70,
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    backgroundColor: 'dodgerblue',
  },
  logBtnText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#000',
  },
  imageContainer: {
    height: 300,
    backgroundColor: 'lightblue',
    width: '95%',
    borderRadius: 20,
    margin: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  image: {
    height: 300,
    width: 300,
  },
  tripHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 5,
  },
  tripText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  addTrip: {
    borderWidth: 1,
    padding: 5,
    borderRadius: 20,
    color: '#fff',
  },
  addTripText: {
    fontSize: 14,
    color: '#000',
    fontWeight: '600',
  },
  cardImage: {
    height: 190,
    width: 190,
    // margin:5
  },
  placeText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  stateText: {
    textAlign: 'center',
    fontWeight: '600',
    marginBottom: 10,
    fontSize: 14,
    color: 'grey',
  },
  card: {
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOpacity: 1,
    margin: 5,
    backgroundColor: '#fff',
  },
});
