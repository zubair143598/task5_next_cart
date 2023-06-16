import NextChart from "@/components/NextChart";
import Pagination from "@/components/Pagination";


import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>  Next Cart - products</title>
      </Head>

      <main  className="bg-black">
        
        {/* <NextChart /> */}
        <Pagination/>
      </main>
    </>
  );
}
