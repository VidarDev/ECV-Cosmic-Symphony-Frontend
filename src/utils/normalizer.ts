export const degToRad = (deg: number) => deg * (Math.PI / 180);
export const radToDeg = (rad: number) => rad * (180 / Math.PI);
export const kmtoUnit = (km: number) => km * 1000;
export const unitToKm = (unit: number) => unit / 1000;
export const hexWithPrefix = (hex: string) => hex.replace('#', '0x');
export const hexWithoutPrefix = (hex: string) => hex.replace('0x', '#');
