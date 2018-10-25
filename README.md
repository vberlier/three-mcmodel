# three-mcmodel

> A library for working with Minecraft json models using three.js.

**🚧 Work in progress, not stable yet 🚧**

```js
import { MinecraftModelLoader, MinecraftTextureLoader } from 'three-mcmodel'

new MinecraftModelLoader().load('model.json', mesh => {
  const textureLoader = new MinecraftTextureLoader()
  mesh.resolveTextures(path => textureLoader.load(`${path}.png`))
  scene.add(mesh)
})
```
