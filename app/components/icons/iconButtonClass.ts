/*
 * Round icon button used for social and contact links: no border, transparent
 * background, and on hover a soft glow centred behind the icon. The glow is
 * drawn in currentColor, so pairing this with a hover:text-[…] brand colour
 * makes the icon and its glow match. Give the icon itself `relative` so it
 * stays above the glow.
 */
export const iconButtonClass =
  "relative flex h-15 w-15 items-center justify-center rounded-full text-muted transition-colors before:absolute before:-inset-2 before:rounded-full before:bg-[radial-gradient(circle,currentColor_0%,transparent_70%)] before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-35";
