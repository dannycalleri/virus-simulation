export function createHistogram(element: HTMLElement, renderElement: HTMLElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;

  const width = 300;
  const height = 50;
  const dpr = window.devicePixelRatio;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  context.scale(dpr, dpr);

  context.beginPath();
  context.rect(0, 0, width, height);
  context.fillStyle = "#000";
  context.fill();

  const data: number[] = [];
  const step = 1;
  let xPos = 0;

  function onHistogramEvent (e: any) {
    const rate = e.detail;
    data.push(rate);
    update();
  }

  function update() {
    const dataPoint = data.pop() || 0;
    const rate = dataPoint / 200;
    const barHeight = (rate * height) * 3;
    context.beginPath();
    context.rect(xPos, height - barHeight, step, barHeight);
    context.fillStyle = "#ffffff";
    context.fill();
    xPos += step;
    // window.requestAnimationFrame(update);
  }
  
  // window.requestAnimationFrame(update);

  element.addEventListener('histogramEvent', onHistogramEvent, false);
  renderElement.appendChild(canvas);
};
