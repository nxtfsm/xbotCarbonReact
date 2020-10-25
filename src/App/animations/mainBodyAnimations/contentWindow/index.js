import collapseToHide from './_collapseToHide';
import revealFromHidden from './_revealFromHidden';
import heightToggler from './_heightToggler';
import TilesPreviewerAnimations from './tilesPreviewer';

const animations = {
  collapse: (completionHandler) => collapseToHide(completionHandler),
  reveal: (obj) => revealFromHidden(obj),
  heightToggler: (state, onComplete) => heightToggler(state, onComplete),
  content: { tilesPreviewer: () => TilesPreviewerAnimations() }
}

export default animations
