import React, { useRef, useState } from 'react'
import { View, Text, Image, StyleSheet, StatusBar, Platform } from 'react-native'
import { colors, hp, fontFamily, wp, routes } from '../../../services'
import { appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import { useFocusEffect, useTheme } from '@react-navigation/native'
import { useSelector } from 'react-redux'

const OnBoarding = (props) => {
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)

    useFocusEffect(
        React.useCallback(() => {
            StatusBar.setTranslucent(true);
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setBarStyle(darModeValue ? 'light-content' : 'dark-content');

            return () => {
                StatusBar.setTranslucent(false);
                StatusBar.setBackgroundColor(colors.wheatWhite);
                StatusBar.setBarStyle(darModeValue ? 'light-content' : 'dark-content');
            };
        }, [])
    );

    return (
        <View style={[appStyles.safeContainer, { paddingTop: 0, backgroundColor: colors.wheatWhite }]}>
            {/* <StatusBar translucent backgroundColor='transparent' barStyle='dark-content' /> */}

            <Image source={appImages.dotsTop} style={styles.dotImageTop} />

            <View style={styles.backgroundImage}>
                <Image source={appImages.onboardImage} style={styles.imageLogo} />
            </View>

            <View style={{ marginLeft: wp(4), alignItems: "flex-start", justifyContent: "flex-start" }}>
                <Text style={[styles.mainTitle, { color: colors.fullBlack, width: wp(80), marginBottom: wp(4) }]}>Get The Car That Give You <Text style={{ color: colors.primary }}>Comfort</Text></Text>
                <Button containerStyle={{ width: wp(40) }} onPress={() => props.navigation.navigate(routes.selectedAccount)}>LETS GO</Button>
            </View>

            <Image source={appImages.dotsBottom} style={styles.dotImageBottom} />
        </View>
    )
}

export default OnBoarding

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        alignSelf: "flex-end",
    },
    imageLogo: {
        width: Platform.OS == 'android' ? wp(90) : wp(84),
        height: Platform.OS == 'android' ? hp(76) : hp(70),
        resizeMode: 'cover'
    },
    imageStyle: {
        width: wp(90),
        height: wp(80),
        resizeMode: 'contain',
    },
    dotImageTop: {
        width: wp(25),
        height: wp(25),
        resizeMode: 'contain',
        position: 'absolute',
        top: wp(10),
        left: 0
    },
    dotImageBottom: {
        width: wp(25),
        height: wp(25),
        resizeMode: 'contain',
        alignSelf: 'flex-end'
    },
    mainTitle: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: hp(3.2),
        lineHeight: hp(4.8),
    }
})