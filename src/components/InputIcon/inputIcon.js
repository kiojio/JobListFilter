import React from 'react';
import {TextInput, View, Text} from 'react-native';
import {SvgCss} from 'react-native-svg';
import searchIcon from '../../Assets/svg/searchIcon';
 
const InputIcon = ({
  onChange,
  value,
  placeholder = '',
  title = '',
  secure,
  leftIcon,
  icon,
  styleInput
}) => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        marginHorizontal: 24,
        borderRadius: 10,
        borderWidth: 1,
        padding: 8,
        paddingVertical: 1,
        borderColor: 'gray',
      }}>
      <Text>{title}</Text>
      {
        leftIcon == 'search' ? 
        <SvgCss
          xml={searchIcon}
          width={20}
          height={20}
        />
        :
        <View/>
      }
      <TextInput
        style={[{
          flex: 1,
          backgroundColor: '#fff',
          color: '#424242',
          marginLeft: leftIcon ? 5 : 0
        }, styleInput ]}
        placeholderTextColor="black"
        onChangeText={onChange}
        placeholder={placeholder}
        value={value}
        underlineColorAndroid="transparent"
        secureTextEntry={secure ? secure : false}
      />
      {
        icon == 'search' ?
        <SvgCss
          xml={searchIcon}
          width={20}
          height={20}
        />
        :
        <View/>
      }
    </View>
  );
};

export default InputIcon