import { gsap } from 'gsap';

export default function collapsePreviewerTiles(params) {
  const { tile,
          tileCol,
          previewPane,
          previewCol,
          setPreviewArticle,
        } = params;
  const tiles = gsap.utils.toArray(tileCol.children);
  const deltaWidth = tileCol.clientWidth * .6;

  const transform = {
    idx: tiles.indexOf(tile),
    delta: `-=${deltaWidth}`
  }

  const tl = gsap.timeline({
          paused: true,
          onStart: () => tile.classList.toggle('activeArticleTile'),
          onComplete: () => setPreviewArticle()
        })
          .resizeArticlePreviewTiles({ tiles, transform })
          .set(tileCol, { flexGrow: 0 })
          .displayPreviewPane({ previewCol, previewPane });

  tl.play();
}
