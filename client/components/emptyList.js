import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const EmptyList = ({message}) => {
  return (
    <View style={styles.container}>
     <Image source={require('../assets/images/empty.png')} style={styles.image} />
     <Text style={styles.message}>{message||'Data not found!'}</Text>
    </View>
  )
}

export default EmptyList

const styles = StyleSheet.create({
    container:{
        alignItems:'center',
        justifyContent:'center'
    },
    image:{
        height:200,
        width:200,
        marginTop:30
    },
    message:{
        fontSize:18,
        fontWeight:'700'
    }
})