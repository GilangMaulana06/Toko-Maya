import { View, Text, Keyboard, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Modal, Portal, TextInput, Button, Appbar } from 'react-native-paper'
import { apiDeleteData, apiGetData, apiFilterData } from '../api/api'

const { width, height } = Dimensions.get('screen')

const Index = ({ navigation }) => {

    const [paramData, setParamData] = useState({
        limit: 15,
        offset: 0,
    })

    const [data, setData] = useState([])
    const [totalData, setTotalData] = useState(0)
    const [selectedData, setSelectedData] = useState([])
    const [showModalFilter, setShowModalFilter] = useState(false)
    const [showModalDetails, setShowModalDetails] = useState(false)
    const [disableButton, setDisableButton] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [hidePagination, setHidePagination] = useState(false)

    // STATE MODAL
    const [nama, setNama] = useState('')
    const [ukuran, setUkuran] = useState('')
    const [type, setType] = useState('')
    const [brand, setBrand] = useState('')

    const modalObject = [
        {
            label: 'Nama barang',
            value: nama,
            placeholder: '',
            onChangeText: (text) => setNama(text)
        },
        {
            label: 'Ukuran',
            value: ukuran,
            placeholder: 'contoh : 10 inch / 10*30',
            onChangeText: (text) => setUkuran(text)
        },
        // {
        //     label: 'Tipe barang',
        //     value: type,
        //     placeholder: '',
        //     onChangeText: (text) => setType(text)
        // },
        {
            label: 'Brand',
            value: brand,
            placeholder: '',
            onChangeText: (text) => setBrand(text)
        },
    ]

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
    ]

    useEffect(() => {
        getData()
    }, [paramData])

    const getData = async () => {
        try {
            const res = await apiGetData(paramData.limit, paramData.offset)
            setTotalData(res.total_data)
            setData(res?.data)
        } catch (err) {
            console.log(err)
            Alert.alert('Error bang', 'Telpon urang bueknyo', [
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
            Alert.alert('Data berhasil dihapus', '', [
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
                    setTotalData(totalData - 1)
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
            if (!nama && !ukuran && !type && !brand) {
                Alert.alert('Isi data terlebih dahulu', '', [
                    {
                        text: 'OK'
                    }
                ])
            } else {
                const res = await apiFilterData(nama, ukuran, type, brand, '', 0)
                if (res.data.length === 0) {
                    Alert.alert('Barang yang anda cari tidak ditemukan', 'Ulangi lagi', [
                        {
                            text: 'OK'
                        }
                    ])
                    setDisableButton(false)
                } else {
                    setTotalData(res.total_data)
                    setData(res.data)
                    setNama('')
                    setUkuran('')
                    setType('')
                    setBrand('')
                    setShowModalFilter(false)
                    setDisableButton(false)
                    setHidePagination(true)
                }
            }
        } catch (err) {
            console.log(err)
            setNama('')
            setUkuran('')
            setType('')
            setBrand('')
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
        getData()
        setHidePagination(false)
        setTimeout(() => {
            setRefreshing(false)
        }, 150)
    }

    const propsHeader = {
        setData: setData,
        setShowModalFilter: setShowModalFilter,
        navigation: navigation,
    }

    const propsTable = {
        data: data,
        setData: setData,
        setSelectedData: setSelectedData,
        setShowModalDetails: setShowModalDetails,
        refreshing: refreshing,
        setRefreshing: setRefreshing,
        onRefresh: onRefresh,
        paramData: paramData,
        setParamData: setParamData,
        totalData: totalData,
        setTotalData: setTotalData,
        hidePagination: hidePagination
    }

    return (
        <>
            {/* MODAL FOR FILTER */}
            <Portal>
                <Modal visible={showModalFilter} onDismiss={() => {
                    setNama('')
                    setUkuran('')
                    setType('')
                    setBrand('')
                    setShowModalFilter(false)
                    setDisableButton(false)
                }} style={{
                    width: width,
                    alignItems: 'center',
                }}>
                    <View style={{ width: width, backgroundColor: '#fff', borderRadius: 10, padding: 20 }}>
                        <Text style={{
                            fontSize: 23,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: '#000'
                        }}>Filter barang</Text>
                        {
                            modalObject.map((x, key) => {
                                return (
                                    <TextInput key={key}
                                        activeOutlineColor='black'
                                        style={{ textAlign: 'center', width: '90%', alignSelf: 'center', marginTop: 20 }}
                                        mode='outlined'
                                        label={x.label}
                                        value={x.value}
                                        placeholder={x.placeholder}
                                        onChangeText={x.onChangeText}
                                    />
                                )
                            })
                        }

                        <Button disabled={disableButton} mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 30 }} onPress={() => { filterData() }}>
                            Cari
                        </Button>
                    </View>
                </Modal>
            </Portal>

            {/* MODAL FOR ITEM DETAILS */}
            <Portal>
                <Modal visible={showModalDetails} onDismiss={() => {
                    setSelectedData([])
                    setShowModalDetails(false)
                }} style={{
                    width: width,
                    alignItems: 'center',
                }}>
                    <View style={{ width: width, backgroundColor: '#fff', borderRadius: 10, padding: 20 }}>
                        <Text style={{
                            fontSize: 23,
                            fontWeight: 'bold',
                            alignSelf: 'center',
                            color: '#000',
                            marginBottom: 20
                        }}>Informasi barang</Text>

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
                                                    <Text style={{ color: '#000', fontSize: 20 }}>{selectedData[0][value.value]}</Text>
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