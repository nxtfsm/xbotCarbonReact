const projectGallery = {
  mainId: "projectGallery",
  displayTitle: "Project Gallery",
  defaultStr: "Things People Made",
  windowType: "tabbedWindow",
  options: {
    contentTemplateId: "tabbedWindow",
    tabs: [
      {
        id: "projectGalleryViewer",
        title: "Project Gallery",
        content: {
          defaultStr: "Get inspired.",
          sampleText: "Projects we've made.",
          panelTemplateId: "cardGallery",
        }
      },
      {
        id: "projectGallerySandbox",
        title: "Sandbox",
        content: {
          defaultStr: "Try out some html / css / js.",
          sampleText: "Test drive your html / css / js.",
          panelTemplateId: "codepen",
        }
      }
    ]
  }
};

export default projectGallery;
