import React, { useEffect, useRef, useState } from "react";
import { View, StyleSheet, Platform, SafeAreaView, Image, ImageBackground, TouchableOpacity, StatusBar, Text, FlatList, Pressable, Dimensions } from "react-native";
import HomeHeader from "../../../components/homeHeader/HomeHeader";
import RentalCard from "../../../components/carItem/CarItem";
import { useTheme } from "@react-navigation/native";

export default Favourite = (props) => {
  const { colors } = useTheme()
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.wheatWhite }}>
      <HomeHeader title={'Favourites'} />
      <View style={{ flex: 1 }}>
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }]}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            return (
              <RentalCard item={item} key={index} navigation={props.navigation} isFavourite />
            )
          }}
        />
      </View>
    </SafeAreaView>
  )
};
