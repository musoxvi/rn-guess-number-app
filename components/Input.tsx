import React from 'react';
import {TextInput, StyleSheet, TextInputProps, StyleProp} from 'react-native';

type Props = {
  style: StyleProp<any>;
} & TextInputProps;

const Input: React.FC<Props> = (props: Props) => {
  return <TextInput {...props} style={{...styles.input, ...props.style}} />;
};

const styles = StyleSheet.create({
  input: {
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Input;
