import React, { useEffect } from 'react'
import useLocalStorage from '@hooks/useLocalStorage';
import CodeMirrorEditor from '@components/CodeMirrorEditor';
import ResizablePane from '@components/ResizablePane';
import DefaultSrc from './_DefaultSrc';

export default function EditorsPane(props) {
  const { srcDoc, setSrcDoc } = props,
        [html, setHtml] = useLocalStorage('html', DefaultSrc.html()),
        [css, setCss] = useLocalStorage('css', DefaultSrc.css()),
        [js, setJs] = useLocalStorage('js', DefaultSrc.js());

  useEffect(() => {
    const timeout = setTimeout(() => {
          setSrcDoc( DefaultSrc.template(html, css, js) ) }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return (
    <>
    <CodeMirrorEditor
      language="xml"
      displayName="HTML"
      value={ html }
      onChange={ setHtml } />
    <CodeMirrorEditor
      language="css"
      displayName="CSS"
      value={ css }
      onChange={ setCss } />
    <CodeMirrorEditor
      language="javascript"
      displayName="JS"
      value={ js }
      onChange={ setJs } />
    </>
  )
}