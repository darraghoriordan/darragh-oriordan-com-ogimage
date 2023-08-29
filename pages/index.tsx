"use client";
import type { NextPage } from "next";
import Head from "next/head";
import { OgComponent } from "../components/OgComponent";
import { useRouter } from "next/router";

const Home: NextPage = () => {
  const router = useRouter();
  const { title, description } = router.query;

  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generate og images" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <OgComponent
          title={title as string}
          description={description as string}
          image={"/gray-profile-pic.jpg"}
        />
      </main>
    </div>
  );
};

export default Home;
