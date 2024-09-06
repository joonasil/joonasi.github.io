import HelloWorld from '@/scenes/HelloWorld';
import useInspector from '@/store/inspector';
import { useEffect } from 'react';

export default function Page1() {
  const [isInspectorOpen] = useInspector();

  useEffect(() => {
    console.log('Is inspector open: ' + isInspectorOpen);
  }, [isInspectorOpen]);

  return (
    <div>
      <HelloWorld />
    </div>
  );
}
