import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

const LINES = [
  "Hi, I'm Anri! \u{1F44B}",
  "You found the fun part.",
  "Engineer and researcher, at your service.",
  "Lately: language models for South African languages.",
  "The cap stays on. Always.",
  "Scroll down, there's more.",
];

const C = {
  skin: "#f2c4a0", tee: "#1b1d22", shorts: "#243357", cap: "#15171b", hair: "#e3b857",
  shoe: "#f5f6f8", sole: "#c9ced6", ink: "#0d1321", white: "#ffffff",
};

/** Little toon version of Anri: follows the cursor, peeks over his sunglasses on hover, hops and waves on click, spins on drag. */
export default function Avatar({ dark }: { dark: boolean }) {
  const mount = useRef<HTMLDivElement>(null);
  const shadowMat = useRef<THREE.ShadowMaterial | null>(null);
  const themed = useRef<((dark: boolean) => void) | null>(null);
  const [line, setLine] = useState<string | null>(null);
  const [played, setPlayed] = useState(false);

  useEffect(() => themed.current?.(dark), [dark]);

  useEffect(() => {
    const el = mount.current!;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
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
    for (const x of [-0.17, 0.17]) {
      part(new THREE.CapsuleGeometry(0.12, 0.42, 6, 16), C.skin, [x, 0.42, 0], body, 0.06);
      part(new RoundedBoxGeometry(0.26, 0.15, 0.4, 3, 0.07), C.shoe, [x, 0.08, 0.05], body, 0.05);
      part(new RoundedBoxGeometry(0.27, 0.04, 0.41, 2, 0.02), C.sole, [x, 0.01, 0.05], body, 0);
    }
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
    let lineTimer = 0;

    const say = (text: string) => {
      setLine(text);
      clearTimeout(lineTimer);
      lineTimer = window.setTimeout(() => setLine(null), 2600);
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
        say(LINES[lineIdx++ % LINES.length]);
      } else if (Math.abs(spin) > 0.12) say("Wheee!");
    };
    addEventListener("pointermove", onMove);
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointerup", onUp);

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
    let frame = 0;
    const loop = () => {
      frame = requestAnimationFrame(loop);
      if (!visible || document.hidden) return;
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // idle: breathing and a relaxed arm sway
      if (!still) {
        torso.scale.y = 1 + Math.sin(t * 2.2) * 0.015;
        head.position.y = 1.62 + Math.sin(t * 2.2) * 0.012;
      }
      // head follows the cursor
      head.rotation.y = lerp(head.rotation.y, pointer.x * 0.55, 0.08);
      head.rotation.x = lerp(head.rotation.x, pointer.y * 0.3, 0.08);
      // hover: peek over the sunglasses
      glasses.position.y = lerp(glasses.position.y, hc + (hover ? -0.19 : 0.01), 0.15);
      glasses.rotation.x = lerp(glasses.rotation.x, hover ? 0.3 : 0, 0.15);

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
      armL.rotation.z = 0.12 + wave + (still ? 0 : Math.sin(t * 2.2) * 0.03);
      armR.rotation.z = -0.12 - (still ? 0 : Math.sin(t * 2.2 + 1) * 0.03);

      // spin with inertia, then settle back to face the visitor
      if (!down) {
        root.rotation.y += spin;
        spin *= 0.93;
        if (Math.abs(spin) < 0.003) {
          const home = Math.round(root.rotation.y / (Math.PI * 2)) * Math.PI * 2;
          root.rotation.y = lerp(root.rotation.y, home, 0.05);
        }
      }
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(lineTimer);
      removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointerup", onUp);
      ro.disconnect();
      io.disconnect();
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => m.dispose());
        }
      });
      bands.dispose();
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="stage">
      <div ref={mount} className="stage-canvas" role="img" aria-label="A little 3D version of Anri in a black cap and sunglasses. Click him to say hi, drag to spin him." />
      <p className={line ? "bubble show" : "bubble"} aria-live="polite">{line}</p>
      <p className={played ? "hint gone" : "hint"}>Click to say hi &middot; drag to spin</p>
    </div>
  );
}
