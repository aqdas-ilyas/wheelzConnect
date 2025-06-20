import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, SafeAreaView } from 'react-native'
import { colors, hp, fontFamily, wp } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import Header from '../../../components/header'
import { Input } from '../../../components/input'
import CallModal from '../../../components/modal'
import { Loader } from '../../../components/loader/Loader'
import { useTheme } from '@react-navigation/native'

const ChangePassword = (props) => {
    const { colors } = useTheme()
    const [currentPassword, setCurrentPassword] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(true)
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(true)
    const [confirmPassword, setConfirmPassword] = useState('')
    const [showConfirmPassword, setShowConfirmPassword] = useState(true)
    const [isLoading, setIsLoading] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Change Password'} />
                <Input
                    placeholder={'••••••••••'}
                    secureTextEntry={showCurrentPassword}
                    onPressEye={() => setShowCurrentPassword(!showCurrentPassword)}
                    value={currentPassword}
                    onChangeText={(value) => setCurrentPassword(value)}
                    eye={true}
                >
                    Current Password
                </Input>

                <Input
                    placeholder={'••••••••••'}
                    secureTextEntry={showPassword}
                    onPressEye={() => setShowPassword(!showPassword)}
                    value={password}
                    onChangeText={(value) => setPassword(value)}
                    eye={true}
                >
                    New Password
                </Input>

                <Input
                    placeholder={'••••••••••'}
                    secureTextEntry={showConfirmPassword}
                    onPressEye={() => setShowConfirmPassword(!showConfirmPassword)}
                    value={confirmPassword}
                    onChangeText={(value) => setConfirmPassword(value)}
                    eye={true}
                >
                    Confirm Password
                </Input>
            </View>


            <Button>Save Changes</Button>
        </View>
    )
}

export default ChangePassword