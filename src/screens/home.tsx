import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface IUser {
  avatar_url: string;
  name: string;
  bio: string;
}

interface IOwner {
  avatar_url: string;
  url: string;
  followers_url: string;
}

interface IData {
  id: string;
  name: string;
  owner: IOwner;
  url: string;
  language: string;
}

const Home = () => {
  const [user, setUser] = useState<IUser>();
  const [listRpos, setListRepos] = useState<IData[]>([]);

  const { navigate } = useNavigation();

  const details = (followers_url: string) => {
    navigate("Details", { followers_url });
  };

  const URL = "https://api.github.com";
  useEffect(() => {
    fetch(`${URL}/user`, {
      method: "GET",
      headers: {
        Authorization: "Bearer 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",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        setUser(json);
      })
      .catch((e) => {
        console.log(`Erro: ${e}`);
      });
  });

  useEffect(() => {
    fetch(`${URL}/users/alancarvalhobrito/repos`, {
      method: "GET",
      headers: {
        Authorization: "Bearer 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",
      },
    })
      .then((response) => response.json())
      .then((json) => {
        // console.log(`REPOSITORIOS: ${JSON.stringify(json)}`);
        setListRepos(json);
      });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1, marginTop: StatusBar.currentHeight || 0 }}>
      <View style={styles.imageView}>
        <Image source={{ uri: user?.avatar_url }} style={styles.image} />
        <Text style={{ fontSize: 24 }}>{user?.name}</Text>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{user?.bio}</Text>
      </View>
      <View style={[styles.view, styles.viewRepo]}>
        <Text style={styles.text}>Meus repositórios</Text>
      </View>
      <FlatList
        data={listRpos}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => details(item.owner.followers_url)}>
            <View key={index} style={styles.view}>
              <Text>{item.name}</Text>
              <Text>{item.language || "Linguagem não encontrada"}</Text>
            </View>
          </TouchableOpacity>
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
  imageView: {
    alignItems: "center",
    backgroundColor: "#FFF",
    padding: 8,
  },
  image: {
    width: 120,
    height: 120,
    borderWidth: 3,
    borderColor: "grey",
    borderRadius: 60,
    alignSelf: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    alignSelf: "center",
  },
});

export default Home;
