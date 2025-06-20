import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform, TextInput } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import CarDetailImageSlider from '../../../components/carDetailImageSlider/CarDetailImageSlider';
import { useIsFocused, useTheme } from '@react-navigation/native';
import { getLocationPermission } from '../../../common/HelpingFunc';
import Geolocation from '@react-native-community/geolocation';
import Button from '../../../components/button';
import { useSelector } from 'react-redux';
import CallModal from '../../../components/modal';
import DeleteModal from '../../../components/deleteModal/DeleteModal';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Input } from '../../../components/input';
import ToggleSwitch from 'toggle-switch-react-native';
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import CheckBox from '@react-native-community/checkbox';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import CertificateOfRegistration from '../../../components/certificateOfRegistration/CertificateOfRegistration';
import { useCameraPermission } from 'react-native-vision-camera';
import DrivingLicense from '../../../components/drivingLicense/DrivingLicense';

const AddVehicleTermsCondition = (props) => {
    const { key } = props?.route?.params ?? {};
    const { requestPermission } = useCameraPermission();
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [modalShow, setModalShow] = useState(false);
    const [drivingModal, setDrivingModal] = useState(false);

    const openCamera = async () => {
        const response = await requestPermission();
        console.log("openCamera response: ", response);
        if (response) {
            setDrivingModal(true);
        }
    };

    const toggleCategorySelection = (index) => {
        setSelectedCategories((prevSelectedCategories) => {
            if (prevSelectedCategories.includes(index)) {
                return prevSelectedCategories.filter(categoryIndex => categoryIndex !== index);
            } else {
                return [...prevSelectedCategories, index];
            }
        });
    };

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <ScrollView style={{ marginBottom: wp(5) }}>
                <View style={{ margin: wp(4) }}>
                    <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={key === 'edit' ? 'Edit Terms & Conditions' : 'Add Terms & Conditions'} />

                    <View style={{ marginVertical: wp(5) }}>
                        <Text style={[styles.titleInput, { color: colors.secondaryBlack }]}>Terms & Conditions</Text>
                        <TextInput
                            style={[styles.commentInput, { backgroundColor: colors.fullWhite }]}
                            placeholder="Terms & Conditions here"
                            placeholderTextColor={colors.inActiveText}
                            maxLength={200}
                            multiline={true}
                            value={comment}
                            onChangeText={setComment}
                        />
                    </View>

                    {
                        key !== 'edit' && (
                            <FlatList
                                data={[
                                    { id: 1, des: 'A, A1  (can drive L1, L2, L3, L4, L5, L6)' },
                                    { id: 2, des: 'B, B1, B2 (can drive M1, M2, N1)' },
                                    { id: 3, des: 'C (can drive N2, N3)' },
                                    { id: 4, des: 'D (can drive M3)' },
                                    { id: 5, des: 'BE (can drive O1, O2)' },
                                    { id: 6, des: 'cE (can drive O3, O4)' }
                                ]}
                                keyExtractor={(item, index) => index.toString()}
                                ListHeaderComponent={
                                    <Text style={[styles.titleInput, { color: colors.secondaryBlack }]}>
                                        Select Driving License Category that Renter Must Have to rent this vehicle
                                    </Text>
                                }
                                renderItem={({ item, index }) => {
                                    const isSelected = selectedCategories.includes(index);
                                    return (
                                        <TouchableOpacity
                                            key={index}
                                            activeOpacity={0.8}
                                            onPress={() => toggleCategorySelection(index)}
                                            style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(4) }}
                                        >
                                            <Text style={[styles.itemTitle, { color: colors.lable }]}>{item.des}</Text>
                                            <View style={[styles.dotComponentActiveStyle, { borderWidth: 1, borderColor: colors.primary }]}>
                                                <View style={[styles.dotComponentStyle, { backgroundColor: isSelected ? colors.primary : 'transparent' }]} />
                                            </View>
                                        </TouchableOpacity>
                                    );
                                }}
                            />
                        )
                    }
                </View>
            </ScrollView>

            {
                key === 'edit' ? (
                    <Button>Save Changes</Button>
                ) : (
                    <View>
                        <Text onPress={() => props.navigation.navigate(routes.moreInfo)} style={{ textAlign: 'center', marginVertical: wp(5), fontFamily: fontFamily.PoppinsMedium, fontSize: hp(2), lineHeight: hp(3), color: colors.primary, textDecorationLine: 'underline' }}>More Info</Text>
                        <Button
                            onPress={() => props.navigation.navigate(routes.insurance)}
                        // onPress={() => openCamera()}
                        >
                            Add
                        </Button>
                    </View>
                )
            }

            <DrivingLicense
                setDrivingModalOnly={() => setDrivingModal(false)}
                drivingModal={drivingModal}
                setDrivingModal={() => [setModalShow(true), setTimeout(() => setDrivingModal(false), 2000)]}
            />

            <CertificateOfRegistration
                modalShow={modalShow}
                setModalVisible={() => [setModalShow(false), props.navigation.navigate(routes.insurance)]}
                setImage={(e) => setImage(e)}
            />
        </View>
    );
};

export default AddVehicleTermsCondition;

const styles = StyleSheet.create({
    titleInput: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
        textAlign: 'left',
        marginBottom: wp(2)
    },
    commentInput: {
        height: hp(25),
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        color: '#C0C0C0',
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        textAlignVertical: 'top',
    },
    itemTitle: {
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
    },
    dotComponentActiveStyle: {
        width: wp(5),
        height: wp(5),
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    dotComponentStyle: {
        width: wp(3),
        height: wp(3),
        borderRadius: 50,
    },
});

