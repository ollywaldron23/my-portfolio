import { render, screen } from '@testing-library/react';
import AboutMe from '../components/AboutMe';  // Adjust import path

describe('AboutMe component', () => {
  test('renders main about container', () => {
    render(<AboutMe />);
    const container = screen.getByRole('region', { name: /about me/i });
    expect(container).toBeInTheDocument();
  });

  test('renders image with correct alt text', () => {
    render(<AboutMe />);
    const image = screen.getByAltText('Olly Waldron');
    expect(image).toBeInTheDocument();
  });

  test('renders about text paragraphs', () => {
    render(<AboutMe />);
    expect(screen.getByText(/Hi, I'm Oliver Waldron/i)).toBeInTheDocument();
    expect(screen.getByText(/I recently completed the 14-week Makers/i)).toBeInTheDocument();
    expect(screen.getByText(/My current toolkit includes JavaScript/i)).toBeInTheDocument();
  });
})