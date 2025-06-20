import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import Button from '../../../components/button';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { Input } from '../../../components/input';
import CallModal from '../../../components/modal';
import { useTheme } from '@react-navigation/native';

const employArray = [
    { id: 1, title: 'Basic ($5)' },
    { id: 2, title: 'Advance ($20)' },
    { id: 3, title: 'Premium ($50)' },
    { id: 4, title: 'None' },
]

const BookACar = (props) => {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [pickDate, setPickDate] = useState('');
    const [pickTime, setPickTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);

    const [modalShow, setModalShow] = useState(false)

    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showDatePicker3, setShowDatePicker3] = useState(false);

    const [employeeArray, setEmployeeArray] = useState(employArray);
    const [employee, setEmployer] = useState(employArray[0]);
    const [emplyeeModel, setEmployeeModel] = useState(false);

    const [checked, setChecked] = useState([
        { id: 1, value: 'Airport Delivery', status: true, price: '20' },
        { id: 2, value: 'Airport Return', status: false, price: '50' },
        { id: 3, value: 'Hotel Return', status: false, price: '75' },
    ]);

    const [mode, setMode] = useState([
        { id: 1, value: 'Self Drive', status: true },
        { id: 2, value: 'With Driver', status: false },
        { id: 3, value: 'Tour Package w/ Driver', status: false },
    ]);

    const handleCheckboxChange = (id, type) => {
        if (type === 'anyExtra') {
            setChecked(checked.map(item =>
                item.id === id ? { ...item, status: !item.status } : item
            ));
        } else if (type === 'mode') {
            setMode(mode.map(item => ({
                ...item,
                status: item.id === id,
            })));
        }
    };

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <ScrollView style={{ flex: 1, margin: wp(4) }} showsVerticalScrollIndicator={false}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Book Car'} />

                <View style={{ marginTop: wp(5) }}>
                    <Text style={[styles.listTitle, { color: colors.descText }]}>Pick Up Info</Text>
                    <Input
                        editable={false}
                        placeholder={'mm/dd/yyyy'}
                        value={pickDate}
                        rightIcon
                        onPressIcon={() => [setShowDatePicker(true)]}
                        eyeValue={appIcons.calender}
                        rightIconColor={colors.primaryColor}
                        touchable
                    >
                        Date
                    </Input>

                    <Input
                        editable={false}
                        placeholder={'hh/mm'}
                        value={pickTime}
                        rightIcon
                        onPressIcon={() => [setShowDatePicker1(true)]}
                        eyeValue={appIcons.clock}
                        rightIconColor={colors.primaryColor}
                        touchable
                    >
                        Time
                    </Input>
                </View>
                <View style={{ marginTop: wp(5) }}>
                    <Text style={[styles.listTitle, { color: colors.descText }]}>Return Info</Text>
                    <Input
                        editable={false}
                        placeholder={'mm/dd/yyyy'}
                        value={returnDate}
                        rightIcon
                        onPressIcon={() => [setShowDatePicker2(true)]}
                        eyeValue={appIcons.calender}
                        rightIconColor={colors.primaryColor}
                        touchable
                    >
                        Date
                    </Input>

                    <Input
                        editable={false}
                        placeholder={'mm/dd/yyyy'}
                        value={returnTime}
                        rightIcon
                        onPressIcon={() => [setShowDatePicker3(true)]}
                        eyeValue={appIcons.clock}
                        rightIconColor={colors.primaryColor}
                        touchable
                    >
                        Time
                    </Input>
                </View>

                <View>
                    <FlatList
                        data={mode}
                        contentContainerStyle={{ marginTop: wp(5), }}
                        ListHeaderComponent={
                            <Text style={[styles.headerTitle, { color: colors.lable }]}>Select Mode</Text>
                        }
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity key={index} activeOpacity={1} onPress={() => handleCheckboxChange(item.id, 'mode')} style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: wp(4) }}>
                                    <Text style={[styles.itemTitle, { color: colors.lable, }]}>{item.value}</Text>
                                    <View style={[styles.dotComponentActiveStyle, { borderWidth: 1, borderColor: colors.primary }]}>
                                        <View style={[styles.dotComponentStyle, { backgroundColor: item.status ? colors.primary : 'transparent' }]} />
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>

                <Input
                    editable={false}
                    dropDownShow={emplyeeModel}
                    dropdownArray={employeeArray}
                    value={employee?.title}
                    onPressValue={item => [setEmployeeModel(false), setEmployer(item)]}
                    onPressIcon={() => setEmployeeModel(!emplyeeModel)}
                    rightIcon={true}
                    eyeValue={appIcons.arrowDown}
                    touchable
                >
                    Insurance
                </Input>

                <View>
                    <FlatList
                        data={checked}
                        contentContainerStyle={{ marginTop: wp(5) }}
                        ListHeaderComponent={
                            <Text style={[styles.headerTitle, { color: colors.lable }]}>Any Extra</Text>
                        }
                        keyExtractor={(item, index) => index}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity key={index} activeOpacity={1} onPress={() => handleCheckboxChange(item.id, 'anyExtra')} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp(4), justifyContent: "space-between" }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Image source={item.status ? appIcons.TickSquareFill : appIcons.TickSquareUnfill} style={{ tintColor: item.status ? null : colors.checBoxColor, width: wp(6), height: wp(6), resizeMode: 'contain' }} />
                                        <Text style={[styles.itemTitle, { color: colors.lable, marginLeft: wp(2) }]}>{item.value}</Text>
                                    </View>

                                    <View style={styles.priceContainer}>
                                        <Text style={[styles.price, { color: colors.primary }]}>${item.price}/</Text>
                                        <Text style={[styles.perDay, { color: colors.checBoxColor }]}>Hr</Text>
                                    </View>
                                </TouchableOpacity>
                            )
                        }}
                    />
                </View>
            </ScrollView>

            <Button onPress={() => setModalShow(!modalShow)}>Book A Car</Button>

            <DatePicker
                modal
                open={showDatePicker}
                date={new Date()}
                mode='date'
                onConfirm={(date) => {
                    const formattedDate = moment(date).format('DD/MM/YYYY');
                    console.log("formattedDate: ", formattedDate);
                    setPickDate(formattedDate)
                    setShowDatePicker(false)
                }}
                onCancel={() => {
                    setShowDatePicker(false)
                }}
            />

            <DatePicker
                modal
                open={showDatePicker1}
                date={new Date()}
                mode="time"
                onConfirm={(time) => {
                    const formattedTime = moment(time).format('HH:mm a');
                    console.log("formattedTime: ", formattedTime);
                    setPickTime(formattedTime);
                    setShowDatePicker1(false);
                }}
                onCancel={() => {
                    setShowDatePicker1(false);
                }}
            />

            <DatePicker
                modal
                open={showDatePicker2}
                date={new Date()}
                mode='date'
                onConfirm={(date) => {
                    const formattedDate = moment(date).format('DD/MM/YYYY');
                    console.log("formattedDate: ", formattedDate);
                    setReturnDate(formattedDate)
                    setShowDatePicker2(false)
                }}
                onCancel={() => {
                    setShowDatePicker2(false)
                }}
            />

            <DatePicker
                modal
                open={showDatePicker3}
                date={new Date()}
                mode="time"
                onConfirm={(time) => {
                    const formattedTime = moment(time).format('HH:mm a');
                    console.log("formattedTime: ", formattedTime);
                    setReturnTime(formattedTime);
                    setShowDatePicker3(false);
                }}
                onCancel={() => {
                    setShowDatePicker1(false);
                }}
            />

            <CallModal
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                title={'Booking Request Sent'}
                subTitle={'Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.'}
            />
        </View>
    );
};

export default BookACar;

const styles = StyleSheet.create({
    listTitle: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsSemiBold,
    },
    headerTitle: {
        fontFamily: fontFamily.PoppinsSemiBold,
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
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
});
