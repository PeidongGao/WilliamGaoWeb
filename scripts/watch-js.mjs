import { watch } from 'node:fs';
import { spawn } from 'node:child_process';

let timer;
let running = false;
let pending = false;

function build() {
  if (running) {
    pending = true;
    return;
  }
  running = true;
  const child = spawn(process.execPath, [process.env.npm_execpath, 'run', 'build:js'], {
    stdio: 'inherit',
  });
  child.on('error', (error) => console.error(error));
  child.on('close', () => {
    running = false;
    if (pending) {
      pending = false;
      build();
    }
  });
}

watch('assets/js', { recursive: true }, (_event, filename) => {
  if (!filename?.endsWith('.js') || filename === 'main.min.js') return;
  clearTimeout(timer);
  timer = setTimeout(build, 100);
});
build();
console.log('Watching JavaScript sources. Press Ctrl-C to stop.');
