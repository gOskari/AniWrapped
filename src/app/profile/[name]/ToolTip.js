import { useState, useRef, useEffect } from 'react';

const Tooltip = ({ children, text }) => {
  const [isVisible, setIsVisible] = useState(false);
  const tooltipRef = useRef(null);

  const showTooltip = () => setIsVisible(true);
  const hideTooltip = () => setIsVisible(false);

  // Position the tooltip above the child element
  const positionTooltip = () => {
    const tooltip = tooltipRef.current;
    if (tooltip) {
      const childRect = tooltip.parentElement.getBoundingClientRect();
      tooltip.style.left = `${childRect.left}px`;
      tooltip.style.top = `${childRect.top - tooltip.offsetHeight - 5}px`; // 5px above the child
    }
  };

  useEffect(() => {
    if (isVisible) {
      positionTooltip();
    }
  }, [isVisible]);

  return (
    <div className="tooltip-wrapper" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      {isVisible && (
        <div className="tooltip-box" ref={tooltipRef}>
          {text}
        </div>
      )}
      <style jsx>{`
        .tooltip-wrapper {
          position: relative;
          display: inline-block;
        }
        .tooltip-box {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 100%;
          margin-bottom: 5px;
          padding: 6px 12px;
          color: #fff;
          background: rgba(0, 0, 0, 0.75);
          border-radius: 4px;
          font-size: 14px;
          z-index: 1000;
          white-space: nowrap;
        }
      `}</style>
    </div>
  );
};

export default Tooltip;
