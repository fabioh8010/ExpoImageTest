import React from 'react';
import { StyleSheet } from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PinchGestureHandler,
  PinchGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface PanPinchProps {
  maxZoom?: number;
  minZoom?: number;
  children: React.ReactNode;
  initialZoom?: number;
}

export function PanPinchView2({
  children,
  maxZoom,
  minZoom,
  initialZoom,
}: PanPinchProps) {
  const X = useSharedValue(0);
  const Y = useSharedValue(0);
  const Z = useSharedValue(initialZoom ?? 1);

  const panRef = React.useRef<PanGestureHandler>(null);
  const pinchRef = React.useRef<PinchGestureHandler>(null);

  const pinchHandler = useAnimatedGestureHandler<
    PinchGestureHandlerGestureEvent,
    {focalY: number; offsetZ: number}
  >({
    onStart: (_, ctx) => {
      ctx.offsetZ = Z.value;
    },
    onActive: ({scale: z}, ctx) => {
      const currentZ = ctx.offsetZ * z;

      const maxScale = maxZoom === undefined ? true : currentZ > maxZoom;
      const minScale = minZoom === undefined ? true : currentZ < minZoom;

      if (!maxScale && !minScale) {
        Z.value = currentZ;
      }
    },
  });

  const panHandler = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {offsetX: number; offsetY: number}
  >({
    onStart: (_, ctx) => {
      ctx.offsetX = X.value;
      ctx.offsetY = Y.value;
    },
    onActive: (event, ctx) => {
      X.value = ctx.offsetX + event.translationX;
      Y.value = ctx.offsetY + event.translationY;
    },
  });

  const animatedStyles = useAnimatedStyle(() => ({
    transform: [{translateX: X.value}, {translateY: Y.value}, {scale: Z.value}],
  }));

  return (
    <PanGestureHandler
      ref={panRef}
      simultaneousHandlers={pinchRef}
      onGestureEvent={panHandler}
      onHandlerStateChange={panHandler}>
      <Animated.View style={styles.wrapper}>
        <PinchGestureHandler
          ref={pinchRef}
          simultaneousHandlers={panRef}
          onGestureEvent={pinchHandler}
          onHandlerStateChange={pinchHandler}>
          <Animated.View
            collapsable={true}
            style={[styles.wrapper, animatedStyles]}>
            {children}
          </Animated.View>
        </PinchGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});
