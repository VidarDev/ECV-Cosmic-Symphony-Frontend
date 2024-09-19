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
            blur={true}
            decay={0.9}
            samples={userSettings.realisticScale ? 30 : 120}
            density={0.98}
            sun={componentRefs.lightSourceMeshRef.current}
          />
        </EffectComposer>
      );

    case 'Medium':
      return (
        <EffectComposer>
          <SelectiveBloom
            selection={componentRefs.lightSourceMeshRef.current}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
            height={300}
          />
        </EffectComposer>
      );

    default:
      return null;
  }
};

export default PostProcessingEffects;
