/* Open vessel walls at display crop planes: actual inner/outer source contours,
 * joined across wall only. No added radial thickness and no filled lumens. */
(function(root){'use strict';
 function create(T,scene,sources){const caps=[],V=p=>new T.Vector3(...p);let signature='';
  function update(planes,highlight){const key=planes.map(p=>p.normal.toArray().join(',')+','+p.constant).join(';');if(key!==signature){signature=key;for(const c of caps){scene.remove(c.mesh);c.mesh.geometry.dispose();c.mesh.material.dispose();}caps.length=0;scene.updateMatrixWorld(true);
    for(const source of sources){if(!/artery|aorta|aortic_arch|vein|vena|sinus|trunk/.test(source.name))continue;const local=source.geometry.attributes.position.array,positions=new Float32Array(local.length),point=V([0,0,0]);for(let i=0;i<local.length;i+=3){point.fromArray(local,i).applyMatrix4(source.matrixWorld);point.toArray(positions,i);}const indices=source.geometry.index?.array||Array.from({length:local.length/3},(_,i)=>i);
     for(let j=0;j<planes.length;j++){const plane=planes[j],normal=plane.normal.toArray(),result=root.HeartV3TissueSections.section(positions,indices,normal,plane.constant);result.indices=result.regions.filter(r=>r.holes>0).flatMap(r=>result.indices.slice(r.triangleStart*3,(r.triangleStart+r.triangleCount)*3));result.regions=result.regions.filter(r=>r.holes>0);if(!result.indices.length)continue;const g=new T.SphereGeometry(1,3,2);g.deleteAttribute('normal');g.deleteAttribute('uv');g.setAttribute('position',new(g.attributes.position.constructor)(new Float32Array(result.positions),3));g.setIndex(result.indices);g.computeVertexNormals();g.computeBoundingSphere();const material=new T.MeshStandardMaterial({color:0xe7bc58,side:T.DoubleSide,roughness:.65,clippingPlanes:planes.filter((_,k)=>k!==j),polygonOffset:true,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),mesh=new T.Mesh(g,material);mesh.name=source.name+'__wall_rim';scene.add(mesh);caps.push({mesh,source,report:{source:source.name,plane:j,triangles:result.indices.length/3,holes:result.regions.reduce((s,r)=>s+r.holes,0),openChains:result.openChains}});}
    }
   }
   for(const c of caps){c.mesh.visible=c.source.visible;c.mesh.material.color.set(highlight?0xe7bc58:c.source.material.color);c.mesh.material.opacity=c.source.material.opacity;c.mesh.material.transparent=c.source.material.transparent;c.mesh.material.depthWrite=c.source.material.depthWrite;}
  }
  return {update,meshes:()=>caps.map(c=>c.mesh),inspect:()=>({scope:'Static source vessel walls at actual display crop planes; source myocardial motion unchanged',wallCaps:caps.map(c=>({...c.report,visible:c.mesh.visible})),lumensFilled:false,thicknessInflation:false}),dispose(){caps.forEach(c=>{scene.remove(c.mesh);c.mesh.geometry.dispose();c.mesh.material.dispose();});caps.length=0;}};
 }
 root.EcgWallRims={create};
})(window);
