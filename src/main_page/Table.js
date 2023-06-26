import { View, Text, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { DataTable, Searchbar } from 'react-native-paper';

const numberOfItemsPerPageList = [2, 3, 4];

const Table = ({ props }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const [searchQuery, setSearchQuery] = React.useState('');

    const [page, setPage] = React.useState(0);
    const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(numberOfItemsPerPageList[0]);
    const from = page * numberOfItemsPerPage;
    const to = Math.min((page + 1) * numberOfItemsPerPage, props.data.length)

    React.useEffect(() => {
        setPage(0);
    }, [numberOfItemsPerPage]);

    const modalObject = [
        {
            modal_name: "nama_item",
            title_name: "Nama item",
            show_on_table: true,
            column_width: 30
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
            column_width: 20
        },
        {
            modal_name: "harga_ecer",
            title_name: "Ecer",
            show_on_table: true,
            column_width: 20
        },
        {
            modal_name: "harga_grosir",
            title_name: "Grosir",
            show_on_table: true,
            column_width: 20
        },
    ]

    const onRefresh = () => {
        console.log('refresh')
        setRefreshing(true);
        setTimeout(() => {
            props.getData()
            setRefreshing(false)
        }, 300)
    }

    return (
        <>
            {
                props.showSearchBar &&
                <Searchbar
                    placeholder="Search"
                    autoFocus={true}
                    onChangeText={(query) => setSearchQuery(query)}
                    value={searchQuery}
                    style={{ backgroundColor: '#fff', marginBottom: 1 }}
                />
            }
            <DataTable>
                {/* HEADER */}
                <DataTable.Header style={{ paddingHorizontal: 0, marginBottom: 5, minHeight: '7%', }}>
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

                {/* BODY */}
                <View style={{ height: props.showSearchBar ? '80%' : '75%' }}>
                    <ScrollView
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={onRefresh}
                            />
                        }
                    >
                        {
                            props.data &&
                            props.data.map((item, index) => {
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
                </View>

                {
                    !props.showSearchBar &&
                    <DataTable.Pagination
                        style={{ justifyContent: 'center', backgroundColor: '#ddd' }}
                        page={page}
                        numberOfPages={Math.ceil(props.data.length / numberOfItemsPerPage)}
                        onPageChange={page => setPage(page)}
                        label={`${from + 1}-${to} of ${props.data.length}`}
                        showFastPaginationControls
                        numberOfItemsPerPageList={numberOfItemsPerPageList}
                        numberOfItemsPerPage={numberOfItemsPerPage}
                        onItemsPerPageChange={onItemsPerPageChange}
                        selectPageDropdownLabel={'Item per halaman'}
                    />
                }
            </DataTable>
        </>
    )
}

export default Table