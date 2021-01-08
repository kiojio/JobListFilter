import React from 'react';
import {StyleSheet, Modal, Dimensions} from 'react-native';
import { 
  View, 
  Text,
  TouchableOpacity,
  Animated,
} from 'react-native';
import colors from '../../themes/colors';
import InputIcon from 'components/InputIcon';
import { color } from 'react-native-reanimated';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  modalSearch:{
    flex:1,
    width: width,
    borderWidth: 0,
    marginTop: 50,
  },
  modalHeader:{
    backgroundColor: colors.white
  },  
  modalSearchCat:{
    padding: 20,
    backgroundColor: colors.white
  },
  modalSearchLoc:{
    flexDirection: 'row',
    backgroundColor: colors.white,
    margin: 20,
    justifyContent: 'space-between'
  },
  modalTitleSearchLoc:{
    alignSelf: 'center',
    paddingLeft: 20
  },
  dropdown:{
    borderWidth:1,
    borderRadius: 10
  },
  toggleBtn:{
    borderWidth: 1,
    borderColor: colors.appColor,
    width: 80,
    height: 52,
    borderRadius: 30,
    padding: 4,
    backgroundColor: "green"
  },
  contentToggle:{
    position: 'relative',
    flexDirection: "row",
    alignItems: "flex-start",
    paddingHorizontal:5,
    top: -35,
    zIndex: 10,
    borderRadius: 30,
  },
  slide:{
    alignItems: "center",
    backgroundColor: colors.appColor,
    width: 60,
    height: 40,
    borderRadius: 10,
    zIndex: 1
  },
  textSlide:{
    fontSize: 15    
  },
  contentModal:{
    flex:1,
    maxHeight: 250,
    width: width * 0.9,
    backgroundColor: colors.white,
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 10
  }
})
 
const ModalSearch = ({
  valueLocation,
  onChangeLocation,
  visible,
  setVisible,
  toggleHandle,
  animatedValue,
  isOn
}) => {
  return (
    <Modal 
      animationType="slide"
      transparent={true}
      visible={visible}
    >
      <View style={styles.modalSearch}>
        <View style={styles.contentModal}>
          <View style={styles.modalSearchLoc}>
            <Text style={styles.modalTitleSearchLoc}>Full Time</Text>
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.toggleBtn}
              onPress={toggleHandle}
            >

              <Animated.View style={[
                styles.slide,
                {
                transform: [{
                  translateX: animatedValue,
                }]
                }
              ]}>
              </Animated.View>
              <View
                style={styles.contentToggle}
              >
                <View style={[{width: 30, height: 30, borderRadius: 30}, isOn ? {backgroundColor:colors.black} : {backgroundColor:colors.white, paddingLeft:5, borderRadius:30}]}/>
                <View style={[{width: 30, height: 30, borderRadius: 30}, isOn ? {backgroundColor:colors.white, paddingRight:10} : {backgroundColor:colors.black, borderRadius: 30}]}/>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.modalSearchLoc}>
            <Text style={styles.modalTitleSearchLoc}>Lokasi</Text>
            <InputIcon
              title=""
              value={valueLocation}
              onChange={onChangeLocation}
            />
          </View>
          <TouchableOpacity
            onPress={setVisible}
            style={{
              padding: 10,
              backgroundColor: colors.gray,
              width: 100,
              borderWidth: 1,
              borderRadius: 10,
              alignSelf: 'flex-end',
              margin: 10
            }}
          >
             <Text>Apply Filter</Text> 
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default ModalSearch;