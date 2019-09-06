import React, { useState, useEffect } from 'react'

const BackToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const hideButton = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener('scroll', hideButton);

    return () => { window.removeEventListener('scroll', hideButton)};
  })

  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className={`fixed bottom-0 right-0 mr-3 mb-3 ${showButton ? '' : 'hidden'}`}>
      <div onClick={handleClick} className="cursor-pointer border border-gray-500 bg-gray-400 w-12 flex justify-center px-8 py-1 rounded-full">
        <span className="text-4xl" role="img" aria-label="up!">☝️</span>
      </div>
    </div>
  )
}

export default BackToTopButton
