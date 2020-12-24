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
    id
    rating
    repository {
      id
      fullName
      ownerName
    },
    text
    user {
      id
      username
    }
  }
}
`;

export const CREATE_USER = gql`
mutation CreateUser($username: String!, $password: String!) {
  createUser(user: { username: $username, password: $password }) {
    id,
    username,
    createdAt
  }
}
`;

export const DELETE_REVIEW = gql`
  mutation DeleteReview($id: ID!) {
    deleteReview(id: $id)
  }
`;
