import { Alert } from 'react-native';

import { JOB_DATA } from "./job.constants";

export const getJob = params => async () => {
    try {
      const payload = await api.jobs(params)
      dispatch({type: JOB_DATA, payload})
    } catch (error) {
      Alert.alert(
        'SignOut Failed',
        'Sorry, something went wrong.',
        [{ text: 'OK', style: 'cancel' }],
      );
    }
}