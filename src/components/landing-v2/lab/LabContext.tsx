"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface LabSettings {
  spotlightEnabled: boolean;
  magneticSprings: boolean;
  tilt3d: boolean;
  volumetricAura: boolean;
}

interface LabContextValue {
  settings: LabSettings;
  updateSetting: <K extends keyof LabSettings>(key: K, value: LabSettings[K]) => void;
  toggleSetting: (key: keyof LabSettings) => void;
  fps: number;
  mousePos: { x: number; y: number };
  velocity: number;
  isInspectorOpen: boolean;
  setIsInspectorOpen: (open: boolean | ((prev: boolean) => boolean)) => void;
}

const defaultSettings: LabSettings = {
  spotlightEnabled: true,
  magneticSprings: true,
  tilt3d: true,
  volumetricAura: true,
};

const LabContext = createContext<LabContextValue | null>(null);

export function LabProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<LabSettings>(defaultSettings);
  const [fps, setFps] = useState(60);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState(0);
  const [isInspectorOpen, setIsInspectorOpen] = useState(true);

  const prevMouseRef = useRef({ x: 0, y: 0, time: 0 });
  const frameCountRef = useRef(0);
  const lastFpsTimeRef = useRef(0);

  // Global mouse tracking and velocity calculation
  useEffect(() => {
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      const dt = Math.max(1, now - prevMouseRef.current.time);
      const dx = e.clientX - prevMouseRef.current.x;
      const dy = e.clientY - prevMouseRef.current.y;
      const dist = Math.hypot(dx, dy);
      const v = Math.round((dist / dt) * 1000); // px per second

      prevMouseRef.current = { x: e.clientX, y: e.clientY, time: now };
      setMousePos({ x: e.clientX, y: e.clientY });
      setVelocity((prev) => Math.round(prev * 0.7 + v * 0.3));
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // FPS loop
    const measureFps = (now: number) => {
      frameCountRef.current++;
      if (now - lastFpsTimeRef.current >= 1000) {
        setFps(frameCountRef.current);
        frameCountRef.current = 0;
        lastFpsTimeRef.current = now;
      }
      animId = requestAnimationFrame(measureFps);
    };

    lastFpsTimeRef.current = performance.now();
    animId = requestAnimationFrame(measureFps);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  const updateSetting = <K extends keyof LabSettings>(key: K, value: LabSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  const toggleSetting = (key: keyof LabSettings) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <LabContext.Provider
      value={{
        settings,
        updateSetting,
        toggleSetting,
        fps,
        mousePos,
        velocity,
        isInspectorOpen,
        setIsInspectorOpen,
      }}
    >
      {children}
    </LabContext.Provider>
  );
}

export function useLab() {
  const context = useContext(LabContext);
  if (!context) {
    throw new Error("useLab must be used within a LabProvider");
  }
  return context;
}
