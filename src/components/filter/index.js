import { useTheme } from '@react-navigation/native'
import React, { useState } from 'react'
import { View, Text, Image, StyleSheet, Pressable, Modal, SafeAreaView, ScrollView, FlatList, ImageBackground, TouchableOpacity } from 'react-native'
import { appIcons, appImages, colors, fontFamily, fontPixel, heightPixel, hp, widthPixel, wp } from '../../services'
import Button from '../button'
import Header from '../header'
import { Input } from '../input'
import DatePicker from 'react-native-date-picker'
import moment from 'moment';

export default function FilterModal({ modalShow, setModalShow, title, subTitle }) {
    const { colors } = useTheme()
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('')
    const [pickDate, setPickDate] = useState('');
    const [pickTime, setPickTime] = useState('');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showDatePicker1, setShowDatePicker1] = useState(false);

    const [returnDate, setReturnDate] = useState('');
    const [returnTime, setReturnTime] = useState('');
    const [showDatePicker2, setShowDatePicker2] = useState(false);
    const [showDatePicker3, setShowDatePicker3] = useState(false);

    const [checked, setChecked] = useState([
        { id: 1, value: 'Sedan', status: true },
        { id: 2, value: 'Compact', status: false },
        { id: 3, value: 'SUV', status: false },
        { id: 4, value: 'Van', status: false },
        { id: 5, value: 'Pick Up', status: false },
        { id: 6, value: 'Sports/Luxury Car', status: false },
        { id: 7, value: 'Motorcycle', status: false },
    ]);
    const [mode, setMode] = useState([
        { id: 1, value: 'Self Drive', status: true },
        { id: 2, value: 'With Driver', status: false },
        { id: 3, value: 'Tour Packages w/ Driver', status: false },
    ]);

    const handleCheckboxChange = (id, type) => {
        if (type === 'carType') {
            setChecked(checked.map(item => item.id === id ? { ...item, status: !item.status } : item));
        } else if (type === 'mode') {
            setMode(mode.map(item => item.id === id ? { ...item, status: !item.status } : item));
        }
    };

    return (
        <Modal style={{ flex: 1, backgroundColor: colors.wheatWhite }} animationType="slide" transparent={true} visible={modalShow} onRequestClose={() => setModalShow(false)}>
            <SafeAreaView style={[styles.container, { backgroundColor: colors.wheatWhite }]}>
                <ScrollView style={{ flex: 1, margin: wp(4) }}>
                    <Header noHeaderPadding leftIcon onleftIconPress={() => setModalShow(false)} title='Filter' />

                    <View>
                        <FlatList
                            data={checked}
                            contentContainerStyle={{ marginTop: wp(5) }}
                            ListHeaderComponent={
                                <Text style={[styles.headerTitle, { color: colors.lable }]}>Select Car Type</Text>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={index} activeOpacity={1} onPress={() => handleCheckboxChange(item.id, 'carType')} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp(4) }}>
                                        <Image source={item.status ? appIcons.TickSquareFill : appIcons.TickSquareUnfill} style={{ tintColor: item.status ? null : colors.checBoxColor, width: wp(6), height: wp(6), resizeMode: 'contain' }} />
                                        <Text style={[styles.itemTitle, { color: colors.lable, marginLeft: wp(2) }]}>{item.value}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>

                    <View style={{ marginTop: wp(5), }}>
                        <Text style={[styles.headerTitle, { color: colors.lable }]}>PickUp Date & Time</Text>
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

                    <View style={{ marginTop: wp(5), }}>
                        <Text style={[styles.headerTitle, { color: colors.lable }]}>Return Date & Time</Text>
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

                    <View style={{ marginTop: wp(5), }}>
                        <Text style={[styles.headerTitle, { color: colors.lable }]}>Price</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Input
                                placeholder={'$10'}
                                value={from}
                                onChangeText={(value) => setFrom(value)}
                                containerStyle={{
                                    backgroundColor: colors.fullWhite
                                }}
                                WholeContainer={{
                                    width: wp(42),
                                }}
                            >
                                From
                            </Input>
                            <Input
                                placeholder={'$300'}
                                value={to}
                                onChangeText={(value) => setTo(value)}
                                containerStyle={{
                                    backgroundColor: colors.fullWhite
                                }}
                                WholeContainer={{
                                    width: wp(42),
                                }}
                            >
                                To
                            </Input>
                        </View>
                    </View>

                    <View>
                        <FlatList
                            data={mode}
                            contentContainerStyle={{ marginTop: wp(5) }}
                            ListHeaderComponent={
                                <Text style={[styles.headerTitle, { color: colors.lable }]}>Mode</Text>
                            }
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity key={index} activeOpacity={1} onPress={() => handleCheckboxChange(item.id, 'mode')} style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp(4) }}>
                                        <Image source={item.status ? appIcons.TickSquareFill : appIcons.TickSquareUnfill} style={{ tintColor: item.status ? null : colors.checBoxColor, width: wp(6), height: wp(6), resizeMode: 'contain' }} />
                                        <Text style={[styles.itemTitle, { color: colors.lable, marginLeft: wp(2) }]}>{item.value}</Text>
                                    </TouchableOpacity>
                                )
                            }}
                        />
                    </View>
                </ScrollView>

                <Button onPress={() => setModalShow(false)}>Apply Filter</Button>
            </SafeAreaView>


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

        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        color: colors.lable
    }
})
