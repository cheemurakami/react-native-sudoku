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
  Animated,
  TouchableWithoutFeedback,
  ImageBackground,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NumberSection from './components/NumberSection';
import {Button} from 'react-native-paper';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const [randomIndexArr, setRandomIndexArr] = useState<Array<number>>([]);
  const [selectedCell, setSelectedCell] = useState<Array<number>>([]);
  const [guessedPositions, setGuessedPositions] = useState<any[]>([]);
  const [animation] = useState(new Animated.Value(0));
  const [playBtnText, setPlayBtnText] = useState<String>('Start');
  const [playing, setPlaying] = useState<boolean>(false);

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

  const image = {
    uri:
      'https://www.san-x.co.jp/charapri/images/kabe/rirakkuma/125_1920_1080.png',
  };

  const playGame = () => {
    randomIndexNums();
    setPlayBtnText('Reset');
    setPlaying(true);
  };

  const randomIndexNums = () => {
    let arr: number[] = [];
    const randomNum = () => {
      return Math.floor(Math.random() * Math.floor(8));
    };
    for (let i = 0; i < 9; i++) {
      arr.push(randomNum());
    }
    setRandomIndexArr(arr);
  };

  const guessedPositionsToCompare: any[] = guessedPositions.map(
    (position: any[]) => {
      return position.toString();
    },
  );

  const hasBeenAnswered = (index: number, rowIndex: number) => {
    if (guessedPositionsToCompare.length > 0) {
      return guessedPositionsToCompare.includes([index, rowIndex].toString());
    } else {
      return false;
    }
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
        handleAnimation();
        const newGuessedPositions = [...guessedPositions, selectedCell]; //state hasn't been changed yet so store it to variable
        setGuessedPositions(newGuessedPositions);
        isCompleted(newGuessedPositions); //then pass that variable here
      } else {
        Alert.alert('Wrong!');
      }
    } else {
      Alert.alert('Please select an empty box');
    }
  };

  const isCompleted = (newGuessedPositions: string | number[]) => {
    if (newGuessedPositions.length === randomIndexArr.length) {
      setPlayBtnText('Replay');
    }
  };

  const handleAnimation = () => {
    Animated.timing(animation, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }).start(() => {
        Animated.timing(animation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: false,
        }).start();
      });
    });
  };

  const boxInterpolation = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgb(255, 255, 255)', 'rgb(255, 255, 153)'],
  });

  const animatedStyle = (index: number, rowIndex: number) => {
    let lastIndex = guessedPositions.length - 1;
    if (
      guessedPositions[lastIndex] &&
      guessedPositions[lastIndex].toString() === [index, rowIndex].toString()
    ) {
      return {backgroundColor: boxInterpolation, borderWidth: 1};
    } else {
      return {};
    }
  };

  const showBlankCell = (index: number, rowIndex: number) => {
    return (
      !hasBeenAnswered(index, rowIndex) && rowIndex === randomIndexArr[index]
    );
  };

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scrollView}>
          <View style={styles.body}>
            <ImageBackground source={image} style={styles.image} />
            <View
              style={{
                flexGrow: playing ? 0 : 1,
                justifyContent: 'center',
              }}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Sudoku</Text>
              </View>
              <View style={styles.buttonView}>
                <Button
                  style={styles.startButton}
                  mode="outlined"
                  onPress={() => playGame()}>
                  {playBtnText}
                </Button>
              </View>
            </View>
            {randomIndexArr.length > 0 && (
              <>
                <View style={styles.gridContainer}>
                  <View>
                    {answers.map((answerRows, index) => {
                      return (
                        <View style={styles.row} key={index}>
                          {answerRows.map((num, rowIndex) => {
                            if (showBlankCell(index, rowIndex)) {
                              return (
                                <TouchableHighlight
                                  key={num}
                                  underlayColor="white"
                                  onPress={() =>
                                    setSelectedCell([index, rowIndex])
                                  }>
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
                                  <TouchableWithoutFeedback>
                                    <Animated.View
                                      style={{
                                        ...styles.selectedCell,
                                        ...animatedStyle(index, rowIndex),
                                      }}>
                                      <Text style={styles.cellText}>{num}</Text>
                                    </Animated.View>
                                  </TouchableWithoutFeedback>
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
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
    height: '100%',
    flexDirection: 'column',
  },
  body: {
    backgroundColor: Colors.white,
    flexGrow: 1,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    backgroundColor: Colors.inherit,
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '400',
    color: Colors.black,
    textAlign: 'center',
  },
  buttonView: {
    alignItems: 'center',
  },
  startButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: 'pink',
    width: 100,
    fontSize: 80,
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
    height: 40,
    width: 40,
    justifyContent: 'center',
    backgroundColor: 'white',
    opacity: 0.75,
  },
  selectedCell: {
    height: 40,
    width: 40,
    justifyContent: 'center',
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
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});

export default App;
