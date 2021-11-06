import { Route, Switch } from "react-router-dom";

import { MainPage, UserPage } from "./pages";
import PageTemplate from "./components/pageTemplate";

function App() {
  return (
    <Switch>
      <PageTemplate>
        <Route path="/" component={MainPage} />
        <Route path="/users" component={UserPage} />
      </PageTemplate>
    </Switch>
  );
}

export default App;
