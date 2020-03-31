import { InfectedData } from "./compiler/types";
import configuration from "./configuration";

export function createHistogram(element: HTMLElement, renderElement: HTMLElement) {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d')!;

  const totalNumberOfParticles = 200;
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

  const step = 1;
  let xPos = 0;

  function onHistogramEvent (e: CustomEvent<InfectedData>) {
    console.log(e.detail);
    update(e.detail);
  }

  function update(dataPoint: InfectedData) {
    const healthyBarRatio = dataPoint.healthy / totalNumberOfParticles;
    const infectedBarRatio = dataPoint.infected / totalNumberOfParticles;
    const recoveredBarRatio = dataPoint.recovered / totalNumberOfParticles;

    const healthyBarHeight = healthyBarRatio * height;
    context.beginPath();
    context.rect(xPos, 0, step, healthyBarHeight);
    context.fillStyle = `#${(configuration.colors.healthy).toString(16)}`;
    context.fill();

    const recoveredBarHeight = recoveredBarRatio * height;
    context.beginPath();
    context.rect(xPos, 0, step, recoveredBarHeight);
    context.fillStyle = `#${(configuration.colors.recovered).toString(16)}`;
    context.fill();

    const infectedBarHeight = infectedBarRatio * height;
    context.beginPath();
    context.rect(xPos, height - infectedBarHeight, step, infectedBarHeight);
    context.fillStyle = `#${(configuration.colors.infected).toString(16)}`;
    context.fill();

    xPos += step;
  }

  element.addEventListener('histogramEvent', onHistogramEvent as EventListener, false);
  renderElement.appendChild(canvas);
};
