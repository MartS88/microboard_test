export class Ball {

  x: number;
  y: number;
  radius: number;
  dx: number;
  dy: number;
  color: string;



  constructor(x: number, y: number, radius: number, dx: number, dy: number,color:string) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = color;

  }



  draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    context.fillStyle = this.color
    context.fill();
    context.closePath();
  }

  update(canvasWidth: number, canvasHeight: number, dampingFactor: number): void {
    // Update the position of the object based on its velocity components
    this.x += this.dx;
    this.y += this.dy;

    // Check if the object has hit the canvas boundaries
    if (this.x + this.radius > canvasWidth) {
      // If it hits the right boundary, move it inside the canvas and reverse its horizontal velocity
      this.x = canvasWidth - this.radius;
      this.dx = -this.dx * dampingFactor; // Apply damping effect to horizontal velocity
    } else if (this.x - this.radius < 0) {
      // If it hits the left boundary, move it inside the canvas and reverse its horizontal velocity
      this.x = this.radius;
      this.dx = -this.dx * dampingFactor; // Apply damping effect to horizontal velocity
    }

    if (this.y + this.radius > canvasHeight) {
      // If it hits the bottom boundary, move it inside the canvas and reverse its vertical velocity
      this.y = canvasHeight - this.radius;
      this.dy = -this.dy * dampingFactor; // Apply damping effect to vertical velocity
    } else if (this.y - this.radius < 0) {
      // If it hits the top boundary, move it inside the canvas and reverse its vertical velocity
      this.y = this.radius;
      this.dy = -this.dy * dampingFactor; // Apply damping effect to vertical velocity
    }
  }
}














//   update(canvasWidth: number, canvasHeight: number): void  {
//     this.x += this.dx;
//     this.y += this.dy;
//     if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
//
//       this.dx = -this.dx
//     }
//     if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
//
//       this.dy = -this.dy
//     }
//
//   }
// }