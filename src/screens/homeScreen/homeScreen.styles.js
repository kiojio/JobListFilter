import { StyleSheet, Dimensions } from 'react-native';
import fonts from 'themes/fonts';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    margin: 20,
    ...fonts.style.title,
  },
  searchRow:{
    flex:1,
    flexDirection: "row",
  },
  searchInput:{
    flex:1,
    padding: 10
  },
  Card:{
    flex:1,
    flexDirection: 'row',
    height: 'auto',
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.9,
    backgroundColor: '#fff'
  }
});
