import React from 'react'
import { Image, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { appImages, colors, fontFamily, hp, routes, wp } from '../../../services'
import Button from '../../../components/button'
import appStyles from '../../../services/utilities/appStyles'
import { useTheme } from '@react-navigation/native'
import { useDispatch, useSelector } from 'react-redux'
import { _saveSelectAccount } from '../../../store/reducers/userDataSlice'

export default function SelectAccount(props) {
    const { colors } = useTheme()
    const dispatch = useDispatch()
    const darModeValue = useSelector(state => state.user.darkMode)

    const selectedUserAccount = (str) => {
        console.log("User Account: ", str)
        dispatch(_saveSelectAccount(str))
        props.navigation.navigate(routes.register)
    }

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Image source={darModeValue ? appImages.splashLogo : appImages.appLogo} style={styles.imageLogo} />

                <Text style={[styles.mainTitle, { marginVertical: wp(5) }]}>Select Account Type</Text>

                <Text style={[styles.mainDesc, { color: colors.lable }]}>Lorem ipsum dolor sit amet consectetur. At id in quis nunc nunc nunc. Hendrerit.</Text>

                <View style={{ marginTop: wp(10) }}>
                    <Button containerStyle={{ borderRadius: 50 }} onPress={() => selectedUserAccount('user')}>BOOK A CAR</Button>
                    <Text style={[styles.ORTEXT, { color: colors.secondaryBlack, marginVertical: wp(5) }]}>OR</Text>
                    <Button skip borderWidth={1.5} containerStyle={{ borderRadius: 50 }} onPress={() => selectedUserAccount('host')}>HOST (VEHICLE OWNER)</Button>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageLogo: {
        width: wp(45),
        height: wp(26.5),
        alignSelf: 'center',
        marginVertical: wp(5),
    },
    mainTitle: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        color: colors.primary
    },
    mainDesc: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
    },
    ORTEXT: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: hp(2.5),
        lineHeight: hp(3.1),
        textAlign: 'center'
    },
})