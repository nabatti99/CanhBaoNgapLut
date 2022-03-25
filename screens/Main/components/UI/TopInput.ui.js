import React, { lazy, Suspense, useEffect, useState } from "react";
import { Colors, Incubator, Text, View } from "react-native-ui-lib";
import IconSvg from "../../../../components/IconSVG";

/**
 * Top Input on every screens
 * @param {String} value required
 * @param {Event} onChangeText required, Params: newValue
 * @param {String} leftIconName required
 * @param {String} label
 * @param {String} placeholder
 * @returns
 */
function TopInput({ value, onTextChange, leftIconName, label, placeholder }) {
  const handleTextChanged = (newValue) => {
    onTextChange(newValue);
  };

  let inputColor = Colors.blue300;
  if (value) inputColor = Colors.blue500;

  return (
    <View bg-gray50 br8 row centerV paddingH-s4 paddingV-s3>
      <View marginR-s2 row>
        <Suspense fallback={null}>
          <IconSvg name={leftIconName} color={inputColor} width={24} height={24} />
        </Suspense>
        <Text regular blue500 marginL-s1>
          {label}
        </Text>
      </View>
      <View width={1} height="100%" bg-gray200 marginR-s2 />
      <Incubator.TextField
        placeholder={placeholder}
        placeholderTextColor={Colors.blue300}
        strong
        gray500
        containerStyle={{ flexGrow: 1 }}
        selectionColor={Colors.blue100}
        value={value}
        onChangeText={handleTextChanged}
      />
    </View>
  );
}

export default TopInput;
