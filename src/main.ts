import './style.css';

let canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D;

document.addEventListener('DOMContentLoaded', () => {

  canvas = document.querySelector<HTMLCanvasElement>('#canvas')!
  ctx = canvas.getContext('2d')!

  canvas.addEventListener('mouseover', e => {
    hoverPixel(canvas, e);
  });

  canvas.addEventListener('mousedown', e => {
    colorPixel(canvas, e, 'red');
  });

  canvas.width = 1200;
  canvas.height = 1200;
  ctx.fillStyle = 'cornflowerblue';
  ctx.strokeStyle = '#ccc';
  ctx.lineWidth = 2;
  ctx.textAlign = 'start';
  ctx.font = 'normal 30px Arial';
  drawGrid(100);
});

document.addEventListener('keydown', e => {
  if (e.key === 'c') {
    clearCanvas();
  }
});

function drawGrid(gap: number) {
  ctx.beginPath();
  for (let x = gap; x<canvas.width; x = x+gap) {
    ctx.moveTo(x, 0);
    ctx.lineTo(x, canvas.height);
  }
  for (let y = gap; y<canvas.height; y = y+gap) {
    ctx.moveTo(0, y);
    ctx.lineTo(canvas.height, y);
  }
  ctx.stroke();
  ctx.closePath();
}

function mouseLocation(canvas: HTMLCanvasElement, event: MouseEvent) {
  let xPosition: number;
  let yPosition: number;

  const rect = canvas.getBoundingClientRect();
  const elementRelativeX = event.clientX - rect.left;
  const elementRelativeY = event.clientY - rect.top;
  const x = elementRelativeX * canvas.width / rect.width;
  const y = elementRelativeY * canvas.height / rect.height;

  xPosition = Math.floor(x/100)*100;
  yPosition = Math.floor(y/100)*100;

  return [xPosition, yPosition];
}

function hoverPixel(canvas: HTMLCanvasElement, event: MouseEvent) {
  colorPixel(canvas, event, 'grey');

}

function colorPixel(canvas: HTMLCanvasElement, event: MouseEvent, color: string) {
  const position = mouseLocation(canvas, event);
  const xPosition = position[0];
  const yPosition = position[1];

  // console.log('x: ' + xPosition + ', y: ' + yPosition);

  ctx.beginPath();
  ctx.rect(xPosition, yPosition, 100, 100);
  ctx.fillStyle= color;
  ctx.fill();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid(100);
}