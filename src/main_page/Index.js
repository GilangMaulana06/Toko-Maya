import { View, Text, Keyboard, Dimensions, Alert, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table'
import { Modal, Portal, TextInput, Button, Appbar, List } from 'react-native-paper'
import { apiDeleteData, apiGetData, apiFilterData, apiGetDataSumber } from '../api/api'
import { formatCurrency } from "react-native-format-currency";


const { width, height } = Dimensions.get('screen')
const regex = /^\d+$/

const Index = ({ navigation }) => {

    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const [showModalFilter, setShowModalFilter] = useState(false)
    const [showModalDetails, setShowModalDetails] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [showListTable, setShowListTable] = useState(false)

    // STATE MODAL
    const [nama, setNama] = useState('')
    const [ukuran, setUkuran] = useState('')
    const [type, setType] = useState('')
    const [brand, setBrand] = useState('')
    const [sumberBarang, setSumberBarang] = useState('')
    const [listNamaToko, setListNamaToko] = useState([])
    const [textSearch, setTextSearch] = useState('')

    const detailSchema = [
        {
            title: 'Nama barang',
            value: 'nama_item'
        },
        {
            title: 'Tipe',
            value: 'type'
        },
        {
            title: 'Brand',
            value: 'brand'
        },
        {
            title: 'Ukuran',
            value: 'ukuran'
        },
        {
            title: 'Harga modal',
            value: 'modal'
        },
        {
            title: 'Harga ecer',
            value: 'harga_ecer'
        },
        {
            title: 'Harga grosir',
            value: 'harga_grosir'
        },
        {
            title: 'Sumber',
            value: 'sumber_barang'
        },
    ]

    const getDataSumber = async () => {
        console.log('GET DATA SUMBER')
        try {
            const dataSumber = await apiGetDataSumber()
            setListNamaToko(dataSumber.data)
        } catch (e) {
            Alert.alert('Data Sumber Toko gagal dimuat', 'Ulangi lagi', [
                {
                    text: 'OK'
                }
            ])
        }
    }

    const editData = () => {
        navigation.navigate('Form', { selectedData: selectedData, data: data, setData: async (par_data) => setData(par_data) })
        setShowModalDetails(false)
    }

    const deleteData = async (isConfirm) => {
        if (isConfirm === undefined) {
            Alert.alert('Anda yakin ingin menghapus item ini?', '', [
                {
                    text: 'Cancel',
                    onPress: () => deleteData('CANCEL')
                },
                {
                    text: 'Delete',
                    onPress: () => deleteData('DELETE')
                },
            ])
        } else {
            if (isConfirm === 'DELETE') {
                console.log('DELETE')
                try {
                    const res = await apiDeleteData(selectedData[0]['id'])
                    const filter = data.filter(x => selectedData[0]['id'] !== x.id)
                    setData(filter)
                    setShowModalDetails(false)
                    Alert.alert('Data berhasil dihapus', '', [
                        {
                            text: 'OK'
                        }
                    ])
                } catch (err) {
                    console.log(err)
                    Alert.alert('Data gagal dihapus', 'Ulangi lagi', [
                        {
                            text: 'OK'
                        }
                    ])
                }
            }
        }
    }

    const filterData = async () => {
        console.log('FILTER DATA')
        setDisableButton(true)
        try {
            if (!nama && !ukuran && !type && !brand && !sumberBarang) {
                Alert.alert('Isi data terlebih dahulu', '', [
                    {
                        text: 'OK'
                    }
                ])
                setDisableButton(false)
            } else {
                const res = await apiFilterData(nama, ukuran, type, brand, sumberBarang, '', 0)
                if (res.data.length === 0) {
                    Alert.alert('Barang yang anda cari tidak ditemukan', 'Ulangi lagi', [
                        {
                            text: 'OK'
                        }
                    ])
                    setDisableButton(false)
                } else {
                    setData(res.data)
                    setShowModalFilter(false)
                    setDisableButton(false)
                }
            }
        } catch (err) {
            console.log(err)
            setNama('')
            setUkuran('')
            setType('')
            setBrand('')
            setSumberBarang('')
            setShowModalFilter(false)
            setDisableButton(false)
            Alert.alert('Filter data gagal', 'Ulangi lagi', [
                {
                    text: 'OK'
                }
            ])
        }
    }

    const onRefresh = async () => {
        console.log('refresh page')
        setRefreshing(true);
        if (!nama && !ukuran && !type && !brand) {

        } else {
            filterData()
        }
        setTimeout(() => {
            setRefreshing(false)
        }, 150)
    }

    const onShowModalFilter = () => {
        setShowModalFilter(true)
    }

    const propsHeader = {
        setData: setData,
        onShowModalFilter: onShowModalFilter,
        navigation: navigation,
        getDataSumber: getDataSumber
    }

    const propsTable = {
        data: data,
        setData: setData,
        setSelectedData: setSelectedData,
        setShowModalDetails: setShowModalDetails,
        refreshing: refreshing,
        setRefreshing: setRefreshing,
        onRefresh: onRefresh,
    }

    return (
        <>
            {/* MODAL FOR FILTER */}
            <Portal>
                <Modal visible={showModalFilter} dismissable={false} style={{
                    width: width,
                    alignItems: 'center',
                }}>
                    <View style={{ width: width, backgroundColor: '#fff', borderRadius: 10, padding: 20 }}>
                        <ScrollView keyboardShouldPersistTaps='handled'>
                            <View style={{ flexDirection: 'row' }}>
                                <View style={{ flex: 1, alignItems: 'flex-start' }}>
                                    <Appbar.Action icon="sync" size={25} onPress={() => {
                                        setNama('')
                                        setUkuran('')
                                        setType('')
                                        setBrand('')
                                        setSumberBarang('')
                                        setTextSearch('')
                                        setShowListTable(false)
                                    }} />
                                </View>
                                <Text style={{
                                    fontSize: 23,
                                    fontWeight: 'bold',
                                    alignSelf: 'center',
                                    color: '#000',
                                }}>Filter barang</Text>
                                <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                    <Appbar.Action icon="close" size={25} onPress={() => {
                                        setShowModalFilter(false)
                                        setShowListTable(false)
                                        setDisableButton(false)
                                    }} />
                                </View>
                            </View>

                            <TextInput
                                onFocus={() => setShowListTable(false)}
                                autoCorrect={false}
                                activeOutlineColor='black'
                                style={{ textAlign: 'center', width: '90%', alignSelf: 'center', marginTop: 20 }}
                                mode='outlined'
                                label={'Nama barang'}
                                value={nama}
                                onChangeText={(text) => setNama(text)}
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
                                    label={'Ukuran'}
                                    value={ukuran}
                                    onChangeText={(text) => setUkuran(text)}

                                />
                                <TextInput
                                    onFocus={() => setShowListTable(false)}
                                    autoCorrect={false}
                                    activeOutlineColor='black'
                                    style={{ textAlign: 'center', width: '49%', marginTop: 20 }}
                                    mode='outlined'
                                    label={'Tipe barang'}
                                    value={type}
                                    onChangeText={(text) => setType(text)}
                                />
                            </View>

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
                                    style={{ textAlign: 'center', width: '60%', marginTop: 20 }}
                                    mode='outlined'
                                    label={'Brand'}
                                    value={brand}
                                    onChangeText={(text) => setBrand(text)}
                                />
                                <TextInput
                                    onFocus={() => setShowListTable(true)}
                                    autoCorrect={false}
                                    activeOutlineColor='black'
                                    style={{ textAlign: 'center', width: '38%', marginTop: 20 }}
                                    mode='outlined'
                                    label={'Sumber'}
                                    value={sumberBarang}
                                    onChangeText={(text) => {
                                        setTextSearch(text)
                                        setSumberBarang(text)
                                    }}
                                />
                            </View>

                            {
                                showListTable &&
                                <List.Section style={{ backgroundColor: 'red', width: '90%', alignSelf: 'center' }}>
                                    <ScrollView
                                        keyboardShouldPersistTaps={'handled'}
                                        nestedScrollEnabled={true}
                                        style={{ maxHeight: 200, backgroundColor: '#d5d9dc' }}
                                    >
                                        {
                                            listNamaToko.filter(x => x.nama_toko.includes(textSearch.toUpperCase())).length === 0 ?
                                                <List.Item
                                                    title={'Hasil tidak ditemukan'}
                                                />
                                                :
                                                listNamaToko.filter(x => x.nama_toko.includes(textSearch.toUpperCase())).map((value, key) => {
                                                    return (
                                                        <List.Item
                                                            key={key}
                                                            title={value.nama_toko}
                                                            onPress={() => {
                                                                setSumberBarang(value.nama_toko)
                                                                setShowListTable(false)
                                                                Keyboard.dismiss()
                                                            }}
                                                        />
                                                    )
                                                }
                                                )
                                        }
                                    </ScrollView>
                                </List.Section>
                            }

                            <Button disabled={disableButton} mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 30 }}
                                onPress={() => {
                                    filterData()
                                    setShowListTable(false)
                                }}>
                                Cari
                            </Button>
                        </ScrollView>
                    </View>
                </Modal>
            </Portal>

            {/* MODAL FOR ITEM DETAILS */}
            <Portal>
                <Modal visible={showModalDetails} dismissable={false} style={{
                    width: width,
                    alignItems: 'center',
                }}>
                    <View style={{ width: width, backgroundColor: '#fff', borderRadius: 10, padding: 20 }}>
                        <View style={{ flexDirection: 'row', marginBottom: 20 }}>
                            <Text style={{ flex: 1 }}></Text>
                            <Text style={{
                                fontSize: 23,
                                fontWeight: 'bold',
                                alignSelf: 'center',
                                color: '#000',
                            }}>Informasi barang</Text>
                            <View style={{ flex: 1, alignItems: 'flex-end' }}>
                                <Appbar.Action icon="close" size={25} onPress={() => {
                                    setShowModalDetails(false)
                                    setSelectedData([])
                                }} />
                            </View>
                        </View>

                        {selectedData.length > 0 &&
                            <>
                                {
                                    detailSchema.map((value, key) => {
                                        return (
                                            <View style={{ flexDirection: 'row' }} key={key}>
                                                <View style={{ flex: 30 }}>
                                                    <Text style={{ color: '#000', fontSize: 20, marginBottom: 10 }}>{value.title}</Text>
                                                </View>
                                                <View style={{ flex: 5, alignItems: 'center' }}>
                                                    <Text style={{ color: '#000', fontSize: 20 }}>:</Text>
                                                </View>
                                                <View style={{ flex: 65 }}>
                                                    <Text style={{ color: '#000', fontSize: 20 }}>
                                                        {
                                                            value.value === 'ukuran' ?
                                                                selectedData[0][value.value]
                                                                :
                                                                regex.test(selectedData[0][value.value]) ? formatCurrency({ amount: Number(selectedData[0][value.value]), code: 'IDR' })[1] : selectedData[0][value.value]
                                                        }
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    })
                                }
                            </>
                        }

                        <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Appbar.Action icon="pencil" size={30} onPress={() => { editData() }} />
                            <Appbar.Action icon="trash-can-outline" size={30} onPress={() => { deleteData(undefined) }} />
                        </View>
                    </View>
                </Modal>
            </Portal>

            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <Header props={propsHeader} />
                <Table props={propsTable} />
            </View>
        </>
    )
}

export default Index