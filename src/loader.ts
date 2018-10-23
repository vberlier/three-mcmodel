import { FileLoader, LoadingManager, DefaultLoadingManager } from 'three'

import { MinecraftModelMesh } from './mesh'

type OnLoad = (response: MinecraftModelMesh) => void
type OnProgress = (request: ProgressEvent) => void
type OnError = (event: ErrorEvent) => void

export class MinecraftModelLoader {
  manager: LoadingManager

  constructor (manager?: LoadingManager) {
    this.manager = manager !== undefined ? manager : DefaultLoadingManager
  }

  public load (url: string, onLoad?: OnLoad, onProgress?: OnProgress, onError?: OnError) {
    const loader = new FileLoader(this.manager)
    loader.setResponseType('json')

    const handleLoad = (model: any) => {
      const mesh = new MinecraftModelMesh(model)

      if (onLoad) {
        onLoad(mesh)
      }
    }

    loader.load(url, handleLoad, onProgress, onError)
  }
}
