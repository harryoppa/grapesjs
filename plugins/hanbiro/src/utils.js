

export const appendStyle = style => {
  const styles = Array.isArray(style) ? [...style] : [style];
  if (styles.length) {
    const link = document.createElement('link');
    link.href = styles.shift();
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    appendStyle(styles);
  }
}

export const appendScript = script => {
  const scripts = Array.isArray(script) ? [...script] : [script];
  if (scripts.length) {
    const scr = document.createElement('script');
    scr.src = scripts.shift();
    scr.onerror = scr.onload = appendScript.bind(null, scripts);
    document.head.appendChild(scr);
  }
}
