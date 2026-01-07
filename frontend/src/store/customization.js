import { proxy } from 'valtio';

export const customizationState = proxy({
  savedDesign: null,
});

export function saveCustomization(design) {
  customizationState.savedDesign = design;
}
