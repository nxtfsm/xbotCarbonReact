import { gsap } from 'gsap'

export default function spinOnY(element) {
  const graphic = element.querySelector('.pictogramWrapper'),
        tl = gsap.timeline({
        defaults: {
          duration: .7,
          ease: "cubic-bezier(0.4, 0.14, 0.3, 1)" },
        paused: true
        })
        .spinGraphicY(graphic);
  tl.play()
}