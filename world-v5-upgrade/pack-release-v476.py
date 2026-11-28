from pathlib import Path
import gzip,hashlib,json,base64,sys
p=Path(__file__).parent;v=476
raw=(p/f'world-bundle-v{v}.js').read_bytes();data=gzip.compress(raw,9,mtime=0);assert gzip.decompress(data)==raw
if '--remove-bundle' in sys.argv:(p/f'world-bundle-v{v}.js').unlink()
parts=[]
for i,k in enumerate(range(0,len(data),98304)):
 b=data[k:k+98304];n=f'world-pack-v{v}-{i:02}.bin';(p/n).write_bytes(b);parts.append({'file':n,'sha256':hashlib.sha256(b).hexdigest()})
(p/'pack-manifest.json').write_text(json.dumps(parts));f=p/(f'launch-v{v}.html' if (p/f'launch-v{v}.html').exists() else 'launch-v408.html');s=f.read_text();a=s.index('const packedParts=');b=s.index(';\nasync function loadTown',a);s=s[:a]+'const packedParts='+json.dumps(parts,separators=(',',':'))+s[b:];f.write_text(s);print('Pack',v,len(data),len(parts))
