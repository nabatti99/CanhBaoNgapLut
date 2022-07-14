import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import ListView from '../../../components/ListView';
import ItemSearchPlace from '../components/ItemSearchPlace';

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const TopArea = () => {
  return (
    <View>
      <ListView data={data} renderItem={({ item }) => <ItemSearchPlace item={item} />} />
    </View>
  );
};

export default TopArea;

const styles = StyleSheet.create({});
