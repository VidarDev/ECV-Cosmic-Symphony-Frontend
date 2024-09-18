import {
  EffectComposer,
  GodRays,
  SelectiveBloom,
} from '@react-three/postprocessing';
import useStore from '../../../hooks/useStore';

const PostProcessingEffects: React.FC = () => {
  // Stores
  const userSettings = useStore((state) => state.userSettings);
  const componentRefs = useStore((state) => state.componentRefs);

  if (!componentRefs.lightSourceMeshRef?.current) return null;

  switch (userSettings.resolutionQuality) {
    case 'High':
      return (
        <EffectComposer>
          <GodRays
            blur
            decay={0.9}
            samples={120}
            density={0.96}
            sun={componentRefs.lightSourceMeshRef.current}
          />
        </EffectComposer>
      );

    case 'Medium':
      return (
        <EffectComposer>
          <SelectiveBloom
            selection={[componentRefs.lightSourceMeshRef.current]}
            luminanceThreshold={0}
            luminanceSmoothing={0.8}
          />
        </EffectComposer>
      );

    default:
      return null;
  }
};

export default PostProcessingEffects;
