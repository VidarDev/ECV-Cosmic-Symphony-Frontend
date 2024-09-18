import {
  EffectComposer,
  GodRays,
  SelectiveBloom,
} from '@react-three/postprocessing';
import useStore from '../../../hooks/useStore';

const PostProcessingEffects = () => {
  // Stores
  const quality = useStore((state) => state.userSettings.quality);

  if (quality === 'Low') {
    return null;
  }

  return null;

  return (
    <EffectComposer>
      {quality === 'High' ? (
        <GodRays
          blur={true}
          decay={0.9}
          samples={120}
          density={0.98}
          // sun={lightSourceMeshRef.current}
        />
      ) : quality === 'Medium' ? (
        <SelectiveBloom
          // selection={[lightSourceMeshRef.current]}
          luminanceThreshold={0}
          luminanceSmoothing={0.9}
          height={300}
        />
      ) : (
        <></>
      )}
    </EffectComposer>
  );
};

export default PostProcessingEffects;
