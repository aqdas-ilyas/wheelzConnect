import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native';
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

const AddVehicle = (props) => {
    const { key } = props?.route?.params ?? {}
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [toggle, setToggle] = useState(true)
    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    const [markDate, setMarkDate] = useState({});
    const [rangeStart, setRangeStart] = useState(null);
    const [rangeEnd, setRangeEnd] = useState(null);

    const onDayPress = (day) => {
        if (!rangeStart || (rangeStart && rangeEnd)) {
            // Start a new range selection
            setRangeStart(day.dateString);
            setRangeEnd(null);
            setMarkDate({
                [day.dateString]: {
                    selected: true,
                    startingDay: true,
                    color: colors.primary, // Light blue for start date
                    textColor: 'white',
                },
            });
        } else {
            // Complete the range selection
            const newMarkDate = { ...markDate };
            const startDate = moment(rangeStart);
            const endDate = moment(day.dateString);

            for (let date = startDate; date <= endDate; date.add(1, 'day')) {
                const dateString = date.format('YYYY-MM-DD');
                newMarkDate[dateString] = {
                    selected: true,
                    color: '#4A5C78', // Dark blue for intermediate dates
                    textColor: 'white',
                    ...(dateString === rangeStart && { startingDay: true, color: '#4AC6F8' }),
                    ...(dateString === day.dateString && { endingDay: true, color: '#4AC6F8' }),
                };
            }

            setRangeEnd(day.dateString);
            setMarkDate(newMarkDate);
        }
    };

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <ScrollView style={{ marginBottom: wp(5) }}>
                <View style={{ margin: wp(4) }}>
                    <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={key == 'edit' ? 'Edit Vehicle' : 'Add Vehicles'} />

                    <View style={[appStyles.rowBtw, { marginTop: wp(5) }]}>
                        <Text style={[styles.mainText, { marginLeft: wp(2), color: colors.lable }]}>Instant Accept Request</Text>
                        <ToggleSwitch
                            isOn={toggle}
                            onColor={colors.primary}
                            offColor={colors.inActiveText}
                            labelStyle={{ display: 'none' }}
                            size="small"
                            onToggle={(e) => setToggle(e)}
                        />
                    </View>

                    <View style={{ marginVertical: wp(5) }}>
                        <Text style={[styles.availablityText, { marginLeft: wp(2), color: colors.lable }]}>Set Availability</Text>
                        <View style={[styles.calanderTopView]}>
                            <Calendar
                                firstDay={1}
                                onDayPress={onDayPress}
                                hideExtraDays={true}
                                current={moment().format('YYYY-MM-DD')}
                                enableSwipeMonths={false}
                                minDate={new Date().toISOString()}
                                markedDates={markDate}
                                markingType={'period'}
                                theme={{
                                    "stylesheet.calendar.header": {
                                        week: {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            marginHorizontal: wp(2),
                                        },
                                        dayHeader: {
                                            fontFamily: fontFamily.PoppinsMedium,
                                            fontSize: hp(1.2),
                                            color: colors.secondaryBlack,
                                            textTransform: 'uppercase',
                                        },
                                    },
                                    textDisabledColor: colors.placeholder,
                                    todayTextColor: 'red',
                                    todayBackgroundColor: 'transparent',
                                    textSectionTitleColor: colors.secondaryBlack,
                                    selectedDayTextColor: colors.fullWhite,
                                    selectedDayBackgroundColor: colors.primary,
                                    calendarBackground: colors.fullWhite,
                                    dayTextColor: colors.secondaryBlack,
                                    textDisabledColor: '#ccc',
                                    textSectionTitleDisabledColor: colors.secondaryBlack,
                                    arrowColor: colors.secondaryBlack,
                                    monthTextColor: colors.secondaryBlack,
                                    textDayFontFamily: fontFamily.PoppinsMedium,
                                    textDayFontSize: hp(1.7),
                                    textMonthFontFamily: fontFamily.PoppinsSemiBold,
                                    textDayFontSize: hp(1.8),
                                    textDayHeaderFontFamily: fontFamily.LatoBold,
                                    textDayHeaderFontSize: hp(1.2),
                                }}
                                containerStyle={{
                                    borderRadius: 20,
                                }}
                                style={{
                                    borderRadius: 20,
                                }}
                            />
                        </View>
                    </View>

                    <View>
                        <Text style={[styles.availablityText, { marginLeft: wp(2), color: colors.lable }]}>Pricing</Text>
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
                                tintColors={{ true: colors.primary, false: colors.fullBlack }} // Change tint colors if needed
                            />
                            <Text style={[styles.bottomText, { color: colors.placeholder, marginLeft: wp(3) }]}>Apply Discount For Medium Term Rental (7 to 28 Days)</Text>
                        </View>
                    </View>

                    <View style={styles.Box}>
                        <MultiSlider
                            markerStyle={styles.sliderDot}
                            unselectedStyle={styles.sliderInActive}
                            selectedStyle={styles.sliderActive}
                            isMarkersSeparated={true}
                            values={[7]}
                            sliderLength={wp(92)}
                            onValuesChange={(data) => console.log(data)}
                            min={1}
                            max={10}
                            allowOverlap={false}
                            minMarkerOverlapDistance={10}
                        />
                        <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                            <Text style={[styles.kmText, { color: colors.placeholder, }]}>0%</Text>
                            <Text style={[styles.kmText, { color: colors.placeholder, }]}>10%</Text>
                            <Text style={[styles.kmText, { color: colors.placeholder, }]}>20%</Text>
                            <Text style={[styles.kmText, { color: colors.placeholder, }]}>30%</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <Button onPress={() => props.navigation.navigate(routes.addAccessories,{ key: key == 'edit' ? 'edit' : 'add' })}>{key == 'edit' ? 'Next' : 'Add'}</Button>
        </View>
    );
};

export default AddVehicle;

const styles = StyleSheet.create({
    mainText: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsRegular,
    },
    availablityText: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    calanderTopView: {
        borderRadius: 20,
        marginVertical: wp(2)
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

    Box: {
        backgroundColor: colors.offWhite,
        borderRadius: 20
    },
    sliderDot: {
        backgroundColor: colors.fullWhite,
        height: heightPixel(30),
        width: heightPixel(30),
        borderRadius: 50,
        elevation: 2
    },
    sliderActive: {
        backgroundColor: '#34920A',
        height: heightPixel(12),
        marginTop: -heightPixel(3),
        borderRadius: 50
    },
    sliderInActive: {
        backgroundColor: '#D9D9D9',
        height: heightPixel(12),
        marginTop: -heightPixel(3),
        borderRadius: 50
    },
    kmText: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsMedium,
    }
});

