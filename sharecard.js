function downloadCard() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = 1200;
  canvas.height = 630;

  ctx.fillStyle = "#0b0f1a";
  ctx.fillRect(0,0,canvas.width,canvas.height);

  ctx.fillStyle = "white";
  ctx.font = "bold 60px Arial";
  ctx.fillText("GitHub Wrapped", 80, 120);

  ctx.font = "40px Arial";
  ctx.fillText("Share your dev stats 🚀", 80, 220);

  const link = document.createElement("a");
  link.download = "wrapped.png";
  link.href = canvas.toDataURL();
  link.click();
}
