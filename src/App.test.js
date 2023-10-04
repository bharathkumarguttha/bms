import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const welcomeHeader = screen.getByText("Welcome to Banking Management System");
  expect(welcomeHeader).toBeInTheDocument();
});
