import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as App from '../../../screens/appFlow';

const ChatStack = createNativeStackNavigator();

export const ChatNavigation = () => {
    return (
        <ChatStack.Navigator initialRouteName={routes.chat} screenOptions={{ headerShown: false, gestureEnabled: false }}>
            <ChatStack.Screen name={routes.chat} component={App.Chat} />
        </ChatStack.Navigator>
    );
};
