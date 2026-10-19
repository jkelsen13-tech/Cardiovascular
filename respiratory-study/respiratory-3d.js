/* Optional static atlas. Breathing and microscopy remain explicit SVG schematics. */
window.RespiratoryAtlas = {
  async mount(host, onFailure, onSelect) {
    const T = window.EcgThree;
    let disposed = false,
      yaw = 0,
      pitch = 0,
      distance = 6,
      touch = false;
    const scene = new T.Scene(),
      camera = new T.PerspectiveCamera(38, 1, 0.01, 100),
      renderer = new T.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
      });
    renderer.setPixelRatio(1);
    renderer.setClearColor(0x141a24);
    host.innerHTML =
      '<div class="sim-controls"><button data-view="front">Reset source front</button><button data-view="back">Source back</button><button data-view="left">Left oblique</button><button data-view="right">Right oblique</button><button data-zoom="-0.5">Zoom +</button><button data-zoom="0.5">Zoom −</button><button data-touch>Enable touch rotation / pinch</button><label>Render detail <select data-render-detail><option value="1">Balanced (1× pixels)</option><option value="1.5">Sharper (up to 1.5× pixels)</option></select></label><label>Structure <select data-mesh><option value="">All reference structures</option></select></label><label>Context <select data-context><option value="1">Opaque</option><option value="0.22">Ghost</option><option value="0">Hidden</option></select></label><button data-isolate>Isolate selected</button><button data-restore>Restore all</button></div><p>Reference anatomy. Source +X is patient left; +Y is superior. Front/back surface orientation and detailed branches await educator review. No breathing deformation is applied.</p><div class="sim-atlas-canvas"></div><p data-atlas-status role="status">Loading local reference anatomy…</p>';
    const box = host.querySelector(".sim-atlas-canvas"),
      canvas = renderer.domElement;
    box.append(canvas);
    canvas.tabIndex = 0;
    canvas.style.touchAction = "pan-y";
    canvas.setAttribute(
      "aria-label",
      "Respiratory reference atlas. Arrow keys rotate, plus and minus zoom.",
    );
    scene.add(new T.HemisphereLight(0xffffff, 0x53647a, 3));
    const light = new T.DirectionalLight(0xffffff, 3);
    light.position.set(3, 5, 6);
    scene.add(light);
    host.querySelector("[data-render-detail]").onchange = (e) => {
      renderer.setPixelRatio(Math.min(devicePixelRatio || 1, +e.target.value));
      resize();
    };
    let model,
      selected = "",
      isolate = false,
      contextOpacity = 1,
      groupSelection = null;
    const meshes = [];
    const structureMap = {
      larynx: [
        "thyroid_cartilage",
        "cricoid_cartilage",
        "epiglotic_cartilage",
        "arytenoid_cartilage",
        "corniculate_cartilage",
      ],
      trachea: ["VH_F_trachea"],
      rightbronchus: ["right_main_lobar_bronchus"],
      leftbronchus: ["lungs_left_main_bronchus"],
      lobar: ["lobar_bronch", "tertiary_bronch"],
      rightlung: ["VH_F_lungs_R"],
      leftlung: ["VH_F_left_lungs_L"],
    };
    function groupMatches(m, terms) {
      let o = m;
      while (o) {
        if (terms.some((n) => o.name.includes(n))) return true;
        o = o.parent;
      }
      return false;
    }
    function selectStructure(id) {
      const terms = structureMap[id];
      groupSelection = terms || null;
      if (!terms) isolate = false;
      selected = "";
      selectEl.value = "";
      host.querySelector("[data-atlas-status]").textContent = terms
        ? "Reference selection highlighted; exact anatomy review pending."
        : "This selection is a supplementary schematic; the reference context is restored. See the teaching card.";
      select();
    }

    function draw() {
      if (disposed || !model) return;
      camera.position.set(
        Math.sin(yaw) * Math.cos(pitch) * distance,
        Math.sin(pitch) * distance,
        Math.cos(yaw) * Math.cos(pitch) * distance,
      );
      camera.lookAt(0, 0, 0);
      host.dataset.cameraDistance = String(distance);
      renderer.render(scene, camera);
      host.dataset.triangles = renderer.info.render.triangles;
      host.dataset.drawCalls = renderer.info.render.calls;
    }
    function resize() {
      const w = box.clientWidth;
      renderer.setSize(w, Math.min(460, Math.max(300, w * 0.65)), false);
      camera.aspect = w / Math.min(460, Math.max(300, w * 0.65));
      camera.updateProjectionMatrix();
      draw();
    }
    function select() {
      meshes.forEach((m) => {
        const active = groupSelection
          ? groupMatches(m, groupSelection)
          : m.name === selected;
        m.visible = !isolate || active;
        m.material.emissive.set(active ? 0xffc857 : 0);
        m.material.emissiveIntensity = 0.6;
        const hasSelection = !!selected || !!groupSelection?.length;
        host.dataset.selectedMeshes = String(
          meshes.filter((m) =>
            groupSelection
              ? groupMatches(m, groupSelection)
              : m.name === selected,
          ).length,
        );
        m.material.opacity = hasSelection && !active ? contextOpacity : 1;
        m.material.transparent = hasSelection && !active && contextOpacity < 1;
      });
      draw();
    }
    host.querySelector("[data-context]").onchange = (e) => {
      contextOpacity = +e.target.value;
      select();
    };
    const selectEl = host.querySelector("[data-mesh]");
    selectEl.onchange = () => {
      selected = selectEl.value;
      groupSelection = null;
      select();
      const m = meshes.find((m) => m.name === selected);
      if (m) {
        const id = Object.keys(structureMap).find((id) =>
          groupMatches(m, structureMap[id]),
        );
        if (id) onSelect?.(id);
      }
    };
    host.querySelector("[data-isolate]").onclick = () => {
      if (selected || groupSelection?.length) isolate = true;
      select();
    };
    host.querySelector("[data-restore]").onclick = () => {
      selected = "";
      groupSelection = null;
      selectEl.value = "";
      isolate = false;
      select();
    };
    host.querySelectorAll("[data-view]").forEach(
      (b) =>
        (b.onclick = () => {
          yaw = {
            front: 0,
            back: Math.PI,
            left: Math.PI / 4,
            right: -Math.PI / 4,
          }[b.dataset.view];
          pitch = 0;
          draw();
        }),
    );
    host.querySelectorAll("[data-zoom]").forEach(
      (b) =>
        (b.onclick = () => {
          distance = Math.max(3.5, Math.min(10, distance + +b.dataset.zoom));
          draw();
        }),
    );
    host.querySelector("[data-touch]").onclick = (e) => {
      touch = !touch;
      clearPointers();
      canvas.style.touchAction = touch ? "none" : "pan-y";
      e.target.textContent = touch
        ? "Unlock page scrolling"
        : "Enable touch rotation";
      e.target.setAttribute("aria-pressed", touch);
    };
    // Track each active pointer independently. Ending a pinch must not become a jump in orbit.
    const pointers = new Map();
    let pinchDistance = null;
    function clearPointers() {
      pointers.clear();
      pinchDistance = null;
    }
    canvas.onpointerdown = (e) => {
      if (e.pointerType === "touch" && !touch) return;
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      pinchDistance = null;
      canvas.setPointerCapture(e.pointerId);
    };
    canvas.onpointermove = (e) => {
      if (!pointers.has(e.pointerId)) return;
      const previous = pointers.get(e.pointerId);
      pointers.set(e.pointerId, [e.clientX, e.clientY]);
      if (pointers.size === 1) {
        yaw -= (e.clientX - previous[0]) * 0.008;
        pitch = Math.max(
          -1,
          Math.min(1, pitch + (e.clientY - previous[1]) * 0.008),
        );
      } else {
        const [a, b] = [...pointers.values()];
        const separation = Math.hypot(a[0] - b[0], a[1] - b[1]);
        if (pinchDistance !== null && separation > 0)
          distance = Math.max(
            3.5,
            Math.min(10, (distance * pinchDistance) / separation),
          );
        pinchDistance = separation;
      }
      draw();
    };
    canvas.onpointerup =
      canvas.onpointercancel =
      canvas.onlostpointercapture =
        (e) => {
          pointers.delete(e.pointerId);
          pinchDistance = null;
        };
    canvas.onkeydown = (e) => {
      if (
        ![
          "ArrowLeft",
          "ArrowRight",
          "ArrowUp",
          "ArrowDown",
          "+",
          "-",
          "Home",
        ].includes(e.key)
      )
        return;
      e.preventDefault();
      if (e.key === "ArrowLeft") yaw -= 0.15;
      if (e.key === "ArrowRight") yaw += 0.15;
      if (e.key === "ArrowUp") pitch = Math.min(1, pitch + 0.15);
      if (e.key === "ArrowDown") pitch = Math.max(-1, pitch - 0.15);
      if (e.key === "+") distance = Math.max(3.5, distance - 0.3);
      if (e.key === "-") distance = Math.min(10, distance + 0.3);
      if (e.key === "Home") {
        yaw = pitch = 0;
        distance = 6;
      }
      draw();
    };
    function dispose() {
      if (disposed) return;
      disposed = true;
      observer.disconnect();
      scene.traverse((o) => {
        o.geometry?.dispose();
        o.material?.dispose();
      });
      renderer.dispose();
      renderer.forceContextLoss();
      host.replaceChildren();
    }
    canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      if (!disposed) {
        dispose();
        onFailure(
          "Reference graphics became unavailable. All schematic lessons remain available.",
        );
      }
    });
    const observer = new ResizeObserver(resize);
    observer.observe(box);
    try {
      const raw = atob(window.RespiratoryModelData),
        bytes = Uint8Array.from(raw, (c) => c.charCodeAt(0));
      model = await new Promise((ok, no) =>
        new T.GLTFLoader().parse(bytes.buffer, "", (g) => ok(g.scene), no),
      );
      if (disposed) {
        model.traverse((o) => {
          o.geometry?.dispose();
          o.material?.dispose();
        });
        return { dispose, selectStructure, refreshLayout: resize };
      }
      const bounds = new T.Box3().setFromObject(model),
        center = bounds.getCenter(new T.Vector3()),
        size = bounds.getSize(new T.Vector3()),
        scale = 3 / size.y;
      model.scale.setScalar(scale);
      model.position.copy(center.multiplyScalar(-scale));
      scene.add(model);
      model.traverse((o) => {
        if (!o.isMesh) return;
        meshes.push(o);
        o.material?.dispose();
        o.material = new T.MeshStandardMaterial({
          color: /bronch|trachea|carina/.test(o.name) ? 0xffdf9b : 0xc9858c,
          roughness: 0.8,
          side: T.DoubleSide,
          forceSinglePass: true,
        });
        const option = document.createElement("option");
        option.value = o.name;
        option.textContent = o.name.replace("VH_F_", "").replaceAll("_", " ");
        selectEl.append(option);
      });
      host.dataset.ready = "true";
      host.dataset.meshes = meshes.length;
      host.querySelector("[data-atlas-status]").textContent =
        "65 reference meshes loaded. Missing microscopic anatomy is shown only in the labeled schematics.";
      resize();
      return { dispose, selectStructure, refreshLayout: resize };
    } catch (e) {
      dispose();
      throw e;
    }
  },
};
