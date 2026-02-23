import * as THREE from "three";

export class CubeController {
  /**
   *
   * @param {THREE.Scene} scene
   * @param {Object} options - опции {
   *    position: THREE.Vector3,
   *    defaultColor: THREE.Color,
   *    size: number
   * }
   */

  constructor(scene, options) {
    const { position, defaultColor, size } = options;

    this.scene = scene;

    this.defaultColor = defaultColor;

    this.geometry = new THREE.BoxGeometry(size, size, size);
    this.material = new THREE.MeshStandardMaterial({ color: defaultColor });

    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.mesh.position.copy(position);

    this.scene.add(this.mesh);
  }
}
