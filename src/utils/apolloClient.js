import ApolloClient from 'apollo-boost';
import Constants from 'expo-constants';

const createApolloClient = (authStorage) => new ApolloClient({
  request: async (operation) => {
    try {
      const accessToken = await authStorage.getAccessToken();
      operation.setContext({
        headers: {
          authorization: accessToken ? `Bearer ${accessToken}` : '',
        },
      });
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
    }
  },
  uri: Constants.manifest.extra.apolloUri,
});

export default createApolloClient;
