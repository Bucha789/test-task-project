import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import { describe, it, expect, vi, afterEach } from 'vitest'
import { AlertModal } from '../../../components/modals/AlertModal'

describe('AlertModal', () => {

  afterEach(() => {
    cleanup();
  })

  it('renders the modal with the correct title and text', () => {
    render(
      <AlertModal
        show={true}
        handleClose={() => {}}
        title="Test Title"
        text="Test Text"
      />
    )

    expect(screen.getByText('Test Title')).toBeDefined()
    expect(screen.getByText('Test Text')).toBeDefined()
  })

  it('calls handleClose when the close button is clicked', () => {
    const handleClose = vi.fn()

    render(
      <AlertModal
        show={true}
        handleClose={handleClose}
        title="Test Title"
        text="Test Text"
      />
    )

    fireEvent.click(screen.getByText('Ok'))
    expect(handleClose).toHaveBeenCalledTimes(1)
  })

  it('does not render the modal when show is false', () => {
    render(
      <AlertModal
        show={false}
        handleClose={() => {}}
        title="Test Title"
        text="Test Text"
      />
    )
    expect(screen.queryByText('Test Title')).toBeNull()
    expect(screen.queryByText('Test Text')).toBeNull()
  })
})