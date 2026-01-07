import { useState } from "react";
import { ChevronDown, Save, Folder, Check, Share, Upload, ShoppingCart } from "lucide-react";


const ColorPickerDropdown = ({
  title,
  isOpen,
  setIsOpen,
  selectedColor,
  setSelectedColor,
  palette,
  closeOthers,
}) => (
  <div className="w-full h-full flex flex-col items-center overflow-y-auto">
    <button
      className="flex justify-between items-center w-full text-black !px-4 !py-3 rounded-md transition-all font-dm font-semibold cursor-pointer"
      onClick={() => {
        closeOthers();
        setIsOpen(!isOpen);
      }}
      style={{ fontFamily: "'DM Sans', sans-serif" }}
    >
      <div className="flex items-center gap-2">
        <span>{title}</span>
        <div
          className="w-6 h-6 rounded-full border border-white"
          style={{ backgroundColor: selectedColor }}
        />
      </div>
      <ChevronDown
        size={20}
        className={`${isOpen ? "rotate-180" : ""} transition-transform duration-300`}
      />
    </button>
    {isOpen && (
      <div className="absolute top-full left-0 right-0 bg-gray-300 rounded-md !mt-2 !p-3 shadow-lg border border-[#bab5b5] font-dm z-50">
        <div className="grid grid-cols-5 gap-2 p-2">
          {palette.map((color) => (
            <button
              key={color}
              className="w-8 h-8 rounded-full border"
              style={{ backgroundColor: color }}
              onClick={() => setSelectedColor(color)}
            ></button>
          ))}
        </div>
        <input
          type="text"
          className="w-full mt-2 px-2 py-1 border rounded text-black"
          value={selectedColor}
          onChange={(e) => setSelectedColor(e.target.value)}
          placeholder="#hexcode"
        />
      </div>
    )}
  </div>
);

const LeftSidebar = () => {
  const [amount, setAmount] = useState(1);

  // Garment Color state with palette
  const [isGarmentOpen, setIsGarmentOpen] = useState(false);
  const [selectedGarmentColor, setSelectedGarmentColor] = useState("#3498db");

  // Background Color state
  const [isBackgroundOpen, setIsBackgroundOpen] = useState(false);
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("#ffffff");

  // Design dropdown state
  const [isDesignsOpen, setIsDesignsOpen] = useState(false);
  const [selectedDesign, setSelectedDesign] = useState("Design 1");

  const closeAllDropdowns = () => {
    setIsGarmentOpen(false);
    setIsBackgroundOpen(false);
    setIsDesignsOpen(false);
  };

  return (
    <div className="fixed top-12 left-0 bg-[#dedada] text-white w-64 !pt-10 !pb-45 rounded-r-3xl z-80 flex flex-col items-center shadow-3xl">
      <nav className="flex flex-col gap-8 items-center w-full !px-5 !mt-4">
        <button className="bg-black text-white font-medium flex items-center gap-2 !px-5 !py-3 rounded-full hover:bg-black w-full transition-transform hover:scale-101 shadow-3xl cursor-pointer">
          <Upload size={20} /> Upload Your Design
        </button>

        {/* Garment Color Dropdown with palette */}
        <div className="w-full relative">
          <ColorPickerDropdown
            title="Garment Color"
            isOpen={isGarmentOpen}
            setIsOpen={setIsGarmentOpen}
            selectedColor={selectedGarmentColor}
            setSelectedColor={setSelectedGarmentColor}
            palette={[
              "#3498db",
              "#e74c3c",
              "#f1c40f",
              "#2ecc71",
              "#9b59b6",
              "#ffffff",
              "#000000",
            ]}
            closeOthers={closeAllDropdowns}
          />
        </div>

        {/* Background Dropdown */}
        <div className="w-full relative">
          <ColorPickerDropdown
            title="Background"
            isOpen={isBackgroundOpen}
            setIsOpen={setIsBackgroundOpen}
            selectedColor={selectedBackgroundColor}
            setSelectedColor={setSelectedBackgroundColor}
            palette={[
              "#ffffff",
              "#000000",
              "#95a5a6",
              "#ecf0f1",
              "#f39c12",
              "#1abc9c",
            ]}
            closeOthers={closeAllDropdowns}
          />
        </div>

        {/* Design Dropdown */}
        <div className="w-full relative">
          <button
            className="flex justify-between items-center w-full text-black !px-4 !py-3 rounded-md transition-all font-dm font-semibold cursor-pointer"
            onClick={() => {
              closeAllDropdowns();
              setIsDesignsOpen(!isDesignsOpen);
            }}
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            <span>Design</span>
            <ChevronDown
              size={20}
              className={`${isDesignsOpen ? "rotate-180" : ""} transition-transform duration-300`}
            />
          </button>
          {isDesignsOpen && (
            <div className="absolute top-full left-0 right-0 bg-gray-300 rounded-md !mt-2 !p-3 shadow-lg border border-[#bab5b5] font-dm z-50">
              <button
                className="w-full text-left px-2 py-1 hover:bg-gray-300 rounded"
                onClick={() => setSelectedDesign("Design 1")}
              >
                Design 1
              </button>
              <button
                className="w-full text-left px-2 py-1 hover:bg-gray-300 rounded"
                onClick={() => setSelectedDesign("Design 2")}
              >
                Design 2
              </button>
              <button
                className="w-full text-left px-2 py-1 hover:bg-gray-300 rounded"
                onClick={() => setSelectedDesign("Design 3")}
              >
                Design 3
              </button>
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 gap-5 text-gray-700 !mt-2">
          <button className="flex flex-col items-center hover:text-blue-600 transition cursor-pointer">
            <Save size={20} />
            <span className="text-xs">Save</span>
          </button>
          <button className="flex flex-col items-center hover:text-blue-600 transition cursor-pointer">
            <Folder size={20} />
            <span className="text-xs">Drafts</span>
          </button>
          <button className="flex flex-col items-center hover:text-blue-600 transition cursor-pointer">
            <Check size={20} />
            <span className="text-xs">Check</span>
          </button>
          <button className="flex flex-col items-center hover:text-blue-600 transition cursor-pointer">
            <Share size={20} />
            <span className="text-xs">Share</span>
          </button>
        </div>

        

        <button className="w-full bg-blue-600 text-white text-lg font-medium flex items-center justify-center gap-2 !py-3 rounded-4xl shadow-md hover:bg-blue-700 transition cursor-pointer">
          <ShoppingCart size={20} /> Check Out
        </button>
      </nav>
    </div>
  );
};

export default LeftSidebar;
