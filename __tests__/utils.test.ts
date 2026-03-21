import { describe, it, expect } from 'vitest';
import { cn } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges tailwind classes properly', () => {
      const result = cn('text-white', 'bg-black', { 'text-red-500': true, 'font-bold': false });
      expect(result).toBe('bg-black text-red-500');
    });

    it('resolves tailwind conflicts', () => {
      // px-2 and p-4 conflict, tailwind-merge should only keep p-4 if it comes last
      const result = cn('px-2 py-1', 'p-4');
      expect(result).toBe('p-4');
    });
  });
});
