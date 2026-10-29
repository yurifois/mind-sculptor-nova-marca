import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDown, ArrowUpRight, Bot, Braces, Check, Globe2, MessageCircle, Palette, Search, Smartphone, Sparkles, Target, Zap } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)
const whatsapp='https://wa.me/5561993291126'

const services=[
  {n:'01',kicker:'CONTEÚDO',title:'CONTEÚDO QUE FAZ PARAR.',copy:'Roteiro, copy, direção e edição para transformar atenção em desejo — e desejo em conversa.',tags:['REELS','CARROSSEL','COPY'],image:'/art/service-content-v4.webp',detail:'DA IDEIA À PEÇA FINAL',icon:Sparkles},
  {n:'02',kicker:'SOCIAL',title:'REDES SOCIAIS COM DIREÇÃO.',copy:'Planejamento, publicação e consistência. O perfil deixa de parecer uma sequência de posts e passa a funcionar como marca.',tags:['PLANEJAMENTO','PUBLICAÇÃO','ANÁLISE'],image:'/art/service-social-v4.webp',detail:'CONTEÚDO EM SISTEMA',icon:Smartphone},
  {n:'03',kicker:'DESIGN',title:'DESIGN QUE AUMENTA VALOR.',copy:'Identidade, campanhas e apresentações com acabamento premium. O cliente entende o valor antes da proposta.',tags:['BRANDING','CAMPANHAS','EDITORIAL'],image:'/art/service-design-v4.webp',detail:'VALOR ANTES DA PROPOSTA',icon:Palette},
  {n:'04',kicker:'EXPERIÊNCIA',title:'SITES QUE LEVAM À AÇÃO.',copy:'Experiências rápidas, responsivas e persuasivas. Cada seção conduz o olhar até o contato, orçamento ou compra.',tags:['SITE','LANDING PAGE','CONVERSÃO'],image:'/art/service-sites-v4.webp',detail:'DO PRIMEIRO OLHAR AO CONTATO',icon:Globe2},
  {n:'05',kicker:'PRODUTO',title:'SISTEMAS QUE ORGANIZAM.',copy:'Aplicativos, painéis e ferramentas sob medida para reduzir trabalho manual e conectar operação e atendimento.',tags:['WEB APP','MOBILE','INTEGRAÇÕES'],image:'/art/service-systems-v4.webp',detail:'ENTRADA · FLUXO · ENTREGA',icon:Braces},
  {n:'06',kicker:'PERFORMANCE',title:'TRÁFEGO COM DESTINO.',copy:'Meta e Google com oferta, criativo, página e leitura de dados. O clique passa a ter um próximo passo.',tags:['META ADS','GOOGLE ADS','DADOS'],image:'/art/service-traffic-v4.webp',detail:'CADA CLIQUE TEM UM DESTINO',icon:Target},
  {n:'07',kicker:'DESCOBERTA',title:'PRESENÇA QUE CONTINUA.',copy:'SEO, conteúdo e presença local para sua empresa ser encontrada quando o cliente procura a solução.',tags:['SEO','LOCAL','CONTEÚDO'],image:'/art/service-seo-v4.webp',detail:'ENCONTRADO NA HORA CERTA',icon:Search},
  {n:'08',kicker:'INTELIGÊNCIA',title:'IA APLICADA AO NEGÓCIO.',copy:'Agentes personalizados, automações e treinamento para acelerar processos sem perder o controle humano.',tags:['AGENTES','AUTOMAÇÃO','TREINAMENTO'],image:'/art/service-ai-v4.webp',detail:'ENTRADA · DECISÃO · AÇÃO',icon:Bot},
]
const process=[
  {n:'01',title:'DIAGNÓSTICO',copy:'Antes da ferramenta, entendemos o negócio, a margem, o cliente e o gargalo.',items:['NEGÓCIO','MERCADO','PÚBLICO'],output:'MAPA DE OPORTUNIDADES'},
  {n:'02',title:'DIREÇÃO',copy:'Transformamos o diagnóstico em oferta, mensagem, canais e prioridades.',items:['POSICIONAMENTO','OFERTA','CANAIS'],output:'PLANO DE AÇÃO'},
  {n:'03',title:'EXECUÇÃO',copy:'Conteúdo, design, página, mídia e automação entram no ar como um sistema.',items:['CONTEÚDO','EXPERIÊNCIA','MÍDIA'],output:'OPERAÇÃO ATIVA'},
  {n:'04',title:'EVOLUÇÃO',copy:'Dados mostram o que manter, corrigir, testar e escalar no próximo ciclo.',items:['LEITURA','OTIMIZAÇÃO','ESCALA'],output:'CRESCIMENTO CONSISTENTE'},
]
const contrast=[
  {bad:'POSTAR POR POSTAR',good:'CONTEÚDO COM FUNÇÃO',copy:'Cada peça prepara a próxima ação do cliente.',image:'/art/service-content-v4.webp'},
  {bad:'TRÁFEGO SEM DESTINO',good:'CAMPANHA COM CAMINHO',copy:'Anúncio, oferta, página e atendimento trabalham juntos.',image:'/art/service-traffic-v4.webp'},
  {bad:'SITE COMO CARTÃO',good:'SITE COMO EXPERIÊNCIA',copy:'A página demonstra valor antes da primeira conversa.',image:'/art/service-sites-v4.webp'},
  {bad:'IA COMO MODA',good:'IA COMO CAPACIDADE',copy:'Automação aplicada onde reduz tempo e aumenta consistência.',image:'/art/service-ai-v4.webp'},
]
const scenes=[
  ['/art/gallery-system-v4.webp','A PEÇA QUE ORGANIZA O SISTEMA'],
  ['/art/gallery-content-v4.webp','DA MENSAGEM À IMAGEM'],
  ['/art/gallery-conversion-v4.webp','CAMINHOS QUE CONVERGEM'],
  ['/art/gallery-intelligence-v4.webp','INTELIGÊNCIA EM MOVIMENTO'],
]
const visionCards=[
  ['/art/web-portal-v3.webp','EXPERIÊNCIA / 01','DO OLHAR À AÇÃO'],
  ['/art/traffic-routing-v3.webp','ESTRATÉGIA / 02','CADA CLIQUE COM DESTINO'],
  ['/art/ai-circuit-v3.webp','INTELIGÊNCIA / 03','PROCESSO QUE RESPONDE'],
]

function Brand(){return <a className="brand" href="#topo" aria-label="Mind Sculptor — início"><img src="/art/logo-avatar.png" alt=""/><span><b>MIND SCULPTOR</b><small>MARKETING DIGITAL</small></span></a>}

function MouseGlow(){
  useEffect(()=>{
    if(window.matchMedia('(pointer: coarse)').matches)return undefined
    const move=e=>{
      document.documentElement.style.setProperty('--mx',e.clientX+'px');document.documentElement.style.setProperty('--my',e.clientY+'px')
      document.documentElement.style.setProperty('--nx',(e.clientX/window.innerWidth-.5)*2);document.documentElement.style.setProperty('--ny',(e.clientY/window.innerHeight-.5)*2)
    }
    window.addEventListener('pointermove',move)
    return()=>window.removeEventListener('pointermove',move)
  },[])
  return <span className="mouse-glow" aria-hidden="true"/>
}

function Loader(){return <div className="loader" aria-hidden="true"><div className="loader-meta"><span>MS / 2026</span><span>BRASÍLIA · DF</span><span>DESIGN + ESTRATÉGIA</span><span>SYSTEM 02</span></div><div className="loader-center"><img src="/art/logo-avatar.png" alt=""/><b>MIND SCULPTOR</b><div><i/><span>CARREGANDO EXPERIÊNCIA</span></div></div></div>}

function HeroDustMorph(){
  const canvasRef=useRef(null)
  const logoRef=useRef(null)
  useEffect(()=>{
    const canvas=canvasRef.current,hero=document.querySelector('.hero-story'),logo=logoRef.current
    if(!canvas||!hero||!logo)return undefined
    const ctx=canvas.getContext('2d'),reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let frame=0,alive=true,points=[],size=620,dpr=1,targetsReady=false,scrollProgress=0
    const clamp=n=>Math.max(0,Math.min(1,n))
    const smooth=t=>t*t*(3-2*t)
    const resize=()=>{
      size=Math.max(300,Math.min(720,canvas.getBoundingClientRect().width||620))
      dpr=Math.min(window.devicePixelRatio||1,1.7)
      canvas.width=Math.round(size*dpr);canvas.height=Math.round(size*dpr)
      ctx.setTransform(dpr,0,0,dpr,0,0)
    }
    const buildSphere=()=>{
      const total=innerWidth<720?1500:2800,phi=Math.PI*(3-Math.sqrt(5))
      points=Array.from({length:total},(_,i)=>{
        const y=1-(i/(total-1))*2,r=Math.sqrt(Math.max(0,1-y*y)),a=phi*i
        return {sx:Math.cos(a)*r,sy:y,sz:Math.sin(a)*r,tx:0,ty:0,tz:0,color:[215,146,11],seed:Math.random()*Math.PI*2}
      })
    }
    const sampleLogo=()=>{
      const img=new Image();img.decoding='async'
      img.onload=()=>{
        try{
          const off=document.createElement('canvas'),max=210,scale=max/Math.max(img.width,img.height)
          off.width=Math.max(2,Math.round(img.width*scale));off.height=Math.max(2,Math.round(img.height*scale))
          const o=off.getContext('2d',{willReadFrequently:true});o.drawImage(img,0,0,off.width,off.height)
          const data=o.getImageData(0,0,off.width,off.height).data,pool=[]
          for(let y=0;y<off.height;y+=2)for(let x=0;x<off.width;x+=2){
            const k=(y*off.width+x)*4
            if(data[k+3]>105)pool.push({x:(x-off.width/2)/(Math.max(off.width,off.height)/2),y:(y-off.height/2)/(Math.max(off.width,off.height)/2),c:[data[k],data[k+1],data[k+2]]})
          }
          if(pool.length<80)return
          for(let i=pool.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[pool[i],pool[j]]=[pool[j],pool[i]]}
          points.forEach((p,i)=>{const t=pool[i%pool.length];p.tx=t.x*1.02;p.ty=t.y*1.02;p.tz=(Math.random()-.5)*.16;p.color=t.c})
          targetsReady=true
        }catch(_){targetsReady=false}
      }
      img.src='/art/logo-head-color-3d-v4.webp'
    }
    const readScroll=()=>{
      const rect=hero.getBoundingClientRect(),travel=Math.max(1,hero.offsetHeight-innerHeight)
      scrollProgress=clamp(-rect.top/travel)
    }
    const draw=now=>{
      if(!alive)return
      const morph=targetsReady?smooth(clamp((scrollProgress-.025)/.31)):0
      const fade=1-smooth(clamp((scrollProgress-.34)/.14))
      const angle=now*.00014*(1-morph*.62),tilt=-.18+morph*.12
      const ca=Math.cos(angle),sa=Math.sin(angle),ct=Math.cos(tilt),st=Math.sin(tilt)
      ctx.clearRect(0,0,size,size);ctx.globalCompositeOperation='lighter'
      const cx=size*.5,cy=size*.5,radius=size*(innerWidth<720?.31:.34)
      points.forEach(p=>{
        const x=p.sx+(p.tx-p.sx)*morph,y=p.sy+(p.ty-p.sy)*morph,z=p.sz+(p.tz-p.sz)*morph
        const x1=x*ca-z*sa,z1=x*sa+z*ca,y1=y*ct-z1*st,z2=y*st+z1*ct
        const perspective=1/(1.58-z2*.32),px=cx+x1*radius*perspective,py=cy+y1*radius*perspective
        const depth=.32+.68*(z2+1)/2,twinkle=.82+.18*Math.sin(now*.0018+p.seed)
        const base=[222,196,163],col=p.color,rr=Math.round(base[0]+(col[0]-base[0])*morph),gg=Math.round(base[1]+(col[1]-base[1])*morph),bb=Math.round(base[2]+(col[2]-base[2])*morph)
        ctx.beginPath();ctx.fillStyle=`rgba(${rr},${gg},${bb},${Math.max(.05,depth*twinkle*fade)})`;ctx.arc(px,py,(morph?1.15:1.35)*perspective,0,Math.PI*2);ctx.fill()
      })
      ctx.globalCompositeOperation='source-over'
      const sharp=smooth(clamp((morph-.72)/.28))*fade
      logo.style.opacity=String(sharp);logo.style.transform=`translate(-50%,-50%) rotateY(${angle*.35}rad) scale(${.9+.1*sharp})`
      frame=requestAnimationFrame(draw)
    }
    buildSphere();resize();sampleLogo();readScroll()
    if(reduced){logo.style.opacity='1';logo.style.transform='translate(-50%,-50%)';return undefined}
    addEventListener('resize',resize);addEventListener('scroll',readScroll,{passive:true});frame=requestAnimationFrame(draw)
    return()=>{alive=false;cancelAnimationFrame(frame);removeEventListener('resize',resize);removeEventListener('scroll',readScroll)}
  },[])
  return <div className="hero-dust" aria-hidden="true"><canvas ref={canvasRef}/><img ref={logoRef} src="/art/logo-head-color-3d-v4.webp" alt=""/><span>POEIRA → MARCA</span></div>
}

function AmbientField(){return <div className="ambient-field" aria-hidden="true"><span className="ambient-orbit orbit-a"/><span className="ambient-orbit orbit-b"/><i className="ambient-beam beam-a"/><i className="ambient-beam beam-b"/><div className="ambient-nodes">{Array.from({length:14},(_,i)=><b key={i}/>)}</div></div>}

function SignalOverlay({variant='hero'}){
  return <svg className={'signal-overlay '+variant} viewBox="0 0 1680 944" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs><filter id={'glow-'+variant}><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
    <path className="signal-base" d="M-40 660 C250 650 370 510 590 535 S930 590 1100 395 S1390 260 1720 310"/>
    <path className="signal-pulse p1" pathLength="1" filter={'url(#glow-'+variant+')'} d="M-40 660 C250 650 370 510 590 535 S930 590 1100 395 S1390 260 1720 310"/>
    <path className="signal-pulse p2" pathLength="1" filter={'url(#glow-'+variant+')'} d="M100 850 C380 790 390 690 650 680 S990 740 1190 560 S1450 430 1710 500"/>
  </svg>
}

function ServiceVisual({service}){
  const Icon=service.icon
  return <div className="service-visual-real"><img src={service.image} alt={service.title}/><div className="service-visual-shade"/><div className="service-scan"/><div className="service-visual-top"><span>{service.n} / 08</span><span>{service.kicker}</span><Icon size={18}/></div><div className="service-visual-bottom"><small>{service.detail}</small><div>{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div></div><svg viewBox="0 0 900 560" preserveAspectRatio="none" aria-hidden="true"><path d="M-40 430 C160 410 230 330 390 350 S660 420 940 200"/><path className="service-route-pulse" d="M-40 430 C160 410 230 330 390 350 S660 420 940 200" pathLength="1"/></svg></div>
}

function ContactForm(){
  const [status,setStatus]=useState('Ao enviar, o WhatsApp abre com sua mensagem já escrita.')
  const submit=e=>{
    e.preventDefault()
    const form=e.currentTarget,data=new FormData(form)
    if(data.get('website'))return
    if(!form.checkValidity()){form.reportValidity();setStatus('Faltou preencher os campos obrigatórios e a autorização.');return}
    const lines=['Olá! Vim pelo site e quero um diagnóstico gratuito.','',`Nome: ${data.get('nome')}`,`WhatsApp: ${data.get('telefone')}`]
    if(data.get('empresa'))lines.push(`Empresa/@: ${data.get('empresa')}`)
    lines.push(`Preciso de: ${data.get('interesse')}`)
    if(data.get('investimento'))lines.push(`Investimento previsto: ${data.get('investimento')}`)
    if(data.get('objetivo'))lines.push(`Objetivo: ${data.get('objetivo')}`)
    window.open(`${whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`,'_blank','noopener,noreferrer')
    setStatus('Pronto! O WhatsApp abriu com sua mensagem. Respondemos em até 24h úteis.')
  }
  return <form className="contact-form" onSubmit={submit} noValidate><div className="form-meta"><span>DIAGNÓSTICO GRATUITO</span><b>BRIEFING DIRETO</b></div><div className="form-row"><label><span>SEU NOME *</span><input name="nome" required autoComplete="name" placeholder="Como podemos chamar você?"/></label><label><span>WHATSAPP *</span><input name="telefone" required inputMode="tel" autoComplete="tel" placeholder="(61) 99999-9999"/></label></div><label><span>EMPRESA OU @ DO INSTAGRAM</span><input name="empresa" autoComplete="organization" placeholder="Nome da empresa ou perfil"/></label><label><span>O QUE VOCÊ PRECISA AGORA? *</span><select name="interesse" required defaultValue=""><option value="" disabled>Selecione</option><option>Gestão de redes sociais</option><option>Criação de conteúdo</option><option>Design e identidade visual</option><option>Site ou landing page</option><option>Aplicativo ou sistema</option><option>Tráfego pago</option><option>Tráfego orgânico / SEO</option><option>Treinamento em IA para a equipe</option><option>Gestão completa de marketing</option><option>Ainda não sei — preciso de ajuda</option></select></label><label><span>INVESTIMENTO MENSAL PREVISTO</span><select name="investimento" defaultValue=""><option value="">Selecione</option><option>Ainda estou avaliando</option><option>Até R$ 1.500 / mês</option><option>R$ 1.500 a R$ 3.000 / mês</option><option>R$ 3.000 a R$ 6.000 / mês</option><option>Acima de R$ 6.000 / mês</option></select></label><label><span>QUAL O SEU OBJETIVO EM UMA FRASE?</span><textarea name="objetivo" rows="2" placeholder="O que precisa mudar primeiro?"/></label><input className="form-hp" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true"/><label className="form-consent"><input type="checkbox" name="consentimento" required/><span>Autorizo a Mind Sculptor a entrar em contato pelo WhatsApp com as informações que enviei.</span></label><button className="ms-btn" type="submit"><span>ENVIAR E FALAR NO WHATSAPP</span><ArrowUpRight size={18}/></button><small className="form-status" aria-live="polite">{status}</small></form>
}

function AIStory(){
  const paths=['M-20 262 L360 262 L520 350 L835 350','M-20 360 L360 360 L590 410 L835 410','M-20 510 L410 510 L610 470 L835 470','M1010 352 L1280 352 L1390 252 L1710 252','M1010 408 L1350 408 L1480 350 L1710 350','M1010 466 L1280 466 L1450 520 L1710 520','M1010 515 L1210 515 L1410 650 L1710 650']
  return <section className="ai-story" id="inteligencia"><div className="ai-sticky"><img src="/art/ai-circuit-v3.webp" alt="Placa de processamento com núcleo central e circuitos de comunicação"/><div className="ai-shade"/><svg className="circuit-map" viewBox="0 0 1680 944" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><filter id="circuitGlow"><feGaussianBlur stdDeviation="7" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>{paths.map((d,i)=><g key={d}><path className="circuit-base" d={d}/><path className={'circuit-pulse cp-'+i} pathLength="1" filter="url(#circuitGlow)" d={d}/></g>)}</svg><div className="chip-waves" aria-hidden="true"><i/><i/><i/><i/></div><div className="ai-tech"><span>NEURAL ROUTE / ACTIVE</span><span>8 AGENTES CONECTADOS</span><span>LATÊNCIA / 00.4</span></div>
    <div className="ai-copy ai-copy-1"><p>05 / INTELIGÊNCIA APLICADA</p><h2>A INFORMAÇÃO<br/><em>ENTRA.</em></h2><span>O agente recebe contexto, intenção e dados do processo.</span></div>
    <div className="ai-copy ai-copy-2"><p>NÚCLEO / PROCESSAMENTO</p><h2>O SISTEMA<br/><em>ENTENDE.</em></h2><span>Regras, conhecimento e objetivos se encontram no mesmo núcleo.</span></div>
    <div className="ai-copy ai-copy-3"><p>ROTA / DESTINO</p><h2>A AÇÃO<br/><em>ACONTECE.</em></h2><span>A resposta volta ao atendimento, à equipe ou à operação certa.</span></div></div></section>
}

function App(){
  const root=useRef(null),contrastSection=useRef(null)
  const [activeService,setActiveService]=useState(0),[contrastFrame,setContrastFrame]=useState(0)
  useEffect(()=>{
    const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const ctx=gsap.context(()=>{
      gsap.timeline({defaults:{ease:'power3.out'}}).to('.loader-center i',{scaleX:1,duration:.6}).to('.loader',{yPercent:-100,duration:.9,ease:'power4.inOut'},.72).from('.site-header',{y:-90,duration:.65},1.18)
      if(!reduced){
        const hero=gsap.timeline({scrollTrigger:{trigger:'.hero-story',start:'top top',end:'bottom bottom',scrub:1}})
        hero.to('.scene-1',{autoAlpha:0,scale:1.08,duration:1}).fromTo('.scene-2',{autoAlpha:0,scale:1.08},{autoAlpha:1,scale:1,duration:1},'<').to('.scene-2',{autoAlpha:0,scale:1.07,duration:1}).fromTo('.scene-3',{autoAlpha:0,scale:1.08},{autoAlpha:1,scale:1,duration:1},'<')
        gsap.to('.hero-sticky .scene-bg',{xPercent:2.5,yPercent:-1.5,ease:'none',scrollTrigger:{trigger:'.hero-story',start:'top top',end:'bottom bottom',scrub:1}})
        gsap.utils.toArray('[data-reveal]').forEach(el=>gsap.from(el,{opacity:0,y:40,duration:.85,ease:'power3.out',scrollTrigger:{trigger:el,start:'top 87%',once:true}}))
        gsap.utils.toArray('.service-entry').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 52%',end:'bottom 52%',onEnter:()=>setActiveService(i),onEnterBack:()=>setActiveService(i)}))
        gsap.utils.toArray('.contrast-step').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 55%',end:'bottom 55%',onEnter:()=>setContrastFrame(i),onEnterBack:()=>setContrastFrame(i)}))
        const ai=gsap.timeline({scrollTrigger:{trigger:'.ai-story',start:'top top',end:'bottom bottom',scrub:1}})
        ai.to('.ai-copy-1',{autoAlpha:0,y:-25,duration:.7}).fromTo('.ai-copy-2',{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.7},'<.2').to('.ai-copy-2',{autoAlpha:0,y:-25,duration:.7}).fromTo('.ai-copy-3',{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.7},'<.2').to('.ai-sticky>img',{scale:1.07,filter:'brightness(1.18)',duration:1},0)
        gsap.fromTo('.method-route-fill',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:'.method-system',start:'top 75%',end:'bottom 45%',scrub:1}})
        gsap.utils.toArray('.method-card').forEach((el,i)=>gsap.from(el,{opacity:0,y:45,duration:.75,delay:i*.08,scrollTrigger:{trigger:el,start:'top 88%',once:true}}))
        gsap.to('.manifesto-media',{yPercent:-12,scrollTrigger:{trigger:'.type-manifesto',start:'top bottom',end:'bottom top',scrub:1}})
      }
    },root)
    return()=>ctx.revert()
  },[])
  const current=services[activeService]
  const activeContrast=Math.floor(contrastFrame/2),contrastSolved=contrastFrame%2===1,currentContrast=contrast[activeContrast]
  const goContrast=index=>{
    const section=contrastSection.current
    if(!section)return
    const travel=Math.max(0,section.offsetHeight-window.innerHeight),top=window.scrollY+section.getBoundingClientRect().top
    window.scrollTo({top:top+travel*((index*2)/(contrast.length*2-1)),behavior:'smooth'})
  }
  return <div ref={root} className="site-shell"><Loader/><MouseGlow/><AmbientField/><div className="page-noise"/>
    <header className="site-header"><Brand/><nav aria-label="Navegação principal"><a href="#visao">VISÃO</a><a href="#servicos">SERVIÇOS</a><a href="#direcao">DIFERENÇA</a><a href="#inteligencia">IA</a><a href="#metodo">MÉTODO</a></nav><a className="header-cta ms-btn ms-btn-small" href={whatsapp} target="_blank" rel="noreferrer" data-cursor="CHAMAR"><span>CHAMA NO WHATSAPP</span><ArrowUpRight size={15}/></a></header>
    <main>
      <section className="hero-story" id="topo"><div className="hero-sticky" data-cursor="EXPLORAR">
        <div className="hero-scene scene-1"><img className="scene-bg" src="/art/hero-architecture-v3.webp" alt="Arquitetura digital criada para a Mind Sculptor"/><SignalOverlay variant="hero"/><div className="scene-shade"/><div className="scene-copy"><p>UMA AGÊNCIA COMPLETA · BRASÍLIA</p><h1>MARKETING QUE<br/><em>NÃO PASSA</em><br/>DESPERCEBIDO.</h1></div></div>
        <div className="hero-scene scene-2"><img className="scene-bg" src="/art/web-portal-v3.webp" alt="Portal digital tridimensional criado para a Mind Sculptor"/><SignalOverlay variant="portal"/><div className="scene-shade"/><div className="scene-copy centered"><p>DESIGN · EXPERIÊNCIA · CONVERSÃO</p><h2>UMA MARCA INTEIRA.<br/><em>NÃO PEÇAS SOLTAS.</em></h2></div></div>
        <div className="hero-scene scene-3"><img className="scene-bg" src="/art/traffic-routing-v3.webp" alt="Sistema de tráfego com destino criado para a Mind Sculptor"/><SignalOverlay variant="traffic"/><div className="scene-shade"/><div className="scene-copy centered"><p>CONTEÚDO · PÁGINA · TRÁFEGO · ATENDIMENTO</p><h2>ESTRATÉGIA QUE<br/><em>CHEGA ATÉ A VENDA.</em></h2></div></div>
        <HeroDustMorph/>
        <div className="hero-rail"><span>MS / IMMERSIVE SYSTEM</span><span>01 — 03</span><span>BRASÍLIA · 2026</span></div><div className="hero-nav"><a href="#visao">VISÃO</a><i>/</i><a href="#servicos">SERVIÇOS</a><i>/</i><a href="#inteligencia">IA</a></div><a className="hero-scroll" href="#visao"><span>ROLE PARA EXPLORAR</span><ArrowDown size={15}/></a>
      </div></section>
      <section className="vision vision-v4" id="visao"><div className="vision-copy" data-reveal><p className="section-label">01 / NOSSA VISÃO</p><h2>NÃO CRIAMOS<br/>PEÇAS SOLTAS.<br/><em>CRIAMOS CAMINHOS.</em></h2><p>Design, conteúdo, tecnologia e mídia trabalhando como um único ambiente — da primeira impressão até a próxima ação.</p></div><div className="vision-gallery">{visionCards.map(([src,meta,title],i)=><figure className={'vision-card vision-card-'+(i+1)} key={src} data-reveal><img src={src} alt={title}/><div className="vision-card-shade"/><figcaption><Zap size={15}/><span>{meta}</span><b>{title}</b></figcaption>{i===0&&<SignalOverlay variant="vision"/>}</figure>)}</div></section>
      <section className="service-system services-v4" id="servicos"><div className="service-intro" data-reveal><p className="section-label">02 / O ECOSSISTEMA</p><h2>OITO FRENTES.<br/><em>UMA ÚNICA DIREÇÃO.</em></h2><p>Agora cada capacidade é mostrada em uso: o cliente vê o que acontece, como se conecta e qual movimento vem depois.</p></div><div className="service-layout"><div className="service-list">{services.map((service,index)=>{const Icon=service.icon;return <article className={'service-entry '+(index===activeService?'active':'')} key={service.n}><div className="service-entry-head"><span>{service.n}</span><small>{service.kicker}</small><Icon size={18}/></div><h3>{service.title}</h3><p>{service.copy}</p><div>{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="ms-btn ms-btn-inline" href={whatsapp} target="_blank" rel="noreferrer"><span>CONVERSAR SOBRE ISSO</span><ArrowUpRight size={16}/></a><div className="mobile-service-art"><ServiceVisual service={service}/></div></article>})}</div><aside className="service-stage v4-stage" aria-live="polite"><div className="stage-visual" key={activeService}><ServiceVisual service={current}/></div><div className="stage-caption"><span>{current.n} / 08 · {current.kicker}</span><b>{current.title}</b><p>{current.copy}</p></div></aside></div></section>
      <section className="work" id="trabalhos"><div className="work-head" data-reveal><p className="section-label">03 / CENAS ORIGINAIS</p><h2>A IMAGEM NÃO<br/><em>DECORA A IDEIA.</em><br/>ELA É A IDEIA.</h2></div><div className="work-grid">{scenes.map(([src,label],i)=><figure className={'work-card work-'+(i+1)} key={src} data-reveal data-tilt data-cursor="VER"><img src={src} alt={label}/><figcaption><span>0{i+1}</span><b>{label}</b><ArrowUpRight size={17}/></figcaption></figure>)}</div></section>
      <section ref={contrastSection} className={'contrast contrast-v4 '+(contrastSolved?'is-solved':'is-problem')} id="direcao"><div className="contrast-stage"><div className="contrast-bg" key={currentContrast.image}><img className="contrast-bg-gray" src={currentContrast.image} alt=""/><img className="contrast-bg-color" src={currentContrast.image} alt=""/><div className="contrast-vignette"/></div><p className="contrast-title">04 / A DIFERENÇA NA PRÁTICA</p><div className="contrast-count"><span>0{activeContrast+1}</span><i>/</i><b>04</b><small>{contrastSolved?'COM A MIND':'SEM DIREÇÃO'}</small></div><div className="contrast-left"><small>SEM DIREÇÃO</small><h3>{currentContrast.bad}</h3></div><div className="contrast-logo" aria-hidden="true"><div className="logo-halo"/><div className="logo-rotor"><img className="logo-face logo-gray" src="/art/logo-head-gray-3d-v4.webp" alt=""/><img className="logo-face logo-color" src="/art/logo-head-color-3d-v4.webp" alt=""/></div><div className="contrast-line"/></div><div className="contrast-right"><small>COM A MIND</small><h3>{currentContrast.good}</h3><p>{currentContrast.copy}</p></div><ol className="contrast-index" aria-label="Etapas da comparação">{contrast.map((item,i)=><li key={item.bad}><button type="button" aria-current={i===activeContrast?'true':'false'} onClick={()=>goContrast(i)}><i>0{i+1}</i><span>{item.bad}</span></button></li>)}</ol><div className="contrast-instruction"><span>{contrastSolved?'RESULTADO ILUMINADO':'PROBLEMA IDENTIFICADO'}</span><i/><b>CONTINUE ROLANDO</b></div></div><div className="contrast-scroll">{contrast.flatMap((item,i)=>[<div className="contrast-step" key={`${item.bad}-problema`}><span>0{i+1}A</span></div>,<div className="contrast-step" key={`${item.bad}-solucao`}><span>0{i+1}B</span></div>])}</div></section>
      <AIStory/>
      <section className="method method-v4" id="metodo"><div className="method-head" data-reveal><p className="section-label">06 / DO DIAGNÓSTICO À EVOLUÇÃO</p><h2>PROCESSO CLARO.<br/><em>SEM PEÇA SOLTA.</em></h2><p>Você enxerga o que entra, o que decidimos, o que colocamos em prática e como o trabalho evolui.</p></div><div className="method-system"><div className="method-route"><i/><b className="method-route-fill"/></div><div className="method-grid">{process.map((step,i)=><article className="method-card" key={step.n}><div className="method-card-top"><span>{step.n}</span><small>ETAPA {i+1} / 4</small></div><div className="method-node"><i/><b>{i+1}</b></div><h3>{step.title}</h3><p>{step.copy}</p><div className="method-inputs">{step.items.map(item=><span key={item}>{item}</span>)}</div><div className="method-output"><small>ENTREGA DA ETAPA</small><b>{step.output}</b><ArrowUpRight size={17}/></div></article>)}</div><div className="method-legend"><span><i/> ENTRADA</span><span><i/> DECISÃO</span><span><i/> ENTREGA</span><b>UM CICLO ALIMENTA O PRÓXIMO</b></div></div></section>
      <section className="type-manifesto"><div className="manifesto-type" data-reveal><span>VALOR</span><b>&gt;&gt;&gt;</b><span>NÃO</span><i>[ 01 ]</i><span>É</span><u>_</u><span>EXPLICADO.</span><strong>É PERCEBIDO.</strong><p>Design, mensagem e experiência fazem a mesma promessa — antes que o cliente precise perguntar.</p></div><figure className="manifesto-media"><img src="/art/traffic-routing-v3.webp" alt="Fluxo estratégico tridimensional criado para a Mind Sculptor"/><figcaption><span>MIND / ROUTE</span><b>CADA AÇÃO TEM<br/>UM DESTINO.</b></figcaption></figure></section>
      <section className="final-cta final-v4" id="contato"><div className="final-mark">MIND</div><div className="final-content"><div className="final-copy" data-reveal><p className="section-label">07 / DIAGNÓSTICO GRATUITO</p><h2>VAMOS OLHAR<br/>O SEU NEGÓCIO<br/><em>DE PERTO.</em></h2><p>Preencha os campos. A conversa segue direto no WhatsApp com quem entende do assunto — sem robô e sem funil de vendedor.</p><ul className="diagnostic-list"><li><Check size={16}/>Análise do seu perfil, site e presença digital atual</li><li><Check size={16}/>Os três gargalos que mais travam sua venda hoje</li><li><Check size={16}/>Proposta com escopo e valor fechados, se fizer sentido</li><li><Check size={16}/>Zero compromisso: se não for a hora, a gente fala isso</li></ul><a className="ms-btn ms-btn-dark" href={whatsapp} target="_blank" rel="noreferrer"><span>PREFIRO CHAMAR DIRETO</span><ArrowUpRight size={18}/></a><p className="direct-contact">(61) 99329-1126 · BRASÍLIA/DF · TODO O BRASIL</p></div><ContactForm/></div><footer><Brand/><span>BRASÍLIA/DF · TODO O BRASIL</span><span>© 2026 MIND SCULPTOR</span></footer></section>
    </main>
    <a className="floating-whatsapp ms-btn" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar com a Mind Sculptor no WhatsApp"><MessageCircle size={18}/><span>WHATSAPP</span><ArrowUpRight size={15}/></a>
  </div>
}
export default App
