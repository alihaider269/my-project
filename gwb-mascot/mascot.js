(function(){
[].slice.call(document.querySelectorAll('#gwb-stage .orb')).forEach(function(a){a.setAttribute('href','/collections/redragon')});
var S=window.GWBS,mas=document.getElementById('gwb-mas'),cv=document.getElementById('gwb-cv');
if(!S||!cv)return;
var V='0.160.0',U=['https://cdn.jsdelivr.net/gh/alihaider269/my-project@main/gwb-mascot/Bill_Redragon_Animated.glb','https://raw.githubusercontent.com/alihaider269/my-project/main/gwb-mascot/Bill_Redragon_Animated.glb'];
function cl(v,a,b){return Math.max(a,Math.min(b,v))}
async function get(){for(var i=0;i<U.length;i++){try{var r=await fetch(U[i]);if(r.ok)return await r.arrayBuffer()}catch(e){}}throw new Error('glb')}
(async function(){try{
var T=await import('https://esm.sh/three@'+V);
var G=await import('https://esm.sh/three@'+V+'/examples/jsm/loaders/GLTFLoader.js');
var R=await import('https://esm.sh/three@'+V+'/examples/jsm/environments/RoomEnvironment.js');
var buf=await get();
var gltf=await new Promise(function(ok,no){new G.GLTFLoader().parse(buf,'',ok,no)});
var ren=new T.WebGLRenderer({canvas:cv,alpha:true,antialias:true});ren.setClearColor(0,0);
var sc=new T.Scene();sc.environment=new T.PMREMGenerator(ren).fromScene(new R.RoomEnvironment(),.04).texture;
var l1=new T.DirectionalLight(0xffffff,2.2);l1.position.set(2,4,5);sc.add(l1);
var l2=new T.DirectionalLight(0xffd21f,1.6);l2.position.set(-4,2,-3);sc.add(l2);
var model=gltf.scene;sc.add(model);
var nd={};model.traverse(function(o){nd[o.name]=o});
/* face artwork: upscale the 90x100 texture smoothly and show it unlit with a clean alpha cut-out */
var fm=null;model.traverse(function(o){if(o.isMesh&&o.material&&o.material.map&&o.material.map.image)fm=o});
if(fm){var c=fm.material.map.image;for(var k=0;k<3;k++){var n=document.createElement('canvas');n.width=c.width*2;n.height=c.height*2;var x=n.getContext('2d');x.imageSmoothingEnabled=true;x.imageSmoothingQuality='high';x.drawImage(c,0,0,n.width,n.height);c=n}
var tx=new T.CanvasTexture(c);tx.colorSpace=T.SRGBColorSpace;tx.flipY=false;tx.anisotropy=ren.capabilities.getMaxAnisotropy();tx.generateMipmaps=true;tx.minFilter=T.LinearMipmapLinearFilter;tx.magFilter=T.LinearFilter;
fm.material=new T.MeshBasicMaterial({map:tx,alphaTest:.45,transparent:false,side:T.DoubleSide,toneMapped:false});fm.renderOrder=2}
var box=new T.Box3().setFromObject(model),size=box.getSize(new T.Vector3()),ctr=box.getCenter(new T.Vector3());
var cam=new T.PerspectiveCamera(28,1,.1,100);
function fit(){var w=mas.clientWidth||300,h=mas.clientHeight||330;ren.setPixelRatio(Math.min(window.devicePixelRatio||1,2));ren.setSize(w,h,false);cam.aspect=w/h;var tf=Math.tan(cam.fov*Math.PI/360);var dist=Math.max(size.y*1.06/2/tf,size.x*1.9/2/(tf*cam.aspect))+size.z/2;cam.position.set(0,ctr.y,dist);cam.lookAt(0,ctr.y,0);cam.updateProjectionMatrix()}
fit();if(window.ResizeObserver)new ResizeObserver(fit).observe(mas);
var head=nd.Bill_Head,body=nd.Body,aLn=nd.PointArm_Left,aRn=nd.PointArm_Right,iL=nd.Index_Left,iR=nd.Index_Right;
var restL=iL.rotation.z,restR=iR.rotation.z,by0=body.position.y;
var vP=new T.Vector3();function scr(o){o.getWorldPosition(vP);vP.project(cam);return[S.mL+(vP.x+1)/2*S.mW,S.mT+(1-vP.y)/2*S.mH]}
var yaw=0,pit=0,aL=.15,aR=-.15,fL=restL,fR=restR,vis=true;
if(window.IntersectionObserver)new IntersectionObserver(function(e){vis=e[0].isIntersecting}).observe(mas);
S.on=function(t,tx,ty){if(!vis)return;model.updateMatrixWorld(true);
var hp=scr(head),ny=cl((tx-hp[0])/(S.W*.4),-1,1),np=cl((ty-hp[1])/(S.H*.35),-1,1);
yaw+=(ny-yaw)*.08;pit+=(np-pit)*.08;
head.rotation.set(pit*.22,yaw*.5,0);body.rotation.y=yaw*.12;body.position.y=by0+Math.sin(t*1.7)*.008;
var sw=Math.sin(t*1.3)*.05,wL=.15+sw,wR=-.15-sw,fLw=restL,fRw=restR;
if(tx>=S.W/2){var s=scr(aLn);wL=cl(Math.atan2(tx-s[0],ty-s[1]),.12,2.9);fLw=0}else{var s2=scr(aRn);wR=-cl(Math.atan2(s2[0]-tx,ty-s2[1]),.12,2.9);fRw=0}
aL+=(wL-aL)*.08;aR+=(wR-aR)*.08;fL+=(fLw-fL)*.1;fR+=(fRw-fR)*.1;
aLn.rotation.set(0,0,aL);aRn.rotation.set(0,0,aR);iL.rotation.set(0,0,fL);iR.rotation.set(0,0,fR);
ren.render(sc,cam)};
mas.classList.add('rdy');S.on(0,S.W/2+1,S.H*.8);
}catch(e){if(window.console)console.warn('GWB mascot 3D failed',e)}})();
})();
