"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeBG() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current!;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 3.2;

    /* ── Sphere ── */
    const sphere = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.15, 12),
      new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.1, metalness: 0.95 })
    );
    scene.add(sphere);

    /* ── Wireframe overlay ── */
    const wire = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.17, 4),
      new THREE.MeshBasicMaterial({ color: 0x4488ff, wireframe: true, transparent: true, opacity: 0.07 })
    );
    scene.add(wire);

    /* ── Rings ── */
    const ring1 = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.008, 6, 120),
      new THREE.MeshBasicMaterial({ color: 0x6eb5ff, transparent: true, opacity: 0.35 })
    );
    ring1.rotation.x = Math.PI / 2.8;
    scene.add(ring1);

    const ring2 = new THREE.Mesh(
      new THREE.TorusGeometry(1.72, 0.004, 6, 120),
      new THREE.MeshBasicMaterial({ color: 0xff8fcb, transparent: true, opacity: 0.18 })
    );
    ring2.rotation.set(Math.PI / 4, Math.PI / 6, 0);
    scene.add(ring2);

    /* ── Lights ── */
    scene.add(new THREE.AmbientLight(0x111133, 0.5));
    const pL1 = new THREE.PointLight(0x6eb5ff, 4, 8);
    pL1.position.set(2, 1.5, 2);
    scene.add(pL1);
    const pL2 = new THREE.PointLight(0xff8fcb, 3, 8);
    pL2.position.set(-2, -1, 1.5);
    scene.add(pL2);
    const pL3 = new THREE.PointLight(0x7ef5b0, 2, 6);
    pL3.position.set(0, 2, -2);
    scene.add(pL3);

    /* ── Particles ── */
    const N = 800;
    const pos = new Float32Array(N * 3).map(() => (Math.random() - 0.5) * 8);
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const particles = new THREE.Points(
      pGeo,
      new THREE.PointsMaterial({ color: 0x6eb5ff, size: 0.012, transparent: true, opacity: 0.4 })
    );
    scene.add(particles);

    /* ── Mouse tracking ── */
    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);

    const onResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", onResize);

    let id: number;
    let t = 0;
    const animate = () => {
      id = requestAnimationFrame(animate);
      t += 0.006;
      sphere.rotation.y = t * 0.35 + mouse.x * 0.3;
      sphere.rotation.x = t * 0.18 + mouse.y * 0.15;
      wire.rotation.y = -t * 0.2;
      wire.rotation.x = t * 0.12;
      ring1.rotation.z = t * 0.22;
      ring2.rotation.z = -t * 0.15;
      ring2.rotation.y = t * 0.1;
      pL1.position.set(Math.sin(t * 0.7) * 2.5, Math.cos(t * 0.5) * 1.5, 2);
      pL2.position.set(Math.cos(t * 0.6) * -2.5, Math.sin(t * 0.4) * -1.5, 1.5);
      pL3.intensity = 2 + Math.sin(t * 2.1) * 0.8;
      particles.rotation.y = t * 0.04;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      mount.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}