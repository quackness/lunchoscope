import { render } from '@testing-library/react';
import Footer from '../src/components/Frontend/footer' 

describe('Footer Component', () => {
    it('renders footer component without crashing', () => {
        render(<Footer />);
    });
  });