"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { CSS2DRenderer, CSS2DObject } from "three/examples/jsm/renderers/CSS2DRenderer.js";
import { profile } from "@/data/profile";
import { techIcons, iconDisplayHex } from "@/components/techIcons";

function fibonacciSphere(samples: number, radius: number) {
  const points: THREE.Vector3[] = [];
  const offset = 2 / samples;
  const increment = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < samples; i++) {
    const y = i * offset - 1 + offset / 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const phi = i * increment;
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;
    points.push(new THREE.Vector3(x * radius, y * radius, z * radius));
  }
  return points;
}

export default function SkillsSphere() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const radius = 2.5;
    const points = fibonacciSphere(profile.techStack.length, radius);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";

    const labelRenderer = new CSS2DRenderer();
    labelRenderer.domElement.style.position = "absolute";
    labelRenderer.domElement.style.inset = "0";
    labelRenderer.domElement.style.pointerEvents = "none";
    container.appendChild(labelRenderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const wireGeo = new THREE.IcosahedronGeometry(radius, 2);
    const wireEdges = new THREE.EdgesGeometry(wireGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x3f6a62,
      transparent: true,
      opacity: 0.3,
    });
    const wireframe = new THREE.LineSegments(wireEdges, wireMat);
    group.add(wireframe);

    const entries = profile.techStack.map((skill, i) => {
      const el = document.createElement("div");
      el.className =
        skill.level === "primary"
          ? "text-[11.5px] font-mono px-2.5 py-[4px] rounded-full text-amber bg-panel/80 whitespace-nowrap"
          : "text-[11px] font-mono px-2.5 py-[4px] rounded-full text-cyan bg-panel/80 whitespace-nowrap";
      el.style.display = "inline-flex";
      el.style.alignItems = "center";
      el.style.gap = "5px";
      el.style.pointerEvents = "auto";
      el.style.cursor = "default";
      el.style.border = "1px solid";
      el.style.transition = "opacity 0.1s linear, transform 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease";

      const icon = techIcons[skill.name];
      const fallbackBorder = skill.level === "primary" ? "#8a6a3a99" : "#20281f";
      const accentHex = icon ? `#${iconDisplayHex(icon)}` : null;

      el.style.borderColor = icon ? `${accentHex}55` : fallbackBorder;
      if (icon) {
        el.innerHTML = `<svg viewBox="0 0 24 24" width="12" height="12" style="flex:none"><path fill="${accentHex}" d="${icon.path}"/></svg><span>${skill.name}</span>`;
      } else {
        el.textContent = skill.name;
      }

      if (accentHex) {
        el.addEventListener("pointerenter", () => {
          el.style.transform = "scale(1.1)";
          el.style.boxShadow = `0 0 14px ${accentHex}66`;
          el.style.borderColor = accentHex;
        });
        el.addEventListener("pointerleave", () => {
          el.style.transform = "scale(1)";
          el.style.boxShadow = "none";
          el.style.borderColor = `${accentHex}55`;
        });
      }

      const basePos = points[i];
      const obj = new CSS2DObject(el);
      obj.position.copy(basePos);
      group.add(obj);

      return { basePos, el };
    });

    const updateLabelDepth = () => {
      for (const { basePos, el } of entries) {
        const rotated = basePos.clone().applyQuaternion(group.quaternion);
        const t = (rotated.z / radius + 1) / 2;
        el.style.opacity = String(0.3 + 0.7 * t);
      }
    };

    let rotY = 0.4;
    let rotX = -0.15;
    let autoSpeed = 0.0022;
    let dragging = false;
    let lastX = 0;
    let lastY = 0;

    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      container.setPointerCapture(e.pointerId);
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      rotY += dx * 0.005;
      rotX += dy * 0.005;
      rotX = Math.max(-1.4, Math.min(1.4, rotX));
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      try {
        container.releasePointerCapture(e.pointerId);
      } catch {
        // ignore
      }
    };

    container.addEventListener("pointerdown", onPointerDown);
    container.addEventListener("pointermove", onPointerMove);
    container.addEventListener("pointerup", onPointerUp);
    container.addEventListener("pointerleave", onPointerUp);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      labelRenderer.setSize(w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);

    let raf = 0;
    const animate = () => {
      if (!dragging) rotY += autoSpeed;
      group.rotation.set(rotX, rotY, 0);
      updateLabelDepth();
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      container.removeEventListener("pointerdown", onPointerDown);
      container.removeEventListener("pointermove", onPointerMove);
      container.removeEventListener("pointerup", onPointerUp);
      container.removeEventListener("pointerleave", onPointerUp);
      wireGeo.dispose();
      wireEdges.dispose();
      wireMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      if (labelRenderer.domElement.parentNode === container) {
        container.removeChild(labelRenderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="glass-card relative w-full h-[380px] sm:h-[440px] rounded-lg cursor-grab active:cursor-grabbing touch-none select-none overflow-hidden"
    />
  );
}
