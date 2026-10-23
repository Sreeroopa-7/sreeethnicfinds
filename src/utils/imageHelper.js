/**
 * Universal Image Path Resolver
 * Automatically resolves relative vs subpath asset URLs across:
 * - GitHub Pages (/sreeethnicfinds/images/...)
 * - Localhost (/images/...)
 * - Vercel / Netlify (/images/...)
 */
export const getImagePath = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  
  // Clean leading slashes, dots, and 'images/' prefix
  const clean = path.replace(/^\.?\/?(sreeethnicfinds\/)?(images\/)?/, '');
  const rawBase = import.meta.env.BASE_URL || '/';
  const base = rawBase.endsWith('/') ? rawBase : `${rawBase}/`;
  return `${base}images/${clean}`;
};

export default getImagePath;
