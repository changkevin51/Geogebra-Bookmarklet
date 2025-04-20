javascript:(function() {
  var POPUP_ID = 'geogebra-popup-container';
  var STORAGE_KEY = 'geogebraPopupState';

  var existingPopup = document.getElementById(POPUP_ID);
  if (existingPopup) {
    existingPopup.remove();
    return;
  }

  var savedState = {};
  try {
    savedState = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    console.error("Error parsing GeoGebra state:", e);
  }

  var originalDimensions = {
    width: savedState.width || '550px',
    height: savedState.height || '450px',
    top: savedState.top || '30px',
    left: savedState.left || '30px'
  };

  var d = document.createElement('div');
  d.id = POPUP_ID;

  Object.assign(d.style, {
    position: 'fixed',
    top: savedState.top || '30px',
    left: savedState.left || '30px',
    width: savedState.width || '550px',
    height: savedState.height || '450px',
    border: '1px solid #ccc',
    background: '#fff',
    zIndex: 10000,
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    borderRadius: '8px',
    overflow: 'hidden',
    resize: 'both',
    minWidth: '300px',
    minHeight: '250px',
    transition: 'top 0.2s ease-in-out, left 0.2s ease-in-out'
  });

  var isDarkTheme = savedState.theme === 'dark';
  var isMaximized = savedState.isMaximized || false;
  
  var header = document.createElement('div');
  Object.assign(header.style, {
    height: '30px',
    background: isDarkTheme ? '#333' : '#4a90e2',
    color: '#fff',
    lineHeight: '30px',
    padding: '0 12px',
    cursor: 'move',
    userSelect: 'none',
    borderTopLeftRadius: '8px',
    borderTopRightRadius: '8px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  });
  
  var titleArea = document.createElement('div');
  titleArea.textContent = 'GeoGebra Calculator';
  
  var controlsArea = document.createElement('div');
  controlsArea.style.display = 'flex';
  controlsArea.style.alignItems = 'center'; 
  controlsArea.style.gap = '5px'; 
  
  var calculatorTypes = { 
    scientific: { name: 'Scientific', url: 'https://www.geogebra.org/scientific?embed' },
    graphing: { name: 'Graphing', url: 'https://www.geogebra.org/graphing?embed' }
  };

  
  var initialMode = 'graphing';
  if (savedState.calculatorUrl === calculatorTypes.scientific.url) {
    initialMode = 'scientific';
  }
  var currentCalcUrl = calculatorTypes[initialMode].url;
  var currentCalcName = calculatorTypes[initialMode].name;
  
  titleArea.textContent = 'GeoGebra ' + currentCalcName + ' Calculator';

  
  var sciBtn = document.createElement('button');
  sciBtn.textContent = 'Sci';
  sciBtn.title = 'Scientific Calculator';
  
  var graphBtn = document.createElement('button');
  graphBtn.textContent = 'Graph';
  graphBtn.title = 'Graphing Calculator';

  var commonBtnStyle = {
    background: '#fff',
    border: '1px solid #ccc',
    color: '#333',
    cursor: 'pointer',
    fontSize: '11px',
    padding: '2px 6px',
    borderRadius: '3px',
    lineHeight: '1.4'
  };
  
  var activeBtnStyle = {
    background: '#d0e4f8', 
    borderColor: '#4a90e2'
  };

  Object.assign(sciBtn.style, commonBtnStyle);
  Object.assign(graphBtn.style, commonBtnStyle);

  function setActiveButton(activeButton) {
      Object.assign(sciBtn.style, commonBtnStyle);
      Object.assign(graphBtn.style, commonBtnStyle);
      
      Object.assign(activeButton.style, commonBtnStyle, activeBtnStyle);
  }
  
  setActiveButton(initialMode === 'scientific' ? sciBtn : graphBtn);

  sciBtn.onclick = function(e) {
      if (currentCalcUrl === calculatorTypes.scientific.url) return; 
      currentCalcUrl = calculatorTypes.scientific.url;
      currentCalcName = calculatorTypes.scientific.name;
      iframe.src = currentCalcUrl;
      titleArea.textContent = 'GeoGebra ' + currentCalcName + ' Calculator';
      setActiveButton(sciBtn);
      saveState();
      e.stopPropagation();
  };

  graphBtn.onclick = function(e) {
      if (currentCalcUrl === calculatorTypes.graphing.url) return; 
      currentCalcUrl = calculatorTypes.graphing.url;
      currentCalcName = calculatorTypes.graphing.name;
      iframe.src = currentCalcUrl;
      titleArea.textContent = 'GeoGebra ' + currentCalcName + ' Calculator';
      setActiveButton(graphBtn);
      saveState();
      e.stopPropagation();
  };

  var themeToggle = document.createElement('button');
  themeToggle.innerHTML = isDarkTheme ? '☀️' : '🌙';
  themeToggle.title = 'Toggle theme';
  Object.assign(themeToggle.style, {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 5px'
  });
  
  var maximizeBtn = document.createElement('button');
  maximizeBtn.innerHTML = '□';
  maximizeBtn.title = 'Maximize';
  Object.assign(maximizeBtn.style, {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 5px'
  });
  
  var minimizeBtn = document.createElement('button');
  minimizeBtn.innerHTML = '_';
  minimizeBtn.title = 'Minimize';
  Object.assign(minimizeBtn.style, {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 5px'
  });
  
  var closeBtn = document.createElement('button');
  closeBtn.innerHTML = '✕';
  closeBtn.title = 'Close';
  Object.assign(closeBtn.style, {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
    fontSize: '14px',
    padding: '0 5px'
  });
  
  var miniButton = document.createElement('div');
  miniButton.innerHTML = 'G';
  miniButton.title = 'GeoGebra Calculator (Click to restore)';
  Object.assign(miniButton.style, {
    display: 'none',
    position: 'fixed',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    backgroundColor: isDarkTheme ? '#333' : '#4a90e2',
    color: 'white',
    textAlign: 'center',
    lineHeight: '32px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
    zIndex: 10000
  });
  document.body.appendChild(miniButton);
  controlsArea.appendChild(sciBtn);
  controlsArea.appendChild(graphBtn);
  controlsArea.appendChild(themeToggle);
  controlsArea.appendChild(minimizeBtn);
  controlsArea.appendChild(maximizeBtn);
  controlsArea.appendChild(closeBtn);
  header.appendChild(titleArea);
  header.appendChild(controlsArea);

  var iframe = document.createElement('iframe');
  iframe.src = currentCalcUrl;
  Object.assign(iframe.style, {
    width: '100%',
    height: 'calc(100% - 30px)',
    border: '0',
    display: 'block'
  });

  d.appendChild(header);
  d.appendChild(iframe);
  closeBtn.onclick = function(e) {
    d.remove();
    miniButton.remove();
    
    
    e.stopPropagation();
  };
  
  themeToggle.onclick = function(e) {
    isDarkTheme = !isDarkTheme;
    header.style.background = isDarkTheme ? '#333' : '#4a90e2';
    themeToggle.innerHTML = isDarkTheme ? '☀️' : '🌙';
    d.style.background = isDarkTheme ? '#222' : '#fff';
    iframe.style.filter = isDarkTheme ? 'invert(0.85)' : 'none';
    miniButton.style.backgroundColor = isDarkTheme ? '#333' : '#4a90e2';
    saveState();
    e.stopPropagation();
  };
  
  maximizeBtn.onclick = function(e) {
    if (isMaximized) {
      
      d.style.top = originalDimensions.top;
      d.style.left = originalDimensions.left;
      d.style.width = originalDimensions.width;
      d.style.height = originalDimensions.height;
      maximizeBtn.innerHTML = '□';
      maximizeBtn.title = 'Maximize';
      isMaximized = false;
    } else {
      
      originalDimensions = {
        width: d.style.width,
        height: d.style.height,
        top: d.style.top,
        left: d.style.left
      };
      
      
      d.style.width = 'calc(100% - 60px)';
      d.style.height = 'calc(100% - 60px)';
      d.style.top = '30px';
      d.style.left = '30px';
      maximizeBtn.innerHTML = '❐';
      maximizeBtn.title = 'Restore';
      isMaximized = true;
    }
    saveState();
    e.stopPropagation();
  };
  
  minimizeBtn.onclick = function(e) {
    d.style.display = 'none';
    
    var rect = d.getBoundingClientRect();
    miniButton.style.top = rect.top + '5px'; 
    miniButton.style.left = rect.left + '5px';
    miniButton.style.display = 'block';
    saveState();
    e.stopPropagation();
  };

  miniButton.onclick = function() {
    d.style.display = 'block';
    miniButton.style.display = 'none';
    saveState();
  };

  var isDragging = false;
  var startX, startY, initialX, initialY;

  function saveState() {
    var state = {
      top: d.style.top,
      left: d.style.left,
      width: d.style.width,
      height: d.style.height,
      calculatorUrl: currentCalcUrl,
      theme: isDarkTheme ? 'dark' : 'light',
      isMaximized: isMaximized,
      isMinimized: miniButton.style.display === 'block',
      miniButtonTop: miniButton.style.top,
      miniButtonLeft: miniButton.style.left,
      
      originalDimensions: isMaximized ? originalDimensions : null
    };
    
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.error("Error saving GeoGebra state:", e);
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function() {
      const context = this, args = arguments;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  }

  const debouncedSave = debounce(saveState, 250);

  function disableSmoothInteraction() {
    d.style.transition = 'none';
    iframe.style.pointerEvents = 'none';
  }

  function enableSmoothInteraction() {
    d.style.transition = 'top 0.2s ease-in-out, left 0.2s ease-in-out';
    iframe.style.pointerEvents = 'auto';
  }

  header.onmousedown = function(e) {
    if (e.target !== header && e.target !== titleArea) return; 
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = d.offsetLeft;
    initialY = d.offsetTop;
    header.style.cursor = 'grabbing';
    d.style.userSelect = 'none'; 
    
    disableSmoothInteraction();
    
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  miniButton.onmousedown = function(e) {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    initialX = parseInt(miniButton.style.left) || 0;
    initialY = parseInt(miniButton.style.top) || 0;
    
    document.addEventListener('mousemove', handleMiniButtonMove);
    document.addEventListener('mouseup', handleMiniButtonUp);
    e.preventDefault(); 
  };

  function handleMiniButtonMove(e) {
    if (!isDragging) return;
    var newX = initialX + e.clientX - startX;
    var newY = initialY + e.clientY - startY;
    
    
    newX = Math.max(0, Math.min(newX, window.innerWidth - 32));
    newY = Math.max(0, Math.min(newY, window.innerHeight - 32));
    
    miniButton.style.left = newX + 'px';
    miniButton.style.top = newY + 'px';
  }

  function handleMiniButtonUp() {
    if (isDragging) {
      isDragging = false;
      document.removeEventListener('mousemove', handleMiniButtonMove);
      document.removeEventListener('mouseup', handleMiniButtonUp);
      
      enableSmoothInteraction();
      
      saveState();
    }
  }

  function handleMouseMove(e) {
    if (!isDragging) return;
    var newX = initialX + e.clientX - startX;
    var newY = initialY + e.clientY - startY;
    
    newX = Math.max(0, Math.min(newX, window.innerWidth - d.offsetWidth));
    newY = Math.max(0, Math.min(newY, window.innerHeight - d.offsetHeight));
    d.style.left = newX + 'px';
    d.style.top = newY + 'px';
  }

  function handleMouseUp() {
    if (isDragging) {
      isDragging = false;
      header.style.cursor = 'move';
      d.style.removeProperty('user-select');
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      
      enableSmoothInteraction();
      
      saveState(); 
    }
  }

  var isResizing = false;
  d.addEventListener('mousedown', function(e) {
    const rect = d.getBoundingClientRect();
    const edgeThreshold = 10; 
    
    const isNearRightEdge = Math.abs(e.clientX - rect.right) < edgeThreshold;
    const isNearBottomEdge = Math.abs(e.clientY - rect.bottom) < edgeThreshold;
    
    if (isNearRightEdge || isNearBottomEdge) {
      isResizing = true;
      disableSmoothInteraction();
    }
  });

  document.addEventListener('mouseup', function() {
    if (isResizing) {
      isResizing = false;
      enableSmoothInteraction();
    }
  });

  var resizeObserver = new ResizeObserver(entries => {
    if (!isMaximized) {
      if (!isResizing) {
        debouncedSave();
      }
    }
  });
  resizeObserver.observe(d);

  if (savedState.isMaximized) {
    isMaximized = true;
    maximizeBtn.innerHTML = '❐';
    maximizeBtn.title = 'Restore';
    
    
    if (savedState.originalDimensions) {
      originalDimensions = savedState.originalDimensions;
    }
  }
  
  if (savedState.isMinimized) {
    d.style.display = 'none';
    miniButton.style.display = 'block';
    miniButton.style.top = savedState.miniButtonTop || '30px';
    miniButton.style.left = savedState.miniButtonLeft || '30px';
  }
  
  
  if (isDarkTheme) {
    d.style.background = '#222';
    iframe.style.filter = 'invert(0.85)';
  }
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById(POPUP_ID)) {
      d.remove();
      miniButton.remove();
      e.preventDefault();
    }
  });

  document.body.appendChild(d);
})();