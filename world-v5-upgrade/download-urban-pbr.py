#!/usr/bin/env python3
"""Download CC0 Poly Haven 1K PBR maps for Zerconda. No third-party dependencies."""
import json, urllib.request, pathlib, time
ROOT=pathlib.Path("realistic-assets/urban-pbr")
ASSETS={
 "brick":["red_bricks_04","red_brick_03","brick_wall_001"],
 "concrete":["concrete_floor_01","concrete","concrete_wall_006"],
 "asphalt":["asphalt_02","asphalt_01","asphalt"],
 "sidewalk":["dirty_concrete","concrete_floor_01","paving_stones_02"]
}
HEADERS={"User-Agent":"Zerconda-CC0-asset-builder/1.0"}
def get(url):
 req=urllib.request.Request(url,headers=HEADERS)
 with urllib.request.urlopen(req,timeout=45) as resp:return resp.read()
def choose(asset,key):
 formats=asset.get(key,{})
 for resolution in ("1k","2k"):
  for ext in ("jpg","png"):
   options=formats.get(resolution,{}).get(ext)
   if isinstance(options,dict):
    if options.get('url'):return options['url']
    for val in options.values():
     if isinstance(val,dict) and val.get("url"):return val["url"]
     if isinstance(val,list):
      for item in val:
       if isinstance(item,dict) and item.get("url"):return item["url"]
   if isinstance(options,list):
    for item in options:
     if isinstance(item,dict) and item.get("url"):return item["url"]
 return None
ROOT.mkdir(parents=True,exist_ok=True)
manifest={}
for alias,candidates in ASSETS.items():
 try:
  files=None
  asset_id=None
  for candidate in candidates:
   try:
    proposed=json.loads(get("https://api.polyhaven.com/files/"+candidate))
    if choose(proposed,"Diffuse"):
     files=proposed
     asset_id=candidate
     break
   except Exception as err:
    print("Candidate unavailable:",candidate,repr(err))
  if files is None:
   raise RuntimeError("No valid CC0 texture for "+alias)
  manifest[alias]={"source":asset_id}
  for key,out in (("Diffuse","color"),("nor_gl","normal"),("Rough","roughness")):
   url=choose(files,key)
   if not url:
    print("Unavailable",asset_id,key);continue
   ext=url.split("?")[0].rsplit(".",1)[-1].lower()
   if ext!="jpg":
    print("Unsupported format for browser asset:",url);continue
   dst=ROOT/(alias+"_"+out+"."+ext)
   if not dst.exists():dst.write_bytes(get(url))
   manifest[alias][out]=str(dst)
   print("Saved",dst,dst.stat().st_size)
 except Exception as exc:
  print("ERROR",alias,repr(exc))
(ROOT/"manifest.json").write_text(json.dumps(manifest,indent=2))

missing=[name for name,files in manifest.items() if not all(k in files for k in ("color","normal","roughness"))]
if missing:raise SystemExit("Missing required photo-scanned PBR maps for: "+", ".join(missing))
