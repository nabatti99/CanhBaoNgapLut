import React, { lazy, Suspense, useMemo } from 'react';
import { Colors, SkeletonView } from 'react-native-ui-lib';

function lazyLoad(dynamicImport) {
  return () => lazy(dynamicImport);
}

const iconSvgLoaders = {
  ArrowLeftCircleSVG: lazyLoad(() => import('../assets/icons/arrow_left_circle.svg')),
  ArrowRightCircleSVG: lazyLoad(() => import('../assets/icons/arrow_right_circle.svg')),
  ArrowRightSVG: lazyLoad(() => import('../assets/icons/arrow_right.svg')),
  ArrowUpCircleSVG: lazyLoad(() => import('../assets/icons/arrow_up_circle.svg')),
  CarFrontSVG: lazyLoad(() => import('../assets/icons/car_front.svg')),
  CheckboxCheckedSVG: lazyLoad(() => import('../assets/icons/checkbox_checked.svg')),
  ClockSVG: lazyLoad(() => import('../assets/icons/clock.svg')),
  CloudSVG: lazyLoad(() => import('../assets/icons/cloud.svg')),
  CoffeeSVG: lazyLoad(() => import('../assets/icons/coffee.svg')),
  CurrentLocationSVG: lazyLoad(() => import('../assets/icons/current_location.svg')),
  DetailsSVG: lazyLoad(() => import('../assets/icons/details.svg')),
  ExpandMoreSVG: lazyLoad(() => import('../assets/icons/expand_more.svg')),
  FastFoodSVG: lazyLoad(() => import('../assets/icons/fast_food.svg')),
  GasSVG: lazyLoad(() => import('../assets/icons/gas.svg')),
  MapSVG: lazyLoad(() => import('../assets/icons/map.svg')),
  MoreOptionsSVG: lazyLoad(() => import('../assets/icons/more_options.svg')),
  MotorBikeSVG: lazyLoad(() => import('../assets/icons/motor_bike.svg')),
  PhoneSVG: lazyLoad(() => import('../assets/icons/phone.svg')),
  SearchSVG: lazyLoad(() => import('../assets/icons/search.svg')),
  SendSVG: lazyLoad(() => import('../assets/icons/send.svg')),
  SendCircleSVG: lazyLoad(() => import('../assets/icons/send_circle.svg')),
  ShopSVG: lazyLoad(() => import('../assets/icons/shop.svg')),
  SlowMotionVideoSVG: lazyLoad(() => import('../assets/icons/slow_motion_video.svg')),
  StarFillSVG: lazyLoad(() => import('../assets/icons/star_fill.svg')),
  StarOutlineSVG: lazyLoad(() => import('../assets/icons/star_outline.svg')),
  StartLocationSVG: lazyLoad(() => import('../assets/icons/start_location.svg')),
  WarningSVG: lazyLoad(() => import('../assets/icons/warning.svg')),
};

function IconSvg({ name, color = Colors.gray700, width = 16, height = 16, ...props }) {
  const iconSvgLoader = iconSvgLoaders[name];
  const Icon = useMemo(() => iconSvgLoader(), [name, color, width, height]);

  return (
    <Suspense fallback={<SkeletonView circle height={height} />}>
      <Icon color={color} width={width} height={height} {...props} />
    </Suspense>
  );
}

export default IconSvg;
