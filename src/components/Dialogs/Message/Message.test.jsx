import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Message } from './Message';

jest.mock('../Dialogs.module.scss', () => ({
  messageLeft: 'messageLeft',
  messageRight: 'messageRight',
  message: 'message',
}));

test('renders text message', () => {
  render(<Message id={2} message='Привет'/>);
  const messageElement = screen.getByText('Привет');
  expect(messageElement).toBeInTheDocument();
});

test('renders message on the left', () => {
  const { container } = render(<Message id={2} message='Привет'/>);
  expect(container.firstChild).toHaveClass('message', 'messageLeft');
});

test('renders message on the right', () => {
  const { container } = render(<Message id={1} message='Привет'/>);
  expect(container.firstChild).toHaveClass('message', 'messageRight');
});
