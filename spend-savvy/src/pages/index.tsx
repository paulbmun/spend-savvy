import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { api } from "~/utils/api";

// trigger the API call when a user clicks a button
// integrate the OpenAI API in the server side code (route)

const Home: NextPage = () => {
  const suggestion = api.openAI.getBudgetSuggestion.useQuery({ 
    text: "i want some suggestion for saving 100 bucks a month"
  });

  // console.log(suggestion)

  return (
    <>
      <main>
        <h1>Home</h1>
        {suggestion.isLoading ? (
          <p>Loading...</p>
        ) : suggestion.isSuccess ? (
          <p>Suggestion: </p>
        ) : suggestion.isError ? (
          <p>Error: {suggestion.error.message}</p>
        ) : null}
      </main>
    </>
  );
};

export default Home;