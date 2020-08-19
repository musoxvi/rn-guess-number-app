import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../constants/theme/colors';

type Props = {
  selectedNumber: number | null;
};

const NumberContainer: React.FC<Props> = ({selectedNumber}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.number}>{selectedNumber}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: Colors.green,
    padding: 10,
    borderRadius: 4,
    marginVertical: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  number: {
    textAlign: 'center',
    color: Colors.green,
    fontSize: 22,
  },
});

export default NumberContainer;
