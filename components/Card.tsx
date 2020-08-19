import React from 'react';
import {View, StyleSheet} from 'react-native';

type Props = {
  style: Object;
  children?: React.ReactNode;
};

const Card: React.FC<Props> = ({style, children}) => {
  return <View style={{...styles.card, ...style}}>{children}</View>;
};

const styles = StyleSheet.create({
  card: {
    // elevatio IOS
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 6,
    shadowOpacity: 0.26,
    // elevation Android
    elevation: 8,
    backgroundColor: 'white',
    padding: 32,
    borderRadius: 4,
  },
});

export default Card;
