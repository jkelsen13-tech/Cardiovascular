"""Reproducible HRA teaching derivative. Preserve selected topology; omit dense cartilage.
No decimation, invented branches, independent centering, or network access.
"""
import base64, hashlib, json, pathlib, re, struct

ROOT = pathlib.Path(__file__).resolve().parents[2]
raw = base64.b64decode(re.search(r'="([A-Za-z0-9+/=]+)"', (ROOT/'respiratory-study/assets/model-data.js').read_text())[1])
assert hashlib.sha256(raw).hexdigest() == 'a6a81718f4d0974bcbab47c6dc38efc941ad5c7f5f256bf7ff112c710a7fd932'
length = struct.unpack_from('<I', raw, 12)[0]
g = json.loads(raw[20:20+length]); binary = raw[28+length:]
assert all(not any(k in n for k in ['matrix','translation','rotation','scale']) for n in g['nodes'])
def accessor(index):
    a=g['accessors'][index];v=g['bufferViews'][a['bufferView']]
    code={5123:'H',5125:'I',5126:'f'}[a['componentType']];width={'SCALAR':1,'VEC3':3}[a['type']]
    assert 'sparse' not in a
    stride=v.get('byteStride',struct.calcsize('<'+code)*width);offset=v.get('byteOffset',0)+a.get('byteOffset',0)
    return [x for i in range(a['count']) for x in struct.unpack_from('<'+code*width,binary,offset+i*stride)]
parents={c:i for i,n in enumerate(g['nodes']) for c in n.get('children',[])}
lobes={4:'left-upper',11:'left-lower',20:'right-lower',27:'right-middle',31:'right-upper'}
groups={};members={};airway_parts=[]
for i,n in enumerate(g['nodes']):
    if 'mesh' not in n:continue
    mesh=g['meshes'][n['mesh']];name=mesh['name'];ancestor=i;group=None
    while ancestor in parents:
        if ancestor in lobes:group=lobes[ancestor];break
        ancestor=parents[ancestor]
    if not group:
        if not (('bronch' in name and 'cartilage' not in name) or name in ['VH_F_carina','VH_F_trachea']):continue
        group='airways'
    positions,indices=groups.setdefault(group,([],[]));members.setdefault(group,[]).append(name)
    start=len(indices);vertex_start=len(positions)//3
    for p in mesh['primitives']:
        pos=accessor(p['attributes']['POSITION']);idx=accessor(p['indices']);offset=len(positions)//3
        positions.extend(pos);indices.extend(x+offset for x in idx)
    if group=='airways':
        airway_parts.append(dict(sourceName=name,sourceNode=i,indexStart=start,indexCount=len(indices)-start,vertexStart=vertex_start,vertexCount=len(positions)//3-vertex_start,sourceParent=g['nodes'][parents[i]].get('name')))
allpos=[p for key,(pos,_) in groups.items() if key!='airways' for p in zip(*[iter(pos)]*3)]
minimum=[min(p[i] for p in allpos) for i in range(3)];maximum=[max(p[i] for p in allpos) for i in range(3)]
center=[(a+b)/2 for a,b in zip(minimum,maximum)];scale=3.2/(maximum[1]-minimum[1])
data=[]
for name,(pos,idx) in groups.items():
    normalized=[(x-center[i%3])*scale for i,x in enumerate(pos)]
    encode=lambda values,code:base64.b64encode(struct.pack('<'+code*len(values),*values)).decode()
    data.append(dict(id=name,positions=encode(normalized,'f'),indices=encode(idx,'I'),vertices=len(pos)//3,triangles=len(idx)//3))
payload='/* HRA v1.2 derived teaching geometry, CC BY 4.0. See breathing-provenance.json and ATTRIBUTION.md. */\nwindow.RespiratoryTeachingData='+json.dumps(data,separators=(',',':'))+';\n'
(ROOT/'respiratory-study/assets/breathing-data.js').write_text(payload)
for part in airway_parts:
    pos=groups['airways'][0][part['vertexStart']*3:(part['vertexStart']+part['vertexCount'])*3]
    points=list(zip(*[iter(pos)]*3))
    part['center']=[(sum(p[i] for p in points)/len(points)-center[i])*scale for i in range(3)]
    part['bounds']=[[ (f(p[i] for p in points)-center[i])*scale for i in range(3)] for f in [min,max]]
metadata=dict(sourceSha256=hashlib.sha256(raw).hexdigest(),derivedSha256=hashlib.sha256(payload.encode()).hexdigest(),coordinateUnits='Same shared scene normalization as breathing-data.js; physical HRA scale unvalidated',parts=airway_parts)
(ROOT/'respiratory-study/assets/airway-metadata.js').write_text('/* Source mesh identity and index ranges only; no duplicated geometry. CC BY 4.0. */\nwindow.RespiratoryAirwayMetadata='+json.dumps(metadata,separators=(',',':'))+';\n')
manifest=dict(sourceSha256=hashlib.sha256(raw).hexdigest(),derivedSha256=hashlib.sha256(payload.encode()).hexdigest(),license='CC BY 4.0',sourceManifest='model-manifest.json',sharedTransform={'sourceCenter':center,'scale':scale,'units':'illustrative scene units; source convention meters, physical scale unvalidated','axes':'+X patient left, +Y superior; +Z assumed anterior, educator review pending'},members=members,triangles=sum(x['triangles'] for x in data),vertices=sum(x['vertices'] for x in data),omissions='Dense bronchial cartilage, laryngeal cartilages and unassigned hilum geometry omitted. All selected lung segment and named airway triangle topology retained, without simplification. No microscopic geometry inferred.',adaptation='Merge by source lobe ancestry; one shared root normalization. Runtime smooth cage deformation is authored instructional motion, not validated tissue displacement or measured mesh-volume calibration.',registration='Diaphragm and rib context are authored schematic structures fitted in this shared lung frame, not separately centered anatomical models. See model documentation for landmarks, clearance and limitations.')
(ROOT/'respiratory-study/assets/breathing-provenance.json').write_text(json.dumps(manifest,indent=2)+'\n')
print(json.dumps({k:manifest[k]for k in ['triangles','vertices','derivedSha256','sharedTransform']},indent=2))
