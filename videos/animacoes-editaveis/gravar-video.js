// Grava os quadros de uma animação e depois monta o MP4 com ffmpeg.
// Requisitos: Node.js, "npm i playwright" e "npx playwright install chromium", e ffmpeg instalado.
// Uso: node gravar-video.js bugbeats-colonia.html
// Depois: ffmpeg -framerate 29.9 -i quadros/%04d.jpg -c:v libx264 -crf 20 -pix_fmt yuv420p video.mp4
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
(async()=>{const file=path.resolve(process.argv[2]);fs.mkdirSync('quadros',{recursive:true});
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:1080,height:1920}});
 await p.goto('file://'+file);await p.waitForFunction('window.ready===true');await p.evaluate(()=>document.fonts.ready);
 const N=165; // 16 batidas a 174 BPM em 30 quadros por segundo
 for(let f=0;f<N;f++){await p.evaluate(t=>window.setT(t),f/N*16);await p.screenshot({path:`quadros/${String(f).padStart(4,'0')}.jpg`,type:'jpeg',quality:92});}
 await b.close();console.log('Quadros salvos em ./quadros');})();
