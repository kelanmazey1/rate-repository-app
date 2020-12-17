/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query fetchRepositories($orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy, $searchKeyword: String, $after: String, $first: Int) {
    repositories(orderDirection:$orderDirection, orderBy:$orderBy, searchKeyword: $searchKeyword, after: $after, first: $first) {
      pageInfo {
        totalCount,
        hasNextPage,
        endCursor,
        startCursor
      }
      edges {
        node {
          id,
          name,
          ownerName,
          createdAt,
          fullName,
          reviewCount,
          ratingAverage,
          forksCount,
          stargazersCount,
          description,
          language,
          ownerAvatarUrl
        }
        cursor
      }
    }
  }
`;

export const CURRENT_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false, $first: Int, $after: String) {
    authorizedUser {
      id,
      username
      reviews (first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            user {
              username
            }
            repository {
              fullName
              ownerName
            }
            rating
            createdAt
            text
          }
          cursor
        }
        pageInfo {
          startCursor
          endCursor
          hasNextPage
          totalCount
        }
      }
    }
  }
`;

export const GET_REPO = gql`
  query GetRepo($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      url,
      fullName,
      language,
      stargazersCount,
      forksCount,
      reviewCount,
      ratingAverage,
      ownerAvatarUrl,
      description
      reviews(first:$first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          totalCount,
          hasNextPage,
          endCursor,
          startCursor
        } 
      }
    }
  }
`;
