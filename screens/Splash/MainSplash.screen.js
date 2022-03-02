import React, { useEffect } from "react";
import { BorderRadiuses, Colors, Image, Shadows, Text, View } from "react-native-ui-lib";
import Svg, { Circle } from "react-native-svg";
import { useNavigate } from "react-router";

import CanhBaoNgapLutSVG from "../../assets/pictures/canh_bao_ngap_lut.svg";
import WaveLineSVG from "../../assets/pictures/wave_line.svg";
import WarningSplashSVG from "../../assets/pictures/warning_splash.svg";
import Wave1SVG from "../../assets/pictures/wave1.svg";
import Wave2SVG from "../../assets/pictures/wave2.svg";

function MainSplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      console.log(123);
      navigate("/Splash1", { replace: true });
    }, 1000);
  }, []);

  return (
    <View flex bg-blue50>
      <View centerH marginT-52>
        <View br100 width={40} height={40} centerH centerV>
          <Text small blue500>
            40%
          </Text>
        </View>

        <View absT centerH>
          <Svg width={40} height={40}>
            <Circle x={1} y={1} cx={19} cy={19} r={19} stroke={Colors.blue200} strokeWidth={2} />
            <Circle
              x={1}
              y={1}
              cx={19} // (40 - 2) / 2
              cy={19}
              r={19}
              stroke={Colors.blue500}
              strokeWidth={2}
              strokeDasharray={19 * 2 * Math.PI}
              strokeDashoffset={20}
            />
          </Svg>
        </View>
      </View>

      <View
        flexG
        marginT-40
        marginH-s6
        paddingV-s8
        bg-white
        style={{
          ...Shadows.lg,
          shadowColor: Colors.gray300,
          borderTopLeftRadius: BorderRadiuses.br32,
          borderTopRightRadius: BorderRadiuses.br32,
          overflow: "hidden",
        }}
      >
        <View paddingH-s6>
          <Text
            style={{
              fontFamily: "LatoBold",
              fontSize: 16,
            }}
            gray400
          >
            ỨNG DỤNG
          </Text>
          <View marginT-12>
            <CanhBaoNgapLutSVG width="82%" />
          </View>
          <Text
            gray400
            marginT-8
            style={{
              fontFamily: "BeVNProLight",
              fontSize: 16,
            }}
          >
            cho thành phố thông minh
          </Text>
        </View>

        <View marginT-46>
          <WaveLineSVG width="100%" />
        </View>

        <View flex right marginT-s6>
          <WarningSplashSVG />
        </View>
      </View>

      <View width="100%" absB height="45%" style={{ ...Shadows.lg, shadowColor: Colors.transparent }}>
        <View absB height="100%">
          <Wave1SVG />
        </View>

        <View absB height="58%">
          <Wave2SVG />
        </View>

        <View absB marginL-24 marginB-40>
          <Image assetGroup="logo" assetName="bk" style={{ width: 34, height: 34 }} />
        </View>
      </View>
    </View>
  );
}

export default MainSplashScreen;
