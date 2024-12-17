import { useEffect, useRef } from 'react';
import p5 from 'p5';

const BackgroundAnimation = () => {
  const containerRef = useRef(null);
  const p5Instance = useRef(null);

  useEffect(() => {
    const sketch = (p) => {
      let strings = [];
      const numStrings = 12;
      const pointsPerString = 50;
      let mouseInfluence = { x: 0, y: 0 };
      let windTime = 0;
      const windSpeed = 0.0005; // Controls overall wind speed
      
      class WaveString {
        constructor(baseY, amplitude) {
          this.points = [];
          this.baseY = baseY;
          this.amplitude = amplitude;
          this.frequency = p.random(0.001, 0.002);
          this.phase = p.random(0, p.TWO_PI);
          this.windOffset = p.random(0, p.TWO_PI); // Unique wind offset for each string
          
          for (let i = 0; i < pointsPerString; i++) {
            this.points.push({
              x: (p.width * i) / (pointsPerString - 1),
              y: baseY,
              originalY: baseY
            });
          }
        }

        update(time, windTime) {
          this.points.forEach((point, i) => {
            // Progressive wave along the string
            const xProgress = i / pointsPerString;
            
            // Combine multiple sine waves for more natural motion
            const wave1 = p.sin(time * this.frequency + this.phase + xProgress * 3) * this.amplitude;
            const wave2 = p.sin(time * this.frequency * 0.5 + this.phase + xProgress * 2) * (this.amplitude * 0.5);
            const wave3 = p.cos(time * this.frequency * 0.3 + this.windOffset + xProgress) * (this.amplitude * 0.3);
            
            // Wind effect
            const windEffect = p.sin(windTime + this.windOffset + xProgress * 2) * (this.amplitude * 0.7);
            
            // Combine all waves
            const totalWave = wave1 + wave2 + wave3 + windEffect;
            
            // Mouse influence calculation
            const dx = point.x - mouseInfluence.x;
            const dy = point.y - mouseInfluence.y;
            const distance = p.sqrt(dx * dx + dy * dy);
            const maxDistance = 200;
            let mouseEffect = 0;
            
            if (distance < maxDistance) {
              mouseEffect = p.map(distance, 0, maxDistance, 20, 0);
              const angle = p.atan2(dy, dx);
              point.y = point.originalY + totalWave + mouseEffect * p.sin(angle);
            } else {
              point.y = point.originalY + totalWave;
            }
          });
        }

        draw() {
          p.noFill();
          p.stroke(255, 255, 255, 200); // White color with 40/255 opacity
          p.beginShape();
          // Add extra control points at the start and end for smoother curves
          const firstPoint = this.points[0];
          const lastPoint = this.points[pointsPerString - 1];
          p.curveVertex(firstPoint.x - 20, firstPoint.y);
          this.points.forEach(point => {
            p.curveVertex(point.x, point.y);
          });
          p.curveVertex(lastPoint.x + 20, lastPoint.y);
          p.endShape();
        }
      }

      p.setup = () => {
        const canvas = p.createCanvas(p.windowWidth, p.windowHeight);
        canvas.position(0, 0);
        canvas.style('z-index', '0');
        canvas.style('position', 'fixed');

        // Initialize strings with varying amplitudes
        const spacing = p.height / (numStrings + 1);
        for (let i = 0; i < numStrings; i++) {
          const baseY = spacing * (i + 1);
          const amplitude = p.random(15, 30); // Slightly reduced amplitude range
          strings.push(new WaveString(baseY, amplitude));
        }
      };

      p.draw = () => {
        p.clear();
        const time = p.millis() * 0.001;
        windTime += windSpeed;
        
        strings.forEach(string => {
          string.update(time, windTime);
          string.draw();
        });
      };

      p.mouseMoved = () => {
        mouseInfluence = { x: p.mouseX, y: p.mouseY };
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        strings = [];
        const spacing = p.height / (numStrings + 1);
        for (let i = 0; i < numStrings; i++) {
          const baseY = spacing * (i + 1);
          const amplitude = p.random(15, 30);
          strings.push(new WaveString(baseY, amplitude));
        }
      };
    };

    p5Instance.current = new p5(sketch, containerRef.current);

    return () => {
      if (p5Instance.current) {
        p5Instance.current.remove();
      }
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none" />;
};

export default BackgroundAnimation;
