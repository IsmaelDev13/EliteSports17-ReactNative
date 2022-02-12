import axios from "axios";
import { useEffect, useLayoutEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatGrid, SectionGrid } from "react-native-super-grid";
import styled from "styled-components/native";
import { apiKey } from "../../lib/datakey";
import { useTheme } from "../themes";

export default function GridPlayers() {
  const theme = useTheme();
  const [results, setResults] = useState([]);
  const { players } = results;
  const { team } = results;
  if (team) {
    console.log(team);
  }
  if (players) {
    console.log(players);
  }

  useLayoutEffect(() => {
    axios
      .get(`https://api-football-v1.p.rapidapi.com/v3/players/squads`, {
        method: "GET",
        params: { team: "33" },
        headers: {
          "x-rapidapi-host": "api-football-v1.p.rapidapi.com",
          "x-rapidapi-key": apiKey,
        },
      })
      .then((res) => {
        setResults(res.data.response[0]);
        // console.log(res.data.response[0], "response");
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <FlatGrid
      itemDimension={130}
      data={players}
      style={styles.gridPlayers}
      spacing={20}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.playerContainer}>
          <Image style={styles.logo} source={{ uri: team.logo }} />
          <Image style={styles.photo} source={{ uri: item.photo }} />
          <Title>{item.name}</Title>
          <Text style={styles.playerAge}>{item.age}</Text>
        </TouchableOpacity>
      )}
    />
  );
}
const Title = styled.Text`
  font-size: 24;
  color: ${(props) => props.theme.text};
`;

const styles = StyleSheet.create({
  gridPlayers: {
    flex: 1,
    width: "100%",
    marginTop: 10,
  },
  playerContainer: {
    justifyContent: "flex-end",
    borderRadius: 5,
    padding: 10,
    height: 150,
  },
  logo: {
    width: 30,
    height: 30,
    position: "absolute",
    right: 0,
    top: 0,
  },
  photo: {
    width: 100,
    height: 100,
    position: "relative",
  },

  playerAge: {
    fontWeight: "600",
    fontSize: 12,
    color: "black",
  },
});
