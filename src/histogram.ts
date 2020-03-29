export function createHistogram(element: HTMLElement, renderElement: HTMLElement) {
  const el = document.createElement('div');
  function onHistogramEvent (e: any) {
    console.log(e.detail);
    el.innerHTML += e.detail;
  }
  element.addEventListener('histogramEvent', onHistogramEvent, false);
  renderElement.appendChild(el);
};
