/**
 * Small ceiling lamp the pull cord hangs from: a shade, a bulb and a soft cone of light.
 * Colours come from --lamp-* tokens (amber in light theme, white in dark).
 * `on` is only used as a key so the flicker replays on every theme pull.
 */
export default function Lamp({ on }: { on: boolean }) {
  return (
    <div aria-hidden="true" className="lamp">
      <div key={String(on)} className="lamp-light">
        <div className="lamp-ray" />
        <div className="lamp-bulb" />
      </div>
      <div className="lamp-shade" />
    </div>
  );
}
