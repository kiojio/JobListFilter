import { StyleSheet, Dimensions } from 'react-native';
import fonts from 'themes/fonts';
import colors from '../../themes/colors';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    alignSelf: 'center',
    ...fonts.style.title,
  },
  header:{
    flexDirection: 'row',
    minHeight: 50,
    width: width,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E2E2'
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
  },
  CardDetail:{
    flex:1,
    marginTop: 10,
    marginBottom: 10,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    width: width * 0.9,
    backgroundColor: '#fff'
  },
  textLink:{
    color: 'blue',
    textDecorationLine:'underline',
  },
  textHeader: {
    marginTop: 20,
    paddingLeft:10,
    color: colors.lightGray  
  },
  textContent:{
    paddingLeft: 10
  }
});
