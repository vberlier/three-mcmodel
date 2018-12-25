import { MeshBasicMaterial } from 'three'

import { MinecraftTexture } from './texture'

export class MinecraftModelMaterial extends MeshBasicMaterial {
  constructor (map: MinecraftTexture = new MinecraftTexture()) {
    super({
      map: map,
      transparent: true,
      alphaTest: 0.5
    })
  }
}
