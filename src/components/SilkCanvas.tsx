import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

/**
 * Lazy-loaded WebGL canvas that renders an abstract silk/liquid visual
 * behind the hero section. Uses a single full-screen quad with a custom
 * fragment shader — no 3D objects, no geometry passes, just a noise-based
 * flow field in the brand palette.
 *
 * Automatically skips on:
 *  - prefers-reduced-motion
 *  - Low-power devices (hardwareConcurrency < 4, no WebGL2)
 */

const FRAGMENT_SHADER = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2  uResolution;
uniform vec3  uColorBase;
uniform vec3  uColorMid;
uniform vec3  uColorAccent;
uniform vec3  uColorHighlight;

/* Simplex 2D noise — compact implementation */
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v -   i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
        + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

/* Fractal Brownian Motion — layered noise for organic flow */
float fbm(vec2 p, float t) {
  float val = 0.0;
  float amp = 0.5;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    val += amp * snoise(p * freq + t * 0.15);
    freq *= 2.0;
    amp *= 0.5;
  }
  return val;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = uv - 0.5;
  p.x *= uResolution.x / uResolution.y;

  float t = uTime * 0.08;

  /* Domain-warped FBM for silk-like flowing patterns */
  vec2 q = vec2(fbm(p * 1.5 + t, t), fbm(p * 1.5 - t + 5.2, t));
  vec2 r = vec2(fbm(p * 2.0 + q + t * 0.7, t), fbm(p * 2.0 + q - t * 0.5 + 1.7, t));
  float n = fbm(p * 3.0 + r, t);

  /* Smooth gradient across the noise field */
  float v = smoothstep(-0.5, 0.5, n);

  /* Multi-stop color ramp: base -> mid -> accent -> highlight */
  vec3 col = mix(uColorBase, uColorMid, smoothstep(0.0, 0.45, v));
  col = mix(col, uColorAccent, smoothstep(0.35, 0.7, v));
  col = mix(col, uColorHighlight, smoothstep(0.65, 0.95, v));

  /* Subtle vignette for depth */
  float vig = 1.0 - dot(p, p) * 0.4;
  col *= vig;

  /* Gentle shimmer */
  float shimmer = snoise(p * 6.0 + t * 2.0) * 0.03;
  col += shimmer;

  gl_FragColor = vec4(col, 1.0);
}
`;

const VERTEX_SHADER = /* glsl */ `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

function shouldSkipCanvas(): boolean {
  if (typeof window === 'undefined') return true;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return true;
  const cores = navigator.hardwareConcurrency || 2;
  if (cores < 4) return true;
  return false;
}

export default function SilkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shouldSkipCanvas()) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      antialias: false,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: 'low-power',
    });

    if (!gl) return;

    setVisible(true);

    // Compile shaders
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERTEX_SHADER);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      gl.deleteShader(vs);
      return;
    }

    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAGMENT_SHADER);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      gl.deleteShader(fs);
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }
    gl.useProgram(program);

    // Full-screen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');
    gl.enableVertexAttribArray(aPosition);
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTime = gl.getUniformLocation(program, 'uTime');
    const uResolution = gl.getUniformLocation(program, 'uResolution');
    const uColorBase = gl.getUniformLocation(program, 'uColorBase');
    const uColorMid = gl.getUniformLocation(program, 'uColorMid');
    const uColorAccent = gl.getUniformLocation(program, 'uColorAccent');
    const uColorHighlight = gl.getUniformLocation(program, 'uColorHighlight');

    // Brand palette colors (normalized RGB)
    gl.useProgram(program);
    gl.uniform3f(uColorBase, 0.133, 0.118, 0.106);    // espresso #221E1B
    gl.uniform3f(uColorMid, 0.227, 0.212, 0.196);      // charcoal #3A3633
    gl.uniform3f(uColorAccent, 0.710, 0.475, 0.361);   // accent #B5795C
    gl.uniform3f(uColorHighlight, 0.831, 0.655, 0.549); // accentLight #D4A78C

    const cv = canvas;
    const ctx = gl;
    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = cv.clientWidth * dpr;
      const h = cv.clientHeight * dpr;
      if (cv.width !== w || cv.height !== h) {
        cv.width = w;
        cv.height = h;
        ctx.viewport(0, 0, w, h);
        ctx.uniform2f(uResolution, w, h);
      }
    }
    resize();
    window.addEventListener('resize', resize);

    // Use GSAP's ticker so the canvas render stays in lockstep with
    // Lenis smooth scroll and ScrollTrigger — no separate RAF loop.
    const start = performance.now();
    let inView = true;

    const io = new IntersectionObserver(
      (entries) => {
        inView = entries[0].isIntersecting;
      },
      { threshold: 0.01 },
    );
    io.observe(cv);

    const tick = () => {
      if (!inView) return;
      const t = (performance.now() - start) / 1000;
      ctx.uniform1f(uTime, t);
      ctx.drawArrays(ctx.TRIANGLE_STRIP, 0, 4);
    };
    gsap.ticker.add(tick);

    // Cleanup
    return () => {
      gsap.ticker.remove(tick);
      io.disconnect();
      window.removeEventListener('resize', resize);
      gl.deleteBuffer(buffer);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, []);

  if (!visible) return null;

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: 'none' }}
      aria-hidden="true"
    />
  );
}
