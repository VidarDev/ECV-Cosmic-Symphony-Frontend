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

  const lightSourceMesh = componentRefs.lightSourceMeshRef?.current;
  if (!lightSourceMesh) return null;

  const renderHighQuality = () => (
    <EffectComposer>
      <GodRays
        blur={true}
        decay={0.8}
        samples={30}
        density={0.99}
        sun={lightSourceMesh}
      />
    </EffectComposer>
  );

  const renderMediumQuality = () => (
    <EffectComposer>
      <SelectiveBloom
        selection={[lightSourceMesh]}
        luminanceThreshold={0}
        luminanceSmoothing={0.9}
        height={400}
      />
    </EffectComposer>
  );

  switch (userSettings.resolutionQuality) {
    case 'High':
      return renderHighQuality();
    case 'Medium':
      return renderMediumQuality();
    default:
      return null;
  }
};

export default PostProcessingEffects;
