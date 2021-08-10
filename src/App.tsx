import * as React from "react"
import {
  ChakraProvider,
  theme,
} from "@chakra-ui/react"
import {
  Route, Router,
  Switch,
} from "react-router-dom"
import { LoginForm } from "./components/login-form/login-form.component"
import { createBrowserHistory } from "history"
import { SignUpForm } from "./components/signup-form/signup-form.component"

const history = createBrowserHistory()

export const App = () => (
  <ChakraProvider theme={theme}>
    <Router history={history}>
      <Switch>
        <Route path="/signup">
          <SignUpForm />
        </Route>
        <Route exact path="/">
          <LoginForm />
        </Route>
      </Switch>
    </Router>
  </ChakraProvider>
)
