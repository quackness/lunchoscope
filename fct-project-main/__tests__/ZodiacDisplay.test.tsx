import React from 'react';
import { render } from '@testing-library/react';
import ZodiacDisplay from '../src/components/Frontend/zodiacDisplay' 

describe('ZodiacDisplay component', () => {
  test('renders 12 zodiac signs', () => {
    const { getByText } = render(
        <ZodiacDisplay latitude={0} longitude={0} sign="aries" />
      );
    const aries = getByText(/Aries/i);
    const taurus = getByText(/Taurus/i);
    const gemini = getByText(/Gemini/i);
    const cancer = getByText(/Cancer/i);
    const leo = getByText(/Leo/i);
    const virgo = getByText(/Virgo/i);
    const libra = getByText(/Libra/i);
    const scorpio = getByText(/Scorpio/i);
    const sagittarius = getByText(/Sagittarius/i);
    const capricorn = getByText(/Capricorn/i);
    const aquarius = getByText(/Aquarius/i);
    const pisces = getByText(/Pisces/i);

    expect(aries).toBeTruthy();
    expect(taurus).toBeTruthy();
    expect(gemini).toBeTruthy();
    expect(cancer).toBeTruthy();
    expect(leo).toBeTruthy();
    expect(virgo).toBeTruthy();
    expect(libra).toBeTruthy();
    expect(scorpio).toBeTruthy();
    expect(sagittarius).toBeTruthy();
    expect(capricorn).toBeTruthy();
    expect(aquarius).toBeTruthy();
    expect(pisces).toBeTruthy();
  });
});
