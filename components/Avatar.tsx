import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

export type Act = "languages" | "molecules" | "tokens" | "sleep" | "sea";
export type Lately = { repo: string; href: string; day: string };

const LINES = [
  "Hi, I'm Anri! \u{1F44B}",
  "You found the fun part.",
  "Engineer and researcher, at your service.",
  "The cap stays on. Always.",
  "Scroll down, there's more.",
];

// "languages" says hello in all eleven official languages MzansiLM covers
const ACT_LINES: Record<Act, string[]> = {
  languages: ["Molo!", "Sawubona!", "Dumela!", "Hallo!", "Thobela!", "Lumela!", "Avuxeni!", "Ndaa!", "Lotjhani!", "Sawubona!", "Hello!"],
  molecules: ["Drug-like, allegedly."],
  tokens: ["Same sentence in isiZulu: 1.71\u00D7 the tokens."],
  sleep: ["Wake me if the loss goes NaN."],
  sea: ["Nothing happens. Slowly."],
};

const C = {
  skin: "#f2c4a0", tee: "#1b1d22", shorts: "#243357", cap: "#15171b", hair: "#e3b857",
  shoe: "#f5f6f8", sole: "#c9ced6", ink: "#0d1321", white: "#ffffff",
  gold: "#f0b429", carbon: "#3a4150", oxygen: "#e4572e", nitrogen: "#3f7fe0", z: "#4f7fe0",
};

const COINS = 54;

/** A dusk sea painted once onto a disc, for the Slow Horizon act. */
const seaTexture = () => {
  const size = 512;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const g = canvas.getContext("2d")!;
  g.beginPath();
  g.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
  g.clip();
  const sky = g.createLinearGradient(0, 0, 0, size * 0.62);
  sky.addColorStop(0, "#39507f");
  sky.addColorStop(0.65, "#d98f7a");
  sky.addColorStop(1, "#f6cf9c");
  g.fillStyle = sky;
  g.fillRect(0, 0, size, size);
  // a sun setting at the right edge, clear of his head, half hidden by the water drawn next
  const [sunX, sunY] = [size * 0.83, size * 0.6];
  const glow = g.createRadialGradient(sunX, sunY, 10, sunX, sunY, 110);
  glow.addColorStop(0, "rgb(255 244 214 / 0.9)");
  glow.addColorStop(1, "rgb(255 244 214 / 0)");
  g.fillStyle = glow;
  g.fillRect(0, 0, size, size);
  g.fillStyle = "#fffaf0";
  g.beginPath();
  g.arc(sunX, sunY, 26, 0, Math.PI * 2);
  g.fill();
  const water = g.createLinearGradient(0, size * 0.6, 0, size);
  water.addColorStop(0, "#54708f");
  water.addColorStop(1, "#1d2e4a");
  g.fillStyle = water;
  g.fillRect(0, size * 0.6, size, size * 0.4);
  g.fillStyle = "rgb(255 232 196 / 0.35)";
  for (let i = 0; i < 6; i++) g.fillRect(sunX - 30 + i * 6, size * 0.615 + i * 16, 60 - i * 12, 4);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
};

/** Little toon version of Anri: follows the cursor, peeks over his sunglasses on hover, hops and waves on click, spins on drag, and acts out a project when told to. */
export default function Avatar({ dark, act, lately }: { dark: boolean; act: Act | null; lately: Lately | null }) {
  const mount = useRef<HTMLDivElement>(null);
  const shadowMat = useRef<THREE.ShadowMaterial | null>(null);
  const themed = useRef<((dark: boolean) => void) | null>(null);
  const actRef = useRef<Act | null>(act);
  const latelyRef = useRef(lately);
  const lineTimer = useRef(0);
  const [line, setLine] = useState("");
  const [talking, setTalking] = useState(false);
  const [played, setPlayed] = useState(false);
  const [noWebGL, setNoWebGL] = useState(false);

  useEffect(() => themed.current?.(dark), [dark]);

  // the scene reads the act from a ref, so changing it never rebuilds three.js
  useEffect(() => {
    actRef.current = act;
    clearTimeout(lineTimer.current);
    if (!act) {
      setTalking(false);
      return;
    }
    setPlayed(true);
    const lines = ACT_LINES[act];
    setLine(lines[0]);
    setTalking(true);
    if (lines.length === 1 || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let i = 0;
    const cycle = setInterval(() => setLine(lines[++i % lines.length]), 850);
    return () => clearInterval(cycle);
  }, [act]);

  useEffect(() => {
    const el = mount.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Without WebGL this throws, and an uncaught error here would take down the whole page rather than just the avatar.
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      setNoWebGL(true);
      return;
    }
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    el.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
    camera.position.set(0, 1.9, 8.2);
    camera.lookAt(0, 1.45, 0);

    scene.add(new THREE.HemisphereLight("#ffffff", "#aab6c8", 1.7));
    const sun = new THREE.DirectionalLight("#ffffff", 2.4);
    sun.position.set(1.2, 6, 3.5);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024);
    Object.assign(sun.shadow.camera, { left: -2, right: 2, top: 3, bottom: -1, near: 1, far: 12 });
    sun.shadow.radius = 6;
    scene.add(sun);

    // three-band cel shading keeps it crisp rather than plasticky
    const bands = new THREE.DataTexture(new Uint8Array([110, 190, 255]), 3, 1, THREE.RedFormat);
    bands.minFilter = bands.magFilter = THREE.NearestFilter;
    bands.needsUpdate = true;
    const toon = (color: string) => new THREE.MeshToonMaterial({ color, gradientMap: bands });
    const inkMat = new THREE.MeshBasicMaterial({ color: C.ink, side: THREE.BackSide });

    const part = (geo: THREE.BufferGeometry, color: string, pos: [number, number, number], parent: THREE.Object3D, outline = 0.035) => {
      const m = new THREE.Mesh(geo, toon(color));
      m.position.set(...pos);
      m.castShadow = true;
      if (outline) {
        // inverted hull: a slightly larger back-face copy draws the ink line
        const o = new THREE.Mesh(geo, inkMat);
        o.scale.setScalar(1 + outline);
        m.add(o);
      }
      parent.add(m);
      return m;
    };

    const root = new THREE.Group();
    scene.add(root);
    const body = new THREE.Group();
    root.add(body);

    // legs, sneakers, shorts, tee
    // the legs hang from hip pivots so he can sit
    const hipY = 0.72;
    const hips = [-0.17, 0.17].map((x) => {
      const hip = new THREE.Group();
      hip.position.set(x, hipY, 0);
      body.add(hip);
      part(new THREE.CapsuleGeometry(0.12, 0.42, 6, 16), C.skin, [0, 0.42 - hipY, 0], hip, 0.06);
      part(new RoundedBoxGeometry(0.26, 0.15, 0.4, 3, 0.07), C.shoe, [0, 0.08 - hipY, 0.05], hip, 0.05);
      part(new RoundedBoxGeometry(0.27, 0.04, 0.41, 2, 0.02), C.sole, [0, 0.01 - hipY, 0.05], hip, 0);
      return hip;
    });
    part(new RoundedBoxGeometry(0.64, 0.36, 0.42, 4, 0.12), C.shorts, [0, 0.8, 0], body, 0.04);
    const torso = part(new RoundedBoxGeometry(0.74, 0.66, 0.46, 5, 0.18), C.tee, [0, 1.22, 0], body, 0.03);
    part(new THREE.CylinderGeometry(0.11, 0.12, 0.14, 16), C.skin, [0, 1.58, 0], body, 0);

    // arms hang from shoulder pivots so they can swing and wave
    const arm = (side: number) => {
      const pivot = new THREE.Group();
      pivot.position.set(side * 0.44, 1.46, 0);
      body.add(pivot);
      part(new THREE.CylinderGeometry(0.14, 0.13, 0.22, 16), C.tee, [0, -0.08, 0], pivot, 0.05);
      part(new THREE.CapsuleGeometry(0.095, 0.34, 6, 12), C.skin, [0, -0.36, 0], pivot, 0.07);
      part(new THREE.SphereGeometry(0.11, 16, 12), C.skin, [0, -0.6, 0], pivot, 0.07);
      pivot.rotation.z = side * 0.12;
      return pivot;
    };
    const armL = arm(1);
    const armR = arm(-1);

    // big chibi head
    const head = new THREE.Group();
    head.position.set(0, 1.62, 0);
    body.add(head);
    const hc = 0.5; // head centre height within the head group
    part(new THREE.SphereGeometry(0.5, 32, 24), C.skin, [0, hc, 0], head, 0.03);
    for (const x of [-1, 1]) {
      part(new THREE.SphereGeometry(0.1, 12, 10), C.skin, [x * 0.49, hc - 0.02, 0], head, 0.08);
      part(new RoundedBoxGeometry(0.1, 0.2, 0.22, 2, 0.04), C.hair, [x * 0.45, hc + 0.08, -0.05], head, 0.06);
    }
    // cap: dome, brim, button
    const dome = part(new THREE.SphereGeometry(0.53, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), C.cap, [0, hc + 0.06, -0.02], head, 0.03);
    dome.scale.y = 0.85;
    const brim = part(new THREE.CylinderGeometry(0.34, 0.34, 0.045, 32), C.cap, [0, hc + 0.1, 0.44], head, 0.05);
    brim.scale.z = 1.25;
    brim.rotation.x = 0.12;
    part(new THREE.SphereGeometry(0.05, 12, 8), C.cap, [0, hc + 0.52, -0.02], head, 0);

    // eyes live behind the sunglasses; you only see them when he peeks
    for (const x of [-0.16, 0.16]) {
      part(new THREE.SphereGeometry(0.075, 16, 12), C.white, [x, hc + 0.03, 0.455], head, 0);
      part(new THREE.SphereGeometry(0.04, 12, 10), C.ink, [x, hc + 0.03, 0.52], head, 0);
    }
    const glasses = new THREE.Group();
    glasses.position.set(0, hc + 0.01, 0.53);
    head.add(glasses);
    const lens = new THREE.MeshStandardMaterial({ color: "#07080a", metalness: 0.4, roughness: 0.12 });
    for (const x of [-0.17, 0.17]) {
      const l = new THREE.Mesh(new RoundedBoxGeometry(0.3, 0.19, 0.05, 3, 0.05), lens);
      l.position.x = x;
      glasses.add(l);
    }
    const bridge = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.035, 0.03), lens);
    bridge.position.y = 0.04;
    glasses.add(bridge);
    const smile = part(new THREE.TorusGeometry(0.12, 0.022, 8, 24, Math.PI), C.ink, [0, hc - 0.2, 0.465], head, 0);
    smile.rotation.z = Math.PI;

    // --- props for the project acts, hidden until their act plays
    // Mamba-SAFE: three small molecules juggled around his head
    const molecules = [
      [C.carbon, C.oxygen],
      [C.carbon, C.nitrogen],
      [C.oxygen, C.carbon],
    ].map(([a, b]) => {
      const m = new THREE.Group();
      part(new THREE.SphereGeometry(0.13, 16, 12), a, [-0.1, 0, 0], m, 0.08);
      part(new THREE.SphereGeometry(0.09, 16, 12), b, [0.1, 0.06, 0], m, 0.1);
      root.add(m);
      return m;
    });

    // Tokenizer Tax: coins rain down and pile up around his legs
    const coinGeo = new THREE.CylinderGeometry(0.13, 0.13, 0.04, 20);
    const coins = Array.from({ length: COINS }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const r = 0.2 + Math.random() * 0.75;
      const m = part(coinGeo, C.gold, [Math.cos(angle) * r, 0, Math.sin(angle) * r + 0.1], scene, 0.05);
      // inner coins land higher, and the heap rises as more arrive
      const rest = 0.03 + (i / COINS) * (1.05 - r) * 0.85;
      m.rotation.set((Math.random() - 0.5) * 0.5, Math.random() * 3, (Math.random() - 0.5) * 0.5);
      return { m, rest, spinRate: 2 + Math.random() * 5 };
    });

    // sleeptrain: a pillow, and Zs drifting up from it
    const pillow = part(new RoundedBoxGeometry(1, 0.26, 0.8, 4, 0.12), C.white, [-1.02, 0.13, 0], scene, 0.04);
    const zGeo = new THREE.BoxGeometry(0.22, 0.05, 0.05);
    const zGeoLong = new THREE.BoxGeometry(0.29, 0.05, 0.05);
    const zs = [0, 1, 2].map(() => {
      const z = new THREE.Group();
      part(zGeo, C.z, [0, 0.1, 0], z, 0);
      part(zGeo, C.z, [0, -0.1, 0], z, 0);
      part(zGeoLong, C.z, [0, 0, 0], z, 0).rotation.z = Math.atan2(0.2, 0.22);
      scene.add(z);
      return z;
    });

    // Slow Horizon: a disc of dusk sea behind him, with one boat in no hurry
    const seaMap = seaTexture();
    const seaMat = new THREE.MeshBasicMaterial({ map: seaMap, transparent: true, opacity: 0 });
    const sea = new THREE.Mesh(new THREE.CircleGeometry(1.55, 64), seaMat);
    sea.position.set(0, 1.62, -1.8);
    scene.add(sea);
    const boat = new THREE.Group();
    const boatMat = new THREE.MeshBasicMaterial({ color: "#1d2433", transparent: true, opacity: 0 });
    const hull = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.035, 0.01), boatMat);
    const sail = new THREE.Mesh(new THREE.ConeGeometry(0.06, 0.16, 3), boatMat);
    sail.position.y = 0.09;
    boat.add(hull, sail);
    boat.position.set(0, 1.97, -1.75);
    scene.add(boat);

    const ground = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.ShadowMaterial({ opacity: 0.14 }));
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);
    shadowMat.current = ground.material as THREE.ShadowMaterial;

    // at night the black cap and tee need a lighter ink line and a rim light to keep their silhouette
    const rim = new THREE.DirectionalLight("#9fb8ff", 0);
    rim.position.set(-2, 3, -4);
    scene.add(rim);
    themed.current = (night: boolean) => {
      inkMat.color.set(night ? "#56637a" : C.ink);
      rim.intensity = night ? 2.2 : 0;
      shadowMat.current!.opacity = night ? 0.4 : 0.14;
    };
    themed.current(document.documentElement.dataset.theme === "dark");

    // --- interaction state
    const pointer = { x: 0, y: 0 };
    const ndc = new THREE.Vector2();
    const ray = new THREE.Raycaster();
    let hover = false, down = false, dragged = false, startX = 0, lastX = 0, spin = 0, actionT = -1, lineIdx = 0;

    const say = (text: string) => {
      setLine(text);
      setTalking(true);
      clearTimeout(lineTimer.current);
      lineTimer.current = window.setTimeout(() => setTalking(false), 2600);
    };
    const nextLine = () => {
      const latest = latelyRef.current;
      const lines = latest ? [...LINES, `Lately: ${latest.repo}.`] : LINES;
      return lines[lineIdx++ % lines.length];
    };
    const hits = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      return ray.intersectObject(body, true).length > 0;
    };
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      pointer.x = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (innerWidth / 2)));
      pointer.y = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height * 0.3)) / (innerHeight / 2)));
      if (down) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        if (Math.abs(e.clientX - startX) > 5) dragged = true;
        root.rotation.y += dx * 0.012;
        spin = dx * 0.012;
      } else {
        hover = hits(e);
        el.style.cursor = hover ? "pointer" : "grab";
      }
    };
    const onDown = (e: PointerEvent) => {
      down = true; dragged = false; startX = lastX = e.clientX;
      el.setPointerCapture(e.pointerId);
      el.style.cursor = "grabbing";
    };
    const onUp = (e: PointerEvent) => {
      if (!down) return;
      down = false;
      el.style.cursor = "grab";
      setPlayed(true);
      if (!dragged && hits(e)) {
        actionT = 0;
        say(nextLine());
      } else if (Math.abs(spin) > 0.12) say("Wheee!");
    };
    // A vertical swipe starting on him becomes a page scroll, which cancels the pointer with no pointerup.
    const onCancel = () => {
      down = false;
      spin = 0;
      el.style.cursor = "grab";
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Enter" && e.key !== " ") return;
      e.preventDefault();
      setPlayed(true);
      actionT = 0;
      say(nextLine());
    };
    addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onCancel);
    el.addEventListener("keydown", onKey);

    const resize = () => {
      const { width, height } = el.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();

    // only render while visible
    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(el);

    const clock = new THREE.Clock();
    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
    // how far into each act he is, from 0 (normal) to 1 (fully in it)
    const w: Record<Act, number> = { languages: 0, molecules: 0, tokens: 0, sleep: 0, sea: 0 };
    let actT = 0, lastAct: Act | null = null;
    let frame = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      const current = actRef.current;
      if (current !== lastAct) {
        lastAct = current;
        actT = 0;
      }
      actT += dt;
      for (const k of Object.keys(w) as Act[]) {
        w[k] = still ? (k === current ? 1 : 0) : lerp(w[k], k === current ? 1 : 0, 1 - Math.exp(-dt * 7));
      }
      // the lying and sitting poses have their own heading, so they don't follow the cursor
      const free = 1 - w.sleep - w.sea;

      // idle: breathing and a relaxed arm sway
      if (!still) {
        torso.scale.y = 1 + Math.sin(t * 2.2) * 0.015;
        head.position.y = 1.62 + Math.sin(t * 2.2) * 0.012;
      }
      // head follows the cursor
      head.rotation.y = lerp(head.rotation.y, pointer.x * 0.55 * free, 0.08);
      head.rotation.x = lerp(head.rotation.x, pointer.y * 0.3 * free - w.tokens * 0.3, 0.08);
      // hover: peek over the sunglasses, unless asleep or facing away
      const peek = hover && free > 0.5;
      glasses.position.y = lerp(glasses.position.y, hc + (peek ? -0.19 : 0.01), 0.15);
      glasses.rotation.x = lerp(glasses.rotation.x, peek ? 0.3 : 0, 0.15);

      // click: hop and wave
      let wave = 0;
      if (actionT >= 0) {
        actionT += dt;
        const hop = Math.min(actionT / 0.5, 1);
        root.position.y = Math.sin(Math.PI * hop) * (still ? 0.1 : 0.35);
        const up = actionT < 1.2 ? Math.min(actionT / 0.2, 1) : Math.max(0, 1 - (actionT - 1.2) / 0.3);
        wave = up * (2.5 + Math.sin(actionT * 16) * 0.35);
        if (actionT > 1.5) actionT = -1;
      }
      // Each act adds its pose on top of the idle: greeting wave, juggling hands, hands up under falling coins, propped on the arms by the sea.
      const greet = w.languages * (2.3 + (still ? 0 : Math.sin(t * 9) * 0.3));
      const juggle = w.molecules * (1.05 + (still ? 0 : Math.sin(t * 6) * 0.22));
      const juggleOther = w.molecules * (1.05 - (still ? 0 : Math.sin(t * 6) * 0.22));
      armL.rotation.z = 0.12 + wave + greet + juggle + w.tokens * 2.2 + w.sea * 0.25 + (still ? 0 : Math.sin(t * 2.2) * 0.03);
      armR.rotation.z = -0.12 - juggleOther - w.tokens * 2.2 - w.sea * 0.25 - (still ? 0 : Math.sin(t * 2.2 + 1) * 0.03);
      armL.rotation.x = armR.rotation.x = w.sea * 0.5;

      // lying down: tips over from the feet, head a little higher so it rests on the pillow
      body.rotation.z = w.sleep * (Math.PI / 2 - 0.14);
      body.position.x = w.sleep * 1.2;
      // Lying down he is wider than he is tall, so a narrow stage pulls the camera back to keep his head and feet in frame.
      camera.position.z = 8.2 * (1 + (Math.max(1, 0.9 / camera.aspect) - 1) * w.sleep);
      // sitting: lower the hips to the ground and swing the legs out in front
      body.position.y = w.sleep * 0.28 - w.sea * (hipY - 0.14);
      for (const hip of hips) hip.rotation.x = -w.sea * (Math.PI / 2);

      // Mamba-SAFE
      molecules.forEach((m, i) => {
        const phase = (still ? 0.6 : t * 2.1) + (i * Math.PI * 2) / 3;
        m.visible = w.molecules > 0.02;
        m.position.set(Math.cos(phase) * 0.92, 1.98 + Math.sin(phase) * 1.0, 0.55);
        m.rotation.set(phase * 0.7, phase, 0);
        m.scale.setScalar(w.molecules);
      });

      // Tokenizer Tax: each coin falls in turn, then stays on the heap until the act ends
      coins.forEach(({ m, rest, spinRate }, i) => {
        const fall = still ? 1 : Math.min(1, Math.max(0, (actT - i * 0.06) / 0.55));
        const landed = current === "tokens" || w.tokens > 0.02;
        m.visible = landed && (fall > 0 || still);
        m.position.y = rest + (3.9 - rest) * (1 - fall * fall);
        if (fall < 1) m.rotation.x += spinRate * dt;
        m.scale.setScalar(Math.max(0.001, w.tokens));
      });

      // sleeptrain
      pillow.visible = w.sleep > 0.02;
      pillow.scale.setScalar(Math.max(0.001, w.sleep));
      zs.forEach((z, i) => {
        const age = still ? 0.25 + i * 0.3 : (t * 0.28 + i / 3) % 1;
        z.visible = w.sleep > 0.5;
        z.position.set(-0.7 + age * 0.75 + Math.sin(age * 7) * 0.08, 1.1 + age * 1.1, 0.3);
        z.scale.setScalar(0.65 + age * 0.9 - Math.max(0, age - 0.8) * 5);
      });

      // Slow Horizon
      sea.visible = boat.visible = w.sea > 0.02;
      seaMat.opacity = boatMat.opacity = w.sea;
      sea.scale.setScalar(0.92 + w.sea * 0.08);
      boat.position.x = still ? -0.3 : -0.75 + (actT * 0.02) % 1.4;

      // spin with inertia, then settle back to face the visitor
      if (!down) {
        root.rotation.y += spin;
        spin *= 0.93;
        if (Math.abs(spin) < 0.003) {
          // by the sea he faces away from the visitor, towards the water
          const heading = current === "sea" ? Math.PI : 0;
          const home = Math.round((root.rotation.y - heading) / (Math.PI * 2)) * Math.PI * 2 + heading;
          root.rotation.y = lerp(root.rotation.y, home, 0.05);
        }
      }
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(lineTimer.current);
      removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onCancel);
      el.removeEventListener("keydown", onKey);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      bands.dispose();
      seaMap.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  if (noWebGL) return null;

  return (
    <div className="stage">
      <div ref={mount} className="stage-canvas" role="button" tabIndex={0} aria-label="Say hi to a little 3D version of Anri in a black cap and sunglasses" />
      {/* the cycling greetings would flood a screen reader */}
      <p className={talking ? "bubble show" : "bubble"} aria-live={act === "languages" ? "off" : "polite"}>{line}</p>
      <p className={played ? "hint gone" : "hint"}>
        <span className="on-hover">Click to say hi</span>
        <span className="on-touch">Tap to say hi</span>
        {" "}&middot; drag to spin
      </p>
    </div>
  );
}
