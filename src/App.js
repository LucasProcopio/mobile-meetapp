import React from "react";

// import { Container } from './styles';
import createRouter from "./routes";

export default function App() {
  const Routes = createRouter(false);

  return <Routes />;
}
