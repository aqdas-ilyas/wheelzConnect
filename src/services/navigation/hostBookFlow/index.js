import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as Host from '../../../screens/hostFlow';

const HostBookStack = createNativeStackNavigator();

export const HostBookNavigation = () => {
    return (
        <HostBookStack.Navigator initialRouteName={routes.book} screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <HostBookStack.Screen name={routes.hostBook} component={Host.HostBooking} />
        </HostBookStack.Navigator>
    );
};