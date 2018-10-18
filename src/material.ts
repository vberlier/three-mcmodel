import { MeshBasicMaterial } from 'three'

import missingTexture from './missingTexture'
import { MinecraftModel } from './model'

export class MinecraftModelMaterial extends MeshBasicMaterial {
  constructor (_model: MinecraftModel) {
    super({
      map: missingTexture
    })
  }
}
