import { FlatList } from 'react-native';
import React, { useEffect } from 'react';
import { BorderRadiuses, Colors, Image, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import { useDispatch } from 'react-redux';
import IconSvg from '../../../components/IconSVG';
import ItemAddress from '../components/ItemAddress';
import { setTopInput } from '../store/mapStore';

const list = [
  {
    time: '2 năm trước',
    description:
      'Quán cf đẹp, mát mẻ đồ uống tạm đc ... Phù hợp đưa gia đình đến những ngày cuối tuần, có hồ cá chép coi cho trẻ ngắm :)',
    images: ['coffee', 'coffee', 'coffee'],
  },
  {
    time: '2 năm trước',
    description:
      'Quán cf đẹp, mát mẻ đồ uống tạm đc ... Phù hợp đưa gia đình đến những ngày cuối tuần, có hồ cá chép coi cho trẻ ngắm :)',
    images: ['coffee', 'coffee', 'coffee'],
  },
  {
    time: '2 năm trước',
    description:
      'Quán cf đẹp, mát mẻ đồ uống tạm đc ... Phù hợp đưa gia đình đến những ngày cuối tuần, có hồ cá chép coi cho trẻ ngắm :)',
    images: ['coffee', 'coffee', 'coffee'],
  },
  {
    time: '2 năm trước',
    description:
      'Quán cf đẹp, mát mẻ đồ uống tạm đc ... Phù hợp đưa gia đình đến những ngày cuối tuần, có hồ cá chép coi cho trẻ ngắm :)',
    images: ['coffee', 'coffee', 'coffee'],
  },
  {
    time: '2 năm trước',
    description:
      'Quán cf đẹp, mát mẻ đồ uống tạm đc ... Phù hợp đưa gia đình đến những ngày cuối tuần, có hồ cá chép coi cho trẻ ngắm :)',
    images: ['coffee', 'coffee', 'coffee'],
  },
];

const LocationDetail = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      setTopInput({
        label: '',
        value: '',
        leftIconName: 'SearchSVG',
        placeholder: 'Địa điểm bạn muốn đến ...',
      })
    );
  }, []);

  const Header = () => {
    return (
      <View>
        <ItemAddress />
        <View>
          <View row marginB-s4 centerV>
            <IconSvg name='StarFillSVG' color={Colors.yellow400} />
            <Text marginL-s2>Đang mở cửa: 07:30 - 22:00</Text>
          </View>
          <View row marginB-s4 centerV>
            <IconSvg name='StarFillSVG' color={Colors.yellow400} />
            <Text marginL-s2>0967121541 - 066757123</Text>
          </View>
          <View row marginB-s4 centerV>
            <IconSvg name='StarFillSVG' color={Colors.yellow400} />
            <Text marginL-s2>Khoảng cách: 1.2 km</Text>
          </View>
        </View>
        <View>
          <Text strong gray700>
            Các bài đánh giá
          </Text>
        </View>
      </View>
    );
  };

  const ItemImage = ({ image }) => {
    return (
      <View marginT-s2>
        <Image
          assetGroup='demo'
          assetName={image}
          resizeMode='cover'
          style={{
            borderRadius: BorderRadiuses.br8,
          }}
          width={86}
          height={86}
          marginR-s3
        />
      </View>
    );
  };

  const ItemLocationDetail = ({ item }) => {
    const { time, description, images } = item;
    return (
      <View marginV-s1>
        <Text small gray300 marginV-s1>
          {time}
        </Text>
        <Text>{description}</Text>
        <FlatList
          data={images}
          horizontal
          renderItem={({ item }) => <ItemImage image={item} />}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    );
  };

  return (
    <View marginT-s3 flex>
      <FlatList
        data={list}
        renderItem={({ item }) => <ItemLocationDetail item={item} />}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={Header}
      />
      <View backgroundColor={Colors.white} br4 md style={{ position: 'absolute', right: 0, bottom: 24 }}>
        <TouchableOpacity activeOpacity={0.8} br4 md backgroundColor={Colors.blue400} paddingV-s2 paddingH-s3>
          <View row centerV>
            <Text white strong marginR-s1>
              Chỉ đường
            </Text>
            <IconSvg name='ArrowRightSVG' color={Colors.white} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LocationDetail;
