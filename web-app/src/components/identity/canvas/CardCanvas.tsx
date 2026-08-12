'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Stage, Layer, Rect, Line } from 'react-konva';
import { useCanvasStore } from '../../../store/useCanvasStore';
import { CanvasElementRenderer } from './CanvasElementRenderer';

interface CardCanvasProps {
  containerWidth: number;
}

interface SnappingGuide {
  points: number[];
  type: 'h' | 'v';
}

export const CardCanvas: React.FC<CardCanvasProps> = ({ containerWidth }) => {
  const { template, selectedElementId, selectElement, updateElement, setStageRef } = useCanvasStore();
  const stageRef = useRef<any>(null);
  const [scale, setScale] = useState(1);
  const [guides, setGuides] = useState<SnappingGuide[]>([]);

  useEffect(() => {
    if (stageRef.current) {
      setStageRef(stageRef.current);
    }
  }, [stageRef, setStageRef]);

  useEffect(() => {
    if (template && containerWidth) {
      const newScale = containerWidth / template.width;
      setScale(newScale);
    }
  }, [template, containerWidth]);

  if (!template) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-slate-100 rounded-xl animate-pulse text-slate-400">
        Loading Canvas...
      </div>
    );
  }

  const checkDeselect = (e: any) => {
    const clickedOnEmpty = e.target === e.target.getStage();
    const clickedOnBackground = e.target.name() === 'background-rect';
    if (clickedOnEmpty || clickedOnBackground) {
      selectElement(null);
    }
  };

  // --- ELITE SMART SNAPPING ALGORITHM ---
  const handleDragMove = (e: any, elementId: string) => {
    const draggedNode = e.target;
    const stage = stageRef.current;
    if (!stage) return;

    const dragBounds = draggedNode.getClientRect();
    const dragX = draggedNode.x();
    const dragY = draggedNode.y();
    const dragWidth = dragBounds.width / scale;
    const dragHeight = dragBounds.height / scale;

    const snapTolerance = 6; // px distance to activate snap magnet
    const newGuides: SnappingGuide[] = [];
    let snapX: number | null = null;
    let snapY: number | null = null;

    // Collect all potential snap lines from other elements
    const otherElements = template.elements.filter(el => el.id !== elementId);
    
    // Canvas Centers
    const canvasCenterX = template.width / 2;
    const canvasCenterY = template.height / 2;

    // Build alignment coordinates
    const vTargets = [0, canvasCenterX, template.width];
    const hTargets = [0, canvasCenterY, template.height];

    otherElements.forEach(el => {
      const elW = el.width || 100;
      const elH = el.height || 100;

      vTargets.push(el.x, el.x + elW / 2, el.x + elW);
      hTargets.push(el.y, el.y + elH / 2, el.y + elH);
    });

    // Check vertical snapping (X axis bounds)
    const draggedXPositions = [dragX, dragX + dragWidth / 2, dragX + dragWidth];
    
    draggedXPositions.forEach((x, idx) => {
      vTargets.forEach(target => {
        if (Math.abs(x - target) < snapTolerance) {
          // Snap based on which edge or center matched
          if (idx === 0) snapX = target; // Left edge match
          if (idx === 1) snapX = target - dragWidth / 2; // Center match
          if (idx === 2) snapX = target - dragWidth; // Right edge match

          newGuides.push({
            points: [target, 0, target, template.height],
            type: 'v'
          });
        }
      });
    });

    // Check horizontal snapping (Y axis bounds)
    const draggedYPositions = [dragY, dragY + dragHeight / 2, dragY + dragHeight];

    draggedYPositions.forEach((y, idx) => {
      hTargets.forEach(target => {
        if (Math.abs(y - target) < snapTolerance) {
          // Snap based on edge/center match
          if (idx === 0) snapY = target; // Top edge match
          if (idx === 1) snapY = target - dragHeight / 2; // Center match
          if (idx === 2) snapY = target - dragHeight; // Bottom edge match

          newGuides.push({
            points: [0, target, template.width, target],
            type: 'h'
          });
        }
      });
    });

    // Apply snap adjustment to active node
    if (snapX !== null) draggedNode.x(snapX);
    if (snapY !== null) draggedNode.y(snapY);

    setGuides(newGuides);
  };

  const handleDragEnd = () => {
    // Clear alignment lines when drag finishes
    setGuides([]);
  };

  return (
    <div 
      className="shadow-2xl overflow-hidden rounded-[24px]" 
      style={{ width: template.width * scale, height: template.height * scale }}
    >
      <Stage
        width={template.width * scale}
        height={template.height * scale}
        scaleX={scale}
        scaleY={scale}
        onMouseDown={checkDeselect}
        onTouchStart={checkDeselect}
        ref={stageRef}
        className="bg-noble-surface"
      >
        {/* Layer 1: Background Layer */}
        <Layer id="background-layer">
          <Rect
            x={0}
            y={0}
            width={template.width}
            height={template.height}
            fill={template.background || '#ffffff'}
            name="background-rect"
          />
        </Layer>
        
        {/* Layer 2: Design Layer (Shapes, Images, SVGs) */}
        <Layer id="design-layer">
          {template.elements
            .filter(el => el.type !== 'text')
            .map((el) => (
              <CanvasElementRenderer
                key={el.id}
                element={el}
                isSelected={el.id === selectedElementId}
                onSelect={() => selectElement(el.id)}
                onChange={(newAttrs) => updateElement(el.id, newAttrs)}
              />
            ))}
        </Layer>

        {/* Layer 3: Text Layer (Typography) */}
        <Layer id="text-layer">
          {template.elements
            .filter(el => el.type === 'text')
            .map((el) => (
              <CanvasElementRenderer
                key={el.id}
                element={el}
                isSelected={el.id === selectedElementId}
                onSelect={() => selectElement(el.id)}
                onChange={(newAttrs) => updateElement(el.id, newAttrs)}
              />
            ))}
        </Layer>

        {/* Layer 4: UI/UX Layer (snapping helper guides) */}
        <Layer id="ui-layer">
          {/* Snap guides are projected on top of all designs using bright cyan dashed lines */}
          {guides.map((guide, idx) => (
            <Line
              key={idx}
              points={guide.points}
              stroke="#06b6d4" // Bright Cyan snap color
              strokeWidth={1.5}
              dash={[6, 4]}
            />
          ))}

          {/* Hidden hooks to trigger smart snaps during drag operations */}
          {template.elements.map((el) => (
            <Rect
              key={`hook-${el.id}`}
              x={el.x}
              y={el.y}
              width={el.width || 100}
              height={el.height || 100}
              visible={false}
              draggable
              onDragMove={(e) => handleDragMove(e, el.id)}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
};
