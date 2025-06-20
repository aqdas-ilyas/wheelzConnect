import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as Host from '../../../screens/hostFlow';

const VehicleStack = createNativeStackNavigator();

export const VehicleNavigation = () => {
    return (
        <VehicleStack.Navigator initialRouteName={routes.home} screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <VehicleStack.Screen name={routes.vehicle} component={Host.MyVehicle} />
        </VehicleStack.Navigator>
    );
};
