"use client";

import { useRef, useEffect } from "react";

/**
 * Hero 3D background using vanilla Three.js (no @react-three/fiber)
 * to avoid React 19 / R3F "ReactCurrentOwner" compatibility issues.
 */
export function HeroScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window === "undefined") return;

    let raf = 0;
    // Minimal type for cleanup and usage; Three.WebGLRenderer is assigned here
    let renderer: {
      dispose(): void;
      domElement: HTMLCanvasElement;
      setSize(w: number, h: number): void;
      setPixelRatio(n: number): void;
      setClearColor(hex: number, alpha: number): void;
      render(scene: object, camera: object): void;
    } | null = null;
    let geometry: { dispose(): void; setAttribute(name: string, attr: unknown): void } | null = null;
    let material: { dispose(): void } | null = null;
    let cancelled = false;

    const cleanup = () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(raf);
      renderer?.dispose();
      geometry?.dispose();
      material?.dispose();
      if (container && renderer?.domElement?.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };

    let onResize: () => void = () => {};

    void import("three").then((THREE) => {
      if (cancelled) return;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, 1, 0.1, 100);
      camera.position.z = 8;

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xffffff, 0);
      container.appendChild(renderer.domElement);

      const count = 800;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
      }
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      material = new THREE.PointsMaterial({
        size: 0.035,
        color: 0x8e1b2f, /* maroon-primary – subtle for light theme */
        transparent: true,
        opacity: 0.4,
        sizeAttenuation: true,
        depthWrite: false,
      });
      const points = new THREE.Points(
        geometry as unknown as import("three").BufferGeometry,
        material as unknown as import("three").PointsMaterial
      );
      scene.add(points);

      const ambient = new THREE.AmbientLight(0xffffff, 0.7);
      scene.add(ambient);
      const pl1 = new THREE.PointLight(0x8e1b2f, 0.25, 80);
      pl1.position.set(8, 8, 8);
      scene.add(pl1);
      const pl2 = new THREE.PointLight(0xb02a44, 0.15, 60);
      pl2.position.set(-8, -6, 5);
      scene.add(pl2);

      onResize = () => {
        if (!container || cancelled) return;
        const width = container.offsetWidth;
        const height = container.offsetHeight;
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
        renderer!.setSize(width, height);
      };
      onResize();
      window.addEventListener("resize", onResize);

      function animate() {
        if (cancelled) return;
        raf = requestAnimationFrame(animate);
        points.rotation.y += 0.0008;
        renderer!.render(scene, camera);
      }
      animate();
    });

    return cleanup;
  }, []);

  return <div ref={containerRef} className="absolute inset-0 z-0" aria-hidden />;
}
