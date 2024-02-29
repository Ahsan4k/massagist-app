import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS } from '../consts/colors'

const BackButton = ({onPress}) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Image source={require('../assets/back_icon.png')} style={{width: 25, height: 25}} />
    </TouchableOpacity>
  )
}

export default BackButton

const styles = StyleSheet.create({
  container:{
    backgroundColor: COLORS.primary,
    width: 40,
    height: 40,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center'
  }
})