import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Colors from '../constants/theme/colors';
import MainButton from '../components/MainButton';

type Props = {
  roundsNumber: number;
  userNumber: number | null;
  onNewGame: () => void;
};

const GameOverScreen: React.FC<Props> = ({
  roundsNumber,
  userNumber,
  onNewGame,
}) => {
  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={30}>
        <View style={styles.screen}>
          <Text style={styles.title}>The Game is Over!</Text>
          <View style={styles.imagContainer}>
            <Image
              fadeDuration={1000}
              style={styles.image}
              //source={require('../assets/success.png')}
              source={{
                uri:
                  'https://cdn.pixabay.com/photo/2016/05/05/23/52/mountain-summit-1375015_960_720.jpg',
              }}
              resizeMode="stretch"
            />
          </View>
          <Text style={styles.text}>
            Number of rounds:{' '}
            <Text style={styles.highlight}> {roundsNumber}</Text>
          </Text>
          <Text style={styles.text}>
            Number was: <Text style={styles.highlight}>{userNumber}</Text>
          </Text>
          <MainButton title="NEW GAME" onPress={onNewGame} />
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    paddingTop: 16,
    color: Colors.primary,
    fontWeight: '700',
    fontSize: Dimensions.get('window').height < 400 ? 16 : 24,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagContainer: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    borderRadius: (Dimensions.get('window').width * 0.7) / 2,
    borderWidth: 4,
    borderColor: Colors.primary,
    overflow: 'hidden',
    marginVertical: Dimensions.get('window').height / 30,
  },
  text: {
    fontSize: Dimensions.get('window').height < 400 ? 12 : 16,
    paddingBottom: Dimensions.get('window').height < 400 ? 4 : 8,
  },
  highlight: {
    color: Colors.pink,
    fontWeight: '700',
  },
});

export default GameOverScreen;
