import React from 'react'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { theme } from './theme';

import Main from './src/main_page/Index';
import Form from './src/form/Index';

const Nav = createAppContainer(
    createStackNavigator({
        Main,
        Form
    },
        {
            initialRouteName: 'Main', defaultNavigationOptions: { header: () => false }
        })
)

const AppNavigator = () => {
    return (
        <PaperProvider theme={theme}>
            <Nav />
        </PaperProvider>
    )
}

export default AppNavigator