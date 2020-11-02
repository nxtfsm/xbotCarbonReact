import { gsap } from 'gsap'
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

export default function fleetToTiles(params) {
  const { fleetContainer, headerTiles } = params,
        helperText = fleetContainer.querySelector('.helperText'),
        wrappers = fleetContainer.querySelectorAll('.pictogramWrapper'),
        graphics = fleetContainer.querySelectorAll('svg'),
        tl = gsap.timeline({
          immediateRender: true,
          defaults: {
            duration: 1, transformOrigin: "50% 50%",
            ease: 'cubic-bezier(0.2, 0, 0.38, 0.9)'
          }
        });

    tl.add(_hideHelperText(helperText))
      .add(_quickFleetCollapser(wrappers, graphics, fleetContainer), '<')
      .add(_quickFleetToTiles(graphics, headerTiles, fleetContainer))
      .add(_expandTiles(headerTiles), '-=.4')

}

const  _hideHelperText = (helperText) => {
  const tl = gsap.timeline()
          .hideByHeightToZero(helperText)
  return tl
}

const _quickFleetCollapser = (wrappers, graphics, container) => {
  const tl = gsap.timeline({defaults: {duration: .7}});

      tl.to(graphics, { rotateZ: "-90deg", stagger: { amount: .2} })

      for (let wrapper of gsap.utils.toArray(wrappers).reverse()) {
          let delta = MotionPathPlugin.getRelativePosition(wrapper, container, [1, .5], [1,.5])
          tl.to(wrapper, { x: "+=" + delta.x, y: "+=" + delta.y }, '<') }
    return tl
}

const _quickFleetToTiles = (graphics, tiles, container) => {
  const tl = gsap.timeline({
          defaults: {duration: .7},
          onComplete: () => container.remove() });

    for (var i = 0; i < graphics.length; i++) {
      let delta = MotionPathPlugin.getRelativePosition(container, tiles[i], [1, 0.25], [0.5,.75])
      tl.to(graphics[i],
        {opacity: 0, rotateZ: "-=30deg", x: "+=" + (delta.x+48), y: "+=" + delta.y}, '<') }

    tl.to(graphics,
      {opacity: 0, stagger: {amount: .2}, display: "none" }, "-=.2")
    return tl
}

const _expandTiles = (tiles) => {
  const tileArray = gsap.utils.toArray(tiles),
        titles = tileArray.map(t => {return t.querySelector('.title')}),
        icons = tileArray.map(t => { return t.querySelector('.iconWrapper')}),
        tl = gsap.timeline({
          defaults: {
            duration: .7,
            ease: 'cubic-bezier(.62, .1, .8, 1)',
            stagger: {
              amount: .2,
              ease: 'cubic-bezier(.62, .1, .8, 1)',
              from: 1} }});

    tl.to(tiles, { width: "100%", opacity: 1 }, "-=.1")
      .to(tiles, { height: "100%" }, '<.4')
      .from(titles, { opacity: 0}, '-=.4')
      .from(icons, { opacity: 0, rotateY: '-=180deg'}, '<.2')



  return tl
}
