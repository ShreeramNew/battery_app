import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { getBatteryLevelAsync } from "expo-battery";
import { Audio } from "expo-av";
import myAudio from "../alarm-church-bell-18533.mp3";

import * as BackgroundFetch from "expo-background-fetch"
import * as TaskManager from "expo-task-manager"

const TASK_NAME = "BACKGROUND_TASK"

TaskManager.defineTask(TASK_NAME, () => {
  
    // fetch data here... 
    setInterval(()=>{
      console.log("Working each second"
      )
    },1000);
    console.log("My task");
    BackgroundFetch.BackgroundFetchResult.NewData;
})



export default function Home() {
   let [battery, setBattery] = useState(0);
   let [music, setMusic] = useState(null);

   const RegisterBackgroundTask = async () => {
      try {
        await BackgroundFetch.registerTaskAsync(TASK_NAME, {
          minimumInterval: 5, // seconds,
        })
        console.log("Task registered")
      } catch (err) {
        console.log("Task Register failed:", err)
      }
    }

   
   useEffect(() => {
      let updateBattery = async () => {
         //Get current battery percentage
         let newPercentage = await getBatteryLevelAsync();
         let roundedValue = Math.round(newPercentage * 100);
         setBattery(roundedValue);
      };

      RegisterBackgroundTask();
      updateBattery(); //Call the updateBattery for first time

      const myInterVal = setInterval(updateBattery, 10000); // Check battery in every 10 seconds

      return () => {
         clearInterval(myInterVal);
      };
   }, []);

   useEffect(() => {
      //Set a alert, when battery reaches specified percentage
      if (battery === 28) {
         playSound();

         //Alarm
      }
   }, [battery]);

   const playSound = async () => {
      //Set up and play the sound
      const { sound } = await Audio.Sound.createAsync(myAudio);
      setMusic(sound);
      await sound.playAsync();
   };
   const pauseSound = async () => {
      await music.pauseAsync();
   };

   useEffect(() => {
      return music
         ? () => {
              console.log("Unloading music");
              music.unloadAsync();
           }
         : undefined;
   }, [music]);

   return (
      <View style={myStyle.conatiner}>
         <Text style={myStyle.textStyle}>{battery}</Text>
         <Button title="Play Sound" onPress={playSound} />
         <Button title="Pause Sound" onPress={pauseSound} />
      </View>
   );
}
const myStyle = StyleSheet.create({
   conatiner: {
      padding: 60,
   },
   textStyle: {
      fontSize: 30,
   },
});
