const BASE_URL = 'https://denko-berjaya.vercel.app/'
// const BASE_URL = 'http://192.168.1.21:80/'

const apiGetData = async (limit, offset) => {
    try {
        let response = await fetch(`${BASE_URL}api/data?limit=${limit}&offset=${offset}`, {
            method: 'GET',
        })
        if (response.status !== 200) {
            let _res = await (response.json())
            throw _res
        } else {
            return await response.json()
        }
    } catch (err) {
        throw err
    }
}

const apiInsertData = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}api/data`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (response.status !== 200) {
            let _res = await (response.json())
            throw _res
        } else {
            return await response.json()
        }
    } catch (err) {
        throw err
    }
}

const apiUpdateData = async (paramId, data) => {
    try {
        let response = await fetch(`${BASE_URL}api/data/${paramId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (response.status !== 200) {
            let _res = await (response.json())
            throw _res
        } else {
            return await response.json()
        }
    } catch (err) {
        throw err
    }
}

const apiDeleteData = async (id) => {
    try {
        let response = await fetch(`${BASE_URL}api/data/${id}`, {
            method: 'DELETE',
        })
        if (response.status !== 200) {
            let _res = await (response.json())
            throw _res
        } else {
            return await response.json()
        }
    } catch (err) {
        throw err
    }
}

const apiFilterData = async (nama, ukuran, type, brand, sumberBarang, limit, offset) => {
    try {
        let response = await fetch(`${BASE_URL}api/data/?nama=${nama}&ukuran=${ukuran}&type=${type}&brand=${brand}&sumber_barang=${sumberBarang}&limit=${limit}&offset=${offset}`, {
            method: 'GET',
        })
        if (response.status !== 200) {
            let _res = await (response.json())
            throw _res
        } else {
            return await response.json()
        }
    } catch (err) {
        throw err
    }
}

const apiSignIn = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}api/user`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data)
        })
        if (response.status !== 200) {
            let _res = await (response.json())
            throw _res
        } else {
            return await response.json()
        }
    } catch (err) {
        throw err
    }
}

const apiGetDataSumber = async () => {
    try {
        let response = await fetch(`${BASE_URL}api/data_sumber`, {
            method: 'GET',
        })
        if (response.status !== 200) {
            let _res = await (response.json())
            throw _res
        } else {
            return await response.json()
        }
    } catch (err) {
        throw err
    }
}

export {
    apiGetData,
    apiInsertData,
    apiUpdateData,
    apiDeleteData,
    apiFilterData,
    apiSignIn,
    apiGetDataSumber
} 