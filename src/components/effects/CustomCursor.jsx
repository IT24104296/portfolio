import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
  const outerRef = useRef(null);
  const innerRef = useRef(null);
  const mouseGlowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    const glow = mouseGlowRef.current;
    if (!outer || !inner || !glow) return;

    let mouseX = 0, mouseY = 0;
    let outerX = 0, outerY = 0;
    let animId;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      inner.style.left = mouseX + 'px';
      inner.style.top = mouseY + 'px';
      glow.style.left = mouseX + 'px';
      glow.style.top = mouseY + 'px';
    };

    const animate = () => {
      outerX += (mouseX - outerX) * 0.12;
      outerY += (mouseY - outerY) * 0.12;
      outer.style.left = outerX + 'px';
      outer.style.top = outerY + 'px';
      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    const onMouseEnter = () => setIsHovering(true);
    const onMouseLeave = () => setIsHovering(false);

    const interactables = document.querySelectorAll('a, button, [data-cursor]');
    interactables.forEach(el => {
      el.addEventListener('mouseenter', onMouseEnter);
      el.addEventListener('mouseleave', onMouseLeave);
    });

    document.addEventListener('mousemove', onMouseMove);

    const observer = new MutationObserver(() => {
      const newInteractables = document.querySelectorAll('a, button, [data-cursor]');
      newInteractables.forEach(el => {
        el.removeEventListener('mouseenter', onMouseEnter);
        el.removeEventListener('mouseleave', onMouseLeave);
        el.addEventListener('mouseenter', onMouseEnter);
        el.addEventListener('mouseleave', onMouseLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div ref={mouseGlowRef} className="mouse-glow" />
      <div ref={outerRef} className={`cursor-outer ${isHovering ? 'hovering' : ''}`} />
      <div ref={innerRef} className="cursor-inner" />
    </>
  );
}
