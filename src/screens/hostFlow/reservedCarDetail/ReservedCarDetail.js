import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
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
import { Calendar } from 'react-native-calendars';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign'
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const RequestCarDetail = (props) => {
    const { key } = props?.route?.params ?? {}
    const { colors } = useTheme()
    const darModeValue = useSelector(state => state.user.darkMode)
    const [isLoading, setIsLoading] = useState(false)

    // const today = moment().format('YYYY-MM-DD');
    // const tomorrow = moment().add(1, 'days').format('YYYY-MM-DD');

    // const [markDate, setMarkDate] = useState({
    //     [moment().format('YYYY-MM-DD')]: {
    //         selected: true,
    //         selectedColor: colors.primary,
    //     },
    // });

    // const onDayPress = day => {
    //     let calenderObject = {};
    //     calenderObject[day.dateString] = {
    //         selected: true,
    //         selectedColor: colors.white,
    //     };
    //     setMarkDate(calenderObject);
    // };

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

    const [images, setImages] = useState([]);

    const handleAddImage = () => {
        Alert.alert(
            "Select Image",
            "Choose an option",
            [
                {
                    text: "Camera",
                    onPress: () => openCamera()
                },
                {
                    text: "Gallery",
                    onPress: () => openGallery()
                },
                {
                    text: "Cancel",
                    style: "cancel"
                }
            ],
            { cancelable: true }
        );
    };

    const openCamera = () => {
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            cropping: true,
        }).then(image => {
            const source = { uri: image.path };
            setImages([...images, source]);
        }).catch(error => {
            console.log('ImagePicker Error: ', error);
        });
    };

    const openGallery = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            const source = { uri: image.path };
            setImages([...images, source]);
        }).catch(error => {
            console.log('ImagePicker Error: ', error);
        });
    };

    const handleRemoveImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const renderImageItem = ({ item, index }) => (
        <View style={styles.imageContainer}>
            <Image source={item} style={styles.image} />
            <TouchableOpacity
                style={styles.crossButton}
                onPress={() => handleRemoveImage(index)}
            >
                <Icon name="close" size={wp(4)} color="#fff" />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Reserved Car Detail'} />
            </View>

            <ScrollView style={{ flex: 1 }}>

                <View style={[styles.calanderTopView]}>
                    {/* <Calendar
                        firstDay={1}
                        disabledDaysIndexes={[0, 1]}
                        disableAllTouchEventsForDisabledDays={true}
                        disableAllTouchEventsForInactiveDays={true}
                        onDayPress={onDayPress}
                        hideExtraDays={true}
                        current={today}
                        enableSwipeMonths={false}
                        minDate={new Date().toISOString()} // Convert Date object to string
                        markedDates={markDate}
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
                                    textTransform: 'uppercase', // This will transform day headers to uppercase
                                }
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
                            borderRadius: 20
                        }}
                    /> */}

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

                <CarDetailImageSlider />

                <View style={{ margin: wp(4) }}>
                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: "center" }}>
                        <Text style={[styles.carTitle, { color: colors.lable }]}>Audi E-Tron GT</Text>
                        <Image source={appIcons.heart} style={{ width: wp(5), height: wp(5), tintColor: colors.fullBlack, resizeMode: 'contain' }} />
                    </View>

                    <View style={styles.priceContainer}>
                        <Text style={[styles.price, { color: colors.primary }]}>$50/</Text>
                        <Text style={[styles.perDay, { color: colors.checBoxColor }]}>Hr</Text>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: 'space-between', alignItems: 'center', marginTop: wp(3) }}>
                        <Text style={[styles.userName, { color: colors.secondaryBlack }]}>Rental T & C</Text>
                        <AntDesign onPress={() => props.navigation.navigate(routes.rentalTermsAndConditions, { key: 'host' })} name='rightcircle' color={colors.fullBlack} size={wp(6)} />
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(5) }}>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.requestProfile)}>
                                <Image source={appImages.userImage} style={{ width: wp(12), height: wp(12) }} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.myReview)} style={{ justifyContent: 'space-evenly', marginLeft: wp(3) }}>
                                <Text style={[styles.userName, { color: colors.secondaryBlack }]}>Sarah Johnson</Text>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={appImages.starContainer} style={{ width: wp(21), height: wp(3.1) }} />
                                    <Text style={[styles.reviewPoint, { color: colors.lable }]}>  (4.5)</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity activeOpacity={0.9} onPress={() => props.navigation.navigate(routes.message)} style={[styles.rightIconview, { borderRadius: 50, padding: wp(2), marginLeft: wp(5), borderWidth: 1, borderColor: colors.inActiveText, backgroundColor: darModeValue ? 'transparent' : 'white' }]}>
                            <Image source={appIcons.chatIconTransparent} style={{ width: wp(5), height: wp(5) }} />
                        </TouchableOpacity>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Description</Text>
                        <Text style={[styles.shortDescrption, { color: colors.lable }]}>Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint. Velit officia consequat duis enim velit mollit. Exercitation veniam consequat sunt nostrud amet.</Text>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Pick Up Time & Date</Text>
                        <Text style={[styles.day, { color: colors.secondaryBlack }]}>Sat,Apr 6</Text>
                        <Text style={[styles.time, { color: colors.secondaryBlack }]}>10:00 Am</Text>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Return Time & Date</Text>
                        <Text style={[styles.day, { color: colors.secondaryBlack }]}>Tue,Apr 6</Text>
                        <Text style={[styles.time, { color: colors.secondaryBlack }]}>10:00 Am</Text>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.descrption, { color: colors.secondaryBlack }]}>Add Photos</Text>
                        <View style={styles.container}>
                            <TouchableOpacity style={[styles.addButton, { borderColor: colors.wheatWhite }]} onPress={handleAddImage}>
                                <Feather name="camera" size={wp(6)} color="#fff" />
                            </TouchableOpacity>
                            <FlatList
                                data={images}
                                renderItem={renderImageItem}
                                keyExtractor={(item, index) => index.toString()}
                                horizontal
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>

            {
                key == 'reserved' ? (
                    <Button>Hand Over</Button>
                ) : (
                    <Button onPress={() => props.navigation.navigate(routes.review)}>Review Renter</Button>
                )
            }
        </View>
    );
};

export default RequestCarDetail;

const styles = StyleSheet.create({
    calanderTopView: {
        borderRadius: 20,
        margin: wp(4)
    },
    carTitle: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    priceContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
        marginTop: wp(3)
    },
    price: {
        fontSize: hp(1.6),

        fontFamily: fontFamily.PoppinsMedium,
    },
    perDay: {
        fontSize: hp(1.4),
        fontFamily: fontFamily.PoppinsRegular,
    },
    userName: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
    },
    reviewPoint: {
        fontSize: hp(1.2),
        lineHeight: hp(1.7),
        fontFamily: fontFamily.PoppinsRegular,
    },
    descrption: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
        marginBottom: wp(2)
    },
    shortDescrption: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
    },
    leftText: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsMedium,
    },
    rightText: {
        fontSize: hp(1.4),
        lineHeight: hp(2.1),
        fontFamily: fontFamily.PoppinsRegular,
    },
    listTitle: {
        fontSize: hp(1.4),
        lineHeight: hp(2.2),
        fontFamily: fontFamily.PoppinsRegular,
    },
    locationDesc: {
        marginTop: wp(4),
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
    },
    container: {
        marginTop: wp(2),
        height: Dimensions.get('screen').height / 5,
        position: 'relative',
        zIndex: 100,
    },
    mapWrapper: {
        ...StyleSheet.absoluteFillObject,
        borderRadius: 15, // Adjust the border radius as needed
        overflow: 'hidden',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },

    dotComponentActiveStyle: {
        width: wp(5),
        height: wp(5),
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'red',
    },
    dotComponentStyle: {
        width: wp(3),
        height: wp(3),
        borderRadius: 50,
    },
    day: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsBold,
    },
    time: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsMedium,
    },

    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addButton: {
        width: wp(15),
        height: wp(15),
        borderRadius: 20,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
        borderWidth: 1
    },
    imageContainer: {
        position: 'relative',
        marginRight: 10,
    },
    image: {
        width: wp(15),
        height: wp(15),
        borderRadius: 15,
    },
    crossButton: {
        position: 'absolute',
        top: 0,
        right: 0,
        backgroundColor: '#000000',
        borderRadius: 20,
        padding: 1,
    },
});

