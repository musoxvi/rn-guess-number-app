import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  Dimensions,
  ScrollView,
} from 'react-native';
// Components
import Card from '../components/Card';
import Input from '../components/Input';
import NumberContainer from '../components/NumberContainer';
import MainButton from '../components/MainButton';

type Props = {
  onStartGame: (selectedNumber: number) => void;
};

const StartGameScreen: React.FC<Props> = ({onStartGame}) => {
  const [enteredValue, setEnteredValue] = useState<string>('');
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNumber, setSelectedNumber] = useState<number | null>(null);
  const [buttonWidth, setButtonWidth] = useState<number>(
    Dimensions.get('window').width / 4,
  );

  React.useEffect(() => {
    const updateLayout = () => {
      setButtonWidth(buttonWidth);
    };
    Dimensions.addEventListener('change', updateLayout);

    return () => Dimensions.removeEventListener('change', updateLayout);
  }, []);

  const inputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setEnteredValue('');
    setConfirmed(false);
  };

  const confirmInputHandler = () => {
    const chosenNumber = Number(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert(
        'Invalid number!',
        'Number has to be a number between 1 and 99.',
        [{text: 'Ok', style: 'destructive', onPress: resetInputHandler}],
      );
      return;
    }

    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <ScrollView>
        <View style={styles.screen}>
          <Text style={styles.title}>Start a New Game!</Text>
          <Card style={styles.inputContainer}>
            <Text>Select a Number</Text>
            <Input
              style={styles.input}
              blurOnSubmit
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="number-pad"
              maxLength={2}
              onChangeText={inputHandler}
              value={enteredValue}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.button}>
                <MainButton title="Reset" onPress={resetInputHandler} />
              </View>
              <View style={styles.button}>
                <MainButton title="Confirm" onPress={confirmInputHandler} />
              </View>
            </View>
          </Card>
          {confirmed && (
            <Card style={styles.summaryContainer}>
              <Text>You selected</Text>
              <View>
                <NumberContainer selectedNumber={selectedNumber} />
                <MainButton
                  title="START GAME"
                  onPress={() => {
                    if (selectedNumber) {
                      onStartGame(selectedNumber);
                    }
                  }}
                />
              </View>
            </Card>
          )}
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: '80%',
    maxWidth: '80%',
    minWidth: 300,
    alignItems: 'center',
  },
  input: {
    width: 70,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  button: {
    // width: 100,
    width: Dimensions.get('window').width / 4,
  },
  summaryContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default StartGameScreen;
