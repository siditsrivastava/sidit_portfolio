import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function Scene() {
  const mount = useRef(null)

  useEffect(() => {
    const host = mount.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 100)
    camera.position.z = 8
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75))
    renderer.setSize(host.clientWidth, host.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    host.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 32, 32),
      new THREE.MeshPhysicalMaterial({
        color: 0x8799b5,
        roughness: 0.38,
        metalness: 0.12,
        transmission: 0.16,
        transparent: true,
        opacity: 0.72,
      }),
    )
    group.add(core)

    const dataShell = new THREE.Mesh(
      new THREE.IcosahedronGeometry(2.18, 3),
      new THREE.MeshBasicMaterial({ color: 0x39413d, wireframe: true, transparent: true, opacity: 0.08 }),
    )
    group.add(dataShell)

    const nodeGroup = new THREE.Group()
    const nodes = []
    const nodePositions = []
    const nodeGeometry = new THREE.SphereGeometry(0.075, 10, 10)
    const primaryNodeMaterial = new THREE.MeshBasicMaterial({ color: 0x607c69 })
    const secondaryNodeMaterial = new THREE.MeshBasicMaterial({ color: 0x8799b5 })
    const nodeCount = 28
    const goldenAngle = Math.PI * (3 - Math.sqrt(5))

    for (let i = 0; i < nodeCount; i += 1) {
      const y = 1 - (i / (nodeCount - 1)) * 2
      const radius = Math.sqrt(1 - y * y)
      const theta = goldenAngle * i
      const position = new THREE.Vector3(Math.cos(theta) * radius * 2.2, y * 2.2, Math.sin(theta) * radius * 2.2)
      const node = new THREE.Mesh(nodeGeometry, i % 4 === 0 ? primaryNodeMaterial : secondaryNodeMaterial)
      node.position.copy(position)
      node.userData.offset = i * 0.42
      nodeGroup.add(node)
      nodes.push(node)
      nodePositions.push(position)
    }
    group.add(nodeGroup)

    const connections = []
    nodePositions.forEach((position, index) => {
      connections.push(0, 0, 0, position.x, position.y, position.z)
      const next = nodePositions[(index + 5) % nodeCount]
      connections.push(position.x, position.y, position.z, next.x, next.y, next.z)
    })
    const connectionGeometry = new THREE.BufferGeometry()
    connectionGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connections, 3))
    const connectionLines = new THREE.LineSegments(connectionGeometry, new THREE.LineBasicMaterial({ color: 0x6f8f7a, transparent: true, opacity: 0.18 }))
    group.add(connectionLines)

    const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x6f8f7a, transparent: true, opacity: 0.38 })
    const rings = [2.75, 3.05, 3.35].map((radius, index) => {
      const ring = new THREE.Mesh(new THREE.TorusGeometry(radius, 0.012, 6, 150), ringMaterial)
      ring.rotation.set(0.65 + index * 0.48, 0.25 + index * 0.55, index * 0.7)
      group.add(ring)
      return ring
    })

    const particlesGeometry = new THREE.BufferGeometry()
    const positions = new Float32Array(360 * 3)
    for (let i = 0; i < positions.length; i += 3) {
      const radius = 3.5 + Math.random() * 3
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i + 2] = radius * Math.cos(phi)
    }
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const particles = new THREE.Points(
      particlesGeometry,
      new THREE.PointsMaterial({ color: 0x39413d, size: 0.022, transparent: true, opacity: 0.38 }),
    )
    scene.add(particles)

    scene.add(new THREE.AmbientLight(0xffffff, 1.5))
    const light = new THREE.DirectionalLight(0xffffff, 3.8)
    light.position.set(4, 5, 6)
    scene.add(light)
    const rim = new THREE.PointLight(0xaab8ae, 5, 12)
    rim.position.set(-4, -2, 3)
    scene.add(rim)

    const pointer = { x: 0, y: 0 }
    const onPointer = (event) => {
      pointer.x = (event.clientX / window.innerWidth - 0.5) * 0.8
      pointer.y = (event.clientY / window.innerHeight - 0.5) * 0.8
    }
    const onResize = () => {
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight)
    }
    window.addEventListener('pointermove', onPointer)
    window.addEventListener('resize', onResize)

    let frame
    const clock = new THREE.Clock()
    const render = () => {
      const elapsed = clock.getElapsedTime()
      group.rotation.y += (pointer.x + elapsed * 0.1 - group.rotation.y) * 0.025
      group.rotation.x += (-pointer.y + elapsed * 0.04 - group.rotation.x) * 0.025
      group.position.y = Math.sin(elapsed * 0.75) * 0.16
      core.scale.setScalar(1 + Math.sin(elapsed * 1.3) * 0.025)
      dataShell.rotation.y = -elapsed * 0.045
      rings.forEach((ring, index) => { ring.rotation.z += 0.0015 + index * 0.0007 })
      nodes.forEach((node) => node.scale.setScalar(0.82 + Math.sin(elapsed * 1.8 + node.userData.offset) * 0.22))
      particles.rotation.y = elapsed * 0.018
      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }
    render()

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onPointer)
      window.removeEventListener('resize', onResize)
      scene.traverse((object) => {
        object.geometry?.dispose()
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
        else object.material?.dispose()
      })
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])

  return <div className="scene" ref={mount} aria-hidden="true" />
}
