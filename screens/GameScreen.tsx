import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  Dimensions,
} from 'react-native';
import Colors from '../constants/theme/colors';

//Components
import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card';
import MainButton from '../components/MainButton';

/**
 * genetateRamdomBetween
 * @param {number} min
 * @param {number} max
 * @param {number} exclude
 * @returns {number}
 */
const genetateRamdomBetween = (
  min: number,
  max: number,
  exclude: number,
): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return genetateRamdomBetween(min, max, exclude);
  } else {
    return rndNum;
  }
};

type Props = {
  userChoice: number;
  onGameOver: (rounds: number) => void;
};

type Direction = 'lower' | 'greater';

const renderList = (value: number, numOfRound: number) => (
  <View key={value} style={styles.listItem}>
    <Text>#{numOfRound}</Text>
    <Text>{value}</Text>
  </View>
);

const GameScreen: React.FC<Props> = ({userChoice, onGameOver}) => {
  const initialGuess = genetateRamdomBetween(1, 100, userChoice);
  const [currenGuess, setCurrentGuess] = React.useState(initialGuess);
  const [pastGuesses, setPastGuesses] = React.useState<number[]>([
    initialGuess,
  ]);

  const [availableDeviceHeight, setAvailableDeviceHeight] = React.useState(
    Dimensions.get('window').height,
  );

  const currentLow = React.useRef(1);
  const currentHigh = React.useRef(100);

  React.useEffect(() => {
    const updateLayout = () => {
      setAvailableDeviceHeight(Dimensions.get('window').height);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  React.useEffect(() => {
    if (currenGuess === userChoice) {
      onGameOver(pastGuesses.length);
    }
  }, [currenGuess, userChoice, onGameOver]);

  /**
   * nextGessHandler
   * @param {Direction} direction
   */
  const nextGessHandler = (direction: Direction) => {
    if (
      (direction === 'lower' && currenGuess < userChoice) ||
      (direction === 'greater' && currenGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong....', [
        {text: 'Sorry!', style: 'cancel'},
      ]);
      return;
    }

    if (direction === 'lower') {
      currentHigh.current = currenGuess;
    } else {
      currentLow.current = currenGuess + 1;
    }

    const nextNumber = genetateRamdomBetween(
      currentLow.current,
      currentHigh.current,
      currenGuess,
    );
    setCurrentGuess(nextNumber);
    setPastGuesses((currentPastGuesses: number[]) => [
      nextNumber,
      ...currentPastGuesses,
    ]);
  };
  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      {availableDeviceHeight > 500 && (
        <NumberContainer selectedNumber={currenGuess} />
      )}
      <Card style={styles.buttonContainer}>
        <MainButton title="-" onPress={() => nextGessHandler('lower')} />
        {availableDeviceHeight < 500 && (
          <NumberContainer selectedNumber={currenGuess} />
        )}
        <MainButton title="+" onPress={() => nextGessHandler('greater')} />
      </Card>
      <View style={styles.listContainer}>
        <ScrollView contentContainerStyle={styles.list}>
          {pastGuesses.map((guess: number, index: number) =>
            renderList(guess, pastGuesses.length - index),
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop: Dimensions.get('window').height > 600 ? 20 : 10,
    width: 400,
    maxWidth: '90%',
  },
  listItem: {
    borderColor: Colors.grey,
    padding: 15,
    borderWidth: 1,
    marginVertical: 8,
    backgroundColor: Colors.white,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '90%',
    borderRadius: 4,
  },
  listContainer: {
    width: Dimensions.get('window').width > 500 ? '60%' : '80%',
    flex: 1,
  },
  list: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

export default GameScreen;
