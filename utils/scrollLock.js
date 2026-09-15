/**
 * Reference-counted body scroll lock.
 *
 * The boot overlay and the mobile menu both used to write
 * `document.body.style.overflow` directly, so whichever unmounted first
 * unlocked scrolling for the other. Callers now take a lock and call the
 * returned release; the body is only unlocked when the last one lets go.
 */
let locks = 0;

export function lockScroll() {
  locks += 1;
  if (locks === 1) document.body.style.overflow = "hidden";

  let released = false;
  return () => {
    if (released) return;
    released = true;
    locks -= 1;
    if (locks === 0) document.body.style.overflow = "";
  };
}
