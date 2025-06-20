import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as Host from '../../../screens/hostFlow';

const HostHomeStack = createNativeStackNavigator();

export const HostHomeNavigation = () => {
    return (
        <HostHomeStack.Navigator initialRouteName={routes.home} screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <HostHomeStack.Screen name={routes.hostHome} component={Host.HostHome} />
        </HostHomeStack.Navigator>
    );
};
