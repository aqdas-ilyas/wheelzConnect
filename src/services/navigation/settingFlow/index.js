import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as App from '../../../screens/appFlow';

const SettingStack = createNativeStackNavigator();

export const SettingNavigation = () => {
    return (
        <SettingStack.Navigator initialRouteName={routes.setting} screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <SettingStack.Screen name={routes.setting} component={App.Setting} />
        </SettingStack.Navigator>
    );
};
