import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import state from '../store';
import { invalidate } from '@react-three/fiber';
import { captureFrontBack } from '../utils/captureFrontBack';
import { addToCart } from '../utils/cartStorage';


import api from '../utils/api';

import LogoControls from '../canvas/LogoControls';
import TextControls from '../canvas/TextControls';
import {
  EditorTabs,
  FilterTabs,
  DecalTypes,
  texturesLogos,
} from '../config/constants';
import {
  fadeAnimation,
  slideAnimation,
} from '../config/motion';
import {
  ColorPicker,
  CustomButton,
  FilePicker,
  TextureLogoPicker,
  Tab,
} from '../components';
import { downloadCanvasToImage, reader } from '../config/helpers';

const Customizer = () => {
  const snap = useSnapshot(state);
  const navigate = useNavigate();

  const [file, setFile] = useState('');
  const [saving, setSaving] = useState(false);
  const [activeEditorTab, setEditorTab] = useState('');
  const [activeFilterTab, setFilterTab] = useState({
    frontLogoShirt: true,
    backLogoShirt: true,
    frontTextShirt: true,
    backTextShirt: true,
    stylishShirt: false,
  });

  const renderTabBody = () => {
    switch (activeEditorTab) {
      case 'colorpicker':
        return <ColorPicker />;
      case 'filepicker':
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case 'logocontrols':
        return <LogoControls />;
      case 'textcontrols':
        return <TextControls />;
      case 'texturelogopicker':
        return (
          <TextureLogoPicker
            texturesLogos={texturesLogos}
            handleTextureLogoClick={handleTextureLogoClick}
          />
        );
      default:
        return null;
    }
  };

  const handleTextureLogoClick = (tex) => {
    const { type, image } = tex;
    if (type === 'texture') state.fullDecal = image;
    else if (type === 'frontLogo') state.frontLogoDecal = image;
    else if (type === 'backLogo') state.backLogoDecal = image;
  };

  const handleDecals = (type, img) => {
    const D = DecalTypes[type];
    state[D.stateProperty] = img;
    if (!activeFilterTab[D.filterTab]) toggleFilterTab(D.filterTab);
  };

  const toggleFilterTab = (tab) => {
    const newState = { ...activeFilterTab };

    switch (tab) {
      case 'frontLogoShirt':
        state.isFrontLogoTexture = !newState[tab];
        break;
      case 'backLogoShirt':
        state.isBackLogoTexture = !newState[tab];
        break;
      case 'frontTextShirt':
        state.isFrontText = !newState[tab];
        break;
      case 'backTextShirt':
        state.isBackText = !newState[tab];
        break;
      case 'stylishShirt':
        state.isFullTexture = !newState[tab];
        break;
      case 'downloadShirt':
        downloadCanvasToImage();
        return;
      default:
        Object.assign(state, {
          isFrontLogoTexture: true,
          isBackLogoTexture: true,
          isFrontText: true,
          isBackText: true,
          isFullTexture: false,
        });
    }

    setFilterTab({ ...newState, [tab]: !newState[tab] });
  };

  const readFile = (type) => {
    reader(file).then((img) => {
      handleDecals(type, img);
      setEditorTab('');
    });
  };

  

const addCurrentDesignTo = async (dest) => {
  try {
    setSaving(true);
    const { imageFront, imageBack } = await captureFrontBack();

    let item = {
      title: 'Custom Shirt',
      price: 25,
      qty: 1,
      imageFront,
      imageBack,
    };

    if (dest === 'cart') {
      // ✅ Save to backend only when adding to cart
     const payload = {
  title: item.title,
  price: item.price,
  quantity: item.qty, // ✅ Add this line
  image_front: imageFront,
  image_back: imageBack,
};

      console.log('📤 Sending to backend:', payload);
      const response = await api.post('/designs', payload);
      const design = response.data.design;

      item = {
        ...item,
        id: design.id, // Add ID for cart item
      };

      addToCart(item);
      navigate('/cart');
    } else {
      // ❌ Skip saving to backend on Buy Now
      localStorage.setItem('checkoutCart', JSON.stringify([item]));
      navigate('/purchase/cart');
    }
  } catch (err) {
    console.error('❌ Save failed:', err.response?.data || err.message);
    alert('Please sign in.');
  } finally {
    setSaving(false);
  }
};




  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          {/* Top-left buttons */}
          <motion.div className="absolute top-5 left-5 z-20 flex gap-2" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title={saving ? 'Saving…' : 'Add to Cart'}
              handleClick={() => addCurrentDesignTo('cart')}
              disabled={saving}
              customStyles="px-4 py-2 text-xs"
            />
            <CustomButton
              type="outline"
              title={saving ? 'Saving…' : 'Buy Now'}
              handleClick={() => addCurrentDesignTo('buy')}
              disabled={saving}
              customStyles="px-4 py-2 text-xs"
            />
          </motion.div>

          {/* Left editor panel */}
          <motion.div className="absolute top-0 left-0 z-10" {...slideAnimation('left')}>
            <div className="flex items-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((t) => (
                 <Tab
  key={t.name}
  tab={t}
  handleClick={() =>
    setEditorTab((prevTab) => (prevTab === t.name ? '' : t.name))
  }
/>

                ))}
                {renderTabBody()}
              </div>
            </div>
          </motion.div>

          {/* Bottom filter tabs */}
          <motion.div className="filtertabs-container" {...slideAnimation('up')}>
            {FilterTabs.map((t) => (
              <Tab
                key={t.name}
                tab={t}
                isFilterTab
                isActiveTab={activeFilterTab[t.name]}
                handleClick={() => toggleFilterTab(t.name)}
              />
            ))}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Customizer;
