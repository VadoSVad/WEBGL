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

  /**
   * @param {THREE.Color} color
   */
  setColor(color) {
    this.material.color.set(color);
  }

  /**
   * @param {Object} options - {
   *   position: THREE.Vector3,
   *   color: THREE.Color,
   *   duration: seconds
   * }
   */
  getAnimation(options) {
    const { position, color, duration } = options;

    if (!position && color === undefined) return;

    this._anim = {
      fromPos: this.mesh.position.clone(),
      toPos: position.clone(),
      fromColor: this.material.color.clone(),
      toColor: new THREE.Color(color),
      duration: duration,
      elapsed: 0
    };
  }

  /**
   * @param {number} delta
   */
  updateDelta(delta) {
    this.delta = delta;

    if (!this._anim) return;

    this._anim.elapsed += delta;
    const time = Math.min(1, this._anim.elapsed / this._anim.duration);

    if (this._anim.fromPos && this._anim.toPos) {
      this.mesh.position.lerpVectors(this._anim.fromPos, this._anim.toPos, time);
    }

    if (this._anim.fromColor && this._anim.toColor) {
      this.material.color
        .copy(this._anim.fromColor)
        .lerp(this._anim.toColor, time);
    }
  }
}
