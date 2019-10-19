import { createAppContainer, createSwitchNavigator } from "react-navigation";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator({
      Sign: createSwitchNavigator({
        SignIn,
        SignUp,
      }),
    })
  );
