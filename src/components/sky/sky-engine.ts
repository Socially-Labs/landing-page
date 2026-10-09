import { cancelFrame, frame, type FrameData } from "motion";
import { SKY_FRAGMENT, SKY_VERTEX } from "./sky-shader";
import { resolveScene, type SkySceneConfig, type SkyUniforms } from "./sky-presets";

export type SkyQuality = "high" | "low";

type SkyEngineOptions = {
  quality?: SkyQuality;
  motion?: boolean;
  onReady?: () => void;
  onFail?: () => void;
};

const UNIFORMS = [
  "uRes",
  "uTime",
  "uTop",
  "uHorizon",
  "uSun",
  "uLit",
  "uShade",
  "uSea",
  "uHaze",
  "uRidge",
  "uSunDir",
  "uSunSize",
  "uCover",
  "uSeaCover",
  "uFog",
  "uStorm",
  "uNight",
  "uPitch",
  "uDepth",
  "uTravel",
  "uFlash",
] as const;

type UniformName = (typeof UNIFORMS)[number];

const VEC3_UNIFORMS = [
  ["uTop", "top"],
  ["uHorizon", "horizon"],
  ["uSun", "sun"],
  ["uLit", "lit"],
  ["uShade", "shade"],
  ["uSea", "sea"],
  ["uHaze", "haze"],
  ["uRidge", "ridge"],
] as const;

function copy(u: SkyUniforms): SkyUniforms {
  const out = { ...u };
  for (const [, key] of VEC3_UNIFORMS) out[key] = [...u[key]];
  out.sunDir = [...u.sunDir];
  return out;
}

/**
 * Renders the sky into one canvas on Motion's frame loop, so it shares a clock with every UI
 * animation. Scene changes ease over about a second. With motion off, changes apply at once
 * and the loop sleeps until something changes.
 */
export class SkyEngine {
  private gl: WebGLRenderingContext | null = null;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private locations = {} as Record<UniformName, WebGLUniformLocation | null>;
  private target: SkyUniforms;
  private current: SkyUniforms;
  private travel = 0;
  private travelTarget = 0;
  private time = 12;
  private flash = 0;
  private motion: boolean;
  private readonly scale: number;
  private running = false;
  private ready = false;
  private destroyed = false;
  private lastDraw = 0;
  private resizeObserver: ResizeObserver | null = null;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    scene: SkySceneConfig,
    private readonly options: SkyEngineOptions = {},
  ) {
    this.target = resolveScene(scene);
    this.current = copy(this.target);
    this.motion = options.motion ?? true;
    this.scale = options.quality === "low" ? 0.35 : 0.5;

    canvas.addEventListener("webglcontextlost", this.handleContextLost);
    canvas.addEventListener("webglcontextrestored", this.handleContextRestored);
    document.addEventListener("visibilitychange", this.wake);

    if (!this.init()) {
      options.onFail?.();
      return;
    }
    this.resizeObserver = new ResizeObserver(() => {
      this.resize();
      this.wake();
    });
    this.resizeObserver.observe(canvas);
    this.resize();
    this.wake();
  }

  setScene(scene: SkySceneConfig) {
    this.target = resolveScene(scene);
    if (!this.motion) this.current = copy(this.target);
    this.wake();
  }

  /** Forward distance travelled, usually tied to scroll position. */
  setTravel(value: number) {
    this.travelTarget = value;
    if (!this.motion) this.travel = value;
    this.wake();
  }

  setMotion(on: boolean) {
    this.motion = on;
    if (!on) {
      this.current = copy(this.target);
      this.travel = this.travelTarget;
    }
    this.wake();
  }

  destroy() {
    this.destroyed = true;
    this.sleep();
    this.resizeObserver?.disconnect();
    this.canvas.removeEventListener("webglcontextlost", this.handleContextLost);
    this.canvas.removeEventListener("webglcontextrestored", this.handleContextRestored);
    document.removeEventListener("visibilitychange", this.wake);
    if (this.gl) {
      this.gl.deleteBuffer(this.buffer);
      this.gl.deleteProgram(this.program);
    }
    this.gl = null;
  }

  private init(): boolean {
    const gl = this.canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
      preserveDrawingBuffer: false,
    });
    if (!gl) return false;

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("[sky] shader failed to compile", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, SKY_VERTEX);
    const fragment = compile(gl.FRAGMENT_SHADER, SKY_FRAGMENT);
    if (!vertex || !fragment) return false;

    const program = gl.createProgram();
    if (!program) return false;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(fragment);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("[sky] program failed to link", gl.getProgramInfoLog(program));
      return false;
    }
    gl.useProgram(program);

    // One triangle that covers the screen
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    for (const name of UNIFORMS) this.locations[name] = gl.getUniformLocation(program, name);
    this.gl = gl;
    this.program = program;
    this.buffer = buffer;
    return true;
  }

  private resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.max(2, Math.round(this.canvas.clientWidth * dpr * this.scale));
    const height = Math.max(2, Math.round(this.canvas.clientHeight * dpr * this.scale));
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
    }
  }

  private wake = () => {
    if (this.running || this.destroyed || !this.gl) return;
    this.running = true;
    frame.render(this.tick, true);
  };

  private sleep() {
    if (!this.running) return;
    cancelFrame(this.tick);
    this.running = false;
  }

  private tick = ({ delta, timestamp }: FrameData) => {
    const dt = Math.min(delta, 100) / 1000;
    const live = this.motion && !document.hidden;
    if (live) this.time += dt;

    const settling = this.motion && this.settle(dt);

    if (live && this.current.storm > 0.6) {
      if (Math.random() < dt * 0.12) this.flash = 1;
      this.flash *= Math.exp(-dt * 6);
    } else {
      this.flash = 0;
    }

    // Ambient drift only needs 30 fps; transitions, scroll and still frames draw at once.
    const minGap = settling || !live ? 0 : 1000 / 30;
    if (!this.ready || timestamp - this.lastDraw >= minGap) {
      this.draw();
      this.lastDraw = timestamp;
      if (!this.ready) {
        this.ready = true;
        this.options.onReady?.();
      }
    }

    if (!live && !settling) this.sleep();
  };

  /** Eases current values toward the target. Returns true while anything is still moving. */
  private settle(dt: number): boolean {
    const k = 1 - Math.exp(-dt * 2.2);
    let moving = false;
    const step = (from: number, to: number, rate: number) => {
      const d = to - from;
      if (Math.abs(d) > 0.0005) moving = true;
      return from + d * rate;
    };

    for (const [, key] of VEC3_UNIFORMS) {
      const c = this.current[key];
      const t = this.target[key];
      c[0] = step(c[0], t[0], k);
      c[1] = step(c[1], t[1], k);
      c[2] = step(c[2], t[2], k);
    }
    const sd = this.current.sunDir;
    sd[0] = step(sd[0], this.target.sunDir[0], k);
    sd[1] = step(sd[1], this.target.sunDir[1], k);
    sd[2] = step(sd[2], this.target.sunDir[2], k);
    for (const key of [
      "sunSize",
      "cover",
      "seaCover",
      "fog",
      "storm",
      "night",
      "pitch",
      "depth",
    ] as const) {
      this.current[key] = step(this.current[key], this.target[key], k);
    }
    this.travel = step(this.travel, this.travelTarget, 1 - Math.exp(-dt * 5));
    return moving;
  }

  private draw() {
    const gl = this.gl;
    if (!gl) return;
    const l = this.locations;
    const s = this.current;

    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.uniform2f(l.uRes, this.canvas.width, this.canvas.height);
    gl.uniform1f(l.uTime, this.time);
    for (const [name, key] of VEC3_UNIFORMS) gl.uniform3f(l[name], s[key][0], s[key][1], s[key][2]);
    const [x, y, z] = s.sunDir;
    const len = Math.hypot(x, y, z) || 1;
    gl.uniform3f(l.uSunDir, x / len, y / len, z / len);
    gl.uniform1f(l.uSunSize, s.sunSize);
    gl.uniform1f(l.uCover, s.cover);
    gl.uniform1f(l.uSeaCover, s.seaCover);
    gl.uniform1f(l.uFog, s.fog);
    gl.uniform1f(l.uStorm, s.storm);
    gl.uniform1f(l.uNight, s.night);
    gl.uniform1f(l.uPitch, s.pitch);
    gl.uniform1f(l.uDepth, s.depth);
    gl.uniform1f(l.uTravel, this.travel);
    gl.uniform1f(l.uFlash, this.flash);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  private handleContextLost = (event: Event) => {
    event.preventDefault();
    this.sleep();
    this.gl = null;
  };

  private handleContextRestored = () => {
    if (this.init()) {
      this.resize();
      this.wake();
    } else {
      this.options.onFail?.();
    }
  };
}
