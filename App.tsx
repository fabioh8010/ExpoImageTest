import React, { useState } from 'react';
import { Image, View, useWindowDimensions } from 'react-native';
import FastImage from 'react-native-fast-image';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ImageZoom from 'react-native-image-pan-zoom';
import { Zoom } from 'react-native-reanimated-zoom';
import { PanPinchView } from './PanPinchView';
import { PanPinchView2 } from './PanPinchView2';

export default function App() {
  return <ReanimatedZoomFrameworkWithFastImage />;
}

const ReanimatedZoomFrameworkWithFastImage = () => {
  const dimensions = useWindowDimensions();
  const [height, setHeight] = useState(14894);
  const [width, setWidth] = useState(875);

  return (
    <Zoom>
      <FastImage
        style={[{width, height}]}
        onLoad={e => {
          console.log(e.nativeEvent);
        }}
        resizeMode={FastImage.resizeMode.contain}
        source={require('./image-1.jpeg')}
      />
    </Zoom>
  );
};

const ReanimatedZoomWithReactImage = () => {
  const dimensions = useWindowDimensions();
  const [height, setHeight] = useState(14894);
  const [width, setWidth] = useState(875);

  return (
    <Zoom style={{width: dimensions.width, height: dimensions.height}}>
      <Image
        style={[{width, height}]}
        onLoad={e => {
          console.log(e.nativeEvent);
        }}
        resizeMode="contain"
        source={require('./image-1.jpeg')}
      />
    </Zoom>
  );
};

const CustomPanPinchWithFastImage = () => {
  const dimensions = useWindowDimensions();
  const [width, setWidth] = useState(875);
  const [height, setHeight] = useState(14894);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'green'}}>
      <PanPinchView minZoom={0.05} initialZoom={0.05} maxZoom={10}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <FastImage
            style={[{width: width, height: height}]}
            onLoad={e => {
              console.log(e.nativeEvent);
            }}
            source={require('./image-1.jpeg')}
          />
        </View>
      </PanPinchView>
    </GestureHandlerRootView>
  );
};

const CustomPanPinch2WithFastImage = () => {
  const dimensions = useWindowDimensions();
  const [height, setHeight] = useState(14894);
  const [width, setWidth] = useState(875);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'green'}}>
      <PanPinchView2>
        <FastImage
          style={[{width: '100%', height: '100%'}]}
          onLoad={e => {
            console.log(e.nativeEvent);
          }}
          source={require('./image-1.jpeg')}
        />
      </PanPinchView2>
    </GestureHandlerRootView>
  );
};
const ExpensifyCurrentSolution = () => {
  const dimensions = useWindowDimensions();
  const [height, setHeight] = useState(14894);
  const [width, setWidth] = useState(875);

  return (
    <ImageZoom
      cropHeight={dimensions.height}
      cropWidth={dimensions.width}
      imageHeight={height}
      imageWidth={width}>
      <FastImage
        style={[{width: width, height: height}]}
        onLoad={e => {
          console.log(e.nativeEvent);
        }}
        source={require('./image-1.jpeg')}
        resizeMode={FastImage.resizeMode.contain}
      />
    </ImageZoom>
  );
};
