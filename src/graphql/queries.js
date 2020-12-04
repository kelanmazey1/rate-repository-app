/* eslint-disable import/prefer-default-export */
import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
query {
  repositories {
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
