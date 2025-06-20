import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, fontPixel, GOOGLE_API_KEY, emailFormat } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import { Input } from '../../../components/input'
import { ImageProfileSelectandUpload } from '../../../common/HelpingFunc';
import CountryInput from '../../../components/countryPicker/CountryPicker'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { Loader } from '../../../components/loader/Loader';
import AuthHeader from '../../../components/authHeader/AuthHeader';
import CameraModal from '../../../components/cameraModal/CameraModal';
import { useCameraPermission } from 'react-native-vision-camera';
import { useTheme } from '@react-navigation/native';
import { useSelector } from 'react-redux';

const CreateProfile = (props) => {
    const seletAccount = useSelector(state => state.user.seletAccount)

    const { requestPermission } = useCameraPermission()
    const { colors } = useTheme()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState('');
    const [dob, setDOB] = useState('');
    const [address, setAddress] = useState('');

    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('966');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    const openCamera = async () => {
        const response = await requestPermission();
        console.log("openCamera response: ", response)
        if (response) {
            setModalShow(true)
        }
    }

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />

            <ScrollView keyboardShouldPersistTaps={"always"} bounces={false} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ margin: wp(4) }}>
                    <AuthHeader appLogo leftIcon onleftIconPress={() => props.navigation.goBack()} />

                    <Text style={[styles.mainTitle, { color: colors.primary, marginTop: wp(8), marginBottom: wp(2) }]}>Complete Profile</Text>

                    <View style={styles.imageTopView}>
                        <View style={styles.imageView}>
                            <Image source={image !== '' ? { uri: image } : appIcons.profile1} style={[styles.imageStyle, { resizeMode: 'cover' }]} />
                        </View>
                        <TouchableOpacity style={styles.editIconView} onPress={() => openCamera()}>
                            <Image source={appIcons.edit} style={styles.editIcon} />
                        </TouchableOpacity>
                    </View>

                    <View>
                        <Input
                            placeholder={'Given Name'}
                            value={firstName}
                            onChangeText={(value) => setFirstName(value)}
                        >
                            First Name
                        </Input>

                        <Input
                            placeholder={'Surname'}
                            value={lastName}
                            onChangeText={(value) => setLastName(value)}
                        >
                            Last Name
                        </Input>

                        <Input
                            editable={false}
                            placeholder={'mm/dd/yyyy'}
                            value={dob}
                            rightIcon
                            onPressIcon={() => setShowDatePicker(true)}
                            eyeValue={appIcons.calender}
                            rightIconColor={colors.primaryColor}
                            touchable
                        >
                            Date Of Birth
                        </Input>

                        <CountryInput placeholder={'Phone Number'} phoneNumber={phoneNumber} setValue={setPhoneNumber} setSelectedCode={setCountryCode} layout={'first'} />
                    </View>
                </View>
            </ScrollView>

            <Button onPress={() => props.navigation.navigate(routes.addAddress)}>Continue</Button>

            <DatePicker
                modal
                open={showDatePicker}
                date={new Date()}
                mode='date'
                onConfirm={(date) => {
                    const formattedDate = moment(date).format('DD/MM/YYYY');
                    console.log("formattedDate: ", formattedDate);
                    setDOB(formattedDate)
                    setShowDatePicker(false)
                }}
                onCancel={() => {
                    setShowDatePicker(false)
                }}
            />

            <CameraModal
                modalShow={modalShow}
                setModalVisible={() => setModalShow(!modalShow)}
                setImage={(e) => setImage(e)}
            />
        </View>
    )
}

export default CreateProfile

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    imageTopView: {
        marginTop: hp(3),
        marginBottom: wp(2),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    imageView: {
        width: wp(25),
        height: wp(25),
        borderRadius: widthPixel(100),
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: widthPixel(100)
    },
    editIconView: {
        width: widthPixel(32),
        position: 'absolute',
        bottom: 2,
        right: widthPixel(2),
        height: widthPixel(32),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: widthPixel(23),
    },
    editIcon: {
        width: widthPixel(30),
        height: widthPixel(30),
        resizeMode: 'contain',
    },
})