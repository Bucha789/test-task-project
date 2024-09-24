import { screen, fireEvent, cleanup } from '@testing-library/react';
import { Timer } from '../../components/Timer';
import { describe, it, expect, afterEach } from 'vitest';
import { renderWithProviders } from '../../utils/test-utils';
import { TaskType } from '../../store/slices/tasksSlice';
import { transformTimeToDisplay } from '../../utils/format';


describe('Timer Component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should display a message when there is no current task', () => {
    const preloadedState = {
      timer: {
        isRunning: false,
        task: null,
      },
    }
    renderWithProviders(
      <Timer />,
      { preloadedState }
    );
    expect(screen.getByText("There's nothing here. Please create a task to start the magic ;).")).not.toBeNull();
  });

  it('should display the current task description and controls when there is a task', async () => {
    // Mock the state
    const mockState = {
      timer: {
        isRunning: false,
        task: {
          id: '1',
          description: 'Test Task',
          currentDuration: 150,
          duration: 1500,
          createdAt: '2022-01-01',
          type: 'medium' as TaskType,
          completed: false,
        },
      },
    };
    renderWithProviders(<Timer />, {
      preloadedState: mockState
    });

    expect(screen.getByText('Test Task')).toBeDefined();
    expect(screen.getByText(transformTimeToDisplay(mockState.timer.task.currentDuration))).toBeDefined(); // Assuming transformTimeToDisplay converts 1500 seconds to 25:00
  });

  it('should stop task when the user is clicking in the stop button', async () => {
    // Mock the state
    const mockState = {
      timer: {
        isRunning: true,
        task: {
          id: '1',
          description: 'Test Task',
          currentDuration: 120,
          duration: 1500,
          createdAt: '2022-01-01',
          type: 'medium' as TaskType,
          completed: false,
        },
      },
    };
    renderWithProviders(<Timer />, { preloadedState: mockState });
    const stopButton = screen.getByTestId('stop-button');
    expect(stopButton).not.toBeNull();
    fireEvent.click(stopButton!);
    expect(screen.queryByTestId('trash-button')).not.toBeNull();
  });
  it('should pause task when the user is clicking in the pause button', async () => {
    // Mock the state
    const mockState = {
      timer: {
        isRunning: true,
        task: {
          id: '1',
          description: 'Test Task',
          currentDuration: 1200,
          duration: 1500,
          createdAt: '2022-01-01',
          type: 'medium' as TaskType,
          completed: false,
        },
      },
    };
    renderWithProviders(<Timer />, { preloadedState: mockState });
    
    const pauseButton = screen.getByTestId('pause-button');
    
    expect(pauseButton.parentElement).not.toBeNull();
    if(pauseButton.parentElement) {
      fireEvent.click(pauseButton.parentElement);
    }
    expect(screen.queryByTestId('play-button')).not.toBeNull();
  })
  it('should resume task when the user is clicking in the play button', async () => {
    // Mock the state
    const mockState = {
      timer: {
        isRunning: false,
        task: {
          id: '1',
          description: 'Test Task',
          currentDuration: 1200,
          duration: 1500,
          createdAt: '2022-01-01',
          type: 'medium' as TaskType,
          completed: false,
        },
      },
    };
    renderWithProviders(<Timer />, { preloadedState: mockState });
    const playButton = screen.getByTestId('play-button');
    expect(playButton.parentElement).not.toBeNull();
    if(playButton.parentElement) {
      fireEvent.click(playButton.parentElement);
    }
    expect(screen.queryByTestId('pause-button')).not.toBeNull();
  })

  it('should complete task when the user is clicking in the complete button', async () => {
    // Mock the state
    const mockState = {
      timer: {
        isRunning: true,
        task: {
          id: '1',
          description: 'Test Task',
          currentDuration: 1200,
          duration: 1500,
          createdAt: '2022-01-01',
          type: 'medium' as TaskType,
          completed: false,
        },
      },
    };
    renderWithProviders(<Timer />, { preloadedState: mockState });
    const completeButton = screen.getByTestId('complete-button');
    expect(completeButton).not.toBeNull();
    fireEvent.click(completeButton);
    expect(screen.getByText("There's nothing here. Please create a task to start the magic ;)."))
  });
  it('should clean task when the user is clicking in the trash button', async () => {
    // Mock the state
    const mockState = {
      timer: {
        isRunning: true,
        task: {
          id: '1',
          description: 'Test Task',
          currentDuration: 1200,
          duration: 1500,
          createdAt: '2022-01-01',
          type: 'medium' as TaskType,
          completed: false,
        },
      },
    };
    renderWithProviders(<Timer />, { preloadedState: mockState });
    const stopButton = screen.getByTestId('stop-button');
    expect(stopButton).not.toBeNull();
    fireEvent.click(stopButton!);
    const trashButton = screen.getByTestId('trash-button');
    expect(trashButton).not.toBeNull();
    fireEvent.click(trashButton);
    expect(screen.getByText("There's nothing here. Please create a task to start the magic ;)."))
  });
});