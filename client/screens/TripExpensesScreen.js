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

import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyList from '../components/emptyList';
import ExpenseCard from '../components/expenseCard';
import {useIsFocused, useNavigation, useRoute} from '@react-navigation/native';
import {getDocs, query, where} from 'firebase/firestore';
import {expenseRef} from '../config/firebase';

const TripExpensesScreen = props => {
  const navigation = useNavigation();
  const {id, place, state} = props.route.params;
  const [expenses, setExpenses] = useState([]);

  const isFocused = useIsFocused();

  const fetchExpenses = async () => {
    const q = query(expenseRef, where('tripId', '==', id));
    let data = [];
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach(doc => {
      console.log('DOcumnet DATAAAA in expense', doc.data());
      data.push({...doc.data(), id: doc.id});
    });
    setExpenses(data);
  };

  useEffect(() => {
    if (isFocused) {
      fetchExpenses();
    }
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerPlace}>{place}</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}>
          <Icon name="arrow-left" size={40} color={'#000'} />
        </TouchableOpacity>
      </View>
      {/* Image */}
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/7.png')}
          style={styles.image}
        />
      </View>
      {/* recent trip header */}
      <View style={styles.tripHeader}>
        <Text style={styles.tripText}>Expenses</Text>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('AddExpense', {id, place, state})
          }
          style={styles.addTrip}>
          <Text style={styles.addTripText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      {/* Flatlist */}
      <FlatList
        data={expenses}
        keyExtractor={item => item.id}
        ListEmptyComponent={
          <EmptyList message={"You haven't recorded any expenses yet"} />
        }
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return <ExpenseCard item={item} />;
        }}
      />
    </SafeAreaView>
  );
};

export default TripExpensesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5,
    // alignItems: 'center',
  },
  header: {
    height: 70,
    width: '100%',
    // backgroundColor: 'grey',
    justifyContent: 'center',
    flexDirection: 'row',

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
  headerPlace: {
    fontSize: 40,
    fontWeight: '800',
    color: '#00704a',
  },
});
