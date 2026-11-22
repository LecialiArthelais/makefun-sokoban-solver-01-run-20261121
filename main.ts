// Sokoban solver v9 (from scratch, path B) — minified. No D pruning; string state keys.
import fs from "node:fs";
let t,s,n,E,o,U,H,G,B,P;
let Z="udlr";
let F=p=>{U.fill(-1);U[p]=-2;let q=[p],L=p;
for(let i=0;i<q.length;i++){let x=q[i];if(x<L)L=x;
for(let j=0;j<4;j++){let y=x+E[j];
if(t[y]!="#"&&!o[y]&&!~U[y]){U[y]=x;H[y]=Z[j];q.push(y)}}}
return L};
let R=(rb,rg)=>{
o.fill(0);for(let x of B)o[x]=!rb.includes(x);
let bs=[[rb,P,""]],c=new Set();
for(let q=0;q<bs.length;q++){
let[b,p,m]=bs[q];
for(let x of b)o[x]=1;let L=F(p);for(let x of b)o[x]=0;
let k=b.reduce((a,x)=>a*n+x,L);
if(c.has(k))continue;c.add(k);
for(let x of b)for(let j=4;j--;){let y=x+E[j],z=x-E[j];
if(t[y]=="#"||o[y]||b.includes(y)||!~U[z])continue;
let w="";while(z!=p)w=H[z]+w,z=U[z];
let d=b.filter(u=>u-x);d.push(y);d.sort((a,b)=>a-b);
let e=m+w+Z[j];
if(d.every(u=>rg.includes(u)))return[e,x];
bs.push([d,x,e])}
}
return null};
let S=g=>{
t=g;let W=t.indexOf("\n");t=t.replace(/\n/g,"#");
s=W+1;n=t.length;E=[-s,s,-1,1];
G=[];B=[];P=0;
for(let i=0;i<n;i++){let c=t[i];".*+".includes(c)&&G.push(i),"$*".includes(c)&&B.push(i),"@+".includes(c)&&(P=i)}
U=new Int32Array(n);H=new Array(n);o=new Uint8Array(n);
let r=P-P%s,M=[],f=[];
o.fill(1,r,r+s);
for(let b of B){if(f[b])continue;F(b);let rb=[],rg=[];
for(let x of B)if(~U[x]){rb.push(x);f[x]=1}
for(let x of G)if(~U[x])rg.push(x);
M.push([rb,rg])}
let m="";
for(let[rb,rg]of M){
if(!rb.length)continue;
let u=R(rb,rg);
if(!u)return"";
m+=u[0];P=u[1];
B=B.filter(x=>!rb.includes(x)).concat(rg)}
return m};
let e=process.env,I=e.MAKEFUN_INPUT_DIR||"/input",O=e.MAKEFUN_OUTPUT_DIR||"/output";
for(let k=1;k<6;k++){let d="/i00"+k,m="";try{m=S(fs.readFileSync(I+d+"/level.txt","utf8"))}catch{}fs.mkdirSync(O+d,{recursive:!0});fs.writeFileSync(O+d+"/solution.txt",m+"\n")}
