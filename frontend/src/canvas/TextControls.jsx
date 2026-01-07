import React from 'react';
import { useSnapshot } from 'valtio';
import { SketchPicker } from 'react-color';
import state from '../store';

const fonts = [
  "Arial", "Times New Roman", "Segoe UI", "Tahoma", "Calibri", "Frutiger",
  "Helvetica", "Futura PT", "Myriad Pro", "Open Sans", "Roboto", "Verdana",
  "Adobe Arabic", "Droid Arabic Naskh", "GE SS Unique Light", "Simplon Norm Arabic",
  "Neue Helvetica Arabic", "Noto Naskh Arabic", "Ubuntu Arabic", "Waseem", "Zuhair",
  "Dubai", "Amiri", "Bukra", "Bahij Nazanin", "Kufam", "Lalezar", "Mirza",
  "Sakkal Majalla", "Scheherazade", "Tajawal", "Lateef", "Reem Kufi", "Almarai",
  "Cairo", "Harmattan", "Janna LT", "Mada", "Muna", "JF Flat", "JF Hitham",
  "JF Nizar", "JF Deco", "JF Ziba", "JF Unicode Naskh", "JF Typist", "JF Flat Arabic",
  "JF Nizar Serif", "JF Zaytoon", "JF Zuhair", "JF Deco Arabic", "JF Hujjat",
  "JF Noon", "JF Raya", "JF Riqa", "JF Tulisan", "JF Adeeb", "JF Zarkan", "JF Besmellah",
  "JF Noori Nastaleeq", "JF Noori Nastaleeq Kasheeda", "JF Noori Nastaleeq V1.0",
  "JF Noori Nastaleeq V2.0", "JF Noori Nastaleeq V3.0", "JF Noori Nastaleeq V4.0",
  "JF Noori Nastaleeq V5.0", "JF Noori Nastaleeq V6.0", "JF Noori Nastaleeq V7.0",
  "JF Noori Nastaleeq V8.0", "JF Noori Nastaleeq V9.0", "JF Noori Nastaleeq V10.0",
  "JF Noori Nastaleeq V11.0", "JF Noori Nastaleeq V12.0", "JF Noori Nastaleeq V13.0",
  "JF Noori Nastaleeq V14.0"
];

const TextControls = () => {
  const snap = useSnapshot(state);

  const handleTextChange = (type, value) => {
    state[type + 'Text'] = value;
  };

  const handlePositionChange = (type, index, value) => {
    state[type + 'TextPosition'][index] = value;
  };

  const handleRotationChange = (type, index, value) => {
    state[type + 'TextRotation'][index] = value;
  };

  const handleScaleChange = (type, index, value) => {
    state[type + 'TextScale'][index] = value;
  };

  const handleFontChange = (type, value) => {
    state[type + 'TextFont'] = value;
  };

  const handleColorChange = (type, value) => {
    state[type + 'TextColor'] = value;
  };

  const renderAxisControls = (type, labelPrefix, position) => (
    ['X', 'Y', 'Z'].map((axis, i) => (
      <div className="flex items-center justify-between" key={`${type}-${axis}`}>
        <span className="text-white w-6">{labelPrefix}{axis}:</span>
        <div className="flex gap-2">
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handlePositionChange(type, i, position[i] - 0.01)}
          >-</button>
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handlePositionChange(type, i, position[i] + 0.01)}
          >+</button>
        </div>
      </div>
    ))
  );

  const renderRotationControls = (type, labelPrefix, rotation) => (
    ['X', 'Y', 'Z'].map((axis, i) => (
      <div className="flex items-center justify-between" key={`${type}-rot-${axis}`}>
        <span className="text-white w-6">{labelPrefix}{axis}:</span>
        <div className="flex gap-2">
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handleRotationChange(type, i, rotation[i] - 0.01)}
          >-</button>
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handleRotationChange(type, i, rotation[i] + 0.01)}
          >+</button>
        </div>
      </div>
    ))
  );

  const renderScaleControls = (type, labelPrefix, scale) => (
    ['X', 'Y', 'Z'].map((axis, i) => (
      <div className="flex items-center justify-between" key={`${type}-scale-${axis}`}>
        <span className="text-white w-6">{labelPrefix}{axis}:</span>
        <div className="flex gap-2">
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handleScaleChange(type, i, scale[i] - 0.01)}
          >-</button>
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handleScaleChange(type, i, scale[i] + 0.01)}
          >+</button>
        </div>
      </div>
    ))
  );

  const renderFontAndColor = (type, font, color) => (
    <>
      <div className="flex items-center justify-between">
        <span className="text-white w-6">F:</span>
        <select
          className="text-black border border-gray-300 rounded p-1"
          value={font}
          onChange={(e) => handleFontChange(type, e.target.value)}
        >
          {fonts.map((f) => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col items-start">
        <span className="text-white mb-1">C:</span>
        <SketchPicker
          color={color}
          disableAlpha
          onChange={(c) => handleColorChange(type, c.hex)}
        />
      </div>
    </>
  );

  return (
    <div className="filepicker-container mt-20 min-h-[500px] bg-white rounded-lg p-4 shadow-md overflow-y-auto">
      <div className="bg-white/10 p-4 rounded-md space-y-6">
        {/* Front Text Controls */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white mb-2">Front Text Controls</p>
         <input
  type="text"
  className="w-full p-1 rounded border border-gray-300 text-black"
  value={snap.frontText}
  onChange={(e) => handleTextChange('front', e.target.value)}
/>
          {renderAxisControls('front', 'F', snap.frontTextPosition)}
          {renderRotationControls('front', 'FR', snap.frontTextRotation)}
          {renderScaleControls('front', 'FS', snap.frontTextScale)}
          {renderFontAndColor('front', snap.frontTextFont, snap.frontTextColor)}
        </div>

        <hr className="border-gray-600" />

        {/* Back Text Controls */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white mb-2">Back Text Controls</p>
          <input
            type="text"
            className="w-full p-1 rounded border border-gray-300 text-black"
            value={snap.backText}
            onChange={(e) => handleTextChange('back', e.target.value)}
          />
          {renderAxisControls('back', 'B', snap.backTextPosition)}
          {renderRotationControls('back', 'BR', snap.backTextRotation)}
          {renderScaleControls('back', 'BS', snap.backTextScale)}
          {renderFontAndColor('back', snap.backTextFont, snap.backTextColor)}
        </div>
      </div>
    </div>
  );
};

export default TextControls;
