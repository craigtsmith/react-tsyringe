import React from "react";
import "reflect-metadata";
import {
  container,
  DependencyContainer,
  instanceCachingFactory
} from "tsyringe";
import Head from "next/head";
import { AppProps } from "next/app";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import ContainerContext from "../services/ContainerContext";
import Config from "../services/Config";
import Jokes from "../services/Jokes";
import Logger from "../services/Logger";
import fetch from "isomorphic-unfetch";

container.register("Config.GitHub", {
  useValue: CONFIG.github
});

container.register("Config.Features", {
  useValue: CONFIG.features
});

container.register<Jokes>(Jokes, {
  useFactory: instanceCachingFactory(
    (dependencyContainer: DependencyContainer) => {
      return new Jokes(
        dependencyContainer.resolve<Config>(Config).get("jokes"),
        dependencyContainer.resolve<Logger>(Logger),
        fetch
      );
    }
  )
});

export default function MyApp(props: AppProps) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <ContainerContext.Provider value={container}>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ContainerContext.Provider>
  );
}
