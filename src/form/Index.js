import { View, Text, Keyboard, Alert } from 'react-native'
import React, { useState } from 'react'
import { Button, TextInput } from 'react-native-paper'
import Header from './Header'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { apiInsertData, apiUpdateData } from '../api/api'

const Index = ({ navigation }) => {

    const data = navigation.getParam('data')
    const setData = navigation.getParam('setData')
    const selectedData = navigation.getParam('selectedData')

    const [itemName, setItemName] = useState(selectedData ? selectedData[0]['nama_item'] : '')
    const [type, setType] = useState(selectedData ? selectedData[0]['type'] : '')
    const [size, setSize] = useState(selectedData ? selectedData[0]['ukuran'] : '')
    const [hargaModal, setHargaModal] = useState(selectedData ? selectedData[0]['modal'] : '')
    const [hargaEcer, setHargaEcer] = useState(selectedData ? selectedData[0]['harga_ecer'] : '')
    const [hargaGrosir, setHargaGrosir] = useState(selectedData ? selectedData[0]['harga_grosir'] : '')

    const [buttonDisable, setButtonDisable] = useState(false)

    const schemaForm = [
        {
            value: itemName,
            label: 'Nama barang',
            onChange: (text) => setItemName(text),
        },
        {
            value: type,
            label: 'Tipe barang',
            onChange: (text) => setType(text),
        },
        {
            value: size,
            label: 'Ukuran',
            onChange: (text) => setSize(text),
        },
        {
            value: hargaModal,
            label: 'Harga modal',
            onChange: (text) => setHargaModal(text),
        },
        {
            value: hargaEcer,
            label: 'Harga ecer',
            onChange: (text) => setHargaEcer(text),
        },
        {
            value: hargaGrosir,
            label: 'Harga grosir',
            onChange: (text) => setHargaGrosir(text),
        },
    ]

    const onSubmit = async () => {
        const value = {
            id: selectedData ? selectedData[0].id : '',
            nama_item: itemName,
            type: type,
            ukuran: size,
            modal: hargaModal,
            harga_ecer: hargaEcer,
            harga_grosir: hargaGrosir
        }

        setButtonDisable(true)

        if (selectedData) {
            console.log('EDIT')
            try {
                const res = await apiUpdateData(value)
                const index = data.findIndex(x => x.id === res[0].id);
                let temp_data = data
                Object.assign(temp_data[index], res[0])
                setData([]).then(() => {
                    setData(temp_data)
                })
                navigation.navigate('Main')
                Alert.alert('Data berhasil diupdate', '', [
                    {
                        text: 'OK'
                    }
                ])
            } catch (err) {
                setButtonDisable(false)
                console.log(err)
                Alert.alert('Data gagal diupdate', 'Ulangi lagi', [
                    {
                        text: 'OK'
                    }
                ])
            }
        } else {
            console.log('SAVE')
            try {
                const res = await apiInsertData(value)
                setData(prev => [res[0], ...prev])
                navigation.navigate('Main')
                Alert.alert('Data berhasil disimpan', '', [
                    {
                        text: 'OK'
                    }
                ])
            } catch (err) {
                setButtonDisable(false)
                console.log(err)
                Alert.alert('Data gagal disimpan', 'Ulangi lagi', [
                    {
                        text: 'OK'
                    }
                ])
            }
        }
    }

    const propsHeader = {
        navigation: navigation
    }

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <Header props={propsHeader} />

                {
                    schemaForm.map((x, key) => {
                        return (
                            <TextInput
                                key={key}
                                activeOutlineColor='black'
                                style={{ textAlign: 'center', width: '90%', alignSelf: 'center', marginTop: 20 }}
                                mode='outlined'
                                label={x.label}
                                value={x.value}
                                onChangeText={x.onChange}
                            />
                        )
                    })
                }
                {
                    buttonDisable ?
                        <Button mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 50 }}>
                            Menyimpan...
                        </Button>
                        :
                        <Button mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 50 }} onPress={() => { onSubmit() }}>
                            Simpan
                        </Button>
                }
            </TouchableWithoutFeedback>
        </View>
    )
}

export default Index