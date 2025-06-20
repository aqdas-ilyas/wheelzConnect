import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, FlatList, Platform } from 'react-native'
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services'
import appStyles from '../../../services/utilities/appStyles'
import Header from '../../../components/header'
import { Input } from '../../../components/input'
import Button from '../../../components/button'
import CheckBox from '@react-native-community/checkbox';
import { useTheme } from '@react-navigation/native'

const DeleteAccount = (props) => {
    const { colors } = useTheme()
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Delete Account'} />

                <View style={[appStyles.row, { marginTop: wp(5) }]}>
                    <Image source={appImages.deleteAccount} style={styles.ImageStyle} />
                    <Text style={[styles.mainTitle, { marginLeft: wp(2) }]}>Delete your account will:</Text>
                </View>
                <View>
                    <Text style={[styles.mainDes, { color: colors.lable, marginTop: wp(3) }]}>We're sorry to see you go. If you're sure you want to delete your Flaky account, please be aware that this action is permanent and cannot be undone. All of your personal information, including your jokes and settings, will be permanently deleted.</Text>
                    <Text style={[styles.mainDes, { color: colors.lable, marginVertical: wp(3) }]}>If you're having trouble with your account or have concerns, please reach out to us at flaky@gmail.com before proceeding with the account deletion. We'd love to help you resolve any issues and keep you as a valued Flaky user.</Text>
                    <Text style={[styles.mainDes, { color: colors.lable }]}>To <Text style={{ color: '#B10B0B' }}>Delete</Text> your account, confirm your country code and enter your phone number.</Text>
                </View>

                <Input
                    placeholder={'••••••••••'}
                    secureTextEntry={showPassword}
                    onPressEye={() => setShowPassword(!showPassword)}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    eye={true}
                >
                    Password
                </Input>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', marginRight: wp(3), marginVertical: wp(3) }}>
                    <CheckBox
                        disabled={false}
                        onFillColor={colors.primary}
                        onCheckColor='white'
                        value={toggleCheckBox}
                        onValueChange={(newValue) => setToggleCheckBox(newValue)}
                        boxType='square'
                        onTintColor={colors.primary}
                        style={styles.checbox}
                        hitSlop={{ top: 10, bottom: 10, left: 0, right: 0 }}
                        tintColors={{ true: colors.primary, false: colors.inActiveText }} // Change tint colors if needed
                    />
                    <Text style={[styles.bottomText, { color: colors.placeholder, marginLeft: wp(3) }]}>By tapping confirm, you agree to the <Text style={{ color: colors.primary }}>terms of service</Text> and <Text style={{ color: colors.primary }}>privacy policy</Text> of App name</Text>
                </View>
            </View>

            <View style={[appStyles.ph20, appStyles.mb5]}>
                <Button onPress={() => props.navigation.navigate(routes.deletAccountOTP, { key: 'delete' })}>Delete Account</Button>
            </View>
        </View>
    )
}

export default DeleteAccount

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2),
        lineHeight: hp(3),
        fontFamily: fontFamily.PoppinsMedium,
        color: '#B10B0B',
    },
    mainDes: {
        fontSize: hp(1.5),
        lineHeight: hp(2.3),
        fontFamily: fontFamily.PoppinsRegular,
        textAlign: 'left'
    },
    ImageStyle: {
        width: wp(5),
        height: wp(5),
    },
    bottomText: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
        textAlign: 'left'
    },
    checbox: {
        height: Platform.OS == 'ios' ? heightPixel(15) : heightPixel(20),
        width: Platform.OS == 'ios' ? widthPixel(15) : widthPixel(30),
    },
})