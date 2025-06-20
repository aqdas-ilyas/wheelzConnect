import React, { useEffect, useRef, useState } from 'react'
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, Text, FlatList, ScrollView, TouchableOpacity, Pressable, TextInput, Alert } from "react-native";
import { hp, fontFamily, wp, routes, heightPixel, widthPixel, fontPixel, GOOGLE_API_KEY } from '../../../services'
import { appIcons, appImages } from '../../../services/utilities/assets'
import appStyles from '../../../services/utilities/appStyles'
import Button from '../../../components/button';
import Header from '../../../components/header'
import { Loader } from '../../../components/loader/Loader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import CallModal from '../../../components/modal';
import { useTheme } from '@react-navigation/native';
import Feather from 'react-native-vector-icons/Feather'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AddReview = (props) => {
    const { key } = props?.route?.params ?? {}
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [comment, setComment] = useState('');
    const [modalShow, setModalShow] = useState(false)
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
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Add Reviews'} />

                <View style={{ marginVertical: wp(5) }}>
                    <View style={styles.imageTopView}>
                        <View style={styles.imageView}>
                            <Image source={appImages.userImage} style={[styles.imageStyle, { resizeMode: 'cover' }]} />
                        </View>
                    </View>
                    <Text style={[styles.mainDes, { color: colors.descText }]}>Host Name</Text>
                </View>

                <View>
                    <Text style={[styles.titleReview, { color: colors.descText }]}>Your Review</Text>
                    <Rating
                        type="custom"
                        ratingCount={5}
                        imageSize={40}
                        style={{ paddingVertical: wp(4) }}
                        tintColor={colors.wheatWhite}
                        ratingColor={'#ADADAD'}
                        // showRating
                        onFinishRating={(rating) => {
                            console.log("Rating is: " + rating)
                        }}
                    />
                </View>

                <View>
                    <Text style={[styles.titleInput, { color: colors.secondaryBlack, }]}>Comment</Text>
                    <TextInput
                        style={[styles.commentInput, { backgroundColor: colors.fullWhite }]}
                        placeholder="Write your review here"
                        placeholderTextColor={colors.inActiveText}
                        maxLength={120}
                        multiline={true}
                        value={comment}
                        onChangeText={setComment}
                    />
                    <Text style={[styles.characterCount, { color: colors.primary }]}>{comment.length}/120</Text>
                </View>

                {
                    key == 'return' && (
                        <View>
                            <Text style={{ marginVertical: wp(2), fontFamily: fontFamily.PoppinsSemiBold, fontSize: hp(1.6), lineHeight: hp(2.4), color: colors.placeholder }}>Return Photos</Text>
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
                    )
                }
            </View>

            <Button onPress={() => setModalShow(!modalShow)}>Post Review</Button>

            <CallModal
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                title={'Review Added'}
                subTitle={'Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.'}
            />
        </View>
    )
}

export default AddReview

const styles = StyleSheet.create({
    mainDes: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsRegular,
        marginTop: wp(4),
        textAlign: 'center'
    },
    imageTopView: {
        marginTop: hp(4),
        alignSelf: 'center',
        justifyContent: 'center'
    },
    imageView: {
        width: wp(25),
        height: wp(25),
        borderRadius: widthPixel(100),
    },
    imageStyle: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        borderRadius: widthPixel(100)
    },
    titleReview: {
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        fontFamily: fontFamily.PoppinsMedium,
        textAlign: 'left',
        marginBottom: wp(2)
    },
    titleInput: {

        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsMedium,
        textAlign: 'left',
        marginBottom: wp(2)
    },
    commentInput: {
        height: hp(15),
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
    characterCount: {
        textAlign: 'left',
        fontFamily: fontFamily.PoppinsRegular,
        fontSize: hp(1.2),
        lineHeight: hp(1.8),
        marginVertical: wp(2)
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
})