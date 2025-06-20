import React, { useEffect, useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView, TouchableOpacity, I18nManager, FlatList, Alert, StatusBar } from 'react-native'
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, emailFormat, passwordFormat } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import { Input } from '../../../components/input'
import { Loader } from '../../../components/loader/Loader'
import CheckBox from '@react-native-community/checkbox';
import AuthHeader from '../../../components/authHeader/AuthHeader'
import { useTheme } from '@react-navigation/native'

export default function SignUp(props) {
    const { colors } = useTheme()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Loader loading={isLoading} />

                <AuthHeader appLogo leftIcon onleftIconPress={() => props.navigation.goBack()} />

                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: wp(10) }}>
                    <View>
                        <Text style={styles.mainTitle}>Sign Up</Text>
                        <View>
                            <Input
                                placeholder={'Dummy@gmail.com'}
                                value={email}
                                onChangeText={(value) => setEmail(value)}
                                leftIcon={appIcons.message}
                            >
                                Email
                            </Input>

                            <Input
                                placeholder={'●●●●●●●'}
                                secureTextEntry={showPassword}
                                onPressEye={() => setShowPassword(!showPassword)}
                                value={password}
                                onChangeText={(value) => setPassword(value)}
                                eye={true}
                                leftIcon={appIcons.password}
                            >
                                Password
                            </Input>

                            <Input
                                placeholder={'●●●●●●●'}
                                secureTextEntry={showConfirmPassword}
                                onPressEye={() => setShowConfirmPassword(!showConfirmPassword)}
                                value={confirmPassword}
                                onChangeText={(value) => setConfirmPassword(value)}
                                eye={true}
                                leftIcon={appIcons.password}
                            >
                                Confirm Password
                            </Input>
                        </View>
                    </View>

                    <View>
                        <Button onPress={() => props.navigation.navigate(routes.otp, { email: email.toLowerCase(), key: 'auth' })}>Sign Up</Button>

                        <Text style={[styles.orTextStyle, { color: colors.secondaryBlack }]}>OR</Text>

                        <View style={[appStyles.rowCenter, appStyles.mt20, { alignItems: 'center' }]}>
                            <TouchableOpacity style={[styles.socialLoginTopView]}>
                                <Image source={appIcons.apple} style={[styles.socialIconStyle]} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.socialLoginTopView}>
                                <Image source={appIcons.google} style={[styles.socialIconStyle]} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.socialLoginTopView}>
                                <Image source={appIcons.facebook} style={[styles.socialIconStyle]} />
                            </TouchableOpacity>
                        </View>


                        <View style={[appStyles.rowCenter, appStyles.mt30]}>
                            <Text style={[styles.dontAccountTextStyle, { color: colors.secondaryBlack }]}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate(routes.login)}>
                                <Text style={styles.dontAccountSignUpTextStyle}>SIGN IN</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
        color: colors.primary,
    },
    orTextStyle: {
        textAlign: 'center',
        fontSize: hp(2.4),
        lineHeight: hp(3.6),
        fontFamily: fontFamily.PoppinsMedium,
        marginVertical: wp(2)
    },
    dontAccountTextStyle: {
        fontSize: hp(1.6),
        lineHeight: hp(1.8),
        fontFamily: fontFamily.PoppinsRegular,
    },
    dontAccountSignUpTextStyle: {
        fontSize: hp(1.6),
        lineHeight: hp(1.8),
        fontFamily: fontFamily.PoppinsRegular,
        color: colors.primary,
        textDecorationLine: 'underline'
    },
    socialLoginTopView: {
        borderRadius: 25,
        marginHorizontal: wp(4)
    },
    socialIconStyle: {
        width: wp(16),
        height: wp(16),
        resizeMode: 'contain',
    },
})