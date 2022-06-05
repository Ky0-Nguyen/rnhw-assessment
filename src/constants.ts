import ApolloClient, {InMemoryCache, gql} from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com',
  cache: new InMemoryCache(),
});
export const GET_COUNTRIES = gql`
  {
    countries {
      name
      code
      emoji
      emojiU
    }
  }
`;

export const GET_COUNTRY_DETAILS = gql`
  query Country($countryCode: ID!) {
    country(code: $countryCode) {
      name
      native
      emoji
      currency
      code
      phone
      languages {
        code
        name
      }
      continent {
        name
        code
      }
    }
  }
`;
