import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import { Input } from '../../../components/input';
import Button from '../../../components/button';
import { useTheme } from '@react-navigation/native';
import DatePicker from 'react-native-date-picker'
import moment from 'moment';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import CheckBox from '@react-native-community/checkbox';

const employArray = [
    { id: 1, title: 'Basic' },
    { id: 2, title: 'Advance' },
    { id: 3, title: 'Premium' },
    { id: 4, title: 'None' },
]

const Checkout = (props) => {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [discount, setDiscount] = useState('')

    const [pickDate, setPickDate] = useState('');
    const [pickTime, setPickTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);

    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showDatePicker3, setShowDatePicker3] = useState(false);

    const [employeeArray, setEmployeeArray] = useState(employArray);
    const [employee, setEmployer] = useState(employArray[0]);
    const [emplyeeModel, setEmployeeModel] = useState(false);

    const [toggleCheckBox, setToggleCheckBox] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />

            <KeyboardAwareScrollView style={{ flex: 1, padding: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Managed Booking'} />
                <View>
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

                    <View style={{ marginTop: wp(5), paddingTop: wp(5), borderTopColor: colors.inActiveText, borderTopWidth: 1, marginTop: wp(5) }}>
                        <Text style={[styles.listTitle, { fontSize: hp(2), color: colors.secondaryBlack }]}>Change Date and Time</Text>
                        <Text style={[styles.listTitle, { fontSize: hp(1.2), color: colors.secondaryBlack, marginVertical: wp(4) }]}>* Subject to Host Approval</Text>

                        <Text style={[styles.listTitle, { color: colors.secondaryBlack }]}>Pick Up Info</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Input
                                editable={false}
                                placeholder={'mm/dd/yyyy'}
                                value={pickDate}
                                rightIcon
                                onPressIcon={() => [setShowDatePicker(true)]}
                                eyeValue={appIcons.calender}
                                rightIconColor={colors.primaryColor}
                                touchable
                                WholeContainer={{
                                    width: wp(42)
                                }}
                            >
                                Date
                            </Input>

                            <Input
                                editable={false}
                                placeholder={'hh:mm'}
                                value={pickTime}
                                rightIcon
                                onPressIcon={() => [setShowDatePicker1(true)]}
                                eyeValue={appIcons.clock}
                                rightIconColor={colors.primaryColor}
                                touchable
                                WholeContainer={{
                                    width: wp(42)
                                }}
                            >
                                Time
                            </Input>
                        </View>
                    </View>

                    <View style={{ marginTop: wp(5) }}>
                        <Text style={[styles.listTitle, { color: colors.secondaryBlack }]}>Return Info</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Input
                                editable={false}
                                placeholder={'mm/dd/yyyy'}
                                value={returnDate}
                                rightIcon
                                onPressIcon={() => [setShowDatePicker2(true)]}
                                eyeValue={appIcons.calender}
                                rightIconColor={colors.primaryColor}
                                touchable
                                WholeContainer={{
                                    width: wp(42)
                                }}
                            >
                                Date
                            </Input>

                            <Input
                                editable={false}
                                placeholder={'hh:mm'}
                                value={returnTime}
                                rightIcon
                                onPressIcon={() => [setShowDatePicker3(true)]}
                                eyeValue={appIcons.clock}
                                rightIconColor={colors.primaryColor}
                                touchable
                                WholeContainer={{
                                    width: wp(42)
                                }}
                            >
                                Time
                            </Input>
                        </View>
                    </View>
                </View>

                <View style={{ marginVertical: wp(5), flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={[styles.listTitle, { color: colors.secondaryBlack }]}>Cancel Booking</Text>
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
                </View>
                <Text style={[styles.listTitle, { fontSize: hp(1.2), color: colors.secondaryBlack }]}>* Subject to Host Rules and Regulations</Text>
            </KeyboardAwareScrollView>

            <Button onPress={() => props.navigation.navigate(routes.historyDetail, { key: 'enableBottomButton' })}>Apply</Button>

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
        </View>
    );
};

export default Checkout;

const styles = StyleSheet.create({
    listTitle: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
    },
    checbox: {
        height: Platform.OS == 'ios' ? heightPixel(15) : heightPixel(20),
        width: Platform.OS == 'ios' ? widthPixel(15) : widthPixel(30),
    },
});

