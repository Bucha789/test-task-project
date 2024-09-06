import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import { App } from '../App';
import { renderWithProviders } from '../utils/test-utils';
// Tests
describe('Renders main page correctly', async () => {
  it('Should render the page correctly', async () => {
    renderWithProviders(<App />);
    const firstNavLabel = await screen.queryByText('Tasks');
    const secondNavLabel = await screen.queryByText('Analytics');
    expect(firstNavLabel).not.toBeNull();
    expect(secondNavLabel).not.toBeNull();
  });
});