import React, { useEffect, useRef } from 'react';
import { Engine } from '@babylonjs/core';
import { EngineOptions } from '@babylonjs/core/Engines/thinEngine.js';
import { Scene, SceneOptions } from '@babylonjs/core/scene.js';
import { Inspector } from '@babylonjs/inspector';
import useInspector from '@/store/inspector';

export type BabylonjsProps = {
  antialias?: boolean;
  engineOptions?: EngineOptions;
  adaptToDeviceRatio?: boolean;
  renderChildrenWhenReady?: boolean;
  sceneOptions?: SceneOptions;
  onSceneReady: (scene: Scene) => void;
  /**
   * Automatically trigger engine resize when the canvas resizes (default: true)
   */
  observeCanvasResize?: boolean;
  onRender?: (scene: Scene) => void;
  children?: React.ReactNode;
};

export default function SceneComponent(
  props: BabylonjsProps & React.CanvasHTMLAttributes<HTMLCanvasElement>,
) {
  const {
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    ...rest
  } = props;
  const reactCanvas = useRef(null);
  const [isInspectorOpen] = useInspector();

  // set up basic engine and scene
  useEffect(() => {
    const { current: canvas } = reactCanvas;

    if (!canvas) return;

    const engine = new Engine(canvas, antialias, engineOptions, adaptToDeviceRatio);
    const scene = new Scene(engine, sceneOptions);
    if (scene.isReady()) {
      onSceneReady(scene);
    } else {
      scene.onReadyObservable.addOnce((scene) => onSceneReady(scene));
    }

    engine.runRenderLoop(() => {
      if (typeof onRender === 'function') onRender(scene);
      if (isInspectorOpen && !Inspector.IsVisible) {
        Inspector.Show(scene, {});
      } else if (!isInspectorOpen && Inspector.IsVisible) {
        Inspector.Hide();
      }
      scene.render();
    });

    const resize = () => {
      scene.getEngine().resize();
    };

    if (window) {
      window.addEventListener('resize', resize);
    }

    return () => {
      scene.getEngine().dispose();

      if (window) {
        window.removeEventListener('resize', resize);
      }
    };
  }, [
    antialias,
    engineOptions,
    adaptToDeviceRatio,
    sceneOptions,
    onRender,
    onSceneReady,
    isInspectorOpen,
  ]);

  return <canvas ref={reactCanvas} {...rest} />;
}
