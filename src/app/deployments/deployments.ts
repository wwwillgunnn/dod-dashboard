import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import * as THREE from 'three';
import Globe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

@Component({
  selector: 'app-deployments',
  standalone: true,
  templateUrl: './deployments.html', // or you can use inline template
  styleUrls: ['./deployments.css'],
})
export class Deployments implements AfterViewInit {
  @ViewChild('globeContainer', { static: true })
  globeContainer!: ElementRef<HTMLDivElement>;

  locationsArray = [
    { lat: -33.8688, lng: 151.2093 },
    { lat: 40.7128, lng: -74.006 },
    { lat: 35.6895, lng: 139.6917 },
    { lat: -37.8136, lng: 144.9631 },
  ];

  ngAfterViewInit(): void {
    if (typeof window === 'undefined') return; // skip SSR

    import('three-globe').then(({ default: Globe }) => {
      const container = this.globeContainer.nativeElement;

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
        .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
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
    });
  }
}
