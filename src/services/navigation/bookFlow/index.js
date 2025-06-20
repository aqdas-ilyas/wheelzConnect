import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as App from '../../../screens/appFlow';

const BookStack = createNativeStackNavigator();

export const BookNavigation = () => {
    return (
        <BookStack.Navigator initialRouteName={routes.book} screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <BookStack.Screen name={routes.book} component={App.Book} />
        </BookStack.Navigator>
    );
};
