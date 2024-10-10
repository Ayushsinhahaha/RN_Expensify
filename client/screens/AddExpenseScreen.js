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

const AddExpenseScreen = ({navigation}) => {
  const [category, setCategory] = useState('');
  const [expenseTitle, setExpenseTitle] = useState('');
  const [amount, setAmount] = useState('');

  const handleAddTrip = () => {
    if (expenseTitle && amount && category) {
      navigation.navigate('TripExpenses');
    }
  };

  const userData = {
    expenseTitle,
    amount,
    category,
  };

  console.log('selected cate', category);

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Add Expense</Text>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.arrow}>
          <Icon name="arrow-left" size={40} color={'#000'} />
        </TouchableOpacity>
      </View>
      {/* Image */}
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/images/3.png')}
          style={styles.image}
        />
      </View>

      {/* TextInputs */}
      <View style={styles.textContainer}>
        <Text style={styles.textInput}>For What?</Text>
        <TextInput
          value={expenseTitle}
          onChangeText={txt => setExpenseTitle(txt)}
          style={styles.input}></TextInput>
        <Text style={styles.textInput}>How Much?</Text>
        <TextInput
          value={amount}
          onChangeText={txt => setAmount(txt)}
          style={styles.input}></TextInput>
        <Text style={styles.textInput}>Category</Text>
        {
          <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
            {categories.map(cat => {
              let bgColor = 'dodgerblue';
              if (cat.value === category) {
                bgColor = 'orange';
              }
              return (
                <TouchableOpacity
                  onPress={() => setCategory(cat.value)}
                  style={{
                    borderWidth: 1,
                    borderRadius: 10,
                    margin: 5,
                    // borderColor: '#fff',
                    backgroundColor: bgColor,
                  }}>
                  <Text style={{padding: 5, fontWeight: '700'}}>
                    {cat.title}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        }
      </View>

      {/* Add Button */}
      <View style={{alignItems: 'center', bottom: 50}}>
        <TouchableOpacity
          onPress={() => handleAddTrip()}
          style={styles.inputBtn}>
          <Text style={styles.inputText}>Add Expense</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default AddExpenseScreen;

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
