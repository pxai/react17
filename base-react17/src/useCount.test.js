import {renderHook, act} from '@testing-library/react-hooks';
import useCount from './useCount'

describe('useCount', () => {
    it('should increment count', () => {
        const { result } = renderHook(() => useCount());

        expect(result.current.count).toBe(0);

        act(() => result.current.increment());

        expect(result.current.count).toBe(1);
    });

    it('should decrement count', () => {
        const { result } = renderHook(() => useCount());

        expect(result.current.count).toBe(0);

        act(() => result.current.decrement());

        expect(result.current.count).toBe(-1);
    });
});