import '@testing-library/jest-dom'
import { fireEvent, render, screen } from '@testing-library/react'
import Home from './page'
import { motion } from 'framer-motion';

 
// Framer motion mock for testing animations
jest.mock('framer-motion', () => {
    const React = require('react');
    return {
      motion: {
        div: jest.fn().mockImplementation(({ children, ...props }) => (
          <div {...props}>{children}</div>
        )),
        main: jest.fn().mockImplementation(({ children, ...props }) => (
          <main {...props}>{children}</main>
        )),
      },
    };
  });

// Testing to see if the main page loads
describe('Home', () => {
  it('renders the home page', () => {
    render(<Home />)
 
    const headingElement = screen.getByText(/Welcome to Pulse/i);
    expect(headingElement).toBeInTheDocument();
  })
})

// Testing to see if a link is rendered on the page, and if the link holds the correect href
describe('Home', () => {
it('should have a link that points to /sign-in', () => {
    render(<Home />);

    // Get the link element by its role
    const linkElement = screen.getByRole('link');

    // Check that the link's href is '/sign-in'
    expect(linkElement).toHaveAttribute('href', '/sign-in');
});
});

// Tests whether the appropriate animation properties have been added to the motion.div
describe('Home', () => {
    it('should apply animation properties to motion.div', () => {
      render(<Home />);
  
      // Verify that the motion.div was called with the correct animation props
      const animatedDiv = screen.getByText('Click to Continue');
  
      expect(motion.div).toHaveBeenCalledWith(
        expect.objectContaining({
          animate: { scale: [1, 1.2, 1], color: ['#ffffff', '#ff0080', '#ffffff'] },
          transition: { duration: 1.5, repeat: Infinity, delay: 1.5 },
        }),
        expect.anything() // The rest of the props and children
      );
  
      // Additionally, you can check if the element is rendered
      expect(animatedDiv).toBeInTheDocument();
    });
  });