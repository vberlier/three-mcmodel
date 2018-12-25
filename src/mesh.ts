import { Mesh, FileLoader } from 'three'

import { MinecraftModelGeometry } from './geometry'
import { AbstractLoader, OnProgress, OnError } from './loader'
import { MinecraftModelMaterial } from './material'
import { MinecraftModel, isMinecraftModel } from './model'
import { MinecraftTexture } from './texture'

type MaterialMapping = { [path: string]: MinecraftModelMaterial }

export class MinecraftModelMesh extends Mesh {
  private materialMapping: MaterialMapping

  constructor (model: MinecraftModel | string | any) {
    if (typeof model === 'string') {
      model = JSON.parse(model)
    }

    if (!isMinecraftModel(model)) {
      throw new Error('Invalid model')
    }

    const geometry = new MinecraftModelGeometry(model)

    const sortedTextures = [...new Set(Object.values(model.textures))].sort()
    const mapping: MaterialMapping = {}
    const materials = sortedTextures
      .map(path => mapping[path] = new MinecraftModelMaterial())

    super(geometry, [new MinecraftModelMaterial(), ...materials])

    this.materialMapping = mapping
  }

  public resolveTextures (resolver: (path: string) => MinecraftTexture) {
    for (const path in this.materialMapping) {
      this.materialMapping[path].map = resolver(path)
    }
  }
}

type OnLoad = (mesh: MinecraftModelMesh) => void

export class MinecraftModelLoader extends AbstractLoader {
  public load (url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError) {
    const loader = new FileLoader(this.manager)
    loader.setPath(this.path)
    loader.setResponseType('json')

    const handleLoad = (model: any) => {
      try {
        const mesh = new MinecraftModelMesh(model)

        if (onLoad) {
          onLoad(mesh)
        }
      } catch (err) {
        if (onError) {
          onError(err)
        }
      }
    }

    loader.load(url, handleLoad, onProgress, onError)
  }
}
