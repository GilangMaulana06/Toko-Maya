import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { TextInput, Button } from 'react-native-paper'

const Index = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const onLogin = async () => {
    console.log('login')
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <Text style={{color: 'black', fontSize: 30, alignSelf: 'center', marginBottom: 30}}>TOKO MAYA</Text>
      <TextInput
        activeOutlineColor='black'
        style={{ textAlign: 'center', width: '70%', alignSelf: 'center', marginTop: 20 }}
        mode='outlined'
        label={'Email'}
        value={email}
        onChangeText={(text => setEmail(text))}
      />

      <TextInput
        activeOutlineColor='black'
        style={{ textAlign: 'center', width: '70%', alignSelf: 'center', marginTop: 20 }}
        mode='outlined'
        label={'Password'}
        value={password}
        onChangeText={(text => setPassword(text))}
      />

      <Button mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 50 }} onPress={() => { onLogin() }}>
        Login
      </Button>
    </View>
  )
}

export default Index