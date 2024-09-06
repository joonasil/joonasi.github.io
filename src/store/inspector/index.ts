import { useCallback, useMemo } from 'react';
import { atom, useRecoilState } from 'recoil';

import type { Actions } from './types';

const babylonjsInspectorState = atom<boolean>({
  key: 'inspector-openness-state',
  default: false,
});

function useInspector(): [boolean, Actions] {
  const [isOpen, setIsOpen] = useRecoilState(babylonjsInspectorState);

  const toggle = useCallback(() => {
    setIsOpen((isOpen: boolean) => !isOpen);
  }, [setIsOpen]);

  const close = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  const open = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const memoizedActions = useMemo(() => ({ toggle, close, open }), [toggle, close, open]);

  return [isOpen, memoizedActions];
}

export default useInspector;
