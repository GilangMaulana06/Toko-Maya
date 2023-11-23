import { View, Text, ScrollView, RefreshControl, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'react-native-paper';
import { formatCurrency } from "react-native-format-currency";


const Table = ({ props }) => {
    const regex = /^\d+$/

    const modalObject = [
        {
            modal_name: "sumber_barang",
            title_name: "Src",
            show_on_table: true,
            column_width: 10
        },
        {
            modal_name: "nama_item",
            title_name: "Nama item",
            show_on_table: true,
            column_width: 35
        },
        {
            modal_name: "ukuran",
            title_name: "Ukuran",
            show_on_table: true,
            column_width: 10
        },
        {
            modal_name: "brand",
            title_name: "Brand",
            show_on_table: true,
            column_width: 15
        },
        {
            modal_name: "modal",
            title_name: "Modal",
            show_on_table: true,
            column_width: 15
        },
        {
            modal_name: "harga_ecer",
            title_name: "Ecer",
            show_on_table: true,
            column_width: 15
        },
    ]

    return (
        <>
            <DataTable>
                {/* HEADER */}
                <DataTable.Header style={{ paddingHorizontal: 0, marginBottom: 5 }}>
                    {
                        modalObject.map((value, key) => {
                            return (
                                <DataTable.Title key={key} style={{ flex: value.column_width, alignItems: 'center', justifyContent: 'center', backgroundColor: '#ddd' }}>
                                    <Text style={{ fontSize: 13, fontWeight: 'bold' }}>
                                        {value.title_name}
                                    </Text>
                                </DataTable.Title>
                            )
                        })
                    }
                </DataTable.Header>
            </DataTable>

            {/* BODY */}
            <DataTable style={{ paddingBottom: 20, maxHeight: '87%' }}>
                <View style={{ height: '100%' }}>
                    <FlatList
                        renderToHardwareTextureAndroid={true}
                        refreshControl={
                            <RefreshControl
                                refreshing={props.refreshing}
                                onRefresh={props.onRefresh}
                            />
                        }
                        data={props.data}
                        renderItem={({ item }) => {
                            return (
                                <DataTable.Row style={{ paddingHorizontal: 0 }} onPress={() => {
                                    props.setSelectedData([item])
                                    props.setShowModalDetails(true)
                                }}>
                                    {
                                        modalObject.map((value, key) => {
                                            return (
                                                <DataTable.Cell key={key} style={{ flex: value.column_width, alignItems: 'center', justifyContent: 'center' }}>
                                                    <Text style={{ fontSize: 12, fontWeight: value.modal_name === 'sumber_barang' ? 'bold' : 'normal' }}>
                                                        {
                                                            value.modal_name === 'ukuran' ?
                                                                item[value.modal_name]
                                                                :
                                                                value.modal_name === 'sumber_barang' ?
                                                                    item[value.modal_name] === '-' ? '' : item[value.modal_name]
                                                                    :
                                                                    regex.test(item[value.modal_name]) ? formatCurrency({ amount: Number(item[value.modal_name]), code: 'IDR' })[1] : item[value.modal_name]
                                                        }
                                                    </Text>
                                                </DataTable.Cell>
                                            )
                                        })
                                    }
                                </DataTable.Row>
                            )
                        }}
                    />
                </View>
            </DataTable>
        </>
    )
}

export default Table