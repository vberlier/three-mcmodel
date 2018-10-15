import { BufferGeometry, Float32BufferAttribute } from 'three'

import { MinecraftModelElement } from './model'

export class MinecraftModelGeometry extends BufferGeometry {
  constructor (elements: MinecraftModelElement[]) {
    super()

    const vertices = []

    for (const element of elements) {
      const { from: [x1, y1, z1], to: [x2, y2, z2] } = element

      const faces = [
        [x1, y2, z1, x1, y1, z2],
        [x2, y1, z1, x2, y2, z2],
        [x2, y1, z1, x1, y1, z2],
        [x1, y2, z1, x2, y2, z2],
        [x2, y1, z1, x1, y2, z1],
        [x1, y1, z2, x2, y2, z2]
      ]

      for (const [ax, ay, az, bx, by, bz] of faces) {
        vertices.push(bx, ay, az)
        vertices.push(ax, by, az)
        vertices.push(ax, ay, bz)

        vertices.push(ax, by, bz)
        vertices.push(bx, ay, bz)
        vertices.push(bx, by, az)
      }
    }

    this.addAttribute('position', new Float32BufferAttribute(vertices, 3))
  }
}
