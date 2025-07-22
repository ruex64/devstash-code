import { useState, useEffect } from 'react';

/**
 * A custom hook to debounce a value.
 * This is useful for delaying the execution of a function until after a certain amount of time has passed since the last event.
 * For example, waiting for a user to stop typing in a search bar before making an API call.
 *
 * @param {any} value The value to debounce (e.g., a search term).
 * @param {number} delay The debounce delay in milliseconds.
 * @returns {any} The debounced value.
 */
function useDebounce(value, delay) {
  // State to store the debounced value
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set up a timer to update the debounced value after the specified delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Clean up the timer if the value changes or the component unmounts
    // This prevents the debounced value from updating if the value changes within the delay period.
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Only re-run the effect if value or delay changes

  return debouncedValue;
}

export default useDebounce;
