import React, { useState, useRef, useEffect } from 'react';
import { View, Text, useWindowDimensions, Image, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { colors, hp, fontFamily, wp, routes, heightPixel, widthPixel, appIcons, appImages } from '../../../services';
import appStyles from '../../../services/utilities/appStyles';
import Header from '../../../components/header';
import { Loader } from '../../../components/loader/Loader';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { useTheme } from '@react-navigation/native';

const MyReview = (props) => {
  const { colors } = useTheme()
  const [isLoading, setIsLoading] = useState(false)

  return (
    <View style={[appStyles.safeContainer, { backgroundColor: colors.wheatWhite }]}>
      <Loader loading={isLoading} />

      <View style={{ flex: 1, margin: wp(4) }}>
        <Header leftIcon onleftIconPress={() => props.navigation.goBack()} title={'Reviews'} />
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }, { id: 9 }, { id: 10 }]}
          ListHeaderComponent={
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: wp(5) }}>
              <Text style={[styles.ListHeader, { color: colors.secondaryBlack }]}>Reviews <Text style={styles.numberOfReviews}>(100+)</Text></Text>
              <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginLeft: wp(5) }}>
                <Image source={appIcons.star} style={{ width: wp(4), height: wp(4) }} />
                <Text style={styles.numberOfReviews}> (4.5)</Text>
              </View>
            </View>
          }
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return (
              <View key={index} style={{ marginTop: wp(5) }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={appIcons.userChatIcon} style={{ width: wp(12), height: wp(12) }} />
                    <View style={{ justifyContent: 'center', marginLeft: wp(3) }}>
                      <Text style={[styles.userName, { color: colors.secondaryBlack }]}>George</Text>
                      {/* <Rating
                        type="custom"
                        ratingCount={5}
                        imageSize={10}
                        tintColor={colors.wheatWhite}
                        ratingColor={'#F4A521'}
                        // showRating
                        onFinishRating={(rating) => {
                          console.log("Rating is: " + rating)
                        }}
                      /> */}
                      <Image source={appImages.starContainer} style={{ width: wp(16), height: wp(2.2) }} />
                    </View>
                  </View>
                  <Text style={styles.userMessage}>1 Day ago</Text>
                </View>

                <Text style={styles.userMessage}>Driver is very good and respectable</Text>
              </View>
            )
          }}
        />

      </View>
    </View>
  );
};

export default MyReview;

const styles = StyleSheet.create({
  ListHeader: {
    fontFamily: fontFamily.PoppinsMedium,
    fontSize: hp(1.8),
    lineHeight: hp(2.7),
  },
  numberOfReviews: {
    fontFamily: fontFamily.PoppinsRegular,
    fontSize: hp(1.6),
    lineHeight: hp(2.7),
    color: colors.placeholder
  },
  userName: {
    fontSize: hp(1.5),
    lineHeight: hp(2.3),
    fontFamily: fontFamily.PoppinsRegular,
  },
  userMessage: {
    fontSize: hp(1.5),
    lineHeight: hp(2.3),
    fontFamily: fontFamily.PoppinsRegular,
    color: '#8A8A8F',
    marginTop: wp(2)
  },
});
