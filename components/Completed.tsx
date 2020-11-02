import React from 'react';
import {View} from 'react-native';
import {Card} from 'react-native-paper';

export const Completed = () => {
  return (
    <>
      <View>
        <Card>
          <Card.Cover
            source={{
              uri:
                'https://sdl-stickershop.line.naver.jp/products/0/0/2/2407/android/stickers/79817.png;compress=true',
            }}
          />
        </Card>
      </View>
    </>
  );
};

export default Completed;
