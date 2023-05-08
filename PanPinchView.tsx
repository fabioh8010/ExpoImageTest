import React from 'react';
import {
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import {isIOS} from './utils';

interface PanPinchProps {
  maxZoom?: number;
  minZoom?: number;
  children: React.ReactNode;
  initialZoom?: number;
}
export function PanPinchView({
  children,
  maxZoom,
  minZoom,
  initialZoom,
}: PanPinchProps) {
  const X = useSharedValue(0);
  const Y = useSharedValue(0);
  const Z = useSharedValue(initialZoom ?? 1);

  const pinchHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {focalY: number; offsetZ: number}
  >({
    onStart: (_, ctx) => {
      ctx.offsetZ = Z.value;
    },
    onActive: ({scale: z}, ctx) => {
      const currentZ = ctx.offsetZ * z;

      const maxCondition = maxZoom === undefined ? true : currentZ < maxZoom;
      const minCondition = minZoom === undefined ? true : currentZ > minZoom;

      if (maxCondition && minCondition) {
        Z.value = currentZ;
      }
    },
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: X.value}, {translateY: Y.value}, {scale: Z.value}],
  }));

  return (
    <PinchGestureHandler
      onHandlerStateChange={pinchHandler}
      onGestureEvent={pinchHandler}>
      <Animated.View
        onMoveShouldSetResponder={() => isIOS}
        style={animatedStyles}>
        {children}
      </Animated.View>
    </PinchGestureHandler>
  );
}
