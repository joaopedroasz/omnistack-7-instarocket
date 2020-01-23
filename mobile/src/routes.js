import React from 'react';
import { View, Image } from 'react-native';
import {
  createAppContainer
} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import logo from './assets/logo.png';

import Feed from './pages/Feed';
import New from './pages/New';

// Configurando rotas da aplicação com os componentes 'createAppContainer' e 'createSwitchNavigator'.
export default createAppContainer(
  createStackNavigator({
    Feed,
    New
  }, {
    defaultNavigationOptions: {
      headerTintColor: '#000',
      headerTitle: () => <Image source={logo} />,
      headerBackTitle: null,
    },
    mode: 'modal'
  })
);