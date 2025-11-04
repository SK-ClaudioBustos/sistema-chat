export const sanitizeUsername = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, "_");
};

export const validateUsername = (name: string): boolean => {
  const regex = /^[a-zA-Z\s]+$/;
  return regex.test(name);
};

export function generateColorFromUsername(username: string): string {
  const colors = [
    '#8b5cf6', // violet
    '#3b82f6', // blue
    '#10b981', // emerald
    '#f59e0b', // amber
    '#ef4444', // red
    '#ec4899', // pink
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#f97316', // orange
    '#a855f7', // purple
    '#14b8a6', // teal
    '#eab308', // yellow
    '#6366f1', // indigo
    '#22c55e', // green
    '#f43f5e', // rose
    '#0ea5e9', // sky
    '#d946ef', // fuchsia
    '#64748b', // slate
    '#fb923c', // orange-400
    '#2dd4bf', // teal-400
    '#facc15', // yellow-400
    '#4ade80', // green-400
    '#fb7185', // rose-400
    '#c084fc', // purple-400
    '#38bdf8', // sky-400
  ];
  
  const hash = username.split('').reduce((acc, char) => 
    char.codePointAt(0)! + ((acc << 5) - acc), 0
  );
  
  return colors[Math.abs(hash) % colors.length];
}