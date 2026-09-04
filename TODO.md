# TODO

Tabled polish items for the redesigned personal site. Grouped by priority.

## High priority

- [ ] **Verify / tune the hero planet limb.** The "atmospheric rim" version needs a
      visual check to confirm the curved limb reads as a sphere (not a diffuse glow)
      and stays legible behind the name. Tune rim brightness/curvature and its mobile
      appearance. (Note: current opening page is well-liked; treat as fine-tuning.)
- [ ] **Reduced-motion pass.** Motion is gated in code (framer-motion + CSS media
      queries) but not visually verified via emulation. Confirm the site is fully
      legible and complete with all animation disabled.
- [ ] **Performance of large blurred gradients.** The hero and interlude use big
      `filter: blur` layers. Verify smoothness on lower-powered / mobile devices;
      consider reducing blur radius or gating blur on mobile.

## Medium priority

- [ ] **Push the hero drama further** (optional): more interaction between the name
      and the celestial form, or greater scale.
- [ ] **Projects imagery.** Featured cards use brand logos (Cue Tavern / Roamio) on
      gradient panels. The repo has real screenshots (`images/roamio.png`,
      `images/NBA.png`, `images/NFL_logo.jpg`, etc.) that could make them more
      genuinely image-dominant.
- [ ] **Accent accessibility recheck.** The amber accent was deepened; re-audit the
      large italic accent phrase and the "Now" label for contrast on their surfaces.

## Low priority / cleanup

- [ ] **Remove unused `react-router-dom` dependency** (the site is single-page).
- [ ] **Metadata / social share.** Favicon and OG metadata are still generic; add a
      proper social share image if desired.
- [ ] **One more unexpected composition** (optional): a split-screen or overlapping
      moment to further break visual consistency.
