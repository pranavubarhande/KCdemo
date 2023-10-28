import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    margin: '5%',
    width: '90%',
    borderRadius: 20,
    borderWidth: 1,
    paddingBottom: 5,
  },
  imageContainer: {
    height: 200,
    borderRadius: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginVertical: 5,
  },
});
