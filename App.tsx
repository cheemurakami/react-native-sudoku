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
  Alert,
} from 'react-native';
import {Button} from 'react-native-paper';
import {Colors} from 'react-native/Libraries/NewAppScreen';

declare const global: {HermesInternal: null | {}};

const App = () => {
  const nums: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

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
                {nums.map((row) => {
                  return (
                    <View style={styles.row} key={row}>
                      {nums.map((num) => {
                        return (
                          <View style={styles.cell} key={num}>
                            <Text style={styles.cellText}>{num}</Text>
                          </View>
                        );
                      })}
                    </View>
                  );
                })}
              </View>
            </View>

            <View style={styles.numberSectionContainer}>
              {nums.map((num) => {
                return (
                  <Button
                    style={styles.numButton}
                    key={num}
                    mode="outlined"
                    compact={true}
                    onPress={() => Alert.alert('Hello')}>
                    {num.toString()}
                  </Button>
                );
              })}
            </View>
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
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  numberSectionContainer: {
    flexDirection: 'row',
  },
  numButton: {
    flex: 1,
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
    borderWidth: 1,
    justifyContent: 'center',
  },
});

export default App;
