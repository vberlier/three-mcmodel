import { Mesh } from 'three'

import { MinecraftModelGeometry } from './geometry'
import { MinecraftModelMaterial } from './material'
import { MinecraftModel, isMinecraftModel } from './model'

export class MinecraftModelMesh extends Mesh {
  constructor (model: MinecraftModel | string | any) {
    if (typeof model === 'string') {
      model = JSON.parse(model)
    }

    if (!isMinecraftModel(model)) {
      throw new Error('Invalid model')
    }

    const geometry = new MinecraftModelGeometry(model)
    const material = new MinecraftModelMaterial(model)

    super(geometry, material)
  }
}
