/**
 * One full-screen fragment shader draws the whole environment: sky dome, sun or moon, stars,
 * high clouds, distant ridges, the cloud sea with open water in its gaps, a fog bank and storm
 * light. Clouds are 2D noise sampled on two planes (one above the camera, one below), which
 * reads as volumetric at a fraction of the cost of ray marching.
 */
export const SKY_VERTEX = /* glsl */ `
attribute vec2 aPosition;
void main() {
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
`;

export const SKY_FRAGMENT = /* glsl */ `
precision highp float;

uniform vec2 uRes;
uniform float uTime;
uniform vec3 uTop;
uniform vec3 uHorizon;
uniform vec3 uSun;
uniform vec3 uLit;
uniform vec3 uShade;
uniform vec3 uSea;
uniform vec3 uHaze;
uniform vec3 uRidge;
uniform vec3 uSunDir;
uniform float uSunSize;
uniform float uCover;
uniform float uSeaCover;
uniform float uFog;
uniform float uStorm;
uniform float uNight;
uniform float uPitch;
uniform float uDepth;
uniform float uTravel;
uniform float uFlash;

float hash(vec2 p) {
  vec3 p3 = fract(vec3(p.xyx) * 0.1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 m = mat2(1.6, 1.2, -1.2, 1.6);
  for (int i = 0; i < 6; i++) {
    v += a * noise(p);
    p = m * p + 0.17;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  vec3 rd = normalize(vec3(uv.x, uv.y - uPitch, 1.5));
  float sd = max(dot(rd, uSunDir), 0.0);

  // Sky dome and sun glow
  float h = clamp(rd.y, 0.0, 1.0);
  vec3 col = mix(uHorizon, uTop, pow(clamp(h * 2.4, 0.0, 1.0), 0.65));
  col += uSun * (pow(sd, 9.0) * 0.10 + pow(sd, 90.0) * 0.26) * (1.0 - uStorm * 0.7);

  // Stars
  if (uNight > 0.0 && rd.y > 0.0) {
    vec2 sp = rd.xy / rd.z * 150.0;
    vec2 cell = floor(sp);
    vec2 fr = fract(sp) - 0.5;
    float r = hash(cell);
    float twinkle = 0.65 + 0.35 * sin(uTime * (1.0 + r * 3.0) + r * 40.0);
    float star = step(0.986, r) * smoothstep(0.32, 0.0, length(fr)) * twinkle;
    col += vec3(star) * uNight * smoothstep(0.0, 0.12, rd.y);
  }

  // Sun or moon disk
  float disk = smoothstep(1.0 - uSunSize, 1.0 - uSunSize * 0.5, sd);
  col = mix(col, uSun * 1.04, disk * (1.0 - uStorm * 0.85));

  // High clouds on a plane above the camera
  if (rd.y > 0.0) {
    float t = 1.0 / (rd.y + 0.035);
    vec2 p = rd.xz * t * 0.9 + vec2(uTime * 0.010, uTravel * 0.25 + uTime * 0.006);
    float n = fbm(p);
    float thr = mix(0.66, 0.32, uCover);
    float c = smoothstep(thr, thr + 0.2, n);
    float n2 = fbm(p + uSunDir.xz * 0.12 + vec2(0.0, 0.04));
    float lit = clamp(0.6 + (n - n2) * 4.2 - uStorm * 0.15, 0.0, 1.0);
    vec3 cc = mix(uShade, uLit, lit);
    cc += uSun * pow(sd, 10.0) * 0.35 * (1.0 - c);
    float far = smoothstep(0.0, 0.22, rd.y);
    cc = mix(uHaze, cc, 0.35 + 0.65 * far);
    c *= mix(0.3, 1.0, far);
    col = mix(col, cc, c * 0.94);
  }

  // Distant ridges on the horizon
  float ang = rd.x / rd.z;
  float rid = fbm(vec2(ang * 3.0 + 11.0, 2.0));
  float mask = smoothstep(0.42, 0.62, noise(vec2(ang * 1.3 + 4.0, 7.0)));
  float rh = max(rid - 0.42, 0.0) * 0.16 * mask;
  if (rd.y >= -0.003 && rd.y < rh) {
    float k = 1.0 - rd.y / max(rh, 0.0001);
    vec3 rc = mix(uRidge, uHaze, 0.2 + 0.5 * k);
    col = mix(col, rc, 0.85);
  }

  // Cloud sea on a plane below the camera, open water in the gaps
  if (rd.y < 0.0) {
    float t = uDepth / (-rd.y + 0.012);
    vec2 p = rd.xz * t * 1.6 + vec2(uTime * 0.018, uTravel + uTime * 0.035);
    float n = fbm(p);
    float thr = mix(0.56, 0.24, uSeaCover);
    float d = smoothstep(thr, thr + 0.13, n);
    float n2 = fbm(p + uSunDir.xz * 0.10 + vec2(0.0, 0.06));
    float lit = clamp(0.52 + (n - n2) * 5.0, 0.0, 1.0);
    vec3 cl = mix(uShade, uLit, lit);
    cl *= mix(0.86, 1.0, smoothstep(0.3, 0.75, n));
    cl = mix(cl, uLit, smoothstep(0.62, 0.9, n) * 0.4);
    vec3 refl = vec3(rd.x, -rd.y, rd.z);
    float sheen = pow(max(dot(refl, uSunDir), 0.0), 16.0);
    cl += uSun * sheen * 0.18 * (1.0 - uStorm * 0.8);
    vec3 sea = uSea * (0.82 + 0.18 * noise(p * 5.0 + uTime * 0.15));
    float glint = pow(max(dot(refl, uSunDir), 0.0), 30.0)
      * smoothstep(0.55, 0.95, noise(p * 14.0 + vec2(uTime * 0.4, 0.0)));
    sea += uSun * glint * 0.45 * (1.0 - uStorm);
    vec3 low = mix(sea, cl, d);
    float fog = 1.0 - exp(-t * 0.045);
    col = mix(low, uHaze, clamp(fog * 1.1, 0.0, 1.0));
  }

  // Horizon haze, fog bank, storm vignette and lightning
  col = mix(col, uHaze, exp(-abs(rd.y) * 60.0) * 0.35);
  float fb = fbm(uv * 2.2 + vec2(uTime * 0.03, uTime * 0.01));
  vec3 fogColor = mix(uLit, uHaze, 0.35);
  col = mix(col, fogColor, clamp(uFog * (0.55 + 0.6 * fb), 0.0, 0.95));
  col *= 1.0 - uStorm * 0.45 * dot(uv, uv);
  col += uLit * uFlash * 0.35;

  // Dither to hide banding in the long gradients
  col += (hash(gl_FragCoord.xy + fract(uTime) * 100.0) - 0.5) / 160.0;
  gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}
`;
