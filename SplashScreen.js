import { View, Text, Image, Dimensions } from 'react-native'
import React from 'react'

const { width, height } = Dimensions.get('screen')

const SplashScreen = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff', justifyContent:'center', alignItems: 'center'}}>
      <Image source={require('./logo_maya.jpg')} style={{ width: width, height: width}}></Image>
    </View>
  )
}

export default SplashScreen