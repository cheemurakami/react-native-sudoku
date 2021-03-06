import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button} from 'react-native-paper';

interface Props {
  pressHandler: (pressedNum: number) => void;
}

const NumberSection = (props: Props) => {
  const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  return (
    <View style={styles.numberSectionContainer}>
      {nums.map((num) => {
        return (
          <Button
            style={styles.numButton}
            key={num}
            mode="outlined"
            compact={true}
            onPress={() => props.pressHandler(num)}>
            {num.toString()}
          </Button>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  numberSectionContainer: {
    flexDirection: 'row',
    margin: 40,
    padding: 10,
    opacity: 0.85,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  numButton: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default NumberSection;
