import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import SplashScreen from './SplashScreen'
import AppNavigator from './AppNavigator'

const IndexNavigation = () => {
    const [isLoadingSplash, setIsLoadingSplash] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoadingSplash(false)
        }, 2000);
    }, [])

    return (
        <>
            {
                isLoadingSplash ?
                    <SplashScreen />
                    :
                    <AppNavigator />
            }
        </>
    )
}

export default IndexNavigation