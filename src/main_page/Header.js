import { View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'

const Header = ({ props }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <Appbar.Header>
        <Appbar.Content title="List barang" />

        <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
          <Appbar.Action icon="filter-outline" onPress={() => { props.onShowModalFilter() }} />
          <Text style={{ color: '#000', alignSelf: 'center', bottom: 15, fontSize: 10 }}>{'Filter'}</Text>
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', }}>
          <Appbar.Action icon="plus" onPress={() => { 
            props.setData([])
            props.navigation.navigate('Form', { setData: props.setData }) 
            }} />
          <Text style={{ color: '#000', alignSelf: 'center', bottom: 15, fontSize: 10 }}>{'Tambah'}</Text>
        </View>
      </Appbar.Header>
    </TouchableWithoutFeedback>
  )
}

export default Header