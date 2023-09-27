import { View, Text, Keyboard, Alert, ScrollView } from 'react-native'
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
    const [brand, setBrand] = useState(selectedData ? selectedData[0]['brand'] : '')
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
            value: brand,
            label: 'Brand',
            onChange: (text) => setBrand(text),
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

    const onSubmit = async (typeButton) => {
        setButtonDisable(true)
        if (itemName.length === 0 || type.length === 0) {
            Alert.alert('Silahkan masukan nama dan tipe barang', '', [
                {
                    text: 'OK',
                    onPress: () => { setButtonDisable(false) }
                }
            ])
        } else {
            if (selectedData) {
                const paramId = selectedData[0].id
                const value = {
                    nama_item: itemName,
                    type: type,
                    brand: brand,
                    ukuran: size,
                    modal: hargaModal,
                    harga_ecer: hargaEcer,
                    harga_grosir: hargaGrosir
                }

                console.log('EDIT')
                try {
                    const res = await apiUpdateData(paramId, value)
                    const index = data.findIndex(x => x.id === res.id);
                    let temp_data = data
                    Object.assign(temp_data[index], res)
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
                const value = {
                    nama_item: itemName,
                    type: type,
                    brand: brand,
                    ukuran: size,
                    modal: hargaModal,
                    harga_ecer: hargaEcer,
                    harga_grosir: hargaGrosir
                }

                console.log('SAVE')
                try {
                    const res = await apiInsertData(value)
                    setData(prev => [res, ...prev])
                    if (typeButton === 'save') {
                        navigation.navigate('Main')
                    } else {
                        setSize('')
                        setHargaModal('')
                        setHargaEcer('')
                        setHargaGrosir('')
                    }
                    Alert.alert('Data berhasil disimpan', '', [
                        {
                            text: 'OK',
                            onPress: () => setButtonDisable(false)
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
    }

    const propsHeader = {
        navigation: navigation
    }

    return (
        <ScrollView style={{ backgroundColor: '#fff' }}>
            <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
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
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button mode='contained' style={{ width: '30%', alignSelf: 'center', marginTop: 50 }} onPress={() => { onSubmit('save') }}>
                                    Simpan
                                </Button>
                                <Button mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 50 }} onPress={() => { onSubmit('new') }}>
                                    Simpan dan Tambah
                                </Button>
                            </View>
                    }
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    )
}

export default Index