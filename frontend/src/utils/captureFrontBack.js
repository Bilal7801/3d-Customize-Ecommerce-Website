// captureFrontBack.js
import { Vector3 } from 'three';
import { invalidate } from '@react-three/fiber';
import state from '../store';

export const captureFrontBack = () =>
  new Promise((resolve) => {
    const canvas = document.querySelector('canvas');
    if (!canvas) {
      console.warn('[snapshot] Canvas not found');
      return resolve({ imageFront: '', imageBack: '' });
    }

    const { camera } = state;
    if (!camera) {
      console.warn('[snapshot] Camera not found');
      const fallback = canvas.toDataURL('image/png');
      return resolve({ imageFront: fallback, imageBack: fallback });
    }

    const imageFront = canvas.toDataURL('image/png');

    const center = new Vector3(0, 0, 0);
    const oldPos = camera.position.clone();
    const oldQuat = camera.quaternion.clone();

    // Rotate camera 180° around Y axis
    const offset = oldPos.clone().sub(center);
    offset.applyAxisAngle(new Vector3(0, 1, 0), Math.PI);
    camera.position.copy(center.clone().add(offset));
    camera.lookAt(center);
    invalidate();

    // Ensure full re-render before snapshotting the back
    requestAnimationFrame(() => {
      invalidate();
      requestAnimationFrame(() => {
        invalidate();
        requestAnimationFrame(() => {
          const imageBack = canvas.toDataURL('image/png');

          // Restore camera
          camera.position.copy(oldPos);
          camera.quaternion.copy(oldQuat);
          invalidate();

          resolve({ imageFront, imageBack });
        });
      });
    });
  });
