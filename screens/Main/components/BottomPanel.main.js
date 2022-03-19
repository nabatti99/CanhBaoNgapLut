import React from "react";
import { BorderRadiuses, Colors, Shadows, Text, View } from "react-native-ui-lib";

function BottomPanelMain({ children }) {
  return (
    <View
      height={218}
      bg-white
      paddingH-s6
      style={{
        ...Shadows.md,
        borderTopLeftRadius: BorderRadiuses.br32,
        borderTopRightRadius: BorderRadiuses.br32,
      }}
    >
      <View centerH marginT-s4 marginB-s6>
        <View width={52} height={4} bg-gray100 br100 />
      </View>

      {children}
    </View>
  );
}

export default BottomPanelMain;
