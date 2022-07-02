import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Modal, Text, View, TouchableOpacity } from 'react-native-ui-lib';
import IconSvg from '../../../components/IconSVG';

const maps = [
  {
    name: 'Mưa theo ngày',
    time: ' Cập nhật lúc 00:00',
  },
  {
    name: 'Mưa theo 1 giờ',
    time: ' Cập nhật lúc 10:00',
  },
  {
    name: 'Mưa theo 3 giờ',
    time: ' Cập nhật lúc 08:00',
  },
  {
    name: 'Mưa theo 6 giờ',
    time: ' Cập nhật lúc 03:00',
  },
];

const RainMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMap, setCurrentMap] = useState(0);
  const handleClick = () => setModalVisible(!modalVisible);
  return (
    <View>
      <TouchableOpacity
        backgroundColor={Colors.white}
        paddingH-s2
        paddingV-s2
        row
        br4
        md
        activeOpacity={0.8}
        onPress={handleClick}
      >
        <IconSvg name={'MapSVG'} width={24} height={24} />
        <View paddingB-s1>
          <Text strong marginL-8>
            Mưa ngày
          </Text>
        </View>
      </TouchableOpacity>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity
          flex
          centerH
          centerV
          backgroundColor={Colors.blackAlpha600}
          onPress={() => setModalVisible(!modalVisible)}
          activeOpacity={1}
        >
          <View md backgroundColor={Colors.white} br8 width={334}>
            <View row centerV style={styles.modalView} paddingV-8 paddingH-20>
              <IconSvg name={'MapSVG'} width={24} height={24} />
              <Text strong marginL-4>
                Chọn bản đồ
              </Text>
            </View>
            <View style={{ overflow: 'hidden' }} br8>
              {maps.map((map, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    activeOpacity={0.8}
                    row
                    spread
                    paddingV-12
                    paddingH-20
                    backgroundColor={currentMap == index ? Colors.gray100 : Colors.white}
                    onPress={() => setCurrentMap(index)}
                  >
                    <Text regular>{map.name}</Text>
                    <Text small gray300>
                      {map.time}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

export default RainMenu;

const styles = StyleSheet.create({
  modalView: {
    borderBottomColor: Colors.gray300,
    borderBottomWidth: 0.4,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
