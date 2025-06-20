import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, TouchableOpacity, StatusBar, Text, FlatList, Pressable, Dimensions } from "react-native";
import { heightPixel, hp, routes, widthPixel, wp } from "../../../services/constants";
import { appIcons, appImages } from "../../../services/utilities/assets";
import { colors, fontFamily } from "../../../services";
import HomeHeader from "../../../components/homeHeader/HomeHeader";
import { Input } from "../../../components/input";
import { useTheme } from "@react-navigation/native";

export default Chat = (props) => {
  const { colors } = useTheme()
  const [search, setSearch] = useState("")

  useLayoutEffect(() => {
    props.navigation.getParent()?.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () => {
      props.navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
        },
      });
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
      <HomeHeader leftIcon={appIcons.appLogo} onleftIconPress={() => props.navigation.navigate(routes.setting)} title={'Chat'} />

      <View style={{ flex: 1 }}>
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
            borderRadius: 5,
            width: wp(90),
            alignSelf: "center",
            marginTop: -hp(3),
            marginBottom: hp(2),
            backgroundColor: 'transparent'
          }}
        />

        <View style={{ flex: 1, marginHorizontal: wp(4) }}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }, { id: 6 }, { id: 7 }, { id: 8 }]}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity activeOpacity={0.9} key={index} onPress={() => props.navigation.navigate(routes.message)} style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: wp(5) }}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image source={appIcons.userChatIcon} style={{ width: wp(12), height: wp(12) }} />
                    <View style={{ justifyContent: 'space-evenly', marginLeft: wp(3) }}>
                      <Text style={[styles.userName, { color: colors.secondaryBlack }]}>John Doe</Text>
                      <Text style={[styles.userMessage, { color: colors.placeholder }]}>{index > 2 ? 'use java for better interaction' : 'congratulations'}</Text>
                    </View>
                  </View>

                  {
                    index > 2
                      ? <Text style={styles.userMessageDate}>01/11/19</Text>
                      : (
                        <View style={{ justifyContent: 'space-evenly', alignItems: 'flex-end' }}>
                          <Text style={styles.userMessageTime}>21:08</Text>
                          <View style={styles.userMessageCountView}>
                            <Text style={styles.userMessageCount}>4</Text>
                          </View>
                        </View>
                      )
                  }
                </TouchableOpacity>
              )
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  userName: {
    fontSize: hp(1.6),
    lineHeight: hp(2.4),
    fontFamily: fontFamily.PoppinsMedium,
  },
  userMessage: {
    fontSize: hp(1.2),
    lineHeight: hp(1.8),
    fontFamily: fontFamily.PoppinsRegular,
    color: '#808080'
  },
  userMessageTime: {
    fontSize: hp(1.2),
    lineHeight: hp(1.8),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.primary
  },
  userMessageCountView: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    paddingHorizontal: wp(1),
  },
  userMessageCount: {
    fontSize: hp(1.2),
    lineHeight: hp(1.8),
    fontFamily: fontFamily.PoppinsMedium,
    color: colors.fullWhite,
  },
  userMessageDate: {
    fontSize: hp(1.2),
    lineHeight: hp(1.8),
    fontFamily: fontFamily.PoppinsMedium,
    color: '#898989',
    paddingTop: wp(4)
  }
});