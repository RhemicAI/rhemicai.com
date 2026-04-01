'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

type SceneConfig = {
  particleCount: number;
  connectionDistance: number;
  interactionRadius: number;
  bounds: {
    x: number;
    y: number;
    z: number;
  };
};

type SceneData = {
  config: SceneConfig;
  origins: Float32Array;
  positions: Float32Array;
  linePositions: Float32Array;
  lineColors: Float32Array;
};

function getSceneConfig(): SceneConfig {
  if (typeof window === 'undefined') {
    return {
      particleCount: 96,
      connectionDistance: 7.1,
      interactionRadius: 5.6,
      bounds: { x: 18, y: 11, z: 14 },
    };
  }

  const width = window.innerWidth;

  if (width < 640) {
    return {
      particleCount: 64,
      connectionDistance: 5.8,
      interactionRadius: 4.6,
      bounds: { x: 14, y: 9, z: 11 },
    };
  }

  if (width < 1024) {
    return {
      particleCount: 84,
      connectionDistance: 6.6,
      interactionRadius: 5.2,
      bounds: { x: 16, y: 10, z: 12 },
    };
  }

  return {
    particleCount: 108,
    connectionDistance: 7.2,
    interactionRadius: 6,
    bounds: { x: 19, y: 11.5, z: 14 },
  };
}

function createSceneData(): SceneData {
  const config = getSceneConfig();
  const origins = new Float32Array(config.particleCount * 3);
  const positions = new Float32Array(config.particleCount * 3);
  const maxConnections = (config.particleCount * (config.particleCount - 1)) / 2;
  const linePositions = new Float32Array(maxConnections * 2 * 3);
  const lineColors = new Float32Array(maxConnections * 2 * 3);

  for (let i = 0; i < config.particleCount; i += 1) {
    const i3 = i * 3;
    const spread = 0.72 + Math.random() * 0.28;

    origins[i3] = (Math.random() - 0.5) * config.bounds.x * 2 * spread;
    origins[i3 + 1] = (Math.random() - 0.5) * config.bounds.y * 2 * spread;
    origins[i3 + 2] = (Math.random() - 0.5) * config.bounds.z * 2 * 0.85;

    positions[i3] = origins[i3];
    positions[i3 + 1] = origins[i3 + 1];
    positions[i3 + 2] = origins[i3 + 2];
  }

  return { config, origins, positions, linePositions, lineColors };
}

function createVelocities(length: number) {
  const velocities = new Float32Array(length);

  for (let i = 0; i < length; i += 3) {
    velocities[i] = (Math.random() - 0.5) * 0.012;
    velocities[i + 1] = (Math.random() - 0.5) * 0.01;
    velocities[i + 2] = (Math.random() - 0.5) * 0.008;
  }

  return velocities;
}

type PointerState = {
  active: boolean;
  pressed: boolean;
  targetX: number;
  targetY: number;
  currentX: number;
  currentY: number;
};

type ScrollState = {
  current: number;
  target: number;
  lastY: number;
};

export default function NeuralField() {
  const [scene] = useState(() => createSceneData());
  const groupRef = useRef<THREE.Group>(null);
  const pointsGeometryRef = useRef<THREE.BufferGeometry>(null);
  const linesGeometryRef = useRef<THREE.BufferGeometry>(null);
  const velocitiesRef = useRef(createVelocities(scene.positions.length));
  const energiesRef = useRef(new Float32Array(scene.config.particleCount));
  const pointerRef = useRef<PointerState>({
    active: false,
    pressed: false,
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
  });
  const scrollRef = useRef<ScrollState>({
    current: 0,
    target: 0,
    lastY: 0,
  });

  useEffect(() => {
    scrollRef.current.lastY = window.scrollY;

    const handlePointerMove = (event: PointerEvent) => {
      pointerRef.current.active = true;
      pointerRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    const handlePointerDown = () => {
      pointerRef.current.pressed = true;
    };

    const handlePointerUp = () => {
      pointerRef.current.pressed = false;
    };

    const handlePointerLeave = () => {
      pointerRef.current.active = false;
      pointerRef.current.pressed = false;
      pointerRef.current.targetX = 0;
      pointerRef.current.targetY = 0;
    };

    const handleScroll = () => {
      const nextY = window.scrollY;
      const deltaY = nextY - scrollRef.current.lastY;
      scrollRef.current.lastY = nextY;
      scrollRef.current.target = THREE.MathUtils.clamp(deltaY * 0.02, -1, 1);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown, { passive: true });
    window.addEventListener('pointerup', handlePointerUp, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    window.addEventListener('blur', handlePointerLeave);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointerleave', handlePointerLeave);
      window.removeEventListener('blur', handlePointerLeave);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const pointsGeometry = pointsGeometryRef.current;
    const linesGeometry = linesGeometryRef.current;

    if (!pointsGeometry || !linesGeometry) {
      return;
    }

    const pointPositionAttribute = new THREE.BufferAttribute(scene.positions, 3);
    pointPositionAttribute.setUsage(THREE.DynamicDrawUsage);
    pointsGeometry.setAttribute('position', pointPositionAttribute);

    const linePositionAttribute = new THREE.BufferAttribute(scene.linePositions, 3);
    linePositionAttribute.setUsage(THREE.DynamicDrawUsage);
    linesGeometry.setAttribute('position', linePositionAttribute);

    const lineColorAttribute = new THREE.BufferAttribute(scene.lineColors, 3);
    lineColorAttribute.setUsage(THREE.DynamicDrawUsage);
    linesGeometry.setAttribute('color', lineColorAttribute);
    linesGeometry.setDrawRange(0, 0);
  }, [scene]);

  useFrame((_, delta) => {
    const pointsGeometry = pointsGeometryRef.current;
    const linesGeometry = linesGeometryRef.current;

    if (!pointsGeometry || !linesGeometry) {
      return;
    }

    const frameScale = Math.min(delta * 60, 1.6);
    const { config, origins } = scene;
    const positions = pointsGeometry.attributes.position.array as Float32Array;
    const linePositions = linesGeometry.attributes.position.array as Float32Array;
    const lineColors = linesGeometry.attributes.color.array as Float32Array;
    const velocities = velocitiesRef.current;
    const energies = energiesRef.current;
    const pointer = pointerRef.current;
    const scroll = scrollRef.current;

    pointer.currentX = THREE.MathUtils.lerp(pointer.currentX, pointer.targetX, 0.08 * frameScale);
    pointer.currentY = THREE.MathUtils.lerp(pointer.currentY, pointer.targetY, 0.08 * frameScale);
    scroll.current = THREE.MathUtils.lerp(scroll.current, scroll.target, 0.1 * frameScale);
    scroll.target *= 0.86;

    const pointerWorldX = pointer.currentX * config.bounds.x * 0.9;
    const pointerWorldY = pointer.currentY * config.bounds.y * 0.92;
    const interactionRadiusSq = config.interactionRadius * config.interactionRadius;
    const connectionDistanceSq = config.connectionDistance * config.connectionDistance;
    const pressBoost = pointer.pressed ? 1.85 : 1;
    const pointerDepth = pointer.pressed ? 2.6 : 1.4;
    const scrollBoost = Math.abs(scroll.current);

    for (let i = 0; i < config.particleCount; i += 1) {
      const i3 = i * 3;
      const px = positions[i3];
      const py = positions[i3 + 1];
      const pz = positions[i3 + 2];
      const ox = origins[i3];
      const oy = origins[i3 + 1];
      const oz = origins[i3 + 2];

      velocities[i3] += (ox - px) * 0.0085 * frameScale;
      velocities[i3 + 1] += (oy - py) * 0.0085 * frameScale;
      velocities[i3 + 2] += (oz - pz) * 0.006 * frameScale;

      let energy = 0;

      if (pointer.active) {
        const dx = px - pointerWorldX;
        const dy = py - pointerWorldY;
        const distanceSq = dx * dx + dy * dy;

        if (distanceSq < interactionRadiusSq) {
          const distance = Math.sqrt(distanceSq) + 0.0001;
          const influence = 1 - distanceSq / interactionRadiusSq;
          const repel = 0.022 * influence * pressBoost * frameScale;

          velocities[i3] += (dx / distance) * repel;
          velocities[i3 + 1] += (dy / distance) * repel;
          velocities[i3 + 2] += influence * 0.012 * pointerDepth * frameScale;
          energy = influence;
        }
      }

      if (scrollBoost > 0.001) {
        const normalizedDepth = 1 - Math.min(Math.abs(oz) / config.bounds.z, 1);
        const scrollForce = scroll.current * (0.01 + normalizedDepth * 0.012) * frameScale;
        velocities[i3 + 1] -= scrollForce;
        velocities[i3 + 2] += Math.abs(scrollForce) * 0.42;
        energy = Math.max(energy, scrollBoost * (0.18 + normalizedDepth * 0.32));
      }

      energies[i] = THREE.MathUtils.lerp(energies[i], energy, energy > energies[i] ? 0.25 : 0.08);

      velocities[i3] *= 0.94;
      velocities[i3 + 1] *= 0.94;
      velocities[i3 + 2] *= 0.92;

      positions[i3] += velocities[i3];
      positions[i3 + 1] += velocities[i3 + 1];
      positions[i3 + 2] += velocities[i3 + 2];
    }

    let vertexIndex = 0;

    for (let i = 0; i < config.particleCount; i += 1) {
      const i3 = i * 3;

      for (let j = i + 1; j < config.particleCount; j += 1) {
        const j3 = j * 3;
        const dx = positions[i3] - positions[j3];
        const dy = positions[i3 + 1] - positions[j3 + 1];
        const dz = positions[i3 + 2] - positions[j3 + 2];
        const distanceSq = dx * dx + dy * dy + dz * dz;

        if (distanceSq > connectionDistanceSq) {
          continue;
        }

        const strength = 1 - distanceSq / connectionDistanceSq;
        const pointerEnergy = Math.max(energies[i], energies[j]);
        const glow = 0.24 + strength * 0.5 + pointerEnergy * 0.45;
        const red = 0.16 + glow * 0.14;
        const green = 0.47 + glow * 0.24;
        const blue = 0.78 + glow * 0.18;

        linePositions[vertexIndex] = positions[i3];
        lineColors[vertexIndex] = red;
        vertexIndex += 1;
        linePositions[vertexIndex] = positions[i3 + 1];
        lineColors[vertexIndex] = green;
        vertexIndex += 1;
        linePositions[vertexIndex] = positions[i3 + 2];
        lineColors[vertexIndex] = blue;
        vertexIndex += 1;

        linePositions[vertexIndex] = positions[j3];
        lineColors[vertexIndex] = red;
        vertexIndex += 1;
        linePositions[vertexIndex] = positions[j3 + 1];
        lineColors[vertexIndex] = green;
        vertexIndex += 1;
        linePositions[vertexIndex] = positions[j3 + 2];
        lineColors[vertexIndex] = blue;
        vertexIndex += 1;
      }
    }

    linesGeometry.setDrawRange(0, vertexIndex / 3);
    pointsGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.position.needsUpdate = true;
    linesGeometry.attributes.color.needsUpdate = true;

    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.currentX * 0.18,
        0.028 * frameScale
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        pointer.currentY * 0.14 + scroll.current * 0.08,
        0.028 * frameScale
      );
      groupRef.current.position.x = THREE.MathUtils.lerp(
        groupRef.current.position.x,
        pointer.currentX * 1.25,
        0.026 * frameScale
      );
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        pointer.currentY * 0.85 - scroll.current * 0.6,
        0.026 * frameScale
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, -1.5]}>
      <points>
        <bufferGeometry ref={pointsGeometryRef} />
        <pointsMaterial
          color="#a5d8ff"
          size={scene.config.particleCount < 70 ? 0.125 : 0.11}
          sizeAttenuation
          transparent
          opacity={0.9}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <lineSegments>
        <bufferGeometry ref={linesGeometryRef} />
        <lineBasicMaterial transparent opacity={0.18} vertexColors depthWrite={false} />
      </lineSegments>
    </group>
  );
}
