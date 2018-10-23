import { MeshBasicMaterial, Texture } from 'three'

import { missingTexture, missingTextureMaterial } from './missingTexture'
import { MinecraftModel } from './model'

export class MinecraftModelMaterial extends Array<MeshBasicMaterial> {
  private materials: { [path: string]: MeshBasicMaterial } = {}

  constructor ({ textures }: MinecraftModel) {
    super(missingTextureMaterial)

    const texturePaths = [...new Set(Object.values(textures))].sort()

    for (const path of texturePaths) {
      const material = new MeshBasicMaterial({ map: missingTexture })
      this.materials[path] = material

      this.push(material)
    }
  }
}
