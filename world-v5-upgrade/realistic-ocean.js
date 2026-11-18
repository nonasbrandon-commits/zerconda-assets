import * as THREE from 'three';
export function seaHeight(x,z,time=0){const t=THREE.MathUtils.clamp((z-238)/35,0,1),fade=t*t*(3-2*t);return .10+fade*(Math.sin(x*.065+z*.021+time*1.1)*.24+Math.sin(-x*.025+z*.12-time*.83)*.12+Math.sin(x*.16-z*.09+time*1.7)*.055);}
// Continuous world-space swells, sun/sky reflection and irregular advancing shorebreak.
// All fine surface detail is shaded on the GPU; no per-frame geometry/normal rebuild.
export function createRealisticOcean(root){
 const uniforms=THREE.UniformsUtils.merge([THREE.UniformsLib.fog,{time:{value:0}}]);
 const material=new THREE.ShaderMaterial({uniforms,transparent:true,depthWrite:true,side:THREE.DoubleSide,fog:true,
 vertexShader:`#include <common>
 #include <fog_pars_vertex>
 varying vec3 seaPosition;
 float sea(vec2 p){float f=smoothstep(0.,35.,p.y-238.);return .10+f*(sin(p.x*.065+p.y*.021+time*1.1)*.24+sin(-p.x*.025+p.y*.12-time*.83)*.12+sin(p.x*.16-p.y*.09+time*1.7)*.055);}
 uniform float time;
 void main(){vec3 p=position;p.y=sea(p.xz);seaPosition=p;vec4 mvPosition=modelViewMatrix*vec4(p,1.);gl_Position=projectionMatrix*mvPosition;
 #include <fog_vertex>
 }`,
 fragmentShader:`#include <common>
 #include <fog_pars_fragment>
 uniform float time;varying vec3 seaPosition;
 float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
 float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
 float fbm(vec2 p){return noise(p)*.57+noise(p*2.03+8.)*.28+noise(p*4.07+13.)*.15;}
 float ripple(vec2 p){return noise(p)*.75+noise(p*2.03+8.)*.25;}
 void main(){vec2 p=seaPosition.xz;float townCoast=step(-444.,p.x)*(1.-step(570.,p.x));float beachShore=239.+sin(p.x*.027)*1.25+sin(p.x*.091)*.45;float woodedShore=68.+sin(p.x*.002)*6.;float shore=mix(woodedShore,beachShore,townCoast);float d=p.y-shore;float wash=sin(time*.48+p.x*.008)*2.1+sin(p.x*.07+time*.25)*.7;
 if(d< -3.+wash*.5)discard;
 float depth=smoothstep(0.,130.,max(0.,d));float fade=smoothstep(0.,35.,p.y-238.);
 float dx=fade*(cos(p.x*.065+p.y*.021+time*1.1)*.24*.065+cos(-p.x*.025+p.y*.12-time*.83)*.12*(-.025)+cos(p.x*.16-p.y*.09+time*1.7)*.055*.16);
 float dz=fade*(cos(p.x*.065+p.y*.021+time*1.1)*.24*.021+cos(-p.x*.025+p.y*.12-time*.83)*.12*.12+cos(p.x*.16-p.y*.09+time*1.7)*.055*(-.09));
 vec2 flow=vec2(time*.09,-time*.06);float r=ripple(p*.28+flow);dx+=(ripple((p+vec2(.25,0.))*.28+flow)-r)*.60;dz+=(ripple((p+vec2(0.,.25))*.28+flow)-r)*.60;
 vec3 normal=normalize(vec3(-dx,1.,-dz));vec3 view=normalize(cameraPosition-seaPosition);float fresnel=.035+.48*pow(1.-max(0.,dot(view,normal)),4.);
 vec3 shallow=vec3(.055,.45,.40),deep=vec3(.008,.105,.17);float patches=noise(p*.036)*.10;vec3 color=mix(shallow,deep,depth)+patches*vec3(.03,.12,.10)*(1.-depth);
 vec3 reflected=reflect(-view,normal);vec3 sky=mix(vec3(.29,.48,.60),vec3(.15,.31,.50),smoothstep(0.,.8,reflected.y));float clouds=smoothstep(.60,.78,noise(reflected.xz*5.+vec2(time*.006,0.)));sky=mix(sky,vec3(.78,.84,.82),clouds*.15);color=mix(color,sky,fresnel);
 vec3 sun=normalize(vec3(-.37,.72,.48));float spec=pow(max(0.,dot(reflect(-sun,normal),view)),90.);color+=vec3(1.,.94,.79)*spec*.6;
 float foamNoise=fbm(p*.80+vec2(time*.14,-time*.19));float front=exp(-pow((d-wash-1.1)/.85,2.));float retreat=exp(-pow((d+wash*.45-3.8)/1.7,2.))*.45;float lace=1.-smoothstep(.025,.12,abs(foamNoise-.53));float foam=(front+retreat)*(.07+lace*.80);
 float crests=smoothstep(.29,.40,seaPosition.y-.1)*smoothstep(.58,.75,foamNoise)*smoothstep(25.,90.,d)*.24;foam=clamp(foam+crests,0.,.92);color=mix(color,vec3(.81,.89,.84),foam);
 // Soft structural shade beneath the timber pier, rather than a flat blue patch.
 float under=(1.-smoothstep(6.,9.,abs(p.x)))*smoothstep(228.,242.,p.y)*(1.-smoothstep(375.,391.,p.y));color*=1.-under*.30;
 float alpha=smoothstep(-3.+wash*.5,-.25+wash*.5,d);gl_FragColor=vec4(color,alpha);
 #include <tonemapping_fragment>
 #include <colorspace_fragment>
 #include <fog_fragment>
 }`});
 // Declare the time uniform before the helper function in GLSL ES.
 material.vertexShader=material.vertexShader.replace('varying vec3 seaPosition;','varying vec3 seaPosition;uniform float time;').replace('\n uniform float time;','');
 const surfaces=[];
 function patch(x0,x1,z0,z1,nx,nz){const geo=new THREE.PlaneGeometry(x1-x0,z1-z0,nx,nz);geo.rotateX(-Math.PI/2);geo.translate((x0+x1)/2,0,(z0+z1)/2);const mesh=new THREE.Mesh(geo,material);mesh.name='Reflective moving ocean';mesh.frustumCulled=false;root.add(mesh);surfaces.push(mesh);}
 patch(-350,350,234,940,200,200);patch(-1100,-350,234,940,32,200);patch(-1100,-350,940,2440,32,64);patch(350,1100,234,940,32,200);patch(350,1100,940,2440,32,64);patch(-350,350,940,2440,200,64);
 // Low-density outer patches carry the water past the visible horizon.
 patch(-12000,-1100,234,16000,48,64);patch(1100,12000,234,16000,48,64);patch(-1100,1100,2440,16000,64,64);
 // Wrap the calm coastal water around both forested sides; no sky-colored corner gaps.
 patch(-12000,-444,70,234,48,12);patch(570,12000,70,234,48,12);
 // The shoreline is continuous at z=234. No water patches intrude under the beach or golf clubhouse.
 let elapsed=0;return {material,surfaces,get time(){return elapsed},heightAt:(x,z)=>seaHeight(x,z,elapsed),update(dt){elapsed+=dt;uniforms.time.value=elapsed;}};
}
