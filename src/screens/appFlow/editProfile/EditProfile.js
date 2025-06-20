import React, { useCallback, useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, Pressable, BackHandler } from "react-native";
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, fontPixel, GOOGLE_API_KEY } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import Header from '../../../components/header'
import { Input } from '../../../components/input'
import { ImageProfileSelectandUpload } from '../../../common/HelpingFunc';
import { Loader } from '../../../components/loader/Loader';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import CountryInput from '../../../components/countryPicker/CountryPicker'
import CameraModal from '../../../components/cameraModal/CameraModal';
import { useCameraPermission } from 'react-native-vision-camera';
import DrivingLicense from '../../../components/drivingLicense/DrivingLicense';
import { useTheme } from '@react-navigation/native';

const EditProfile = (props) => {
    const { colors } = useTheme()
    const { requestPermission } = useCameraPermission()

    const [firstName, setFirsttName] = useState('')
    const [lastName, setLastName] = useState('')
    const [image, setImage] = useState('');
    const [address, setAddress] = useState('')
    const [dob, setDOB] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('1');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)

    // // Open Gellery to Pick Image
    // const openGallary = async () => {
    //     ImageProfileSelectandUpload((data, val) => {
    //         if (data) {
    //             setImage(data)
    //         }
    //     })
    // }

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

            <ScrollView style={{ flex: 1, margin: wp(4) }} showsVerticalScrollIndicator={false}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Edit Profile'} />

                <View style={styles.imageTopView}>
                    <View style={styles.imageView}>
                        <Image source={image !== '' ? { uri: image } : appImages.userImage} style={[styles.imageStyle, { resizeMode: 'cover' }]} />
                    </View>
                    <TouchableOpacity style={styles.editIconView} onPress={() => openCamera()}>
                        <Image source={appIcons.edit} style={styles.editIcon} />
                    </TouchableOpacity>
                </View>

                <View>
                    <Input
                        placeholder={'Dummy@gmail.com'}
                        value={firstName}
                        onChangeText={(value) => setFirsttName(value)}
                    >
                        First Name
                    </Input>

                    <Input
                        placeholder={'Dummy@gmail.com'}
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

                    <Input
                        placeholder={'Address Here'}
                        value={address}
                        onChangeText={(value) => setAddress(value)}
                        rightIcon
                        eyeValue={appIcons.location}
                    >
                        Address
                    </Input>
                </View>
            </ScrollView>

            <Button>Save Changes</Button>

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

export default EditProfile

const styles = StyleSheet.create({
    titleStyle: {
        paddingVertical: wp(2),
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsSemiBold,
        color: colors.blurBlack,
    },
    viewStyle: {
        backgroundColor: colors.wheatWhite,
        borderColor: colors.borderColor,
        borderWidth: 1,
        borderRadius: 50,
        height: wp(12),
        paddingHorizontal: wp(5),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    subtitle: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
        color: colors.secondaryBlack,
    },
    dotComponentActiveStyle: {
        width: wp(5),
        height: wp(5),
        borderRadius: 10,
        backgroundColor: colors.fullWhite,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: colors.primary,
    },
    dotComponentStyle: {
        width: wp(3.6),
        height: wp(3.6),
        borderRadius: 50,
    },
    mainTitle: {
        fontSize: hp(2),
        lineHeight: hp(3),
        fontFamily: fontFamily.PoppinsSemiBold,
        color: colors.blurBlack,
        textAlign: "center"
    },
    mainTitleDes: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
        color: colors.descriptionColor,
        textAlign: "center"
    },
    mainDes: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
        color: colors.bluishColor,
        marginTop: wp(4),
        textAlign: 'left'
    },
    imageTopView: {
        marginTop: hp(4),
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