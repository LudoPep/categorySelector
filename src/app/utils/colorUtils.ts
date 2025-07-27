export type ColorKey = 'm-blue' | 'm-red' | 'm-purple' | 'm-green' | 'm-pink' | 'm-yellow';

export interface ColorStyle {
  color: string;
  backgroundColor: string;
}

export const colorMap: Record<ColorKey, ColorStyle> = {
  'm-blue': { color: '#11ABEC', backgroundColor: '#E0F6FE' },
  'm-red': { color: '#FD755F', backgroundColor: '#FFECE6' },
  'm-purple': { color: '#ab2ef3', backgroundColor: '#e9c7fd' },
  'm-green': { color: '#1CBB1C', backgroundColor: '#C2FFC2' },
  'm-pink': { color: '#f120bd', backgroundColor: '#fde3f7' },
  'm-yellow': { color: '#FAA11C', backgroundColor: '#FFF5BF' },
};

// To set the category group font and background color using the value returned by the service (group.color)
export function getColorStyle(color?: string): ColorStyle {
  const defaultColor: ColorKey = 'm-yellow';
  const validColor = Object.keys(colorMap).includes(color as ColorKey) ? (color as ColorKey) : defaultColor;
  return colorMap[validColor];
}