import { View, Text, Keyboard, Dimensions, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from './Header'
import Table from './Table'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { Modal, Portal, TextInput, Button, Appbar } from 'react-native-paper'
import { apiDeleteData, apiGetData } from '../api/api'

const { width, height } = Dimensions.get('screen')

const Index = ({ navigation }) => {

    const [data, setData] = useState([])
    const [selectedData, setSelectedData] = useState([])
    const [type, setType] = useState('')
    const [showSearchBar, setShowSearchBar] = useState(false)
    const [showModalFilter, setShowModalFilter] = useState(false)
    const [showModalDetails, setShowModalDetails] = useState(false)

    useEffect(() => {
        getData()
    }, [])

    const getData = async () => {
        console.log('GET DATA')
        try {
            const res = await apiGetData()
            setData(res)
        } catch (err) {
            console.log(err)
            Alert.alert('Error nih cuy', 'Restart aplikasi nya bang', [{
                text: 'OK'
            }])
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
                    const value = {
                        id : selectedData[0]['id']
                    }
                    const res = await apiDeleteData(value)
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

    // FILTER TYPE
    const onSubmit = () => {
        console.log('SUBMIT')
        const data = {
            type: type
        }
        console.log(data)
        setShowModalFilter(false)
    }

    const propsHeader = {
        setData: setData,
        setShowModalFilter: setShowModalFilter,
        setShowSearchBar: setShowSearchBar,
        navigation: navigation,
    }

    const propsTable = {
        getData: getData,
        data: data,
        setData: setData,
        setSelectedData: setSelectedData,
        showSearchBar: showSearchBar,
        setShowModalDetails: setShowModalDetails
    }

    return (
        <>
            {/* MODAL FOR FILTER */}
            <Portal>
                <Modal visible={showModalFilter} onDismiss={() => setShowModalFilter(false)} style={{
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

                        <TextInput
                            activeOutlineColor='black'
                            style={{ textAlign: 'center', width: '90%', alignSelf: 'center', marginTop: 20 }}
                            mode='outlined'
                            label={'Tipe barang'}
                            value={type}
                            onChangeText={(text) => setType(text)}
                        />

                        <Button mode='contained' style={{ width: '50%', alignSelf: 'center', marginTop: 30 }} onPress={() => { onSubmit() }}>
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
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 30 }}>
                                        <Text style={{ color: '#000', fontSize: 20, marginBottom: 10 }}>Nama barang</Text>
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>:</Text>
                                    </View>
                                    <View style={{ flex: 65 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>{selectedData[0]['nama_item']}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 30 }}>
                                        <Text style={{ color: '#000', fontSize: 20, marginBottom: 10 }}>Tipe</Text>
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>:</Text>
                                    </View>
                                    <View style={{ flex: 65 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>{selectedData[0]['type']}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 30 }}>
                                        <Text style={{ color: '#000', fontSize: 20, marginBottom: 10 }}>Ukuran</Text>
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>:</Text>
                                    </View>
                                    <View style={{ flex: 65 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>{selectedData[0]['ukuran']}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 30 }}>
                                        <Text style={{ color: '#000', fontSize: 20, marginBottom: 10 }}>Harga modal</Text>
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>:</Text>
                                    </View>
                                    <View style={{ flex: 65 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>{selectedData[0]['modal']}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 30 }}>
                                        <Text style={{ color: '#000', fontSize: 20, marginBottom: 10 }}>Harga ecer</Text>
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>:</Text>
                                    </View>
                                    <View style={{ flex: 65 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>{selectedData[0]['harga_ecer']}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>
                                    <View style={{ flex: 30 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>Harga grosir</Text>
                                    </View>
                                    <View style={{ flex: 5, alignItems: 'center' }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>:</Text>
                                    </View>
                                    <View style={{ flex: 65 }}>
                                        <Text style={{ color: '#000', fontSize: 20 }}>{selectedData[0]['harga_grosir']}</Text>
                                    </View>
                                </View>
                            </>
                        }

                        <View style={{ marginTop: 30, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <Appbar.Action icon="pencil" size={30} onPress={() => { editData() }} />
                            <Appbar.Action icon="trash-can-outline" size={30} onPress={() => { deleteData(undefined) }} />
                        </View>
                    </View>
                </Modal>
            </Portal>

            <View style={{ flex: 1, backgroundColor: '#fff' }}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <Header props={propsHeader} />
                    <Table props={propsTable} />
                </TouchableWithoutFeedback>
            </View>
        </>
    )
}

export default Index