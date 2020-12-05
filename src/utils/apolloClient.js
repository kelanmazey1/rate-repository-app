import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = () => new ApolloClient({
  uri: Constants.manifest.extra.apolloUri,
});

export default createApolloClient;
