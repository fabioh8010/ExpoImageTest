import {Image as ExpoImage} from 'expo-image';
import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, useWindowDimensions} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {PanPinchView} from './PanPinchView';

export default function App() {
  const dimensions = useWindowDimensions();
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={{flex: 1, backgroundColor: 'green'}}>
        <PanPinchView minZoom={1} maxZoom={10}>
          <ExpoImage
            style={[
              styles.image,
              {width: dimensions.width, height: dimensions.height},
            ]}
            source={require('./tall_image.jpeg')}
            contentFit={'contain'}
          />
        </PanPinchView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
