


import { QueryClient, QueryClientProvider } from "react-query";
import store from "@/src/store";
import { Provider } from "react-redux";
import "@/styles/globals.scss";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>

    <ChakraProvider>

    <QueryClientProvider client={queryClient} >
      <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
    </Provider>
  );
}
