import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  FlatList,
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  Image,
} from "react-native";

interface IUser {
  id: string;
  avatar_url: string;
  login: string;
}
const Details = ({ route }) => {
  const { followers_url } = route.params;

  const [followers, setFollowers] = useState<IUser[]>([]);

  const URL = "https://api.github.com";

  useEffect(() => {
    fetch(`${followers_url}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer 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",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(`SEGUIDORES: ${JSON.stringify(json)}`);
        setFollowers(json);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={[styles.view, styles.viewRepo]}>
        <Text style={styles.text}>Meus seguidores</Text>
      </View>
      <FlatList
        data={followers}
        renderItem={({ item, index }) => (
          <View key={index} style={styles.view}>
            <Image source={{ uri: item?.avatar_url }} style={styles.image} />
            <Text style={{ alignSelf: "center" }}>{item.login}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={<ActivityIndicator size={"large"} color={"red"} />}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#B0C4DE",
    marginTop: 8,
    padding: 8,
  },
  viewRepo: {
    backgroundColor: "#4682B4",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 60,
    alignSelf: "center",
  },
});

export default Details;
