import type { GetServerSideProps, NextPage } from "next";

// Redirect the landing page to /about to simplify the entry experience
export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/about",
      permanent: false,
    },
  };
};

const Home: NextPage = () => null;

export default Home;
