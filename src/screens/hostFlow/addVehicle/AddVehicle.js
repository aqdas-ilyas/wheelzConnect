import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions, Alert } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import { useIsFocused, useTheme } from '@react-navigation/native';
import Button from '../../../components/button';
import { Input } from '../../../components/input';
import ImagePicker from 'react-native-image-crop-picker';
import Feather from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/MaterialIcons';
import MapModal from '../../../components/mapModal/MapModal';

const employArray = [
    { id: 1, title: 'Self Drive' },
    { id: 2, title: 'With Driver' },
    { id: 3, title: 'Tour Package w/ Driver' },
]

const rentalDay = [
    { id: 1, title: '1' },
    { id: 2, title: '2' },
    { id: 3, title: '3' },
    { id: 4, title: '4' },
    { id: 5, title: '5' },
]

const hoursKM = [
    { id: 1, title: 'Sedan' },
    { id: 2, title: 'Compact Car' },
    { id: 3, title: 'SUV' },
    { id: 4, title: 'Van' },
    { id: 5, title: 'Pick Up' },
    { id: 6, title: 'Sports Car/luxury' },
    { id: 7, title: 'Motorcycle' },
]

const hoursKM1 = [
    { id: 1, title: 'Unlimited' },
    { id: 2, title: '150 KM' },
    { id: 3, title: '200 KM' },
    { id: 4, title: '250 KM' },
    { id: 5, title: '300 KM' },
    { id: 6, title: '350 KM' },
    { id: 7, title: '400 KM' },
]

const AddVehicle = (props) => {
    const { key } = props?.route?.params ?? {}
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [name, setName] = useState('')
    const [location, setLocation] = useState('')
    const [description, setDescription] = useState('')
    const [brandName, setBrandName] = useState('')
    const [model, setModel] = useState('')
    const [rate, setRate] = useState('')
    const [year, setYear] = useState('')
    const [interiorColor, setInteriorColor] = useState('')
    const [exteriorColor, setExteriorColor] = useState('')
    const [transmission, setTransmission] = useState('')
    const [fuelType, setFuelType] = useState('')
    const [doors, setDoors] = useState('')
    const [mileage, setMileage] = useState('')

    const [modalShow, setModalShow] = useState(false)

    const [employeeArray, setEmployeeArray] = useState(employArray);
    const [employee, setEmployer] = useState(employArray[0]);
    const [emplyeeModel, setEmployeeModel] = useState(false);

    const [rentalArray, setRentalArray] = useState(rentalDay);
    const [rent, setRent] = useState(rentalDay[0]);
    const [rentalModal, setRentalModel] = useState(false);

    const [hoursKMArray1, setHoursKMArray1] = useState(hoursKM1);
    const [hours1, setHoursKM1] = useState(hoursKM1[0]);
    const [hoursKMModel1, setHoursKMModel1] = useState(false);

    const [hoursKMArray, setHoursKMArray] = useState(hoursKM);
    const [hours, setHoursKM] = useState(hoursKM[0]);
    const [hoursKMModel, setHoursKMModel] = useState(false);

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
            <ScrollView style={{ marginBottom: wp(5) }}>
                <View style={{ margin: wp(4) }}>
                    <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={key == 'edit' ? 'Edit Vehicle' : 'Add Vehicles'} />

                    <Input
                        placeholder={'Audi E tron'}
                        value={name}
                        onChangeText={(value) => setName(value)}
                    >
                        Name
                    </Input>

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
                        Mode
                    </Input>

                    <Input
                        placeholder={'/Day'}
                        value={rate}
                        onChangeText={(value) => setRate(value)}
                    >
                        Rate
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
                        Minimum Rental Days
                    </Input>

                    <Input
                        editable={false}
                        dropDownShow={hoursKMModel1}
                        dropdownArray={hoursKMArray1}
                        value={hours1?.title}
                        onPressValue={item => [setHoursKMModel1(false), setHoursKM1(item)]}
                        onPressIcon={() => setHoursKMModel1(!hoursKMModel1)}
                        rightIcon={true}
                        eyeValue={appIcons.arrowDown}
                    >
                        Included KM/24 Hours
                    </Input>

                    <Input
                        placeholder={'Location Here'}
                        value={location}
                        onChangeText={(value) => setLocation(value)}
                        rightIcon
                        eyeValue={appIcons.location}
                        editable={false}
                        touchable
                        onPressIcon={() => setModalShow(!modalShow)}
                    >
                        Location
                    </Input>

                    <Input
                        placeholder={'Description here'}
                        value={description}
                        onChangeText={(value) => setDescription(value)}
                    >
                        Description
                    </Input>

                    <Text style={{ marginTop: wp(5), fontFamily: fontFamily.PoppinsSemiBold, fontSize: hp(1.6), lineHeight: hp(2.4), color: colors.placeholder }}>Specifications</Text>

                    <Input
                        placeholder={'Brand Name'}
                        value={brandName}
                        onChangeText={(value) => setBrandName(value)}
                    >
                        Brand Name
                    </Input>

                    <Input
                        placeholder={'Model'}
                        value={model}
                        onChangeText={(value) => setModel(value)}
                    >
                        Model
                    </Input>

                    <Input
                        placeholder={'Year'}
                        value={year}
                        onChangeText={(value) => setYear(value)}
                    >
                        Year
                    </Input>

                    <Input
                        editable={false}
                        dropDownShow={hoursKMModel}
                        dropdownArray={hoursKMArray}
                        value={hours?.title}
                        onPressValue={item => [setHoursKMModel(false), setHoursKM(item)]}
                        onPressIcon={() => setHoursKMModel(!hoursKMModel)}
                        rightIcon={true}
                        eyeValue={appIcons.arrowDown}
                        touchable
                    >
                        Vehicle Type
                    </Input>

                    <Input
                        placeholder={'Interior Color'}
                        value={interiorColor}
                        onChangeText={(value) => setInteriorColor(value)}
                    >
                        Interior Color
                    </Input>

                    <Input
                        placeholder={'Exterior Color'}
                        value={exteriorColor}
                        onChangeText={(value) => setExteriorColor(value)}
                    >
                        Exterior Color
                    </Input>

                    <Input
                        placeholder={'Transmission'}
                        value={transmission}
                        onChangeText={(value) => setTransmission(value)}
                    >
                        Transmission
                    </Input>

                    <Input
                        placeholder={'Fuel Type'}
                        value={fuelType}
                        onChangeText={(value) => setFuelType(value)}
                    >
                        Fuel Type
                    </Input>

                    <Input
                        placeholder={'Doors'}
                        value={doors}
                        onChangeText={(value) => setDoors(value)}
                    >
                        Doors
                    </Input>

                    <Input
                        placeholder={'Mileage'}
                        value={mileage}
                        onChangeText={(value) => setMileage(value)}
                    >
                        Mileage
                    </Input>


                    <Text style={{ marginVertical: wp(5), fontFamily: fontFamily.PoppinsSemiBold, fontSize: hp(1.6), lineHeight: hp(2.4), color: colors.placeholder }}>Images</Text>
                    <View style={styles.container}>
                        <TouchableOpacity style={[styles.addButton, { borderColor: colors.fullWhite }]} onPress={handleAddImage}>
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
            </ScrollView>

            <Button onPress={() => props.navigation.navigate(routes.addVehicleAvailability, { key: key == 'edit' ? 'edit' : 'add' })}>{key == 'edit' ? 'Next' : 'Add'}</Button>

            <MapModal
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                setMapLocation={(e) => setLocation(e?.address)}

            />
        </View>
    );
};

export default AddVehicle;

const styles = StyleSheet.create({
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

