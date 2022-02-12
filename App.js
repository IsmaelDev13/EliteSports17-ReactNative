import { StatusBar } from "expo-status-bar";
import { StyleSheet, Switch, Text, View } from "react-native";
import styled from "styled-components/native";
import GridPlayers from "./src/components/GridPlayers";
import ThemeManager, { useTheme } from "./src/themes";

export default function App() {
  return (
    <ThemeManager>
      <HomeScreen />
    </ThemeManager>
  );
}

function HomeScreen() {
  const theme = useTheme();
  return (
    <Container>
      <Title>Players</Title>
      <Switch
        value={theme.mode === "dark"}
        onValueChange={(value) => theme.setMode(value ? "dark" : "light")}
      />
      <GridPlayers />
    </Container>
  );
}

const Container = styled.View`
  flex: 1;
  display: flex;
  padding-top: 20px;
  background: ${(props) => props.theme.backgroundAlt};
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  font-size: 24;
  color: ${(props) => props.theme.text};
`;
