import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { routes } from '../../constants';
import * as Auth from '../../../screens/authFlow';

const AuthStack = createNativeStackNavigator();

export const AuthNavigation = () => {
  return (
    <AuthStack.Navigator initialRouteName={routes.splash} screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <AuthStack.Screen name={routes.splash} component={Auth.Splash} />
      <AuthStack.Screen name={routes.selectedLanguage} component={Auth.SelectLanguage} />
      <AuthStack.Screen name={routes.onboard} component={Auth.OnBoarding} />
      <AuthStack.Screen name={routes.selectedAccount} component={Auth.SelectAccount} />

      <AuthStack.Screen name={routes.login} component={Auth.SignIn} />
      <AuthStack.Screen name={routes.forgotPassword} component={Auth.ForgetPassword} />
      <AuthStack.Screen name={routes.resetPassword} component={Auth.ResetPassword} />
      <AuthStack.Screen name={routes.otp} component={Auth.SendOtp} />

      <AuthStack.Screen name={routes.register} component={Auth.SignUp} />
      <AuthStack.Screen name={routes.createProfile} component={Auth.CreateProfile} />
      <AuthStack.Screen name={routes.addAddress} component={Auth.AddAddress} />
    </AuthStack.Navigator>
  );
};
