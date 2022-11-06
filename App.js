import React from "react";
import { StatusBar } from "react-native";
import Navigation from "./navigation";

function App() {
  return (
    <>
      <StatusBar barStyle={'default'} />
      <Navigation />
    </>
  );
}

export default App;
