const BASE_URL = 'http://192.168.1.11:3000/'

const apiGetData = async () => {
    try {
        let response = await fetch(`${BASE_URL}api/data`, {
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

const apiUpdateData = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}api/data`, {
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

const apiDeleteData = async (data) => {
    try {
        let response = await fetch(`${BASE_URL}api/data`, {
            method: 'DELETE',
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

export {
    apiGetData,
    apiInsertData,
    apiUpdateData,
    apiDeleteData
} 