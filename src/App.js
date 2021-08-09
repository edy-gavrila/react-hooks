import React, { useContext } from "react";

import Ingredients from "./components/Ingredients/Ingredients";
import Auth from "./components/Auth";
import { AuthContext } from "./context/auth-context";

const App = (props) => {
  const ctx = useContext(AuthContext);

  return (
    <div>
      {ctx.isAuth || <Auth login={ctx.login} />}
      {ctx.isAuth && <Ingredients />}
    </div>
  );
};

export default App;
