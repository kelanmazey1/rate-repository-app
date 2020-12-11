/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const AUTHORIZE_USER = gql`
  mutation AuthorizeUser($username: String!, $password: String!) {
    authorize(credentials: { username: $username, password: $password }) {
      accessToken
    }
  }
`;

export const CREATE_REVIEW = gql`
mutation CreateReview($repositoryName: String!, $ownerName: String!, $rating: Int!, $text: String){
  createReview(review: {
    repositoryName: $repositoryName,
    ownerName: $ownerName,
   rating: $rating,
    text: $text
  }) {
    repository {
      id,
    },
    user {
      id,
      username
    }
  }
}
`;
