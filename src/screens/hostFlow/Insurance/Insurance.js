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

const Insurance = (props) => {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [Category, setCategory] = useState(0);

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Insurance'} />

                <Text style={[styles.titleHeader, { color: colors.secondaryBlack, marginTop: wp(5) }]}>Select Insurance Type</Text>

                <FlatList
                    data={[
                        { id: 1, des: 'Thid party' },
                        { id: 2, des: 'Comprehensive' },
                        { id: 3, des: 'Both' }
                    ]}
                    keyExtractor={(item, index) => index}
                    ListHeaderComponent={
                        <Text style={[styles.titleInput, { color: colors.secondaryBlack, marginTop: wp(5) }]}>Select Mode</Text>
                    }
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity key={index} activeOpacity={0.8} onPress={() => setCategory(index)} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(4) }}>
                                <Text style={[styles.itemTitle, { color: colors.lable, }]}>{item.des}</Text>
                                <View style={[styles.dotComponentActiveStyle, { borderWidth: 1, borderColor: colors.primary }]}>
                                    <View style={[styles.dotComponentStyle, { backgroundColor: Category == index ? colors.primary : 'transparent' }]} />
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>

            <Button onPress={() => props.navigation.navigate(routes.uploadDocument)}>Continue</Button>
        </View>
    );
};

export default Insurance;

const styles = StyleSheet.create({
    titleHeader: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
        textAlign: 'left',
    },
    titleInput: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsBold,
        textAlign: 'left',
        marginBottom: wp(2)
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

