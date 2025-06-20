import React from 'react';
import { SafeAreaView, LogBox, View, Platform, StatusBar, Text } from 'react-native';
import { persistStore } from 'redux-persist';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import FlashMessage from 'react-native-flash-message';
import { colors, MainNavigator } from './src/services';
import { store } from './src/store/store';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  let persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <StatusBar barStyle={'dark-content'} backgroundColor={colors.wheatWhite} />

        {
          Platform.OS === 'ios' ?
            <View style={{ flex: 1 }}>
              <MainNavigator />
            </View>
            :
            <SafeAreaView style={{ flex: 1 }}>
              <MainNavigator />
            </SafeAreaView>
        }
        <FlashMessage position='bottom' />
      </PersistGate>
    </Provider>
  );
};

export default App;