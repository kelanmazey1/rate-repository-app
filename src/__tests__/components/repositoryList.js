import React from 'react';
import { render } from '@testing-library/react-native';

import { RepositoryListContainer } from '../../components/RepositoryList.jsx';
import { addKAbbreviation } from '../../components/RepositoryItem.jsx';

jest.mock('@react-native-community/async-storage');

describe('RepositoryList', () => {
  describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        pageInfo: {
          totalCount: 8,
          hasNextPage: true,
          endCursor:
            'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl:
                'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor:
              'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };
      const { edges } = repositories;
      const { getAllByTestId } = render(
        <RepositoryListContainer
          repositories={repositories}
        />,
      );
      getAllByTestId('repoName').forEach((repoName, index) => {
        expect(repoName).toHaveTextContent(edges[index].node.fullName);
      });
      getAllByTestId('repoDescription').forEach((repoDescription, index) => {
        expect(repoDescription).toHaveTextContent(edges[index].node.description);
      });
      getAllByTestId('repoLanguage').forEach((repoLanguage, index) => {
        expect(repoLanguage).toHaveTextContent(edges[index].node.language);
      });
      /*
        Included addKAbbreviation as value is altered after api call in component
        these tests assume that function works correctly
      */
      getAllByTestId('stargazers').forEach((stargazers, index) => {
        expect(stargazers).toHaveTextContent(addKAbbreviation(edges[index].node.stargazersCount));
      });
      getAllByTestId('forks').forEach((forks, index) => {
        expect(forks).toHaveTextContent(addKAbbreviation(edges[index].node.forksCount));
      });
      getAllByTestId('rating').forEach((rating, index) => {
        expect(rating).toHaveTextContent(edges[index].node.ratingAverage);
      });
      getAllByTestId('review').forEach((review, index) => {
        expect(review).toHaveTextContent(edges[index].node.reviewCount);
      });
    });
  });
});
