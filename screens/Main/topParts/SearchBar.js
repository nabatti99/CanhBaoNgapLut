import { FlatList, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import TopInput from '../components/UI/TopInput.ui';
import { Colors, Incubator, Text, View, Spacings, BorderRadiuses } from 'react-native-ui-lib';
import ItemSearchPlace from '../components/ItemSearchPlace';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useEffect } from 'react';

const data = [1, 2, 312321, 32, 12, 3, 123, 12, 3, 12, 3];

const SearchBar = () => {
  const [txtSearch, setTxtSearch] = useState('');

  const processValue = useSharedValue(0);

  const heightStyle = useAnimatedStyle(() => {
    return {
      height: 'auto',
      borderTopColor: Colors.blue500,
      borderTopWidth: interpolate(processValue.value, [0, 1], [0, 0.5], Extrapolate.CLAMP),
      maxHeight: interpolate(processValue.value, [0, 1], [0, 200], Extrapolate.CLAMP),
    };
  }, []);

  useEffect(() => {
    if (txtSearch.length > 0) {
      processValue.value = withTiming(1);
    } else {
      processValue.value = withTiming(0);
    }
  }, [txtSearch]);

  return (
    <View style={styles.container}>
      <TopInput
        value={txtSearch}
        onTextChange={(newValue) => setTxtSearch(newValue)}
        leftIconName={'SearchSVG'}
        placeholder={'Tìm kiếm địa điểm'}
      />

      <Animated.View style={[styles.containerResult, heightStyle]}>
        <FlatList
          scrollEventThrottle={16}
          data={data}
          renderItem={({ item, index }) => {
            const isLast = index === data.length - 1;
            return <ItemSearchPlace item={item} isLast={isLast} />;
          }}
          keyExtractor={(item, index) => index.toString()}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          scrollToOverflowEnabled={true}
        />
      </Animated.View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    marginBottom: Spacings.s2,
    borderRadius: BorderRadiuses.br8,
    backgroundColor: Colors.gray50,
    overflow: 'hidden',
  },
  containerResult: {
    width: '100%',
  },
});
