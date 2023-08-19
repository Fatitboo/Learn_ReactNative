import { StatusBar } from 'expo-status-bar';
import { Button, Platform, StyleSheet, Text, View } from 'react-native';
import * as Notifications from 'expo-notifications'
import { useEffect } from 'react';

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    }

  }
});

export default function App() {
  useEffect(()=>{
     async function confugurePushNotification(){
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      const pushTokenData = await Notifications.getExpoPushTokenAsync();
      console.log(pushTokenData);
      if(Platform.OS === 'android'){
        Notifications.setNotificationChannelAsync('default', {
          name: 'default',
          importance : Notifications.AndroidImportance.DEFAULT,
        });
      }
    }
    
    confugurePushNotification();
  },[]);


  useEffect(()=>{
    const subcription1 =  Notifications.addNotificationReceivedListener((notification)=>{
      console.log('NOTIFICATION RECEIVED');
      console.log(notification);
    })
    return ()=>{subcription1.remove()}
  },[])
  function scheduleNotificationHandler() {
    Notifications.scheduleNotificationAsync({
      content: {
        title: 'My first local notification.',
        body: 'This is the body of notification.',
        data: { userName: 'Max' }
      },
      trigger: {
        seconds: 5
      }
    })
  };
  function sendPushNotificationHandler(){
    fetch('https://exp.host/--/api/v2/push/send', {
      method:'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
        to: "ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]",
        title:"hello",
        body: "world"
      })
    })
  }

  return (
    <View style={styles.container}>
      <Button title='Send push notification' onPress={sendPushNotificationHandler}></Button>
      <Button title='Schedule Notification' onPress={scheduleNotificationHandler}></Button>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
