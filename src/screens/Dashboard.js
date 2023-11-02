import { View } from "react-native";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native-gesture-handler";
import { getDocs, collection, onSnapshot } from "firebase/firestore";

import FocusedStatusBar from "../components/FocusedStatusBar";
import TopBar from "../components/TopBar";
import Task from "../components/Task";
import { db } from "../config/firebase";
import { auth } from "../config/firebase";

const Dashboard = ({ navigation }) => {
  const [data, setData] = useState([]);
  const todoRef = collection(db, "userData", auth.currentUser.uid, "todos");

  useEffect(() => {
    onSnapshot(todoRef, {
      next: (snapshot) => {
        const data = [];
        snapshot.docs.forEach((doc) => {
          const { id, name, subtitle, isComplete } = doc.data();
          data.push({ id, name, subtitle, isComplete });
        });
        setData(data);
      },
      error: (error) => console.log(error),
    });

    getDocs(todoRef).then((snapshot) => {
      const data = [];
      snapshot.docs.forEach((doc) => {
        const { id, name, subtitle, isComplete } = doc.data();
        data.push({ id, name, subtitle, isComplete });
      });
      setData(data);
    });
  }, [setData]);

  return (
    <View style={{ flex: 1, backgroundColor: "#bd9a6e" }}>
      <FocusedStatusBar backgroundColor={"#3c6440"} />
      <TopBar />
      <FlatList
        style={{ flex: 1 }}
        numColumns={1}
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Task data={item} />}
      />
    </View>
  );
};

export default Dashboard;
