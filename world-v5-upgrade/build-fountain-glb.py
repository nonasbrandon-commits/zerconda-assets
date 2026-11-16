#!/usr/bin/env python3
"""Generate a real, walkable GLB fountain plaza for Zerconda.
Uses real mesh geometry and named components for the existing PBR loader.
Y-up, 54m x 54m, fountain basin radius 10.5m.
"""
import math, random, os
import numpy as np
import trimesh
random.seed(19)
scene=trimesh.Scene()
def add(mesh,name,color):
    mesh.visual.vertex_colors=np.tile(np.array([*color,255],dtype=np.uint8),(len(mesh.vertices),1))
    scene.add_geometry(mesh,geom_name=name,node_name=name)
def box(name,pos,size,color):
    m=trimesh.creation.box(extents=size)
    m.apply_translation(pos);add(m,name,color)
def cylinder(name,radius,height,y,color,sections=64,x=0,z=0):
    m=trimesh.creation.cylinder(radius=radius,height=height,sections=sections)
    # trimesh cylinder is Z-up; rotate so Y is up
    m.apply_transform(trimesh.transformations.rotation_matrix(math.pi/2,[1,0,0]))
    m.apply_translation([x,y,z]);add(m,name,color)
def ring(name,outer,inner,height,y,color,segments=96):
    vs=[];faces=[]
    for i in range(segments):
        a=2*math.pi*i/segments
        for r,yy in ((inner,y-height/2),(outer,y-height/2),(inner,y+height/2),(outer,y+height/2)):
            vs.append([math.cos(a)*r,yy,math.sin(a)*r])
    for i in range(segments):
        j=(i+1)%segments;v=i*4;w=j*4
        faces.extend([(v,w,v+2),(w,w+2,v+2),(v+1,v+3,w+1),(w+1,v+3,w+3),
                      (v,v+1,w),(w,v+1,w+1),(v+2,w+2,v+3),(w+2,w+3,v+3)])
    add(trimesh.Trimesh(vertices=vs,faces=faces,process=False),name,color)
stone=(162,155,143);light=(208,197,179);dark=(108,105,103);wood=(104,77,55);bronze=(104,88,65)
box('plaza_substrate',(0,-.12,0),(54,.24,54),dark)
# Physically modeled pavers, batched into 9 large meshes for mobile performance
for bx in range(3):
 for bz in range(3):
    meshes=[]
    for ix in range(bx*18,(bx+1)*18):
     for iz in range(bz*18,(bz+1)*18):
      x=-26.5+ix;z=-26.5+iz
      if math.hypot(x,z)<11.2:continue
      m=trimesh.creation.box(extents=[.965,.09,.965])
      m.apply_translation([x,.045,z]);meshes.append(m)
    if meshes:add(trimesh.util.concatenate(meshes),f'paver_batch_{bx}_{bz}',(151,145,136))
ring('fountain_base_stone',11.2,10.25,.42,.28,dark)
cylinder('outer_basin_stone',10.2,1.2,.85,stone)
cylinder('outer_water',9.65,.04,1.48,(64,133,153))
ring('outer_basin_lip',10.5,9.55,.2,1.48,light)
for i in range(48):
 a=2*math.pi*i/48
 m=trimesh.creation.box(extents=[.78,.48,.15])
 m.apply_transform(trimesh.transformations.rotation_matrix(-a,[0,1,0]))
 m.apply_translation([math.cos(a)*10.25,.92,math.sin(a)*10.25])
 add(m,f'carved_basin_panel_{i}',light if i%2 else stone)
cylinder('pedestal_lower',2.3,2.9,2.95,dark)
cylinder('middle_tier_stone',5.2,.5,4.55,light)
cylinder('middle_tier_water',4.8,.05,4.84,(72,146,164))
cylinder('pedestal_upper',1.15,2.1,5.92,stone)
cylinder('upper_tier_stone',2.75,.4,7.15,light)
cylinder('upper_tier_water',2.4,.05,7.4,(82,156,171))
cylinder('finial',.38,.8,7.88,bronze)
for i in range(8):
 a=i*math.pi/4;x=math.cos(a)*20;z=math.sin(a)*20
 box(f'bench_seat_{i}',(x,.75,z),(3.7,.18,.95),wood)
 box(f'bench_back_{i}',(x,1.26,z),(3.7,1.0,.18),wood)
 for j,dx in enumerate([-1.45,1.45]):
  box(f'bench_leg_{i}_{j}',(x+dx,.38,z),( .17,.75,.72),bronze)
for i in range(12):
 a=i*math.pi/6;x=math.cos(a)*25;z=math.sin(a)*25
 cylinder(f'stone_flower_urn_{i}',.9,1.05,.58,stone,24,x,z)
 for j in range(9):
  t=j*2*math.pi/9;px=x+math.cos(t)*.53;pz=z+math.sin(t)*.53
  cylinder(f'flower_leaf_{i}_{j}',.1,.7,1.3,(50,102,58),8,px,pz)
  m=trimesh.creation.icosphere(subdivisions=1,radius=.18)
  m.apply_translation([px,1.73,pz])
  add(m,f'flower_bloom_{i}_{j}',(188,88,118) if j%2 else (224,181,88))
output='realistic-assets/fountain/zerconda_walkable_fountain_plaza.glb'
os.makedirs(os.path.dirname(output),exist_ok=True)
with open(output,'wb') as f:f.write(scene.export(file_type='glb'))
print('Wrote',output,os.stat(output).st_size,'bytes,',len(scene.geometry),'meshes')
