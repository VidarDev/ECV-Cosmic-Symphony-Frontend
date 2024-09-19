import { RefObject } from 'react';
import { Mesh } from 'three';

export type componentRefs = {
  lightSourceMeshRef?: RefObject<Mesh>;
};
