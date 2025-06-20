import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, Pressable } from "react-native";
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, fontPixel, GOOGLE_API_KEY, emailFormat } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import { Input } from '../../../components/input'
import { ImageProfileSelectandUpload } from '../../../common/HelpingFunc';
import CountryInput from '../../../components/countryPicker/CountryPicker'
import { LocalizationContext } from '../../../language/LocalizationContext'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { Loader } from '../../../components/loader/Loader';
import { useDispatch, useSelector } from 'react-redux';
import AuthHeader from '../../../components/authHeader/AuthHeader';
import FullModal from '../../../components/fullModal/FullModal';
import DrivingLicense from '../../../components/drivingLicense/DrivingLicense';
import { useTheme } from '@react-navigation/native';
import { useCameraPermission } from 'react-native-vision-camera';
import { FetchCountryFlag } from '../../../services/helpingMethods';
import PassportModal from '../../../components/passportModal/PassportModal';

export default function AddAddress(props) {
    const seletAccount = useSelector(state => state.user.seletAccount)

    const { colors } = useTheme()
    const { requestPermission } = useCameraPermission()
    const [address, setAddress] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [city, setCity] = useState('')
    const [facebookURL, setFacebookURL] = useState('')
    const [whatsPhoneNumber, setWhatsPhoneNumber] = useState('');
    const [countryCodeWhatsApp, setCountryCodeWhatsApp] = useState('966');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [countryCode, setCountryCode] = useState('966');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const [modalShow, setModalShow] = useState(false)
    const [drivingModal, setDrivingModal] = React.useState(false)
    const [passportModal, setPassportModal] = React.useState(false)

    const [countryFlagArray, setCountryFlagArray] = useState(FetchCountryFlag)
    const [country, setCountry] = useState(FetchCountryFlag[0])
    const [countryFlagModel, setCountryFlagModel] = useState(false);

    const [userType, setUserType] = useState([
        { id: 1, title: 'Self Drive', checked: true },
        { id: 2, title: 'With Driver', checked: false },
        { id: 3, title: 'Tour Package w/ Driver', checked: false },
    ]);
    const [cuntryModel, setCountryModel] = useState(false);

    const handleCheckboxChange = (checkboxId) => {
        const updatedCheckboxes = userType.map((checkbox) =>
            checkbox.id === checkboxId ? { ...checkbox, checked: !checkbox.checked } : checkbox
        );

        setUserType(updatedCheckboxes);
    };

    const openCamera = async () => {
        const response = await requestPermission();
        console.log("openCamera response: ", response)
        if (response) {
            if (country?.title == 'Philippines') {
                setDrivingModal(true)
            } else {
                setPassportModal(true)
            }
        }
    }

    useEffect(() => {
        const fetchCountryFlags = async () => {
            try {
                const listArray = FetchCountryFlag.map((item, index) => ({
                    id: index + 1,
                    title: item.name,
                    code: item.code,
                    flag: item.flag
                }));

                setCountryFlagArray(listArray);

                const fetchCountry = listArray.find(item => item.title === 'Philippines');
                if (fetchCountry) {
                    setCountry(fetchCountry);
                } else {
                    console.log('Philippines not found');
                }
            } catch (error) {
                console.error('Error fetching country flags:', error);
            }
        };
        fetchCountryFlags();
    }, []);

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <ScrollView keyboardShouldPersistTaps={"always"} bounces={false} style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                <View style={{ margin: wp(4) }}>

                    <AuthHeader appLogo leftIcon onleftIconPress={() => props.navigation.goBack()} />

                    <Text style={[styles.mainTitle, { color: colors.primary, marginTop: wp(8), marginBottom: wp(2) }]}>Home Address</Text>

                    <View>
                        <Input
                            placeholder={'House number, Street, Village/subdivision, Barangay'}
                            value={address}
                            onChangeText={(value) => setAddress(value)}
                        >
                            Address
                        </Input>

                        <Input
                            placeholder={'Country'}
                            value={country?.title}
                            dropDownShow={countryFlagModel}
                            dropdownArray={countryFlagArray}
                            rightIcon
                            eyeValue={appIcons.arrowDown}
                            editable={false}
                            touchable
                            onPressValue={item => [setCountryFlagModel(false), setCountry(item)]}
                            onPressIcon={() => setCountryFlagModel(!countryFlagModel)}
                        >
                            Country
                        </Input>

                        <Input
                            placeholder={'City'}
                            value={city}
                            onChangeText={(value) => setCity(value)}
                        >
                            City
                        </Input>

                        <Input
                            placeholder={'Postal Code'}
                            value={postalCode}
                            onChangeText={(value) => setPostalCode(value)}
                        >
                            Postal Code
                        </Input>

                        {
                            seletAccount == 'user'
                            && (
                                <Input
                                    editable={false}
                                    dropDownShow={cuntryModel}
                                    dropdownArray={userType}
                                    onPressValue={item => [handleCheckboxChange(item)]}
                                    onPressIcon={() => setCountryModel(!cuntryModel)}
                                    rightIcon={true}
                                    eyeValue={appIcons.arrowDown}
                                    touchable
                                    checkBoxes
                                >
                                    User Type
                                </Input>
                            )
                        }

                        <Text style={[{ fontSize: hp(1.6), fontFamily: fontFamily.PoppinsMedium, color: colors.primary, marginTop: wp(5) }]}>To Faster Verification, may we ask the following:</Text>

                        {
                            seletAccount == 'user'
                                ? (
                                    <Input
                                        placeholder={'Optional'}
                                        value={facebookURL}
                                        onChangeText={(value) => setFacebookURL(value)}
                                    >
                                        Facebook URL
                                    </Input>
                                )
                                : null
                        }

                        <CountryInput shortPlaceholder={'(Optional)'} placeholder={'WhatsApp Number'} phoneNumber={phoneNumber} setValue={setPhoneNumber} setSelectedCode={setCountryCode} layout={'first'} />

                        <CountryInput shortPlaceholder={'(Optional)'} placeholder={'Viber Contact'} phoneNumber={phoneNumber} setValue={setWhatsPhoneNumber} setSelectedCode={setCountryCodeWhatsApp} layout={'first'} />
                    </View>
                </View>
            </ScrollView>

            <Button
                // onPress={() => [setModalShow(true), setTimeout(() => setModalShow(false), 5000)]}
                onPress={() => openCamera()}
            >
                Continue
            </Button>

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

            <FullModal
                imgSRC={appImages.wait}
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                topTitle={'Profile Verification'}
                title={'Please Wait'}
                subTitle={'Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.'}
            />

            {/* <FullModal
                imgSRC={appImages.tick}
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                topTitle={'Profile Verification'}
                title={'Profile Verified'}
                subTitle={'Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.'}
            /> */}

            {/* <FullModal
                imgSRC={appImages.error}
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                topTitle={'Profile Verification'}
                title={'Something wrong'}
                subTitle={'Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.'}
            /> */}

            <PassportModal
                setPassportModalOnly={() => setPassportModal(false)}
                passportModal={passportModal}
                userType={userType}
                setPassportModal={() => [
                    setDrivingModal(true),
                    setTimeout(() => setPassportModal(false), 2000)
                ]}
            />

            <DrivingLicense
                setDrivingModalOnly={() => setDrivingModal(false)}
                drivingModal={drivingModal}
                userType={userType}
                setDrivingModal={() => [
                    seletAccount == 'user'
                        ? [
                            setModalShow(true),
                            setTimeout(() => [setDrivingModal(false), setTimeout(() => [setModalShow(false), props.navigation.navigate(routes.tab)], 2000)], 2000)
                        ]
                        : [
                            setDrivingModal(false),
                            props.navigation.navigate(routes.addVehicle)
                        ]
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainTitle: {
        fontSize: hp(2.2),
        lineHeight: hp(3.3),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
})