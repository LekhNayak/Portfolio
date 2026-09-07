/**
 * Fixed ivory paper textures (global classes defined in `global.scss`):
 * a fine fibre speckle plus a very soft crumple relief. Both are static —
 * the sheet should read as stock, never as an animation.
 */
export function PaperTexture() {
  return (
    <>
      <div className="paper-grain" aria-hidden="true" />
      <div className="paper-crumple" aria-hidden="true" />
    </>
  );
}
