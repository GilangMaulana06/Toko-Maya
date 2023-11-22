import { View, Text, Keyboard, Alert, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Appbar, Button, TextInput } from 'react-native-paper'
import Header from './Header'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { apiInsertData, apiUpdateData, apiGetDataSumber } from '../api/api'
import { DataTable } from 'react-native-paper'

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
    const [sumberBarang, setSumberBarang] = useState(selectedData ? selectedData[0]['sumber_barang'] ? selectedData[0]['sumber_barang'] : '' : '')

    const [namaToko, setNamaToko] = useState([])
    const [textSearch, setTextSearch] = useState('')
    const [buttonDisable, setButtonDisable] = useState(false)
    const [showListTable, setShowListTable] = useState(false)

    useEffect(() => {
        getDataSumber()
    }, [])

    const getDataSumber = async () => {
        try {
            const dataSumber = await apiGetDataSumber()
            setNamaToko(dataSumber.data)
        } catch (e) {
            Alert.alert('Data Sumber Toko gagal dimuat', 'Ulangi lagi', [
                {
                    text: 'OK'
                }
            ])
        }
    }

    const onSubmit = async (typeButton) => {
        setButtonDisable(true)
        setShowListTable(false)
        if (itemName.length === 0) {
            Alert.alert('Silahkan masukan nama barang', '', [
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
                    type: type.length === 0 ? '-' : type,
                    brand: brand.length === 0 ? '-' : brand,
                    ukuran: size.length === 0 ? '-' : size,
                    modal: hargaModal.length === 0 ? '-' : hargaModal,
                    harga_ecer: hargaEcer.length === 0 ? '-' : hargaEcer,
                    harga_grosir: hargaGrosir.length === 0 ? '-' : hargaGrosir,
                    sumber_barang: sumberBarang.length === 0 ? '-' : sumberBarang.toUpperCase()
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
                    type: type.length === 0 ? '-' : type,
                    brand: brand.length === 0 ? '-' : brand,
                    ukuran: size.length === 0 ? '-' : size,
                    modal: hargaModal.length === 0 ? '-' : hargaModal,
                    harga_ecer: hargaEcer.length === 0 ? '-' : hargaEcer,
                    harga_grosir: hargaGrosir.length === 0 ? '-' : hargaGrosir,
                    sumber_barang: sumberBarang.length === 0 ? '-' : sumberBarang.toUpperCase()
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
        <ScrollView style={{ backgroundColor: '#fff' }} keyboardShouldPersistTaps='handled'>
            <View style={{ flex: 1, backgroundColor: '#fff', paddingBottom: 20 }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <Header props={propsHeader} />

                    <TextInput
                        onFocus={() => setShowListTable(false)}
                        autoCorrect={false}
                        activeOutlineColor='black'
                        style={{ textAlign: 'center', width: '90%', alignSelf: 'center', marginTop: 20 }}
                        mode='outlined'
                        label={'Nama Barang'}
                        value={itemName}
                        onChangeText={(text) => setItemName(text)}
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center'
                    }}>
                        <TextInput
                            onFocus={() => setShowListTable(false)}
                            autoCorrect={false}
                            activeOutlineColor='black'
                            style={{ textAlign: 'center', width: '49%', marginTop: 20 }}
                            mode='outlined'
                            label={'Tipe Barang'}
                            value={type}
                            onChangeText={(text) => setType(text)}
                        />
                        <TextInput
                            onFocus={() => setShowListTable(false)}
                            autoCorrect={false}
                            activeOutlineColor='black'
                            style={{ textAlign: 'center', width: '49%', marginTop: 20 }}
                            mode='outlined'
                            label={'Ukuran'}
                            value={size}
                            onChangeText={(text) => setSize(text)}
                        />
                    </View>

                    <TextInput
                        onFocus={() => setShowListTable(false)}
                        autoCorrect={false}
                        activeOutlineColor='black'
                        style={{ textAlign: 'center', width: '90%', alignSelf: 'center', marginTop: 20 }}
                        mode='outlined'
                        label={'Brand'}
                        value={brand}
                        onChangeText={(text) => setBrand(text)}
                    />

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center'
                    }}>
                        <TextInput
                            onFocus={() => setShowListTable(false)}
                            autoCorrect={false}
                            activeOutlineColor='black'
                            style={{ textAlign: 'center', width: '32%', marginTop: 20 }}
                            mode='outlined'
                            label={'Modal'}
                            value={hargaModal}
                            onChangeText={(text) => hargaModal(text)}
                        />
                        <TextInput
                            onFocus={() => setShowListTable(false)}
                            autoCorrect={false}
                            activeOutlineColor='black'
                            style={{ textAlign: 'center', width: '32%', marginTop: 20 }}
                            mode='outlined'
                            label={'Ecer'}
                            value={hargaEcer}
                            onChangeText={(text) => setHargaEcer(text)}
                        />
                        <TextInput
                            onFocus={() => setShowListTable(false)}
                            autoCorrect={false}
                            activeOutlineColor='black'
                            style={{ textAlign: 'center', width: '32%', marginTop: 20 }}
                            mode='outlined'
                            label={'Grosir'}
                            value={hargaGrosir}
                            onChangeText={(text) => setHargaGrosir(text)}
                        />
                    </View>

                    <View style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '90%',
                        alignSelf: 'center'
                    }}>
                        <TextInput
                            onFocus={() => setShowListTable(true)}
                            autoCorrect={false}
                            activeOutlineColor='black'
                            style={{ textAlign: 'center', width: '85%', alignSelf: 'center', marginTop: 20, marginBottom: 5 }}
                            mode='outlined'
                            label={'Sumber Barang'}
                            value={sumberBarang}
                            onChangeText={(text) => {
                                setTextSearch(text)
                                setSumberBarang(text)
                            }}
                        />
                        <Appbar.Action
                            icon={showListTable === true ? "chevron-down-circle-outline" : "chevron-up-circle-outline"}
                            size={30}
                            style={{ alignSelf: 'center', marginTop: 25 }}
                            onPress={() => {
                                setShowListTable(!showListTable)
                            }}
                        />
                    </View>

                    {
                        showListTable &&
                        <ScrollView
                            style={{ maxHeight: 200, width: '100%' }}
                            disableScrollViewPanResponder={true}
                            nestedScrollEnabled={true}
                        >
                            <DataTable>
                                {
                                    namaToko.filter(x => x.nama_toko.includes(textSearch.toUpperCase())).length === 0 ?
                                        <DataTable.Row style={{ backgroundColor: '#d5d9dc', width: '90%', alignSelf: 'center' }}>
                                            <DataTable.Cell>
                                                <Text>{'Hasil tidak ditemukan'}</Text>
                                            </DataTable.Cell>
                                        </DataTable.Row>
                                        :
                                        namaToko.filter(x => x.nama_toko.includes(textSearch.toUpperCase())).map((value, key) => {
                                            return (
                                                <DataTable.Row key={key} style={{ backgroundColor: '#d5d9dc', width: '90%', alignSelf: 'center' }} onPress={() => {
                                                    setSumberBarang(value.nama_toko)
                                                    setShowListTable(false)
                                                }}>
                                                    <DataTable.Cell>
                                                        <Text>{value.nama_toko}</Text>
                                                    </DataTable.Cell>
                                                </DataTable.Row>
                                            )
                                        })
                                }
                            </DataTable>
                        </ScrollView>
                    }

                    {
                        buttonDisable ?
                            <Button mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 40 }}>
                                Menyimpan...
                            </Button>
                            :
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <Button mode='contained' style={{ width: '30%', alignSelf: 'center', marginTop: 40 }} onPress={() => { onSubmit('save') }}>
                                    Simpan
                                </Button>
                                {
                                    !selectedData &&
                                    <Button mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 40 }} onPress={() => { onSubmit('new') }}>
                                        Simpan dan Tambah
                                    </Button>
                                }
                            </View>
                    }
                </TouchableWithoutFeedback>
            </View>
        </ScrollView>
    )
}

export default Index