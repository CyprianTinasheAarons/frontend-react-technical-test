import "@/styles/globals.css";
import { ThirdwebProvider } from "@thirdweb-dev/react";
import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "../store";

export default function App({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain={"ethereum"}>
      <ChakraProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ChakraProvider>
    </ThirdwebProvider>
  );
}
