precision highp float;
uniform vec2 R; uniform float S; uniform float SD;
float h1(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}
float vn(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);
 return mix(mix(h1(i),h1(i+vec2(1.,0.)),f.x),mix(h1(i+vec2(0.,1.)),h1(i+vec2(1.,1.)),f.x),f.y);}
float fbm(vec2 p){float s=0.,a=.5;for(int i=0;i<6;i++){s+=a*vn(p);p=mat2(1.6,1.2,-1.2,1.6)*p+vec2(SD,7.3);a*=.5;}return s/.984;}
float fbm3(vec2 p){float s=0.,a=.5;for(int i=0;i<3;i++){s+=a*vn(p);p=mat2(1.6,1.2,-1.2,1.6)*p+vec2(3.1,SD);a*=.5;}return s/.875;}
float ss(float a,float b,float x){return smoothstep(a,b,x);}
float inv(float a,float b,float x){return 1.-smoothstep(a,b,x);}
vec3 hue(float h){return clamp(vec3(abs(h*6.-3.)-1.,2.-abs(h*6.-2.),2.-abs(h*6.-4.)),0.,1.);}
vec3 C(float r,float g,float b){return vec3(r,g,b)/255.;}
vec3 grad4(float y,vec3 a,vec3 b,vec3 c,vec3 d,float y1,float y2,float y3){
 vec3 k=mix(a,b,ss(0.,y1,y));k=mix(k,c,ss(y1,y2,y));return mix(k,d,ss(y2,y3,y));}
vec3 glow(vec3 col,vec2 p,vec2 c,vec3 g,float k1,float a1,float k2,float a2){float d=length(p-c);return col+g*(exp(-d*k1)*a1+exp(-d*k2)*a2);}
vec3 rainbow(vec3 col,vec2 p,vec2 c,float r,float w,float k,float flip){
 float d=length(p-c),t=(d-(r-w))/(2.*w);
 float m=ss(0.,.2,t)*inv(.8,1.,t);
 float h=mix(1.-t,t,flip);
 col+=hue(clamp(h,0.,1.)*.78)*m*k;
 if(flip<.5)col+=vec3(k*.1)*ss(r-w-.22,r-w,d)*step(d,r-w);
 return col;}
vec3 stars(vec3 col,vec2 p,float dens,float k){
 vec2 g=p*R.x/2.2,i=floor(g),f=fract(g)-.5;float r=h1(i+SD*.1);
 float b=step(1.-dens,r)*inv(0.,.5,length(f))*pow(h1(i+3.7),2.);
 vec2 g2=p*28.,i2=floor(g2),f2=fract(g2)-.5;float r2=h1(i2+9.1+SD);
 float big=step(.965,r2);vec2 o=f2-(vec2(h1(i2),h1(i2+1.))-.5)*.6;float L=length(o);
 float spark=big*(exp(-L*60.)+ (exp(-abs(o.x)*300.)+exp(-abs(o.y)*300.))*exp(-L*14.)*.5);
 return col+vec3(1.,.96,.92)*(b*1.2+spark*1.3)*k;}
vec4 cloud(vec2 p,float base,float amp,float fq,float sd,vec2 sun,vec3 lit,vec3 shd,float cx,float wid){
 float x=p.x*fq+sd*13.;
 float env=wid>0.?exp(-pow((p.x-cx)/wid,2.)):1.;
 float top=base+amp*env*(.6*fbm3(vec2(x,sd))+.4*pow(vn(vec2(x*2.7,sd*3.)),2.))+.018*(fbm3(p*vec2(26.,34.)+sd)-.5);
 float dep=top-p.y;if(dep<0.)return vec4(0.);
 vec2 q=p*vec2(fq*3.,fq*4.)+sd*5.;
 float n=fbm(q);vec2 sdir=normalize(sun-p+1e-4);float n2=fbm(q+sdir*.3);
 float rim=exp(-dep*16.*fq);
 float l=clamp(.18+rim*.75+(n-n2)*2.6+(n-.5)*.55,0.,1.);
 l=mix(l,floor(l*5.+.5)/5.,.3);
 vec3 c=mix(shd,lit,l);
 return vec4(c,ss(0.,.004+.02*n,dep));}
vec3 lay(vec3 col,vec4 L,vec3 haze,float hz){return mix(col,mix(L.rgb,haze,hz),L.a);}
vec3 planet(vec3 col,vec2 p,vec2 c,float r,vec2 ld,vec3 c1,vec3 c2,vec3 atm,float tilt){
 vec2 q=p-c;float ca=cos(tilt),sa=sin(tilt);vec2 rq=vec2(ca*q.x+sa*q.y,-sa*q.x+ca*q.y);
 float e=length(rq*vec2(1.,4.));
 float rm=ss(1.32*r,1.38*r,e)*inv(2.05*r,2.15*r,e)*(.55+.45*sin(e/r*55.))*(.7+.3*sin(e/r*13.));
 vec3 rc=mix(c1,atm,.55)*1.15;float d=length(q);
 if(rq.y>0.)col=mix(col,rc,rm*.7);
 col+=atm*exp(-max(d-r,0.)*45.)*.45;
 if(d<r){vec2 n2=q/r;float z=sqrt(max(0.,1.-dot(n2,n2)));vec3 N=vec3(n2,z);
  float lam=clamp(dot(N,normalize(vec3(ld,.45))),0.,1.);
  float s=fbm(vec2(rq.y/r*5.+fbm3(rq/r*3.)*1.8,rq.x/r*1.2));
  vec3 pc=mix(c1,c2,ss(.3,.75,s))*(.08+1.15*lam)+atm*pow(1.-z,2.5)*.9*(.3+lam);
  col=mix(col,pc,inv(r-.002,r,d));}
 if(rq.y<=0.)col=mix(col,rc*(d<r?1.:1.),rm*.85);
 return col;}
vec3 rays(vec3 col,vec2 p,vec2 c,vec3 rc,float k){vec2 q=p-c;float d=length(q);vec2 u=q/(d+1e-5);
 float r=pow(vn(u*7.+SD),3.)*.8+pow(vn(u*19.+SD+4.),4.)*.7;
 return col+rc*r*k*exp(-d*1.6)*ss(.02,.12,d);}
vec3 aurora(vec3 col,vec2 p,float y0,vec3 a,vec3 b,vec3 cc,float k){
 for(int i=0;i<3;i++){float fi=float(i);
  float yc=y0+fi*.08+.13*(fbm3(vec2(p.x*1.3+fi*3.,fi))-.5)+.04*sin(p.x*6.+fi*2.);
  float up=p.y-yc;
  float b0=up>0.?exp(-up*(2.4+fi))*(.25+pow(fbm3(vec2(p.x*42.+fi*9.,p.y*.7)),2.)*1.5):exp(up*28.);
  vec3 ac=mix(a,b,clamp(up*3.,0.,1.));ac=mix(ac,cc,clamp(up*3.-1.,0.,1.));
  col+=ac*b0*k*(1.-fi*.25);}
 return col;}
vec4 dune(vec2 p,float base,float amp,float fq,float sd,vec3 lit,vec3 shd){
 float x=p.x*fq+sd*7.,e=.004*fq;
 float t0=base+amp*(1.-abs(fbm3(vec2(x,sd))*2.-1.));
 float t1=base+amp*(1.-abs(fbm3(vec2(x+e,sd))*2.-1.));
 float dep=t0-p.y;if(dep<0.)return vec4(0.);
 float sl=(t1-t0)/e;
 vec3 c=mix(shd,lit,ss(-.4,.4,-sl));
 c=mix(c,shd*.75,ss(0.,.25,dep)*.6);
 c+=lit*.06*sin(p.y*900./fq*.4+fbm3(p*18.+sd)*10.)*inv(0.,.1,dep);
 c+=lit*.5*exp(-dep*220.);
 return vec4(c,ss(0.,.002,dep));}
// ---------------- scenes ----------------
vec3 s0(vec2 p){ // cover: planet rising over a sea of clouds, rainbow arc
 vec2 sun=vec2(.5,.47);
 vec3 col=grad4(p.y,C(255.,214.,140.),C(255.,140.,90.),C(196.,58.,118.),C(32.,18.,70.),.5,.78,1.18);
 col=stars(col,p,.006,ss(.85,1.15,p.y));
 col=mix(col,C(120.,70.,160.),.25*fbm3(p*vec2(2.,4.))*ss(.7,1.1,p.y));
 col=planet(col,p,vec2(.74,.72),.13,vec2(-.6,-.8),C(110.,190.,210.),C(180.,140.,230.),C(150.,230.,255.),.35);
 col=glow(col,p,sun,C(255.,226.,170.),9.,.6,40.,1.2);
 col=rays(col,p,sun,C(255.,210.,170.),.35);
 col=rainbow(col,p,vec2(.5,.12),.56,.038,.5,0.);
 vec3 L1=C(255.,205.,160.),S1=C(150.,70.,120.);
 col=lay(col,cloud(p,.46,.03,2.4,1.,sun,L1,S1,0.,0.),C(255.,190.,150.),.55);
 col=lay(col,cloud(p,.39,.06,1.7,2.,sun,L1,S1,0.,0.),C(240.,150.,150.),.35);
 col=lay(col,cloud(p,.28,.09,1.25,3.,sun,C(255.,190.,170.),C(120.,60.,120.),0.,0.),C(200.,110.,150.),.15);
 col=lay(col,cloud(p,.12,.13,.9,4.,sun,C(250.,170.,180.),C(80.,40.,100.),0.,0.),C(0.,0.,0.),0.);
 return col;}
vec3 s1(vec2 p){ // rainbow beam falling through a cloud canyon
 vec3 col=grad4(p.y,C(90.,200.,200.),C(60.,120.,190.),C(52.,46.,140.),C(20.,14.,50.),.35,.75,1.2);
 col=stars(col,p,.008,ss(.7,1.1,p.y));
 float bw=.025+.05*ss(1.25,.3,p.y);float bx=(p.x-.5+.03*(p.y-.6))/bw;
 float bm=exp(-bx*bx*1.3)*ss(.3,.42,p.y);
 col+=hue(clamp(bx*.33+.4,0.,1.)*.78)*bm*.8+vec3(1.)*exp(-bx*bx*8.)*ss(.3,.4,p.y)*.35;
 col=glow(col,p,vec2(.5,.36),C(255.,240.,220.),14.,.7,60.,1.);
 vec2 src=vec2(.5,.4);
 col=lay(col,cloud(vec2(p.y,p.x),.2,.14,1.4,5.,src.yx,C(200.,240.,255.),C(70.,60.,150.),0.,0.),C(80.,110.,180.),.25);
 col=lay(col,cloud(vec2(p.y,1.-p.x),.2,.14,1.4,6.,vec2(.4,.5),C(255.,210.,240.),C(80.,50.,140.),0.,0.),C(80.,110.,180.),.25);
 col=lay(col,cloud(vec2(p.y,p.x),.06,.12,1.9,7.,src.yx,C(230.,250.,255.),C(50.,40.,110.),0.,0.),C(0.,0.,0.),0.);
 col=lay(col,cloud(vec2(p.y,1.-p.x),.06,.12,1.9,8.,vec2(.4,.5),C(255.,225.,245.),C(50.,40.,110.),0.,0.),C(0.,0.,0.),0.);
 col=lay(col,cloud(p,.34,.05,2.2,9.,vec2(.5,.45),C(255.,250.,235.),C(100.,120.,190.),0.,0.),C(160.,210.,230.),.2);
 col=lay(col,cloud(p,.2,.1,1.3,10.,vec2(.5,.45),C(230.,230.,255.),C(70.,60.,140.),0.,0.),C(0.,0.,0.),0.);
 return col;}
vec3 s2(vec2 p){ // twin moons and aurora over rose dunes
 vec3 col=grad4(p.y,C(255.,120.,120.),C(170.,60.,140.),C(60.,26.,100.),C(12.,8.,32.),.4,.7,1.15);
 col=stars(col,p,.01,ss(.5,1.,p.y));
 col=aurora(col,p,.62,C(90.,255.,190.),C(120.,170.,255.),C(255.,90.,210.),.55);
 col=planet(col,p,vec2(.3,1.0),.085,vec2(.8,-.3),C(255.,220.,230.),C(230.,180.,210.),C(255.,200.,230.),9.);
 col=glow(col,p,vec2(.72,.86),C(180.,220.,255.),30.,.2,200.,0.);
 float dm=length(p-vec2(.72,.86));if(dm<.035)col=mix(C(190.,225.,255.),C(140.,170.,230.),fbm3(p*90.)*.6);
 col=lay(col,dune(p,.36,.08,1.6,1.,C(255.,150.,140.),C(140.,60.,120.)),C(220.,100.,140.),.4);
 col=lay(col,dune(p,.27,.1,1.2,2.,C(255.,170.,150.),C(120.,50.,110.)),C(0.,0.,0.),0.);
 col=lay(col,dune(p,.12,.14,.9,3.,C(255.,185.,160.),C(100.,40.,100.)),C(0.,0.,0.),0.);
 return col;}
vec3 sky4(vec2 p){
 vec3 col=grad4(p.y,C(255.,120.,110.),C(160.,60.,150.),C(40.,30.,110.),C(8.,8.,30.),.42,.6,1.1);
 vec2 o=vec2(.35,.36),dir=normalize(vec2(.55,.9)),nr=vec2(-dir.y,dir.x);vec2 q=p-o;
 float t=dot(q,dir),s=dot(q,nr)+.05*(fbm3(vec2(t*3.,1.))-.5);float w=.13;
 float I=exp(-s*s/(w*w))*(.35+.9*fbm(vec2(t*4.,s*9.)));
 float dust=ss(.42,.7,fbm(vec2(t*7.,s*16.)+3.))*exp(-s*s/(.05*.05));
 I*=1.-dust*.85;
 vec2 core=vec2(.47,.56);float cd=length(p-core);
 vec3 mc=mix(C(110.,120.,255.),C(200.,110.,255.),ss(-.1,.1,s));mc=mix(mc,C(255.,200.,160.),exp(-cd*5.));
 col+=mc*I*.95+C(255.,220.,190.)*exp(-cd*9.)*.35;
 col=stars(col,p,.012+.03*exp(-s*s/(w*w)),ss(.38,.6,p.y));
 return col;}
vec3 s3(vec2 p){ // galaxy over a glowing ocean
 float hz=.36;
 if(p.y>=hz){vec3 c=sky4(p);return c+C(255.,150.,120.)*exp(-(p.y-hz)*25.)*.4;}
 float dz=hz-p.y,z=1./(dz+.025);
 float rip=fbm3(vec2(p.x*z*.9,z*1.3));
 vec3 r=sky4(vec2(p.x+(rip-.5)*.05,hz+dz*1.5));
 vec3 col=mix(C(10.,14.,40.),r,.55+.25*rip);
 float crest=pow(fbm(vec2(p.x*2.5,z*.9)),5.)*10.;
 col+=C(60.,255.,230.)*crest*ss(.22,0.,p.y)*.9;
 col+=C(80.,255.,220.)*pow(rip,6.)*3.*ss(.3,0.,p.y);
 return col;}
vec3 s4(vec2 p){ // glory halo inside the clouds
 vec2 c=vec2(.5,.74);float d=length(p-c);
 vec3 col=grad4(p.y,C(150.,140.,230.),C(255.,190.,200.),C(150.,200.,255.),C(70.,90.,200.),.3,.75,1.2);
 col=rays(col,p,c,C(255.,240.,220.),.45);
 col+=hue(fract(d/.045)*.8)*exp(-d*7.)*.55*ss(.02,.06,d);
 col=rainbow(col,p,c,.3,.02,.35,0.);
 col=glow(col,p,c,C(255.,245.,225.),12.,.8,70.,1.6);
 vec4 top1=cloud(vec2(p.x,1.25-p.y),.18,.12,1.4,2.,vec2(.5,.5),C(255.,220.,240.),C(110.,110.,200.),0.,0.);
 vec4 top2=cloud(vec2(p.x,1.25-p.y),.05,.1,1.9,3.,vec2(.5,.5),C(250.,230.,255.),C(80.,80.,180.),0.,0.);
 col=lay(col,top1,C(200.,190.,255.),.3);col=lay(col,top2,C(0.,0.,0.),0.);
 col=lay(col,cloud(p,.5,.06,2.,4.,c,C(255.,235.,220.),C(170.,140.,220.),0.,0.),C(255.,200.,220.),.4);
 col=lay(col,cloud(p,.38,.1,1.4,5.,c,C(255.,215.,215.),C(130.,110.,210.),0.,0.),C(230.,170.,220.),.2);
 col=lay(col,cloud(p,.18,.14,1.,6.,c,C(255.,200.,200.),C(90.,80.,180.),0.,0.),C(0.,0.,0.),0.);
 return col;}
vec3 s5(vec2 p){ // dawn cumulus tower with a double rainbow
 vec2 sun=vec2(.12,.36);
 vec3 col=grad4(p.y,C(255.,200.,170.),C(255.,170.,190.),C(80.,170.,200.),C(30.,80.,140.),.3,.75,1.2);
 col=glow(col,p,sun,C(255.,230.,180.),6.,.5,40.,1.);
 col=rays(col,p,sun,C(255.,230.,200.),.25);
 vec2 rc=vec2(.55,-.05);
 float dd=length(p-rc);col*=1.-.12*ss(.79,.8,dd)*inv(.88,.89,dd);
 col=rainbow(col,p,rc,.76,.034,.55,0.);col=rainbow(col,p,rc,.93,.04,.25,1.);
 col=lay(col,cloud(p,.3,.95,.75,3.,sun,C(255.,215.,190.),C(120.,100.,170.),.6,.24),C(200.,190.,230.),.12);
 col=lay(col,cloud(p,.25,.05,2.2,4.,sun,C(255.,230.,210.),C(150.,120.,180.),0.,0.),C(255.,200.,200.),.3);
 col=lay(col,cloud(p,.12,.1,1.2,5.,sun,C(255.,210.,200.),C(110.,80.,150.),0.,0.),C(0.,0.,0.),0.);
 return col;}
void main(){
 vec2 p=gl_FragCoord.xy/R.x;vec3 col;
 if(S<.5)col=s0(p);else if(S<1.5)col=s1(p);else if(S<2.5)col=s2(p);else if(S<3.5)col=s3(p);else if(S<4.5)col=s4(p);else col=s5(p);
 col=col/(1.+col*.18);
 float l=dot(col,vec3(.3,.59,.11));col=mix(vec3(l),col,1.08);
 col=col*.93+.035;
 float v=length((p-vec2(.5,.625))*vec2(1.,.8));col*=1.-.32*pow(v*1.3,2.4);
 gl_FragColor=vec4(clamp(col,0.,1.),1.);}
