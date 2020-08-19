import React from 'react';
import {StyleSheet, View, SafeAreaView} from 'react-native';

// Components
import Header from './components/Header';
import StartGameScreen from './screens/StartGameScreen';
import GameScreen from './screens/GameScreen';
import GameOverScreen from './screens/GameOverScreen';

export default function App() {
  const [userNumber, setUserNumber] = React.useState<number | null>(null);
  const [guessRounds, setGuessRounds] = React.useState<number>(0);

  const newGameHandler = () => {
    setGuessRounds(0);
    setUserNumber(null);
  };

  const startGameHandler = (selectedNumber: number) => {
    setUserNumber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numOfRounds: number) => {
    setGuessRounds(numOfRounds);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <Header title="Guess a Number" />
      {userNumber && guessRounds <= 0 ? (
        <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
      ) : guessRounds > 0 ? (
        <GameOverScreen
          userNumber={userNumber}
          roundsNumber={guessRounds}
          onNewGame={newGameHandler}
        />
      ) : (
        <StartGameScreen onStartGame={startGameHandler} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
