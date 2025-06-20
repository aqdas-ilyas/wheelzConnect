import React, { useEffect, useState } from 'react';
import { EventRegister } from 'react-native-event-listeners';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { colors, routes } from '..';
import { AuthNavigation } from './authFlow';
import themeContext from '../config/themeContext';
import { TabNavigation } from './tabFlow';
import * as App from '../../screens/appFlow';
import * as Auth from '../../screens/authFlow';
import * as Host from '../../screens/hostFlow';
import DarkTheme from '../config/DarkTheme'
import DefaultTheme from '../config/DefaultTheme'
import { useDispatch, useSelector } from 'react-redux';
import { _saveDarkMode } from '../../store/reducers/userDataSlice';
import { Appearance } from 'react-native';
import { HostTabNavigation } from './hostTabFlow';

const MyStack = createNativeStackNavigator();

export const MainNavigator = () => {
  const darModeValue = useSelector(state => state.user.darkMode)
  const dispatch = useDispatch()

  useEffect(() => {
    const appearanceListener = ({ colorScheme }) => {
      dispatch(_saveDarkMode(colorScheme == 'dark' ? true : false))
    };

    const appearanceListe = Appearance.addChangeListener(appearanceListener);

    return () => {
      appearanceListe.remove()
    };
  });

  return (
    <themeContext.Provider value={darModeValue}>
      <NavigationContainer theme={darModeValue ? DarkTheme : DefaultTheme}>
        <MyStack.Navigator initialRouteName={routes.auth} screenOptions={{ headerShown: false, gestureEnabled: false }}>
          <MyStack.Screen name={routes.auth} component={AuthNavigation} />
          <MyStack.Screen name={routes.tab} component={TabNavigation} />
          <MyStack.Screen name={routes.hostTab} component={HostTabNavigation} />
          <MyStack.Screen name={routes.message} component={App.Message} />
          <MyStack.Screen name={routes.changePassword} component={App.ChangePassword} />
          <MyStack.Screen name={routes.privacy} component={App.Privacy} />
          <MyStack.Screen name={routes.term} component={App.Terms} />
          <MyStack.Screen name={routes.aboutApp} component={App.AboutApp} />
          <MyStack.Screen name={routes.helpCenter} component={App.HelpCenter} />

          <MyStack.Screen name={routes.deletAccount} component={App.DeleteAccount} />
          <MyStack.Screen name={routes.deletAccountOTP} component={App.DeleteAccountOTP} />

          <MyStack.Screen name={routes.review} component={App.AddReview} />
          <MyStack.Screen name={routes.myReview} component={App.MyReviews} />

          <MyStack.Screen name={routes.history} component={App.History} />
          <MyStack.Screen name={routes.historyDetail} component={App.HistoryDetail} />

          <MyStack.Screen name={routes.viewProfile} component={App.ViewProfile} />
          <MyStack.Screen name={routes.editProfile} component={App.EditProfile} />

          <MyStack.Screen name={routes.notification} component={App.Notification} />
          <MyStack.Screen name={routes.checkout} component={App.Checkout} />

          <MyStack.Screen name={routes.carDetail} component={App.CarDetail} />
          <MyStack.Screen name={routes.rentalTermsAndConditions} component={App.RentalTermsAndConditions} />
          <MyStack.Screen name={routes.bookACar} component={App.BookACar} />
          <MyStack.Screen name={routes.currency} component={App.Currency} />

          {/***************** Request Detail *********************** */}
          <MyStack.Screen name={routes.requestDetail} component={Host.RequestDetail} />
          <MyStack.Screen name={routes.requestProfile} component={Host.RequestProfile} />
          <MyStack.Screen name={routes.ReservedCarDetail} component={Host.ReservedCarDetail} />
          <MyStack.Screen name={routes.myVehicleDetail} component={Host.MyVehicleDetail} />
          <MyStack.Screen name={routes.addVehicle} component={Host.AddVehicle} />
          <MyStack.Screen name={routes.addVehicleAvailability} component={Host.AddVehicleAvailability} />
          <MyStack.Screen name={routes.addAccessories} component={Host.AddAccessories} />
          <MyStack.Screen name={routes.addVehicleTermsCondition} component={Host.AddVehicleTermsCondition} />
          <MyStack.Screen name={routes.moreInfo} component={Host.MoreInfo} />
          <MyStack.Screen name={routes.insurance} component={Host.Insurance} />
          <MyStack.Screen name={routes.uploadDocument} component={Host.UploadDocument} />
        </MyStack.Navigator>
      </NavigationContainer>
    </themeContext.Provider>
  );
};
