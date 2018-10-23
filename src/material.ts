import { MeshBasicMaterial } from 'three'

import { missingTextureMaterial } from './missingTexture'
import { MinecraftModel } from './model'

export class MinecraftModelMaterial extends Array<MeshBasicMaterial> {
  constructor (_model: MinecraftModel) {
    super(missingTextureMaterial)
  }
}
