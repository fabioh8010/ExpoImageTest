import {Image as ExpoImage} from 'expo-image';
import React, {useState} from 'react';
import {View, useWindowDimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PanPinchView} from './PanPinchView';

export default function App() {
  const dimensions = useWindowDimensions();
  const [width, setWidth] = useState(dimensions.width);
  const [height, setHeight] = useState(dimensions.height);

  return (
    <GestureHandlerRootView style={{flex: 1, backgroundColor: 'green'}}>
      <PanPinchView minZoom={0.05} initialZoom={0.05} maxZoom={10}>
        <View style={{flex: 1, alignItems: 'center'}}>
          <ExpoImage
            style={[{width: width, height: height}]}
            onLoad={({source}) => {
              setWidth(source.width);
              setHeight(source.height);
            }}
            source={require('./tall_image.jpeg')}
            contentFit={'contain'}
          />
        </View>
      </PanPinchView>
    </GestureHandlerRootView>
  );
}
