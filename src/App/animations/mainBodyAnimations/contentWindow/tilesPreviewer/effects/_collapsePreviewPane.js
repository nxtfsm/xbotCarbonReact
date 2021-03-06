import { gsap } from 'gsap';

export default function initCollapsePreviewPane() {
  gsap.registerEffect({
    name: 'collapsePreviewPane',
    extendTimeline: true,
    effect: (target, config) => {
      const { previewCol, previewPane } = [...target][0];
      const childNodes = gsap.utils.toArray(previewPane.children);
      return gsap.timeline({
              defaults: {
                duration: 1,
                transformOrigin: "center right",
                ease: "standard_productive"},
              })
                .to(childNodes, { opacity: 0, duration: .4 })
                .to(previewPane, { bottom: "100%", opacity: 0 }, '<.3')
                .to(previewPane, { right: "100%" }, '<.4')
                .to(previewPane, { marginLeft: 0, padding: 0 }, '<.2')
                .set(previewCol, { flex: 0 })
                .call( () => previewCol.classList.toggle('visible') )

    }
  });
};
