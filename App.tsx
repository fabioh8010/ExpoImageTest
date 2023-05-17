// import {Image as ExpoImage} from 'expo-image';
import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import FastImage from 'react-native-fast-image';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PanPinchView} from './PanPinchView';

export default function App() {
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
}
