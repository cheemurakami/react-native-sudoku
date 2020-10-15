/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import NumberSection from './components/NumberSection';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const answers: number[][] = [
    [9, 6, 4, 5, 8, 7, 3, 1, 2],
    [1, 7, 2, 6, 3, 4, 8, 9, 5],
    [3, 4, 5, 7, 9, 8, 1, 2, 6],
    [6, 8, 9, 2, 1, 5, 4, 7, 3],
    [7, 2, 1, 4, 6, 3, 9, 5, 8],
    [8, 1, 3, 9, 5, 2, 6, 4, 7],
    [2, 9, 7, 3, 4, 6, 5, 8, 1],
    [4, 5, 6, 8, 7, 1, 2, 3, 9],
  ];

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

            <View style={styles.gridContainer}>
              <View>
                {answers.map((answerRows) => {
                  return (
                    <View style={styles.row}>
                      {answerRows.map((num) => {
                        return (
                          <View style={styles.cell}>
                            <Text style={styles.cellText}>{num}</Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </View>
            <NumberSection />
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
  row: {
    flexDirection: 'row',
  },
  cell: {
    borderWidth: 1,
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
});

export default App;
