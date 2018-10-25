import { MeshBasicMaterial } from 'three'

import { MinecraftTexture, MISSING_TEXTURE } from './texture'

export class MinecraftModelMaterial extends MeshBasicMaterial {
  constructor (map: MinecraftTexture = MISSING_TEXTURE) {
    super({
      map: map,
      transparent: true,
      alphaTest: 0.5
    })
  }
}

export const MISSING_TEXTURE_MATERIAL = new MinecraftModelMaterial(MISSING_TEXTURE)
