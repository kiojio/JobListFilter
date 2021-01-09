import React, {useEffect, useState} from 'react';
import { 
  View, 
  ScrollView,
  Image, 
  Linking,
  TouchableOpacity
 } from 'react-native';
import HTMLView from 'react-native-htmlview';
import {SvgCss} from 'react-native-svg';
import axios from 'axios';

import Text from 'components/text';

import styles from './jobDetailScreen.styles';
import arrowIcon from '../../Assets/svg/arrowIcon';

function JobDetailScreen({route, navigation}) {
  const [job, setJob] = useState({});
  const jobId = route.params.job;
  const linkJob = `https://jobs.github.com/positions/`

  useEffect(() => {
    const fetchData = () => axios.get(`${linkJob}${jobId}.json`)
      .then(res => {
        let data = {
          error: false,
          dataProduct: res.data,
        }
        setJob(res.data);
        console.log("dadadadada test", {jobId, data});
      }
      ).catch(() => ({
        error: true,
        dataProduct: null,
      }),
    );
    fetchData()
  });


  return (
    <View style={styles.screen}>
      <View 
        style={styles.header}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
        >
          <SvgCss
            xml={arrowIcon}
            width={50}
            height={50}
          />
        </TouchableOpacity>
        <Text style={styles.text}>Job Detail</Text>
      </View>
      <ScrollView>
        <View>
          <Text>Company</Text>
          <View
            style={styles.Card}
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
              source={{uri: job.company_logo}}
            />
            <View 
              style={{
                flex: 1
              }}
            >
              <Text>{job.company}</Text>
              <Text>{job.location}</Text>
              <TouchableOpacity
                onPress={() => Linking.openURL(job.company_url)}
              >
                <Text style={styles.textLink}>Go to Website</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <Text>Job Spesification</Text>
            <View
              style={styles.CardDetail}
            >
              <Text style={styles.textHeader}>Title</Text>

              <Text style={styles.textContent}>{job.title}</Text>
              
              <Text style={styles.textHeader}>Fulltime</Text>
              
              <Text style={styles.textContent}>{job.type}</Text>
              
              <Text style={styles.textHeader}>Description</Text>
              
              <HTMLView
                value={job.description}
                stylesheet={styles.textContent}
              />
            </View>
          </View>
        </View>
        
      </ScrollView>
    </View>
  );
}

export default JobDetailScreen;
