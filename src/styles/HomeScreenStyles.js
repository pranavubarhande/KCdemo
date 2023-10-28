import { StyleSheet } from 'react-native';
import { StatusBar, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  heading: {
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
  },
  inputContainer: {
    marginBottom: 10,
  },
  input: {
    height: 40,
    marginLeft: 5,
    fontFamily: 'sans-serif-medium',
    width: '80%',
    color: '#2f3330',
    borderColor: 'black',
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  activityIndicatorContainer: {
    width: '100%',
    height: Dimensions.get('window').height,
  },
});
