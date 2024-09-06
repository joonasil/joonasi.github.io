import HelloWorld from '@/scenes/HelloWorld';
import useInspector from '@/store/inspector';
import { useEffect } from 'react';
import { useScene } from 'babylonjs-hook';

export default function Page1() {
  const [isInspectorOpen] = useInspector();
  const scene = useScene();

  useEffect(() => {
    console.log('Is inspector open: ' + isInspectorOpen);
  }, [isInspectorOpen, scene]);

  return (
    <div>
      <HelloWorld />
    </div>
  );
}
