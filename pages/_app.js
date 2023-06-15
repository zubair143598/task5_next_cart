


import { QueryClient, QueryClientProvider } from "react-query";


import "@/styles/globals.scss";
import { ChakraProvider } from "@chakra-ui/react";

const queryClient = new QueryClient()
export default function App({ Component, pageProps }) {
  return (
    <ChakraProvider>

    <QueryClientProvider client={queryClient} >
      <Component {...pageProps} />
      </QueryClientProvider>
    </ChakraProvider>
  );
}
