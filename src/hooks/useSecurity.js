import { useEffect, useState } from 'react';

const useSecurity = () => {
  const [attemptCount, setAttemptCount] = useState(0);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    const handleContextMenu = (e) => {
      e.preventDefault();
      incrementAttempt();
      return false;
    };

    const handleKeyDown = (e) => {

      if (e.key === 'F12') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'I') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'C') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'J') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.key === 's') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.key === 'a') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.key === 'p') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'K') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }

      if (e.ctrlKey && e.shiftKey && e.key === 'E') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }
      if (e.ctrlKey && e.shiftKey && e.key === 'S') {
        e.preventDefault();
        incrementAttempt();
        return false;
      }
    };

    // const handleSelectStart = (e) => {
    //   e.preventDefault();
    //   return false;
    // };

    const handleDragStart = (e) => {
      e.preventDefault();
      return false;
    };

    const incrementAttempt = () => {
      setAttemptCount(prev => {
        const newCount = prev + 1;
        if (newCount >= 3) {
          setShowWarning(true);
        }
        return newCount;
      });
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);
    // document.addEventListener('selectstart', handleSelectStart);
    document.addEventListener('dragstart', handleDragStart);

    let devtools = false;
    const threshold = 160;

    const detectDevTools = () => {
      if (window.outerHeight - window.innerHeight > threshold || 
          window.outerWidth - window.innerWidth > threshold) {
        if (!devtools) {
          devtools = true;
          incrementAttempt();
        }
      } else {
        devtools = false;
      }
    };

    const devToolsInterval = setInterval(detectDevTools, 100);

    const originalLog = console.log;
    const originalWarn = console.warn;
    const originalError = console.error;
    const originalInfo = console.info;
    const originalDebug = console.debug;

    console.log = () => {};
    console.warn = () => {};
    console.error = () => {};
    console.info = () => {};
    console.debug = () => {};

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
      // document.removeEventListener('selectstart', handleSelectStart);
      document.removeEventListener('dragstart', handleDragStart);
      clearInterval(devToolsInterval);

      console.log = originalLog;
      console.warn = originalWarn;
      console.error = originalError;
      console.info = originalInfo;
      console.debug = originalDebug;
    };
  }, []);

  const closeWarning = () => {
    setShowWarning(false);
  };

  return { showWarning, closeWarning };
};

export default useSecurity;
