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
import { useSelector } from 'react-redux'

const SignIn = (props) => {
    const { colors } = useTheme()
    const seletAccount = useSelector(state => state.user.seletAccount)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <View style={{ flex: 1, margin: wp(4) }}>
                <Loader loading={isLoading} />

                <AuthHeader appLogo />

                <View style={{ flex: 1, justifyContent: 'space-between', marginTop: wp(10) }}>
                    <View>
                        <Text style={[styles.mainTitle, { color: colors.primary }]}>Sign In</Text>
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
                        </View>

                        <View style={[appStyles.rowBtw, { marginVertical: wp(5) }]}>
                            <View style={appStyles.rowCenter}>
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
                                <Text style={[styles.rememberMe, { color: colors.lable }]}>
                                    Remember me
                                </Text>
                            </View>

                            <TouchableOpacity onPress={() => props.navigation.navigate(routes.forgotPassword)}>
                                <Text style={[styles.forgotPassword, { color: colors.lable }]}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Button onPress={() => seletAccount == 'user' ? props.navigation.navigate(routes.tab) : props.navigation.navigate(routes.hostTab)}>Sign In</Button>

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
                            <Text style={[styles.dontAccountTextStyle, { color: colors.secondaryBlack }]}>Don’t have an account? </Text>
                            <TouchableOpacity onPress={() => props.navigation.navigate(routes.register)}>
                                <Text style={[styles.dontAccountSignUpTextStyle, { color: colors.primary }]}>SIGN UP</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

export default SignIn

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    forgotPassword: {
        fontSize: hp(1.4),
        fontFamily: fontFamily.PoppinsRegular,
    },
    checbox: {
        height: Platform.OS == 'ios' ? heightPixel(15) : heightPixel(20),
        width: Platform.OS == 'ios' ? widthPixel(15) : widthPixel(30),
    },
    rememberMe: {
        fontSize: hp(1.4),
        fontFamily: fontFamily.PoppinsRegular,
        marginLeft: wp(2)
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