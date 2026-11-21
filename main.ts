// Sokoban solver — BFS v3. String grid, D=pull-distance (255=dead, >99),
// A doubles as cut-marker (-2), numeric keys, solver inlined into IO loop.
import fs from"node:fs";
for(let k=1;k<=5;k++){
  let mv="";
  try{
    let t=fs.readFileSync("/input/i00"+k+"/level.txt","utf8"),W=t.indexOf("\n");t=t.replace(/\n/g,"#");
    let S=W+1,N=t.length,E=[-S,S,-1,1],Z="udlr",G=[],B=[],P=0;
    for(let i=0;i<N;i++){let c=t[i];if(".*+".includes(c))G.push(i);if("$*".includes(c))B.push(i);if("@+".includes(c))P=i}
    let D=new Uint8Array(N).fill(255),Q=[...G];
    for(let g of G)D[g]=0;
    for(let i=0;i<Q.length;i++){let x=Q[i];for(let d of E){let y=x-d;if(t[y]!="#"&&t[y-d]!="#"&&D[y]==255){D[y]=D[x]+1;Q.push(y)}}}
    let r0=(P/S|0)*S,A=new Int32Array(N).fill(-1),M=[];
    for(let i=r0;i<r0+S;i++)if(t[i]!="#"&&D[i]>99)A[i]=-2;
    for(let s=0;s<N;s++){if(t[s]=="#"||A[s]!=-1)continue;let q=[s];A[s]=M.length;for(let i=0;i<q.length;i++)for(let d of E){let n=q[i]+d;if(t[n]!="#"&&A[n]==-1){A[n]=M.length;q.push(n)}}M.push({b:[],g:[]});}
    for(let b of B)M[A[b]].b.push(b);
    for(let g of G)if(A[g]>=0)M[A[g]].g.push(g);
    let o=new Uint8Array(N),sn=new Int32Array(N),mk=new Int32Array(N),pv=new Int32Array(N),pv2=new Int32Array(N),hw=new Array(N),hw2=new Array(N),T=0;
    let F=(p,a,v,h)=>{let q=[p],l=p;a[p]=++T;v[p]=p;for(let i=0;i<q.length;i++){let x=q[i];if(x<l)l=x;for(let k=0;k<4;k++){let n=x+E[k];if(t[n]!="#"&&!o[n]&&a[n]!=T){a[n]=T;v[n]=x;h[n]=Z[k];q.push(n)}}}return l};
    let Y=(g,b,p)=>{
      if(b.some(x=>D[x]>99))return 0;
      let SB=[b],SP=[p],PA=[-1],SM=[""],IX=new Map();
      for(let x of b)o[x]=1;
      IX.set(b.reduce((a,x)=>a*N+x,F(p,sn,pv,hw)),0);
      for(let x of b)o[x]=0;
      let f=b.every(x=>!D[x])?0:-1;
      for(let h=0;f<0&&h<SB.length;h++){
        let B3=SB[h];
        for(let x of B3)o[x]=1;
        F(SP[h],sn,pv,hw);let hr=T;
        for(let bi=0;bi<B3.length&&f<0;bi++){let bb=B3[bi];
          for(let k=0;k<4;k++){let d=E[k],tt=bb+d;
            if(sn[bb-d]!=hr||t[tt]=="#"||o[tt]||D[tt]>99)continue;
            let w="";for(let j=bb-d;j!=SP[h];j=pv[j])w=hw[j]+w;
            o[bb]=0;o[tt]=1;
            let nb=B3.slice();nb[bi]=tt;nb.sort((x,y)=>x-y);
            let key=nb.reduce((a,x)=>a*N+x,F(bb,mk,pv2,hw2));
            o[tt]=0;o[bb]=1;
            if(IX.has(key))continue;
            if(SB.length>=250000){for(let x of B3)o[x]=0;return 0}
            IX.set(key,SB.length);SB.push(nb);SP.push(bb);PA.push(h);SM.push(w+Z[k]);
            if(nb.every(x=>!D[x])){f=SB.length-1;break}
          }
        }
        for(let x of B3)o[x]=0;
      }
      if(f<0)return 0;
      let m="";for(let s=f;s;s=PA[s])m=SM[s]+m;return[m,SP[f]];
    };
    let pl=P,CB=[...B];
    for(let m of M){
      if(!m.b.length)continue;
      o.fill(0);for(let x of CB)if(!m.b.includes(x))o[x]=1;
      let r=Y(m.g,m.b,pl);
      if(!r)throw 0;
      mv+=r[0];pl=r[1];
      CB=CB.filter(x=>!m.b.includes(x)).concat(m.g);
    }
  }catch{mv=""}
  fs.mkdirSync("/output/i00"+k,{recursive:true});
  fs.writeFileSync("/output/i00"+k+"/solution.txt",mv+"\n");
}
