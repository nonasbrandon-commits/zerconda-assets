#!/usr/bin/env python3
"""Import independently licensed CC0 Kenney buildings as actual .glb assets.
Source: https://github.com/Hidencod/tge-assets (Kenney models, CC0).
Does not alter the running game until the models are reviewed and integrated.
"""
import pathlib, urllib.request, json, struct
BASE="https://raw.githubusercontent.com/Hidencod/tge-assets/main/packs/"
SETS={
 "commercial":[f"building-{chr(c)}" for c in range(ord("a"),ord("n")+1)]+[f"building-skyscraper-{c}" for c in "abcde"],
 "suburban":[f"building-{c}" for c in "abcdefgh"],
 "industrial":[f"building-{c}" for c in "abcdef"],
}
OUT=pathlib.Path("realistic-assets/cc0-city-buildings")
OUT.mkdir(parents=True,exist_ok=True)
manifest=[]
for category,names in SETS.items():
 pack="city-kit-"+category
 for name in names:
  url=f"{BASE}{pack}/{name}.glb"
  try:
   request=urllib.request.Request(url,headers={"User-Agent":"Zerconda-CC0-City-Importer/1.0"})
   with urllib.request.urlopen(request,timeout=45) as response:data=response.read()
   if len(data)<20 or data[:4]!=b"glTF" or struct.unpack_from("<I",data,8)[0]!=len(data):
    raise ValueError("Invalid GLB header or length")
   path=OUT/f"{category}-{name}.glb"
   path.write_bytes(data)
   manifest.append({"file":str(path),"source":url,"license":"CC0","creator":"Kenney","bytes":len(data)})
   print("Imported",path,len(data))
  except Exception as exc:
   print("SKIP",url,repr(exc))
if len(manifest)<12:raise SystemExit("Not enough verified buildings downloaded; no commit")
(OUT/"manifest.json").write_text(json.dumps(manifest,indent=2)+"\n")
print("Imported",len(manifest),"real GLB building models")
