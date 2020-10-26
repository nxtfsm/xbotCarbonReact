import React from 'react'
import { Button } from 'carbon-components-react'
import Graphic from '@components/VectorGraphics'

export default function StickyButton(props) {
  const {
    clickHandler,
    pictogram,
    assistiveText,
    hoverAnimation,
    showToolTip
  } = props;

  const baseClassStr = "bx--btn bx--btn--primary bx--btn--icon-only"
  const toolTipStr = "bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-center";

  return (
  <span className="stickyButton">
    <Button
      className={ /*baseClassStr + ' ' + toolTipStr*/ className() }
      onClick={ () => {
        try { clickHandler() }
        catch { return }
      } }
      onMouseEnter={ (e) => {
        try { hoverAnimation(e.target) }
        catch { return }
      } }
    >
      <span className="bx--assistive-text">{ assistiveText}</span>
      <Graphic pictogram={ pictogram } />
    </Button>
  </span>
  )

  function className() {
    const baseClassStr = "bx--btn bx--btn--primary bx--btn--icon-only";
    const toolTipStr = "bx--tooltip__trigger bx--tooltip--a11y bx--tooltip--top bx--tooltip--align-center";

    return !!showToolTip ? baseClassStr.concat(' ', toolTipStr) : baseClassStr
  }
}
