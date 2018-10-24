import {
  Scene, PerspectiveCamera, WebGLRenderer, TextureLoader, NearestFilter,
  CubeGeometry, EdgesGeometry, LineBasicMaterial, LineSegments
} from 'three'
import OrbitControls from 'three-orbitcontrols'
import { MinecraftModelLoader } from 'three-mcmodel'

// Create the scene and the camera
const scene = new Scene()
const camera = new PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 1000)
camera.position.set(16, 16, 64)

// Create a mesh from the json model and add it to the scene
const loader = new MinecraftModelLoader()
loader.load(require('./assets/cake.json'), async mesh => {
  const loader = new TextureLoader()

  await mesh.material.resolveTextures(async path => {
    const texture = await new Promise(resolve => {
      loader.load(require('./assets/' + path.substring(6) + '.png'), resolve)
    })

    texture.magFilter = NearestFilter
    return texture
  })

  scene.add(mesh)
})

// Create cube indicator
const wireframe = new LineSegments(
  new EdgesGeometry(new CubeGeometry(16, 16, 16)),
  new LineBasicMaterial({ color: 0x1111cc, linewidth: 3 })
)
scene.add(wireframe)

// Create the renderer and append it to the document body
const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// Create the controls
const controls = new OrbitControls(camera, renderer.domElement)
controls.enableKeys = false
controls.screenSpacePanning = true

// Update the dimensions of the viewport when the window gets resized
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
})

// Start animation
function animate () {
  requestAnimationFrame(animate)
  controls.update()
  renderer.render(scene, camera)
}
animate()
