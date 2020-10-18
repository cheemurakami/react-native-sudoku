/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Alert,
  TouchableHighlight,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NumberSection from './components/NumberSection';
import {Button} from 'react-native-paper';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [randomIndexArr, setRandomIndexArr] = useState<Array<number>>([]);
  const [selectedCell, setSelectedCell] = useState<Array<number>>([]);
  const [guessedPositions, setGuessedPositions] = useState<any[][] | any[]>([]);

  const answers: any[][] = [
    [9, 6, 4, 5, 8, 7, 3, 1, 2],
    [1, 7, 2, 6, 3, 4, 8, 9, 5],
    [3, 4, 5, 7, 9, 8, 1, 2, 6],
    [6, 8, 9, 2, 1, 5, 4, 7, 3],
    [7, 2, 1, 4, 6, 3, 9, 5, 8],
    [8, 1, 3, 9, 5, 2, 6, 4, 7],
    [2, 9, 7, 3, 4, 6, 5, 8, 1],
    [4, 5, 6, 8, 7, 1, 2, 3, 9],
  ];

  const randomIndexNums = () => {
    let arr: number[] = [];
    const randomNum = () => {
      return Math.floor(Math.random() * Math.floor(9));
    };
    for (let i = 0; i < 9; i++) {
      arr.push(randomNum());
    }
    setRandomIndexArr(arr);
  };

  const cellStyle = (currentCellPosition: number[]) => {
    if (
      currentCellPosition[0] == selectedCell[0] &&
      currentCellPosition[1] == selectedCell[1]
    ) {
      return {...styles.cell, backgroundColor: 'skyblue'};
    } else {
      return styles.cell;
    }
  };

  const pressHandler = (pressedNum: number) => {
    if (selectedCell.length > 0) {
      const positionRow = selectedCell[0];
      const positionCol = selectedCell[1];
      const answerNum = answers[positionRow][positionCol];
      if (answerNum === pressedNum) {
        setGuessedPositions([...guessedPositions, selectedCell]);
      } else {
        Alert.alert('Wrong!');
      }
    } else {
      Alert.alert('Please select an empty box');
    }
  };

  const gridDisplay = () => {
    if (randomIndexArr.length !== 0) {
      return (
        <>
          <View style={styles.gridContainer}>
            <View>
              {answers.map((answerRows, index) => {
                return (
                  <View style={styles.row} key={index}>
                    {answerRows.map((num, rowIndex) => {
                      // should check gueseedPositions have the same position thats mapping
                      if (
                        rowIndex === randomIndexArr[index] &&
                        guessedPositions.includes([index, rowIndex])
                      ) {
                        return (
                          <TouchableHighlight
                            underlayColor="white"
                            onPress={() => setSelectedCell([index, rowIndex])}>
                            <View
                              style={cellStyle([index, rowIndex])}
                              key={num}>
                              <Text style={styles.cellText} />
                            </View>
                          </TouchableHighlight>
                        );
                      } else {
                        return (
                          <View style={styles.cell} key={num}>
                            <Text style={styles.cellText}>{num}</Text>
                          </View>
                        );
                      }
                    })}
                  </View>
                );
              })}
            </View>
          </View>
          <NumberSection pressHandler={pressHandler} />
        </>
      );
    }
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Sudoku</Text>
            </View>
            <View style={styles.buttonView}>
              <Button
                style={styles.startButton}
                mode="outlined"
                onPress={() => randomIndexNums()}>
                Start
              </Button>
            </View>
            {gridDisplay()}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    backgroundColor: Colors.lighter,
  },
  sectionTitle: {
    fontSize: 28,
    fontWeight: '600',
    color: Colors.black,
    textAlign: 'center',
  },
  buttonView: {
    alignItems: 'center',
  },
  startButton: {
    marginTop: 20,
    backgroundColor: 'pink',
    width: 100,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    height: 40,
    width: 40,
    justifyContent: 'center',
  },
  cellTextSelected: {
    backgroundColor: 'skyblue',
  },
  cellText: {
    textAlign: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20,
  },
});

export default App;
