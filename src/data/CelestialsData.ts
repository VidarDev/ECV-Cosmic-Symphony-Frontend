import { celestialObject } from '../types/celestialObject';
import { getNormalizedCelestialObject } from '../utils/normalizer';

/**
 * data: https://nssdc.gsfc.nasa.gov/planetary/factsheet/
 * albedo data: https://en.wikipedia.org/wiki/Albedo
 * textures: https://www.solarsystemscope.com/textures/
 */
const CelestialsObjectData: celestialObject = {
  name: 'Sun',
  color: 0xffcc33,
  radius: 1392700,
  rotationPeriod: 587.3,
  obliquity: 7.25,
  albedo: 1,
  texturePath: '/textures/sun.jpg',
  isStar: true,
  orbit: {
    color: 0xffcc33,
    radius: 0,
    rotationPeriod: 0,
    inclination: 0,
  },
  satellites: [
    {
      name: 'Mercury',
      color: 0xb1adad,
      albedo: 0.142,
      radius: 4879,
      rotationPeriod: 1407.6,
      obliquity: 0.034,
      texturePath: '/textures/mercury.jpg',
      orbit: {
        color: 0xb1adad,
        radius: 57900000,
        rotationPeriod: 88.0,
        inclination: 7.0,
      },
      satellites: [],
    },
    {
      name: 'Venus',
      color: 0xe3bb76,
      albedo: 0.689,
      radius: 12104,
      rotationPeriod: -5832.5,
      obliquity: 177.4,
      texturePath: '/textures/venus_atmosphere.jpg',
      orbit: {
        color: 0xe3bb76,
        radius: 108200000,
        rotationPeriod: 224.7,
        inclination: 3.4,
      },
      satellites: [],
    },
    {
      name: 'Earth',
      color: 0x6b93d6,
      albedo: 0.434,
      radius: 12756,
      rotationPeriod: 23.9,
      obliquity: 23.4,
      texturePath: '/textures/earth.jpg',
      orbit: {
        color: 0x6b93d6,
        radius: 149600000,
        rotationPeriod: 365.2,
        inclination: 0,
      },
      satellites: [
        {
          name: 'Moon',
          color: 0x999999,
          albedo: 0.14,
          radius: 3475,
          rotationPeriod: 655.7,
          obliquity: 6.7,
          texturePath: '/textures/moon.jpg',
          orbit: {
            color: 0x999999,
            radius: 384000,
            rotationPeriod: 27.3,
            inclination: 5.1,
          },
          satellites: [],
        },
      ],
    },
    {
      name: 'Mars',
      color: 0xc1440e,
      albedo: 0.17,
      radius: 6792,
      rotationPeriod: 24.6,
      obliquity: 25.2,
      texturePath: '/textures/mars.jpg',
      orbit: {
        color: 0xc1440e,
        radius: 228000000,
        rotationPeriod: 687.0,
        inclination: 1.8,
      },
      satellites: [
        {
          name: 'Phobos',
          color: 0x999999,
          albedo: 0.07,
          radius: 11.4,
          rotationPeriod: 0.31891 * 24,
          obliquity: 0,
          orbit: {
            color: 0x999999,
            radius: 9378,
            rotationPeriod: 0.31891,
            inclination: 1.08,
          },
          satellites: [],
        },
        {
          name: 'Deimos',
          color: 0x999999,
          albedo: 0.08,
          radius: 6.0,
          rotationPeriod: 1.26244 * 24,
          obliquity: 0,
          orbit: {
            color: 0x999999,
            radius: 23459,
            rotationPeriod: 1.26244,
            inclination: 1.79,
          },
          satellites: [],
        },
      ],
    },
    {
      name: 'Jupiter',
      color: 0xe7e8ec,
      albedo: 0.538,
      radius: 142984,
      rotationPeriod: 9.9,
      obliquity: 3.1,
      texturePath: '/textures/jupiter.jpg',
      orbit: {
        color: 0xe7e8ec,
        radius: 778500000,
        rotationPeriod: 4331,
        inclination: 1.3,
      },
      satellites: [],
    },
    {
      name: 'Saturn',
      color: 0xe2bf7d,
      albedo: 0.499,
      radius: 120536,
      rotationPeriod: 10.7,
      obliquity: 26.7,
      texturePath: '/textures/saturn.jpg',
      ring: {
        color: 0xe2bf7d,
        innerRadius: 60268,
        outerRadius: 139826,
        texturePath: '/textures/saturn_ring_alpha.png',
      },
      orbit: {
        color: 0xe2bf7d,
        radius: 1432000000,
        rotationPeriod: 10747,
        inclination: 2.5,
      },
      satellites: [],
    },
    {
      name: 'Uranus',
      color: 0x62aee7,
      albedo: 0.488,
      radius: 51118,
      rotationPeriod: -17.2,
      obliquity: 97.8,
      texturePath: '/textures/uranus.jpg',
      orbit: {
        color: 0x62aee7,
        radius: 2867000000,
        rotationPeriod: 30589,
        inclination: 0.8,
      },
      satellites: [],
    },
    {
      name: 'Neptune',
      color: 0x3d5ef9,
      albedo: 0.442,
      radius: 49528,
      rotationPeriod: 16.1,
      obliquity: 28.3,
      texturePath: '/textures/neptune.jpg',
      orbit: {
        color: 0x3d5ef9,
        radius: 4515000000,
        rotationPeriod: 59800,
        inclination: 1.8,
      },
      satellites: [],
    },
  ],
};

export const SolarSytemData =
  getNormalizedCelestialObject(CelestialsObjectData);
