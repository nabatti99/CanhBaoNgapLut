import React from "react";
import { Colors, Image, Shadows, Text, TouchableOpacity, View } from "react-native-ui-lib";
import { useNavigate } from "react-router";

import SlowMotionVideoSVG from "../../assets/icons/slow_motion_video.svg";

function Splash1Screen() {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate("/Splash2");
  };

  return (
    <View flex>
      <View absF>
        <Image assetGroup="splash" assetName="smartCity" height="100%" width="100%" resizeMode="cover" />
      </View>
      <View right marginT-32 marginR-16>
        <TouchableOpacity paddingH-s4 paddingV-s3>
          <Text whiteAlpha800 strong>
            Bỏ qua
          </Text>
        </TouchableOpacity>
      </View>
      <View
        centerH
        marginT-100
        style={{
          ...Shadows.lg,
        }}
      >
        <Text
          white
          style={{
            fontFamily: "LatoHeavy",
            fontSize: 52,
            letterSpacing: -4,
          }}
        >
          ỨNG DỤNG
        </Text>
        <Text white regular>
          cho thành phố thông minh
        </Text>
      </View>
      <View flex bottom>
        <TouchableOpacity
          activeOpacity={0.8}
          centerH
          row
          br16
          paddingV-s3
          marginH-s8
          marginB-s3
          style={{
            borderWidth: 1,
            borderColor: Colors.white,
          }}
        >
          <View marginR-s2>
            <SlowMotionVideoSVG color={Colors.white} />
          </View>
          <Text white h3>
            Video hướng dẫn
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          centerH
          row
          br16
          paddingV-s3
          marginH-s8
          marginB-s6
          bg-white
          onPress={handleNext}
        >
          <Text gray700 h3>
            Tiếp theo
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default Splash1Screen;
