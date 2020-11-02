import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

export const Completed = () => {
  return (
    <>
      <View>
        <Image
          source={{
            uri:
              'https://sdl-stickershop.line.naver.jp/products/0/0/2/2407/android/stickers/79817.png;compress=true',
          }}
          style={styles.completedImg}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  completedImg: {
    height: 100,
    resizeMode: 'center',
  },
});

export default Completed;
