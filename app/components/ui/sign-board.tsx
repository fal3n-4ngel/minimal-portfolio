import React, { useState, useRef, useEffect } from 'react';

type Theme = 'light' | 'dark' | 'blue' | 'green';
type Tool = 'pen' | 'eraser';

export const DigitalSignaturePad: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [brushSize, setBrushSize] = useState<number>(2);
  const [brushColor, setBrushColor] = useState<string>('#000000');
  const [theme] = useState<Theme>('light');
  const [tool, setTool] = useState<Tool>('pen');
  const [hasDrawn, setHasDrawn] = useState<boolean>(false);

  const themeClasses: Record<Theme, string> = {
    light: 'bg-white border-gray-300 text-gray-900',
    dark: 'bg-gray-900 border-gray-600 text-white',
    blue: 'bg-blue-50 border-blue-300 text-blue-900',
    green: 'bg-green-50 border-green-300 text-green-900'
  };

  const headerThemes: Record<Theme, string> = {
    light: 'bg-gray-50 border-gray-300',
    dark: 'bg-gray-800 border-gray-600',
    blue: 'bg-blue-100 border-blue-300',
    green: 'bg-green-100 border-green-300'
  };

  const canvasThemes: Record<Theme, string> = {
    light: '#ffffff',
    dark: '#1f2937',
    blue: '#f0f9ff',
    green: '#f0fdf4'
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set initial canvas background
    ctx.fillStyle = canvasThemes[theme];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set drawing properties
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, [theme]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    setHasDrawn(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.beginPath();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.globalCompositeOperation = tool === 'eraser' ? 'destination-out' : 'source-over';
    ctx.strokeStyle = tool === 'eraser' ? 'rgba(0,0,0,1)' : brushColor;
    ctx.lineWidth = tool === 'eraser' ? brushSize * 2 : brushSize;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.fillStyle = canvasThemes[theme];
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const downloadSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const link = document.createElement('a');
    link.download = `signature-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL();
    link.click();
  };

  const undoLast = () => {
    // Simple implementation - just clear for now
    // In a full implementation, you'd store drawing states
    clearCanvas();
  };

  const handleToolChange = (newTool: Tool) => {
    setTool(newTool);
  };

  const handleBrushSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrushSize(parseInt(e.target.value));
  };

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBrushColor(e.target.value);
  };


  return (
    <div className={`${themeClasses[theme]}  font-mono flex flex-col transition-colors duration-300 w-full h-[98%] mt-0`}>
      {/* Header */}
      <div className={`${headerThemes[theme]} border-b p-2 text-xs transition-colors duration-300`}>
        <div className="flex justify-between items-center">
          <div>
            <div className="font-bold">Drawing Board</div>
            <div className="opacity-75">Draw or sign below</div>
          </div>
          <div className="text-sm">
             Mode :{tool === 'pen' ? 'Drawing' : 'Erasing'} 
          </div>
        </div>
      </div>
      
      {/* Canvas Area */}
      <div className="flex-1 p-4 flex items-center justify-center">
        <div className="w-full h-full max-w-2xl max-h-80 relative">
          <canvas
            ref={canvasRef}
            className={`w-full h-full border-2 cursor-crosshair rounded ${
              theme === 'dark' ? 'border-gray-600' : 'border-gray-300'
            } ${canvasThemes[theme] === '#ffffff' ? 'bg-white' : ''}`}
            style={{ backgroundColor: canvasThemes[theme] }}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
          />
          
          {!hasDrawn && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center opacity-50">
                <div className="text-2xl mb-2">✍️</div>
                <div className="text-sm">Click and drag to draw your signature</div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Tool Controls */}
      <div className={`${headerThemes[theme]} border-t p-3 transition-colors duration-300`}>
        <div className="flex justify-between items-center flex-wrap gap-2 mb-3">
          {/* Tool Selection */}
          <div className="flex gap-1">
            <button
              onClick={() => handleToolChange('pen')}
              className={`flex-1 px-2 py-1 rounded text-xs transition-colors ${
                tool === 'pen'
                  ? 'bg-blue-500 text-white' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              ✏️ Pen
            </button>
            <button
              onClick={() => handleToolChange('eraser')}
              className={`flex-1 px-2 py-1 rounded text-xs transition-colors ${
                tool === 'eraser'
                  ? 'bg-red-500 text-white' 
                  : theme === 'dark' 
                    ? 'bg-gray-700 text-gray-300' 
                    : 'bg-gray-200 text-gray-700'
              }`}
            >
              🧹 Erase
            </button>
          </div>

          {/* Brush Size */}
          <div className="flex items-center gap-2">
            <span className="text-xs">Size:</span>
            <input
              type="range"
              min="1"
              max="20"
              value={brushSize}
              onChange={handleBrushSizeChange}
              className="flex-1"
            />
            <span className="text-xs w-6">{brushSize}</span>
          </div>

          {/* Color Picker */}
          <div className="flex items-center gap-2">
            <span className="text-xs">Color:</span>
            <input
              type="color"
              value={brushColor}
              onChange={handleColorChange}
              className="w-8 h-6 rounded border"
              disabled={tool === 'eraser'}
            />
          </div>

       
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={clearCanvas}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            🗑️ Clear
          </button>
          
          <button
            onClick={undoLast}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              theme === 'dark' 
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            ↶ Undo
          </button>
          
          <button
            onClick={downloadSignature}
            disabled={!hasDrawn}
            className={`px-3 py-1 rounded text-xs transition-colors ${
              hasDrawn
                ? 'bg-green-500 text-white hover:bg-green-600'
                : theme === 'dark'
                  ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                  : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
          >
            💾 Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default DigitalSignaturePad;