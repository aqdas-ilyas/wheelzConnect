import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '@react-navigation/native';
import DocumentPicker, { types } from 'react-native-document-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Header from '../../../components/header';
import Button from '../../../components/button';
import FullModal from '../../../components/fullModal/FullModal';
import { Loader } from '../../../components/loader/Loader';
import { colors, wp, hp, fontFamily, appIcons, appImages, routes } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';

const UploadDocument = (props) => {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState(false);
    const [modalShow, setModalShow] = useState(false);
    const [documents, setDocuments] = useState([]);

    const PickDocumentFromFile = async () => {
        try {
            const result = await DocumentPicker.pick({
                type: [types.pdf],
                allowMultiSelection: true,
            });

            if (result.length > 0) {
                for (let index = 0; index < result.length; index++) {
                    const isDuplicate = documents.some(doc => doc.uri === result[index].uri);
                    if (isDuplicate) {
                        console.log('Duplicate Document', 'This document has already been uploaded.');
                        return;
                    }

                    setDocuments(prevDocs => [...prevDocs, { uri: result[index].uri, name: result[index].name }]);
                }
            }


        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                console.error(err);
            }
        }
    };

    const deleteDocument = (uri) => {
        setDocuments(documents.filter(doc => doc.uri !== uri));
    };

    const renderDocument = ({ item }) => (
        <View style={[appStyles.rowBtw, { marginTop: wp(5) }]}>
            <View style={appStyles.rowCenter}>
                <Image source={appIcons.document} style={{ width: wp(10), height: wp(10) }} />
                <Text numberOfLines={1} style={{ marginLeft: wp(2), fontFamily: fontFamily.PoppinsRegular, fontSize: hp(1.8), lineHeight: hp(2.8), color: colors.placeholder, width: wp(50) }}>{item.name}</Text>
            </View>
            <TouchableOpacity onPress={() => deleteDocument(item.uri)}>
                <Entypo name='circle-with-cross' color={colors.placeholder} size={wp(6)} />
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />
            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Upload Document'} />

                <Text style={[styles.titleHeader, { color: colors.secondaryBlack, marginTop: wp(5) }]}>Upload Insurance Document</Text>

                <Text style={[styles.uploadTitleText, { color: colors.placeholder }]}>Upload Document</Text>
                <View style={styles.container}>
                    <TouchableOpacity onPress={() => PickDocumentFromFile()} activeOpacity={0.9} style={[styles.uploadBox, { backgroundColor: colors.fullWhite }]}>
                        <AntDesign name="upload" size={wp(5)} color="#00BFFF" />
                        <Text style={styles.uploadText}>Upload Document</Text>
                    </TouchableOpacity>
                </View>

                <FlatList
                    data={documents}
                    keyExtractor={(item) => item.uri}
                    renderItem={renderDocument}
                />
            </View>

            <Button onPress={() => [setModalShow(true), setTimeout(() => [props.navigation.navigate(routes.hostTab, { screen: 'Home' }), setModalShow(false)], 5000)]}>Next</Button>

            <FullModal
                imgSRC={appImages.wait}
                modalShow={modalShow}
                setModalShow={() => setModalShow(!modalShow)}
                topTitle={'Vehicle Verification'}
                title={'Please Wait'}
                subTitle={'Lorem ipsum dolor sit amet consectetur. Maecenas nisi vitae a mattis sed dignissim.'}
            />
        </View>
    );
};

export default UploadDocument;

const styles = StyleSheet.create({
    titleHeader: {
        fontSize: hp(1.6),
        lineHeight: hp(2.4),
        fontFamily: fontFamily.PoppinsRegular,
        textAlign: 'left',
    },
    uploadTitleText: {
        fontFamily: fontFamily.PoppinsMedium,
        fontSize: hp(1.8),
        lineHeight: hp(2.7),
        marginTop: wp(5)
    },
    container: {
        alignItems: 'center',
        marginVertical: wp(2)
    },
    uploadBox: {
        width: wp(90),
        height: wp(30),
        borderWidth: 2,
        borderColor: '#00BFFF',
        borderStyle: 'dashed',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    uploadText: {
        marginTop: 5,
        fontFamily: fontFamily.LatoBold,
        color: colors.primary,
        fontSize: hp(1.6),
        lineHeight: hp(2.4)
    },
});
