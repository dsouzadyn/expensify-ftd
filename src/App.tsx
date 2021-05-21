import * as React from "react"
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Flex,
  Spacer,
} from "@chakra-ui/react"
import { ColorModeSwitcher } from "./ColorModeSwitcher"
import { LoginForm } from "./components/login-form.component"

export const App = () => (
  <ChakraProvider theme={theme}>
    <Box textAlign="center" fontSize="xl">
      <Grid>
        <ColorModeSwitcher justifySelf="flex-end" />
        <Flex>
          <Spacer />
          <Box w="320px">
            <LoginForm />
          </Box>
          <Spacer />
        </Flex>
      </Grid>


    </Box>
  </ChakraProvider>
)
