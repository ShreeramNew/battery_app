import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getBatteryLevelAsync } from "expo-battery";


export default function Home() {
   let [battery, setBattery] = useState(0);

   useEffect(() => {
      let updateBattery = async () => {
         let newPercentage = await getBatteryLevelAsync();
         let roundedValue=Math.round(newPercentage*100)
         console.log(newPercentage*100);
         console.log(roundedValue);
         setBattery(roundedValue);
      };

      updateBattery();

      const myInterVal = setInterval(updateBattery, 10000);

      return () => {
         clearInterval(myInterVal);
      };
   }, []);

   useEffect(() => {
      if (battery === 31) {
         alert("Your battery reached 30%");

         //Alarm
      }
   }, [battery]);

   return (
      <View style={myStyle.conatiner}>
         <Text style={myStyle.textStyle}>{battery}</Text>
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
