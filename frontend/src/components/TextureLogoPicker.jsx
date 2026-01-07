import React from 'react';

const TextureLogoPicker = ({ texturesLogos, handleTextureLogoClick }) => {
  const textures = texturesLogos.filter((item) => item.type === 'texture');
  const frontLogos = texturesLogos.filter((item) => item.type === 'frontLogo');
  const backLogos = texturesLogos.filter((item) => item.type === 'backLogo');

  const renderImages = (images, scrollable = false) => (
    <div
      className={`grid grid-cols-2 gap-2 ${
        scrollable ? 'max-h-32 overflow-y-auto' : ''
      }`}
    >
      {images.map((image) => (
        <div
          key={image.name}
          onClick={() => handleTextureLogoClick(image)}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={image.image}
            alt={image.name}
            className="rounded-full w-full border border-gray-300"
          />
        </div>
      ))}
    </div>
  );

  return (
    <div className="filepicker-container mt-20 min-h-[500px] bg-white rounded-lg p-4 shadow-md">
      <div className="bg-white/10 p-4 rounded-md space-y-6">
        {/* Textures Section */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white mb-2">Textures</p>
          {renderImages(textures, true)}
        </div>

        <hr className="border-gray-600" />

        {/* Front Logos Section */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white mb-2">Front Logos</p>
          {renderImages(frontLogos)}
        </div>

        <hr className="border-gray-600" />

        {/* Back Logos Section */}
        <div className="space-y-2">
          <p className="text-sm font-semibold text-white mb-2">Back Logos</p>
          {renderImages(backLogos)}
        </div>
      </div>
    </div>
  );
};

export default TextureLogoPicker;
