// Shim RAF to silence React warning
global.requestAnimationFrame = callback => {
  setTimeout(callback, 0);
};
