import React from 'react';
import { useSnapshot } from 'valtio';
import state from '../store';

const LogoControls = () => {
  const snap = useSnapshot(state);

  const handlePositionChange = (type, index, value) => {
    if (type === 'front') {
      state.frontLogoPosition[index] = value;
    } else if (type === 'back') {
      state.backLogoPosition[index] = value;
    }
  };

  const handleScaleChange = (type, value) => {
    if (type === 'front') {
      state.frontLogoScale = value;
    } else if (type === 'back') {
      state.backLogoScale = value;
    }
  };

  const renderAxisControls = (type, position) => (
    ['X', 'Y', 'Z'].map((axis, i) => (
      <div className="flex items-center justify-between" key={`${type}-${axis}`}>
        <span className="text-white w-6">{axis}:</span>
        <div className="flex gap-2">
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handlePositionChange(type, i, position[i] - 0.01)}
          >
            -
          </button>
          <button
            className="border border-gray-300 rounded-md px-2 py-1 text-white"
            onClick={() => handlePositionChange(type, i, position[i] + 0.01)}
          >
            +
          </button>
        </div>
      </div>
    ))
  );

  const renderScaleControls = (type, scale) => (
    <div className="flex items-center justify-between">
      <span className="text-white w-6">S:</span>
      <div className="flex gap-2">
        <button
          className="border border-gray-300 rounded-md px-2 py-1 text-white"
          onClick={() => handleScaleChange(type, scale - 0.01)}
        >
          -
        </button>
        <button
          className="border border-gray-300 rounded-md px-2 py-1 text-white"
          onClick={() => handleScaleChange(type, scale + 0.01)}
        >
          +
        </button>
      </div>
    </div>
  );

  return (
    <div className="filepicker-container mt-20 min-h-[500px] bg-white rounded-lg p-4 shadow-md">
      <div className="bg-white/10 p-4 rounded-md space-y-6">
        {/* Front Logo Controls */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white mb-2">Front Logo Controls</p>
          {renderAxisControls('front', snap.frontLogoPosition)}
          {renderScaleControls('front', snap.frontLogoScale)}
        </div>

        <hr className="border-gray-600" />

        {/* Back Logo Controls */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white mb-2">Back Logo Controls</p>
          {renderAxisControls('back', snap.backLogoPosition)}
          {renderScaleControls('back', snap.backLogoScale)}
        </div>
      </div>
    </div>
  );
};

export default LogoControls;
