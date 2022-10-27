import { Switch, Route } from "react-router-dom"

// Components - pages
import Dashboard from "../pages/Dashboard"

const Routes = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
)

export default Routes
