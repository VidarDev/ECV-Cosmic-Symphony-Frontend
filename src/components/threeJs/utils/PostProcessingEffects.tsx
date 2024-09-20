import useStore from '@/hooks/useStore';
import { componentRefs } from '@/types/componentRefs';
import React, { useMemo, useCallback } from 'react';
import {
  EffectComposer,
  GodRays,
  SelectiveBloom,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { Mesh } from 'three';

type PostProcessingEffectsProps = componentRefs;

const PostProcessingEffects: React.FC<PostProcessingEffectsProps> = () => {
  const userSettings = useStore((state) => state.userSettings);
  const componentRefs = useStore((state) => state.componentRefs);

  const lightSourceMesh = componentRefs.lightSourceMeshRef?.current;

  const HighQualityEffects = useCallback(
    () =>
      lightSourceMesh ? (
        <EffectComposer>
          <GodRays
            sun={lightSourceMesh as Mesh}
            blendFunction={BlendFunction.SCREEN}
            samples={30}
            density={0.97}
            decay={0.97}
            weight={0.6}
            exposure={0.3}
            clampMax={1}
            blur={true}
          />
        </EffectComposer>
      ) : null,
    [lightSourceMesh]
  );

  const MediumQualityEffects = useCallback(
    () =>
      lightSourceMesh ? (
        <EffectComposer>
          <SelectiveBloom
            lights={[lightSourceMesh]} // Utilisez lights au lieu de selection
            intensity={1.5}
            luminanceThreshold={0.1}
            luminanceSmoothing={0.3}
          />
        </EffectComposer>
      ) : null,
    [lightSourceMesh]
  );

  const effects = useMemo(() => {
    switch (userSettings.resolutionQuality) {
      case 'High':
        return <HighQualityEffects />;
      case 'Medium':
        return <MediumQualityEffects />;
      default:
        return null;
    }
  }, [
    userSettings.resolutionQuality,
    HighQualityEffects,
    MediumQualityEffects,
  ]);

  return effects;
};

export default PostProcessingEffects;
