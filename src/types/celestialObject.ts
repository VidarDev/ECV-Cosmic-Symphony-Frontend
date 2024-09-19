export type celestialObject = {
  name: string;
  color: number;
  radius: number; // km
  obliquity: number; // degrees
  rotationPeriod: number; // days
  albedo: number;
  orbit: {
    color: number;
    radius: number; // km
    rotationPeriod: number; // days
    inclination: number; // degrees
  };
  texturePath?: string;
  isStar?: boolean;
  ring?: {
    color: number;
    innerRadius: number; // km
    outerRadius: number; // km
    texturePath?: string;
  };
  satellites: celestialObject[];
};
