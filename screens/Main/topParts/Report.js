import React, { useState } from 'react';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';

const list = [
  {
    name: 'Báo lỗi, góp ý',
    icon: 'CoffeeSVG',
  },
  {
    name: 'Báo lỗi, góp ý',
    icon: 'CoffeeSVG',
  },
];

const ReportMenu = () => {
  const [isShownMenu, setIsShownMenu] = useState(false);
  return (
    <View>
      <TouchableOpacity
        backgroundColor={isShownMenu ? Colors.blue400 : Colors.white}
        padding-4
        br4
        md
        activeOpacity={0.8}
        onPress={() => setIsShownMenu(!isShownMenu)}
      >
        <IconSvg name={'CoffeeSVG'} width={24} height={24} color={isShownMenu ? Colors.white : Colors.gray700} />
      </TouchableOpacity>
      <View
        style={{ opacity: isShownMenu ? 1 : 0 }}
        absR
        marginT-40
        width={130}
        br4
        md
        paddingH-8
        paddingV-4
        right
        backgroundColor={Colors.white}
      >
        {list.map((item, index) => {
          return (
            <TouchableOpacity key={index} row paddingV-4 onPress={() => console.log(index)}>
              <Text marginR-4>{item.name}</Text>
              <IconSvg name={item.icon} width={24} height={24} color={Colors.black} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ReportMenu;
