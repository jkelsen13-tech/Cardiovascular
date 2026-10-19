/* Lazy representative distal airway geometry. No source topology is inferred here. */
window.RespiratoryExplorerDetail={
  create(T,parent){
    const root=new T.Group();root.name='instructional-airway-detail';parent.add(root);
    let stage=null,flow=[],dynamic=[],units=[],isolated=false;
    function clear(){while(root.children.length){const o=root.children.pop();o.parent=null;o.traverse(n=>{n.geometry?.dispose();n.material?.dispose();});}flow=[];dynamic=[];units=[];}
    function tube(points,radius,color){const curve=new T.CatmullRomCurve3(points.map(p=>new T.Vector3(...p))),g=new T.TubeGeometry(curve,16,radius,8,false);const mesh=new T.Mesh(g,new T.MeshStandardMaterial({color,roughness:.8,transparent:true,opacity:.84,side:T.DoubleSide}));mesh.userData.isolateKeep=points.every(p=>p[0]>=-.01);root.add(mesh);dynamic.push(mesh);return mesh;}
    function alveolus(x,y,z,r=.23){const mesh=new T.Mesh(new T.SphereGeometry(r,12,8),new T.MeshStandardMaterial({color:0xa0dce3,roughness:.65,transparent:true,opacity:.5,side:T.DoubleSide}));mesh.position.set(x,y,z);mesh.userData.isolateKeep=x>=0;root.add(mesh);units.push(mesh);return mesh;}
    function stream(points){for(let i=0;i<5;i++){const p=new T.Mesh(new T.SphereGeometry(.045,6,4),new T.MeshBasicMaterial({color:0x7beded}));p.userData={points,index:i,isolateKeep:points.every(p=>p[0]>=-.01)};root.add(p);flow.push(p);}}
    function build(next){if(stage===next)return;stage=next;clear();
      // One connected representative subtree, shown at changing teaching magnifications.
      const radius=next==='smaller'?.19:next==='bronchioles'?.15:.11;
      const main=[[0,1.12,0],[0,.5,0],[0,0,0]],left=[[0,0,0],[-.38,-.36,0],[-.72,-.78,.03]],right=[[0,0,0],[.38,-.36,0],[.72,-.78,.03]];
      tube(main,radius,0xf0d2a1);tube(left,radius*.7,0xf0d2a1);tube(right,radius*.7,0xf0d2a1);stream(main);stream(left);stream(right);
      if(['respiratory','ducts','sacs'].includes(next)){
        for(const sign of [-1,1]){
          const end=[sign*.72,-.78,.03];
          for(let j=0;j<5;j++){const a=j/5*Math.PI*2;alveolus(end[0]+.23*Math.cos(a),end[1]-.18+.2*Math.sin(a),end[2]+.12*Math.sin(a));}
          if(next!=='sacs')for(let j=0;j<3;j++)alveolus(sign*(.23+j*.16),-.18-j*.17,.09,.16);
        }
      }
      // Airflow stays in lumens and reaches the shared alveolar region. It never crosses a wall.
      if(['ducts','sacs'].includes(next))stream([[.72,-.78,.03],[.72,-.92,.03],[.72,-1.02,.03]]);
      root.userData.stage=stage;setIsolated(isolated);
    }
    function sync(s){
      const amount=1+Math.min(.14,s.excursion*.18);units.forEach(o=>o.scale.set(amount,amount,amount));
      flow.forEach(p=>{const q=p.userData.points,u=((s.seconds*.38+p.userData.index/5)%1),v=s.flow>=0?u:1-u,n=v*(q.length-1),i=Math.min(q.length-2,Math.floor(n)),f=n-i;p.position.set(...q[i].map((x,k)=>x+(q[i+1][k]-x)*f));p.visible=Math.abs(s.flow)>.001&&(!isolated||p.userData.isolateKeep);});
    }
    function setIsolated(value){isolated=value;root.children.forEach(o=>o.visible=!isolated||o.userData.isolateKeep);}
    return {root,build,sync,setIsolated,dispose:()=>{clear();parent.remove(root);},inspect:()=>({stage,meshes:root.children.length,triangles:root.children.reduce((n,o)=>n+(o.geometry?.index?.count||0)/3,0),bulkFlowParticles:flow.length,diffusionParticles:0})};
  }
};
