// import {Image as ExpoImage} from 'expo-image';
import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PanPinchView} from './PanPinchView';
import FastImage from 'react-native-fast-image';

export default function App() {
  const dimensions = useWindowDimensions();
  // const [width, setWidth] = useState(dimensions.width);
  // const [height, setHeight] = useState(dimensions.height);
  // tall_image.jpeg dimensions, hardcoded for now but this is what Expo was giving and it matches image's dimensions.
  const [width, setWidth] = useState(875);
  const [height, setHeight] = useState(14894);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'green'}}>
      <PanPinchView minZoom={0.05} initialZoom={0.05} maxZoom={10}>
        <View style={{flex: 1, alignItems: 'center'}}>
          {/* <ExpoImage
            style={[{width: width, height: height}]}
            onLoad={({source}) => {
              setWidth(source.width);
              setHeight(source.height);
              console.log(source);
            }}
            source={require('./tall_image.jpeg')}
            contentFit={'contain'}
          /> */}
          <FastImage
            style={[{width: width, height: height}]}
            onLoad={e => {
              // setWidth(source.width);
              // setHeight(source.height);
              console.log(e.nativeEvent);
            }}
            source={require('./tall_image.jpeg')}
          />
        </View>
      </PanPinchView>
    </GestureHandlerRootView>
  );
}
