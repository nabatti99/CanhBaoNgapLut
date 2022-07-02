import { StyleSheet } from 'react-native';
import React from 'react';
import { Colors, Incubator, Text, View } from 'react-native-ui-lib';

const ItemSearchPlace = ({ item, isLast }) => {
  const styles = StyleSheet.create({
    container: {
      borderBottomColor: Colors.gray500,
      borderBottomWidth: isLast ? 0 : 0.5,
    },
  });

  return (
    <View paddingH-s3 paddingV-s2 row style={styles.container}>
      <Text strong gray500>
        54 Nguyễn Lương Bằng, Hoà Khánh Nam, Liên Chiểu, Đà Nẵng
      </Text>
    </View>
  );
};

export default ItemSearchPlace;
