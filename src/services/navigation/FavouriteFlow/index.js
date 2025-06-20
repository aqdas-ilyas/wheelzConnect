import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as App from '../../../screens/appFlow';

const FavoriteStack = createNativeStackNavigator();

export const FavoriteNavigation = () => {
    return (
        <FavoriteStack.Navigator initialRouteName={routes.favorite} screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <FavoriteStack.Screen name={routes.favorite} component={App.Favorite} />
        </FavoriteStack.Navigator>
    );
};
