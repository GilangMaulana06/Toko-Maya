import React, { useState, createContext } from 'react';
import { Alert, AsyncStorage } from 'react-native';
import { apiSignIn } from '../api/api';

export const Context = createContext();

export const ContextProvider = ({ children }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(undefined)
    const [error, setError] = useState(null);

    const onLogin = async (email, password) => {
        console.log('LOGIN')
        setIsLoading(true);
        const user = {
            email: email,
            password: password,
        }

        try {
            const res = await apiSignIn(user)
            await AsyncStorage.setItem('@token', true)
            setTimeout(() => {
                setIsLoading(false)
            }, 500)
            return true
        } catch (e) {
            setIsLoading(false)
            setError(error)
            throw e
        }
    }

    return (
        <Context.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated: async (par_data) => setIsAuthenticated(par_data),
                isLoading,
                error,
                onLogin,
            }}
        >
            {children}
        </Context.Provider>
    )
}

export default Context