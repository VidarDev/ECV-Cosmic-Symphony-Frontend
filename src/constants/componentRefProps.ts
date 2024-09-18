import { RefObject } from 'react';
import { Mesh } from 'three';

export type componentRefProps = {
  lightSourceMeshRef?: RefObject<Mesh>;
};
