export function createHistogram(element: HTMLElement) {
  const el = document.createElement('div');
  function onHistogramEvent (e: any) {
    console.log(e.detail);
  }
  element.addEventListener('histogramEvent', onHistogramEvent, false);
  element.appendChild(el);
};
