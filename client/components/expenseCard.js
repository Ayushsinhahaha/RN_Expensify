import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {categoryBG} from '../themes';

const ExpenseCard = ({item}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        margin: 8,
        borderWidth: 1,
        height: 70,
        padding: 10,
        borderRadius: 20,
        backgroundColor: categoryBG[item.category],
      }}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.expenseTitle}</Text>
        <Text style={styles.category}>{item.category}</Text>
      </View>
      <View style={styles.amountView}>
        <Text style={styles.amount}> ₹ {item.amount}</Text>
      </View>
    </View>
  );
};

export default ExpenseCard;

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: '#000',
  },
  category: {
    fontSize: 16,
    color: 'dodgerblue',
    fontWeight: '700',
  },
  amount: {
    fontSize: 20,
    fontWeight: '900',
    color: 'green',
  },
});
