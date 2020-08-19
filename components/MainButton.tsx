import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../constants/theme/colors';

type Props = {
  children?: React.ReactNode;
  title?: string;
  opacity?: number;
  onPress: () => void;
};

const MainButton: React.FC<Props> = ({
  children,
  onPress,
  title,
  opacity = 0.6,
}) => {
  return (
    <TouchableOpacity activeOpacity={opacity} onPress={onPress}>
      <View style={styles.button}>
        <Text style={styles.buttonText}>{children || title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderWidth: 1,
    alignItems: 'center',
    borderRadius: 2,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default MainButton;
