import { describe, expect, it, vi } from 'vitest';
import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Badge from '../components/UI/Badge.jsx';
import Button from '../components/UI/Button.jsx';
import Card from '../components/UI/Card.jsx';
import Loading from '../components/UI/Loading.jsx';
import Modal from '../components/UI/Modal.jsx';
import SearchBar from '../components/UI/SearchBar.jsx';
import { renderWithRouter } from './testUtils.jsx';

const SearchHarness = ({ onSubmit = vi.fn() }) => {
  const [value, setValue] = React.useState('');
  return <SearchBar value={value} onChange={setValue} onSubmit={onSubmit} />;
};

describe('reusable UI components', () => {
  it('renders button variants and handles clicks', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    renderWithRouter(<Button onClick={handleClick}>Save plan</Button>);
    await user.click(screen.getByRole('button', { name: /save plan/i }));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('renders card children and badge labels', () => {
    renderWithRouter(
      <Card title="Reusable panel" tone="primary">
        <Badge label="Strength" />
        <p>Nested content</p>
      </Card>
    );

    expect(screen.getByRole('heading', { name: /reusable panel/i })).toBeInTheDocument();
    expect(screen.getByText('Strength')).toBeInTheDocument();
    expect(screen.getByText('Nested content')).toBeInTheDocument();
  });

  it('supports search typing, focus, keypress, and submit', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn((event) => event.preventDefault());

    renderWithRouter(<SearchHarness onSubmit={handleSubmit} />);
    const input = screen.getByLabelText(/search exercises/i);

    await user.click(input);
    await user.type(input, 'row');
    fireEvent.keyPress(input, { key: 'Enter', charCode: 13 });
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(input).toHaveValue('row');
    expect(screen.getByText(/last key pressed: enter/i)).toBeInTheDocument();
    expect(handleSubmit).toHaveBeenCalled();
  });

  it('shows loading progress with a dynamic width', () => {
    renderWithRouter(<Loading message="Loading test state" progress={82} />);

    expect(screen.getByRole('status')).toHaveTextContent('Loading test state');
  });

  it('closes modal via overlay click and escape key', async () => {
    const user = userEvent.setup();
    const handleClose = vi.fn();

    renderWithRouter(
      <Modal isOpen title="Preview" onClose={handleClose}>
        <p>Preview body</p>
      </Modal>
    );

    expect(screen.getByRole('dialog', { name: /preview/i })).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    await user.click(screen.getByText('Preview body'));

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
