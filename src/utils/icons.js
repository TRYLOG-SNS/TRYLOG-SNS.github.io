// ===================================
// TRYLOG - Lucide Icon System
// ===================================
import { icons } from 'lucide';

/**
 * Renders a Lucide icon as SVG string.
 * @param {string} name - Lucide icon name (PascalCase or camelCase e.g. PartyPopper, Flame, Target)
 * @param {Object} options - Custom options (size, color, strokeWidth, className, style)
 * @returns {string} SVG HTML string
 */
export function getIconSvg(name, options = {}) {
  const {
    size = 20,
    color = 'currentColor',
    strokeWidth = 2,
    className = '',
    style = '',
  } = options;

  // Normalize icon name (e.g. 'party-popper' -> 'PartyPopper', 'flag' -> 'Flag')
  let iconName = name;
  if (name.includes('-')) {
    iconName = name
      .split('-')
      .map(part => part.charAt(0).toUpperCase() + part.slice(1))
      .join('');
  } else if (name.charAt(0) !== name.charAt(0).toUpperCase()) {
    iconName = name.charAt(0).toUpperCase() + name.slice(1);
  }

  const iconNode = icons[iconName] || icons.Sparkles;
  if (!iconNode) return '';

  const childrenXml = iconNode
    .map(([tag, attrs]) => {
      const attrStr = Object.entries(attrs)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} ${attrStr} />`;
    })
    .join('');

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="${strokeWidth}" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-${iconName.toLowerCase()} ${className}" style="vertical-align:-0.125em;display:inline-block;flex-shrink:0;${style}">${childrenXml}</svg>`;
}
