import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable } from 'react-native-paper';


const Table = ({ props }) => {

    const [page, setPage] = useState(0);

    const modalObject = [
        {
            modal_name: "nama_item",
            title_name: "Nama item",
            show_on_table: true,
            column_width: 45
        },
        {
            modal_name: "ukuran",
            title_name: "Ukuran",
            show_on_table: true,
            column_width: 10
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
        {
            modal_name: "harga_grosir",
            title_name: "Grosir",
            show_on_table: true,
            column_width: 15
        },
    ]

    const changePage = (page) => {
        setPage(page)
        props.setParamData({ ...props.paramData, offset: (page * props.paramData.limit) })
    }

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
            {
                props.data?.length ?
                    <DataTable style={{ paddingBottom: 20, maxHeight: '87%' }}>
                        <View style={{ height: '100%' }}>
                            <ScrollView
                                refreshControl={
                                    <RefreshControl
                                        refreshing={props.refreshing}
                                        onRefresh={props.onRefresh}
                                    />
                                }
                            >
                                {
                                    props.data?.map((item, index) => {
                                        return (
                                            <DataTable.Row key={index} style={{ paddingHorizontal: 0 }} onPress={() => {
                                                props.setSelectedData([item])
                                                props.setShowModalDetails(true)
                                            }}>
                                                {
                                                    modalObject.map((value, key) => {
                                                        return (
                                                            <DataTable.Cell key={key} style={{ flex: value.column_width, alignItems: 'center', justifyContent: 'center' }}>
                                                                <Text style={{ fontSize: 12 }}>
                                                                    {item[value.modal_name]}
                                                                </Text>
                                                            </DataTable.Cell>
                                                        )
                                                    })
                                                }
                                            </DataTable.Row>
                                        )
                                    })
                                }
                            </ScrollView>

                            {
                                !props.hidePagination &&
                                <DataTable.Pagination
                                    page={page}
                                    numberOfPages={Math.ceil(parseInt(props.totalData) / props.paramData.limit)}
                                    onPageChange={(page) => changePage(page)}
                                    label={`${page + 1} / ${Math.ceil(parseInt(props.totalData) / parseInt(props.paramData.limit))}`}
                                    style={{ justifyContent: 'center' }}
                                    showFastPaginationControls
                                    selectPageDropdownLabel={'Item per page'}
                                // numberOfItemsPerPageList={numberOfItemsPerPageList}
                                // numberOfItemsPerPage={numberOfItemsPerPage}
                                // onItemsPerPageChange={onItemsPerPageChange}
                                />
                            }
                        </View>
                    </DataTable>
                    :
                    <>
                        <ScrollView
                            refreshControl={
                                <RefreshControl
                                    refreshing={props.refreshing}
                                    onRefresh={props.onRefresh}
                                />
                            }
                        >
                        </ScrollView>
                    </>
            }
        </>
    )
}

export default Table