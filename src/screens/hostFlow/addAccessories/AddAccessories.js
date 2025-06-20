import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Platform } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import { useIsFocused, useTheme } from '@react-navigation/native';
import Button from '../../../components/button';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Input } from '../../../components/input';
import { GestureHandlerRootView, Swipeable } from 'react-native-gesture-handler';

const rentalDay = [
    { id: 1, title: 'Per Day', },
    { id: 2, title: 'Fixed Rate' },
    { id: 3, title: 'Free' },
];

const AddAccessories = (props) => {
    const { key } = props?.route?.params ?? {};
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(false);

    const [price, setPrice] = useState('');
    const [name, setName] = useState('');
    const [rentalArray, setRentalArray] = useState(rentalDay);
    const [rent, setRent] = useState(rentalDay[0]);
    const [rentalModal, setRentalModel] = useState(false);

    const [data, setData] = useState([{ id: 1, title: 'child seat', price: 108, name: 'Tyres' }, { id: 2, title: 'child seat', price: 200, name: 'Rims' }]);
    const swipeableRefs = useRef(new Map());

    const handleDelete = (id) => {
        swipeableRefs.current.forEach((swipeable) => {
            if (swipeable) {
                swipeable.close();
            }
        });

        swipeableRefs.current.delete(id);

        setData(prevData => prevData.filter(item => item.id !== id));
    };

    const handleAddAccessory = () => {
        if (!rent.title || !price) {
            // Handle the case when either the rental day or price is not set
            return;
        }

        const newAccessory = {
            id: data.length + 1,
            title: rent.title,
            name,
            price,
        };

        setData(prevData => [...prevData, newAccessory]);
        setPrice('');
        setName('');
        setRent(rentalDay[0]);
    };

    const renderRightActions = (progress, dragX, onDelete) => (
        <TouchableOpacity
            activeOpacity={0.9}
            onPress={() => onDelete()}
            style={{
                backgroundColor: 'red',
                justifyContent: 'center',
                alignItems: 'flex-end',
                padding: 20,
                borderRadius: 10,
                marginHorizontal: wp(4),
                marginTop: wp(2),
            }}
        >
            <Image source={appIcons.delete} style={{ tintColor: colors.fullWhite, width: wp(5), height: wp(5) }} />
        </TouchableOpacity>
    );

    const renderItem = ({ item }) => (
        <Swipeable
            ref={(ref) => {
                if (ref && !swipeableRefs.current.has(item.id)) {
                    swipeableRefs.current.set(item.id, ref);
                }
            }}
            renderRightActions={(progress, dragX) => renderRightActions(progress, dragX, () => handleDelete(item.id))}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: colors.fullBlack, borderRadius: 10, marginTop: wp(2), padding: wp(4) }}>
                <Text style={{ fontFamily: fontFamily.PoppinsMedium, fontSize: hp(1.6), lineHeight: hp(2.4), color: colors.fullWhite }}>{item.name}</Text>
                <Text style={{ fontFamily: fontFamily.PoppinsMedium, fontSize: hp(1.4), lineHeight: hp(2.1), color: colors.fullWhite }}>${item.price}</Text>
            </View>
        </Swipeable>
    );

    return (
        <GestureHandlerRootView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
            <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
                <Loader loading={isLoading} />
                <View style={{ marginBottom: wp(5) }}>
                    <View style={{ margin: wp(4) }}>
                        <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={key == 'edit' ? 'Edit Accessories' : 'Add Accessories'} />

                        <View style={{ marginBottom: wp(5) }}>
                            <Input
                                placeholder={'Name'}
                                value={name}
                                onChangeText={(value) => setName(value)}
                            >
                                Name
                            </Input>

                            <Input
                                editable={false}
                                dropDownShow={rentalModal}
                                dropdownArray={rentalArray}
                                value={rent?.title}
                                onPressValue={item => [setRentalModel(false), setRent(item)]}
                                onPressIcon={() => setRentalModel(!rentalModal)}
                                rightIcon={true}
                                eyeValue={appIcons.arrowDown}
                                touchable
                            >
                                Rate
                            </Input>

                            <Input
                                placeholder={'Amount'}
                                value={price}
                                onChangeText={(value) => setPrice(value)}
                            >
                                Price
                            </Input>

                            <AntDesign name='pluscircle' color={colors.primary} size={wp(12)} style={{ alignSelf: 'center', marginTop: wp(5) }} onPress={handleAddAccessory} />
                        </View>

                        <FlatList
                            data={data}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                        />
                    </View>
                </View>
            </View>

            <Button onPress={() => props.navigation.navigate(routes.addVehicleTermsCondition, { key: key == 'edit' ? 'edit' : 'add' })}>Next</Button>
        </GestureHandlerRootView>
    );
};

export default AddAccessories;
