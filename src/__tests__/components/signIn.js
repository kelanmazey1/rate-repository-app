import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';

import { SignInContainer } from '../../components/SignIn.jsx';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct args when a valid form is submitted', async () => {
      const mockOnSubmit = jest.fn();
      const { debug, getByTestId } = render(
        <SignInContainer
          onSubmit={mockOnSubmit}
        />,
      );

      fireEvent.changeText(getByTestId('usernameField'), 'kalle');
      fireEvent.changeText(getByTestId('passwordField'), 'password');
      fireEvent.press(getByTestId('submitButton'));
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit.mock.calls[0][0]).toEqual({
          username: 'kalle',
          password: 'password',
        });
      });
    });
  });
});
