import { View, Text } from 'react-native'
import React from 'react'
import { Appbar } from 'react-native-paper'

const Header = ({ props }) => {
    return (
        <Appbar.Header>
            <Appbar.BackAction onPress={() => { props.navigation.goBack() }} />
            <Appbar.Content title="Form input barang" />
        </Appbar.Header>
    )
}

export default Header