import React from "react";
import { container } from "tsyringe";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import GitHub, { Repo } from "../services/GitHub";
import Jokes, { Joke } from "../services/Jokes";
import { useService } from "../services/ContainerContext";

interface Props {
  repos: Repo[];
  joke?: Joke;
}

export default function Index({ repos = [], joke }: Props) {
  const features = useService("Config.Features");
  console.log(features);

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js with IoC
        </Typography>
        <h3>GitHub Repos</h3>
        {repos.map((repo) => (
          <div key={repo.id}>{repo.name}</div>
        ))}
        <h3>Joke</h3>
        {joke ? (
          <>
            {joke.setup}
            <br />
            {joke.punchline}
          </>
        ) : (
          ""
        )}
      </Box>
    </Container>
  );
}

export const getServerSideProps = async () => {
  const gitHub = container.resolve<GitHub>(GitHub);
  const jokes = container.resolve<Jokes>(Jokes);

  const [repos, joke] = await Promise.all([
    gitHub.getRepos(),
    jokes.getRandomJoke()
  ]);

  return {
    props: {
      repos,
      joke
    }
  };
};
