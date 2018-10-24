import { MeshBasicMaterial, Texture, NearestFilter } from 'three'

import { missingTexture, missingTextureMaterial } from './missingTexture'
import { MinecraftModel } from './model'

export class MinecraftModelMaterial extends Array<MeshBasicMaterial> {
  private materials: { [path: string]: MeshBasicMaterial } = {}

  constructor ({ textures }: MinecraftModel) {
    super(missingTextureMaterial)
    Object.setPrototypeOf(this, MinecraftModelMaterial.prototype)

    const texturePaths = [...new Set(Object.values(textures))].sort()

    for (const path of texturePaths) {
      const material = new MeshBasicMaterial({
        map: missingTexture,
        transparent: true,
        alphaTest: 0.5
      })

      this.materials[path] = material
      this.push(material)
    }
  }

  public resolveTextures (resolver: (path: string) => Promise<HTMLImageElement>) {
    return Promise.all(Object.keys(this.materials).map(async path => {
      const texture = new Texture(await resolver(path))
      texture.magFilter = NearestFilter
      texture.needsUpdate = true

      this.materials[path].map = texture
      return texture
    }))
  }
}
