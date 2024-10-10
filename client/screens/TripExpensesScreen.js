import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/FontAwesome';
import EmptyList from '../components/emptyList';
import ExpenseCard from '../components/expenseCard';
import {useRoute} from '@react-navigation/native';

const items = [
  {
    id: 1,
    title: 'Drank Coffee',
    amount: 139,
    category: 'Food',
  },
  {
    id: 2,
    title: 'Petrol',
    amount: 379,
    category: 'Travel',
  },
  {
    id: 3,
    title: 'Bought Shirt',
    amount: 429,
    category: 'Shopping',
  },
  {
    id: 4,
    title: 'Paragliding',
    amount: 3999,
    category: 'Travel',
  },
];

const TripExpensesScreen = ({navigation}) => {
  const route = useRoute();
  const data = route.params.item;
  console.log('data:::', data);
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerPlace}>{data.place}</Text>
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
          onPress={() => navigation.navigate('AddExpense')}
          style={styles.addTrip}>
          <Text style={styles.addTripText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
      {/* Flatlist */}
      <FlatList
        data={items}
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
