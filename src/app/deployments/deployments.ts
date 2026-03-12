import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-deployments',
  standalone: true,
  templateUrl: './deployments.html',
  styleUrls: ['./deployments.css'],
})
export class Deployments implements AfterViewInit {
  @ViewChild('globeContainer', { static: true })
  globeContainer!: ElementRef<HTMLDivElement>;

  is3D = true;

  globeRenderer: THREE.WebGLRenderer | null = null;
  globeCamera: THREE.PerspectiveCamera | null = null;
  globeControls: OrbitControls | null = null;
  globeScene: THREE.Scene | null = null;
  globeObject: any = null;

  // for points on the globe
  locationsArray = [
    { lat: -33.8688, lng: 151.2093 },
    { lat: 40.7128, lng: -74.006 },
    { lat: 35.6895, lng: 139.6917 },
    { lat: -37.8136, lng: 144.9631 },
  ];

  ngAfterViewInit(): void {
    if (typeof window !== 'undefined') {
      this.renderGlobeOrMap();
    }
  }

  async toggleView(is3D: boolean) {
    this.is3D = is3D;
    if (typeof window !== 'undefined') {
      this.renderGlobeOrMap();
    }
  }

  async renderGlobeOrMap() {
    const container = this.globeContainer.nativeElement;
    container.innerHTML = ''; // clear previous globe/map

    // Cleanup previous Three.js globe
    if (this.globeRenderer) {
      this.globeRenderer.dispose();
      this.globeRenderer = null;
      this.globeScene = null;
      this.globeCamera = null;
      this.globeControls = null;
      this.globeObject = null;
    }

    if (this.is3D) {
      // --- 3D Globe (Three-Globe) ---
      const Globe = (await import('three-globe')).default;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        container.clientWidth / container.clientHeight,
        0.1,
        1000,
      );

      const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(container.clientWidth, container.clientHeight);
      container.appendChild(renderer.domElement);

      scene.add(new THREE.AmbientLight(0xffffff, 0.7));
      const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      directionalLight.position.set(5, 3, 5);
      scene.add(directionalLight);

      const globe = new Globe()
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('//unpkg.com/three-globe/example/img/earth-topology.png')
        .pointsData(this.locationsArray)
        .pointAltitude(0.01)
        .pointColor(() => '#ffffff')
        .pointRadius(0.5);

      scene.add(globe);

      camera.position.z = 300;

      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enablePan = false;

      const animate = () => {
        requestAnimationFrame(animate);
        globe.rotation.y += 0.001;
        controls.update();
        renderer.render(scene, camera);
      };
      animate();

      this.globeScene = scene;
      this.globeRenderer = renderer;
      this.globeCamera = camera;
      this.globeControls = controls;
      this.globeObject = globe;
    } else {
      // --- 2D Map as iframe ---
      const iframe = document.createElement('iframe');
      iframe.src = 'https://www.openstreetmap.org/export/embed.html'; // TODO: add the one from kurtis
      iframe.width = '100%';
      iframe.height = '100%';
      iframe.style.border = '0';
      container.appendChild(iframe);
    }
  }
}
