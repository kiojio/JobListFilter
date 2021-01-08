import React, {useState, useCallback, useEffect} from 'react';
import { 
  View,
  ScrollView, 
  Image,
  TouchableOpacity,
  Animated,
  Easing,
  Text,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {SvgCss} from 'react-native-svg';
import axios from 'axios';

import ModalSearch from 'components/ModalSearch';

import styles from './homeScreen.styles';

import InputIcon from 'components/InputIcon';
import arrow from '../../Assets/svg/arrow';

function HomeScreen({navigation}) {
  const [search, setSearch] = useState(''); 
  const [isOn, setIsOn] = useState(false)
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0))
  const [location, setLocation] = useState('');
  const [refresh, setRefresh] = useState(true);
  const [modalFilter, setModalFilter] = useState(false);
  const [page, setPage] = useState(1);
  const [jobParam, setJobParam] = useState(`page=${page}`);
  const linkJob = 'https://jobs.github.com/positions.json?';
  const [jobList, setJobList] = useState([]);
  let timeout;

  const knobOffset = 50

  const toggleHandle = () => {
    setIsOn(!isOn);
  }

  useEffect(() => {
    Animated.timing(
      animatedValue,
      { 
        toValue: isOn ? knobOffset : 0,
        easing: Easing.elastic(0.7),
        duration: 100,
        useNativeDriver: true
      }
    ).start()
  }, [isOn])

  useEffect(()=> {
    const fetchData = async () => await axios.get(`${linkJob}${jobParam}`)
      .then(res => {
        let data = {
          error: false,
          dataProduct: res.data,
        }
        if(page > 1) {
          setJobList([jobList, ...res.data]);
        } else {
          setJobList([...res.data]);
        }
        setRefresh(false);
        console.log("dadadadada test", {data, jobParam});
      }
      ).catch(() => ({
        error: true,
        dataProduct: null,
      }),
    );
    fetchData()
  }, [refresh])

  const searchChange = (val) => {
    if(val==''){
      setRefresh(true)
    }
    setSearch(val);
    let param = `page=${page}&search=${val}`;
    if(timeout) clearTimeout(timeout);
    if(val.length > 3) {
      timeout = setTimeout(() => {
        console.log("do Search", param)
        setJobParam(param);
        setRefresh(true);
      }, 300);
    }
  }

  const refreshPage = () => {
    setJobParam(`page=${1}`);
    setRefresh(true);
  }

  const loadMore = () => {
    setPage(page+1);
    setRefresh(true);
  }

  const applyFilter = () => {
    let param = `page=${page}&full_time=${isOn}&location=${location}`;
    console.log("filter", param);
    setJobParam(param);
    setModalFilter(!modalFilter);
    setRefresh(true);
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Job List</Text>
      <View>
        <View
          style={styles.searchRow}
        >
          <InputIcon
            styleInput={styles.searchInput}
            placeholder="Search"latList
            leftIcon="search"
            value={search}
            onChange={searchChange}
          />
          <TouchableOpacity
            onPress={() => setModalFilter(!modalFilter)}
          >
            <SvgCss
              xml={arrow}
              width={30}
              height={30}
              rotation={modalFilter ? 180 : 0}
            />
          </TouchableOpacity>
        </View>
        {
          jobList.length > 0 ?
          <View style={{flex:1, marginBottom: 10}}>
            <FlatList
            style={{flex:1, marginBottom: 10}}
              extraData={jobList}
              data={jobList}
              refreshing={refresh}
              onRefresh={() => refreshPage()}
              onEndReachedThreshold={0.01}
              onEndReached={() => loadMore}
              horizontal={false}
              keyExtractor={(item, index) => index.toString()}
              renderItem={
                ({item}) => {
                  return(
                    <TouchableOpacity
                      style={styles.Card}
                      onPress={() => navigation.navigate('JobDetail', {job: item.id})}
                    >
                      <Image
                        resizeMode="contain"
                        style={{
                          width: 100,
                          height: 50,
                          margin: 10,
                          marginRight: 20,
                          alignSelf: 'center'
                        }}
                        source={{uri: item.company_logo}}
                      />
                      <View 
                        style={{
                          flex: 1
                        }}
                      >
                        <Text>{item.title}</Text>
                        <Text>{item.company}</Text>
                        <Text>{item.location}</Text>
                      </View>
                      <View
                        style={{alignSelf: 'center'}}
                      >
                        <SvgCss
                          xml={arrow}
                          width={20}
                          height={20}
                          rotation={270}
                        />
                      </View>
                    </TouchableOpacity>
                  )
                }
              }
            />
          </View>
          :
          <View
            style={styles.Card}
          >
            <Text style={{alignSelf: 'center', fontSize: 20}}>Job Tidak di temukan</Text>
          </View>
        }
        {
          refresh ?
          <ActivityIndicator/>
          :
          <View/> 
        }
      </View>
      <ModalSearch
        visible={modalFilter}
        setVisible={() => applyFilter()}
        valueLocation={location}
        onChangeLocation={(value) => setLocation(value)}
        toggleHandle={toggleHandle}
        animatedValue={animatedValue}
        isOn={isOn}
      />
    </View>
  );
}

export default HomeScreen;
