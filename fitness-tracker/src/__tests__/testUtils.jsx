import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

export const renderWithRouter = (ui, { route = '/', entries = [route] } = {}) =>
  render(<MemoryRouter initialEntries={entries}>{ui}</MemoryRouter>);
