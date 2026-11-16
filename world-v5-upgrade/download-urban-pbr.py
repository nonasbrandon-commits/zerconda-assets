#!/usr/bin/env python3
"""Download CC0 Poly Haven 1K PBR maps for Zerconda. No third-party dependencies."""
import json, urllib.request, pathlib, time
ROOT=pathlib.Path("realistic-assets/urban-pbr")
ASSETS={"red_bricks_04":"brick","concrete":"concrete","asphalt_02":"asphalt","dirty_concrete":"sidewalk"}
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
for asset_id,alias in ASSETS.items():
 try:
  files=json.loads(get("https://api.polyhaven.com/files/"+asset_id))
  manifest[alias]={}
  for key,out in (("Diffuse","color"),("nor_gl","normal"),("Rough","roughness")):
   url=choose(files,key)
   if not url:
    print("Unavailable",asset_id,key);continue
   ext=url.split("?")[0].rsplit(".",1)[-1].lower()
   if ext not in ("jpg","png"):continue
   dst=ROOT/(alias+"_"+out+"."+ext)
   if not dst.exists():dst.write_bytes(get(url))
   manifest[alias][out]=str(dst)
   print("Saved",dst,dst.stat().st_size)
 except Exception as exc:
  print("ERROR",asset_id,repr(exc))
(ROOT/"manifest.json").write_text(json.dumps(manifest,indent=2))
