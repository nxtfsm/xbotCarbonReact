import React, { useContext, useEffect, useRef, useState } from 'react';
import { PageFirst24 } from '@carbon/icons-react';
import { AppContext } from '@App';
import DrawerMemo from '@components/DrawerMemo';
import CodePenModal from '@components/CodePenModal';
import ToastAlert from '@components/CodePenModal';
import { useClickOutsideDetector } from '@hooks';

const DOM = {
  WRAPPER: "sideDrawer",
  TOGGLER: "drawerToggler",
  CONTENT: "sideDrawerContent",
  OPEN: "isOpen",
};

export default function SideDrawer() {
  const {
    readingList,
    setReadingList,
    animate: { wrapperTimeline, sideDrawerFX }
  } = useContext(AppContext);
  const [drawerIsOpen, setDrawerOpen] = useState(false);
  const wrapperRef = useRef();
  const drawerRef = useRef();

  const [ codePenModalOpen, setCodePenModalOpen ] = useState(false);
  const [ modalRecord, setModalRecord ] = useState(null);

  useClickOutsideDetector(wrapperRef, () => {
    if (codePenModalOpen || !drawerIsOpen) return
    closeDrawerTimeline(drawerRef)
  });

  useEffect(() => {
    if (!readingList.length) setDrawerOpen(false);
  }, [readingList])

  if (!readingList.length) return null
  return (
    <>
    <div className={ DOM.WRAPPER } ref={ wrapperRef }>
      <button
        className={ makeClassName(DOM.TOGGLER) }
        onClick ={ () => toggleOpen(drawerRef) }>
        <PageFirst24 />
      </button>
      <div className={ makeClassName(DOM.CONTENT) } ref={ drawerRef }>
        {
          readingList.map(memo => {
            return (
              <DrawerMemo
                key={ `memo_${memo.id}` }
                record={ memo }
                launchModal={ () => launchCodePenModal(memo) }
                removeItem={ (button) => removeItem(button, memo, drawerRef) }
                />
              )
          })
        }
      </div>
    </div>
    <CodePenModal
      modalState={ {
        isOpen: codePenModalOpen,
        close: () => setCodePenModalOpen(false)
        } }
      srcData={ modalRecord }
      inReadingList={ true }
    />
    </>
  );

  function makeClassName(baseClass) {
    return !!drawerIsOpen ? `${baseClass} ${DOM.OPEN}` : baseClass
  }

  function toggleOpen(ref) {
    !drawerIsOpen ? openDrawerTimeline(ref) : closeDrawerTimeline(ref)
  }

  function openDrawerTimeline(ref) {
    wrapperTimeline()
      .add( sideDrawerFX.openDrawer({ drawerRef: ref }).play() )
      .then( () => setDrawerOpen(prevState => !prevState) );
  }

  function closeDrawerTimeline(ref) {
    wrapperTimeline()
      .add( sideDrawerFX.closeDrawer({ drawerRef: ref }).play() )
      .then( () => setDrawerOpen(false) );
  }

  function launchCodePenModal(withSrc) {
    setModalRecord(withSrc);
    setCodePenModalOpen(true);
  }

  function removeItem(button, item) {
    wrapperTimeline()
      .add( sideDrawerFX.removeItem({ button }).play() )
      .add(
        !!(readingList.length === 1)
          ? sideDrawerFX.closeDrawer({ drawerRef }).play()
          : null)
      .then( () => removeItemFromList(item) );
  }

  function removeItemFromList(toRemove) {
    setReadingList(prevState => {
      const updatedList = prevState.filter(item => item.id !== toRemove.id);
      return updatedList;
    })
  }
}
