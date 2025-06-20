import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import { Input } from '../../../components/input';
import CarList from '../../../components/carList';
import { useTheme } from '@react-navigation/native';

const History = (props) => {
    const { colors } = useTheme()
    const [isLoading, setIsLoading] = useState(false)
    const [search, setSearch] = useState("")
    const [modalShow, setModalShow] = useState(false)

    return (
        <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
            <Loader loading={isLoading} />

            <View style={{ flex: 1, margin: wp(4) }}>
                <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'History'} />

                <Input
                    placeholder={' Search'}
                    value={search}
                    leftIcon={appIcons.search}
                    onChangeText={(e) => setSearch(e)}
                    containerStyle={{
                        borderRadius: 15,
                        backgroundColor: 'transparent'
                    }}
                    WholeContainer={{
                        width: wp(90),
                        alignSelf: "center",
                        marginTop: -hp(3),
                        marginBottom: hp(2),
                    }}
                />

                <FlatList
                    data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
                    keyExtractor={(item, index) => index}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item, index }) => {
                        return (
                            <CarList item={item} key={index} navigation={props.navigation} />
                        )
                    }}
                />
            </View>
        </View>
    );
};

export default History;

const styles = StyleSheet.create({

});
