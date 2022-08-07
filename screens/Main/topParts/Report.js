import React, { useState } from 'react';
import { Colors, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';

const list = [
  {
    name: 'Báo lỗi, góp ý',
    icon: 'NewMessageSVG',
  },
  {
    name: 'Báo lỗi, góp ý',
    icon: 'NewMessageSVG',
  },
];

const ReportMenu = () => {
  const [isShownMenu, setIsShownMenu] = useState(false);
  return (
    <View>
      <View backgroundColor={isShownMenu ? Colors.blue400 : Colors.white} padding-4 br4 md>
        <IconSvg
          name={'MoreOptionsSVG'}
          width={24}
          height={24}
          color={isShownMenu ? Colors.white : Colors.gray700}
          onPress={() => setIsShownMenu(!isShownMenu)}
        />
      </View>
      <View
        style={{ opacity: isShownMenu ? 1 : 0 }}
        absR
        marginT-40
        width={142}
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
              <Text marginR-4 regular>
                {item.name}
              </Text>
              <IconSvg name={item.icon} width={24} height={24} color={Colors.black} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

export default ReportMenu;
