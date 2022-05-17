import './style.css';

let canvas: HTMLCanvasElement, 
    bg: HTMLCanvasElement, 
    ctx: CanvasRenderingContext2D,
    bg_ctx: CanvasRenderingContext2D,
    size: number = 800,
    pixelSize: number = 50,
    color: string = 'red',
    brushSize: number = 1,
    isDrawing: boolean = false,
    toggleErase: boolean = false;

document.addEventListener('DOMContentLoaded', () => {

  bg = document.querySelector<HTMLCanvasElement>('#background')!
  bg_ctx = bg.getContext('2d')!

  canvas = document.querySelector<HTMLCanvasElement>('#layer1')!
  ctx = bg.getContext('2d')!

  canvas.addEventListener('mousedown', startDraw);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDraw);
  canvas.addEventListener('mouseleave', stopDraw);

  bg.width = size;
  bg.height = size;
  canvas.width = size;
  canvas.height = size;
  drawGrid();
  ctx.fillStyle = color;
});

document.addEventListener('keydown', e => {
  if (e.key === 'c') {
    clearCanvas();
  }
});

function drawRect(ctx: CanvasRenderingContext2D, color: string, x: number, y: number, width: number, height: number) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
}

function drawGrid() {
  // ctx.beginPath();
  drawRect(bg_ctx, '#B8B8B4', 0, 0, bg.width, bg.height);
  // ctx.fillStyle = '#78797A';
  for (let y = 0; y < size; y+=pixelSize) {
    for (let x = 0; x < size; x+=pixelSize) {
      if (((y + x)/pixelSize)%2 === 1) continue;
      // ctx.rect(x, y, pixelSize, pixelSize);
      drawRect(bg_ctx,'#78797A', x, y, pixelSize, pixelSize);
    }
  }
  // ctx.fill();
  // ctx.closePath();
  ctx.fillStyle = color;
}

function mouseLocation(event: MouseEvent) {
  let xPosition: number;
  let yPosition: number;

  const rect = canvas.getBoundingClientRect();
  const elementRelativeX = event.clientX - rect.left;
  const elementRelativeY = event.clientY - rect.top;
  const x = elementRelativeX * canvas.width / rect.width;
  const y = elementRelativeY * canvas.height / rect.height;

  xPosition = Math.floor(x/pixelSize)*pixelSize;
  yPosition = Math.floor(y/pixelSize)*pixelSize;

  return [xPosition, yPosition];
}

function startDraw(event: MouseEvent) {
  isDrawing = true;
  console.log(isDrawing);
  ctx.beginPath();
  colorPixel(event);
}

function draw(event: MouseEvent) {
  if(!isDrawing) return;
  colorPixel(event);
}

function stopDraw() {
  isDrawing = false;
  console.log(isDrawing);
  ctx.closePath();
}

function erase() {
  toggleErase = !toggleErase;
}

function colorPixel(event: MouseEvent) {
  const position = mouseLocation(event);
  const xPosition = position[0];
  const yPosition = position[1];

  // console.log('x: ' + xPosition + ', y: ' + yPosition);
  // ctx.rect(xPosition, yPosition, pixelSize * brushSize, pixelSize * brushSize);
  // ctx.fill();
  drawRect(ctx, color, xPosition, yPosition, pixelSize * brushSize, pixelSize * brushSize);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  ctx.fillStyle = color;
}