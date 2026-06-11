/**
 * Fixed comic halftone textures (global classes defined in `global.scss`):
 * the fine ink dot grid + the drifting red dot blob in the corner.
 */
export function Halftone() {
  return (
    <>
      <div className="halftone" aria-hidden="true" />
      <div className="halftone-red" aria-hidden="true" />
    </>
  );
}
