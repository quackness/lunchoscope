import { render } from '@testing-library/react';
import Footer from '../src/components/Frontend/footer' 

describe('Pricing Component', () => {
    it('renders pricing component without crashing', () => {
        render(<Footer />);
    });
  });