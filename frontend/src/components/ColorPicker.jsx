import React, { useState } from 'react';
import { SketchPicker } from 'react-color';
import { useSnapshot } from 'valtio';
import state from '../store';

const ColorPicker = () => {
  const snap = useSnapshot(state);
  const [inputColor, setInputColor] = useState(snap.color || '#ff5733');

  const handleChange = (color) => {
    state.color = color.hex;
    setInputColor(color.hex);
  };

  const handleInputChange = (e) => {
    const newColor = e.target.value;
    setInputColor(newColor);
    // Optional: validate color code before applying
    if (/^#[0-9A-Fa-f]{6}$/.test(newColor)) {
      state.color = newColor;
    }
  };

  return (
    <div className="absolute left-full ml-3">
      <SketchPicker
        color={inputColor}
        disableAlpha
        onChange={handleChange}
      />
      
      <div className="mt-2 p-2 border rounded bg-white shadow text-center">
        <label className="text-sm font-medium text-gray-700">Color Code:</label>
        <input
  type="text"
  value={inputColor}
  onChange={handleInputChange}
  className="mt-1 w-full border border-gray-300 rounded px-2 py-1 text-center text-sm font-mono text-black"
  placeholder="#ffffff"
  maxLength={7}
/>
      </div>
    </div>
  );
};

export default ColorPicker;
