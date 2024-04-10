import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { getBatteryLevelAsync } from "expo-battery";

export default function Home() {
   let [battery, setBattery] = useState(0);

   useEffect(() => {
      let updateBattery = async () => {
         let newPercentage = await getBatteryLevelAsync();
         setBattery(newPercentage);
      };

      updateBattery();
      
      const myInterVal = setInterval(updateBattery, 10000);

      return () => {
         clearInterval(myInterVal);
      };
   }, []);

   return (
      <View style={myStyle.conatiner}>
         <Text style={myStyle.textStyle}>{battery * 100}</Text>
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
