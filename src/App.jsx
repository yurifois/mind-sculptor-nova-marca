import { useEffect, useMemo, useRef, useState } from 'react'
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

const navLinks=[['#visao','VISÃO'],['#servicos','SERVIÇOS'],['#direcao','DIFERENÇA'],['#inteligencia','IA'],['#metodo','MÉTODO']]

function SiteHeader(){
  const [aberto,setAberto]=useState(false)
  const cabecalho=useRef(null)

  /* Qual seção o leitor está vendo, e se já saiu do topo.
     Duas decisões de propósito:

     1. A leitura é SÍNCRONA no evento de rolagem, não por
        IntersectionObserver. Marca de menu que chega atrasada aponta para
        a seção errada, e o leitor vê o erro. Cinco retângulos por evento
        não custam nada.

     2. O resultado vai DIRETO para o DOM, sem passar por estado do React.
        Medido: com `setAtivo` a marca errava 11 de 16 posições num
        aparelho lento — a leitura estava certa, quem chegava tarde era o
        render. Atributo que muda a cada rolagem não é estrutura de
        componente; é pintura. E de quebra o cabeçalho inteiro deixa de
        ser remontado a cada evento. */
  useEffect(()=>{
    const topo=cabecalho.current
    if(!topo)return undefined
    const itens=[...topo.querySelectorAll('[data-secao]')]
    /* As secoes sao buscadas UMA vez. A versao anterior fazia um
       querySelector por link DENTRO do ouvinte de rolagem: cinco buscas no
       documento inteiro mais cinco getBoundingClientRect a cada evento, e
       cada rect forca o navegador a recalcular layout. Num celular isso
       sozinho explica um cabecalho que "nao acompanha o dedo". */
    const secoes=navLinks.map(([href])=>[href,document.querySelector(href)])
                         .filter(([,el])=>el)
    let compacto=null
    const ler=()=>{
      /* eventos de rolagem chegam varias vezes por quadro; o trabalho e de
         pintura, entao um por quadro basta e o resto e desperdicio */
      const querCompacto=scrollY>40
      if(querCompacto!==compacto){compacto=querCompacto;topo.classList.toggle('is-compact',querCompacto)}
      const meio=innerHeight*0.42
      let atual=''
      for(const [href,el] of secoes){
        const r=el.getBoundingClientRect()
        if(r.top<=meio&&r.bottom>meio){atual=href;break}
      }
      for(const a of itens){
        if(a.dataset.secao===atual)a.setAttribute('aria-current','true')
        else a.removeAttribute('aria-current')
      }
    }
    let agendado=0
    const aoRolar=()=>{
      if(agendado)return
      agendado=requestAnimationFrame(()=>{agendado=0;ler()})
    }
    ler()
    addEventListener('scroll',aoRolar,{passive:true})
    addEventListener('resize',aoRolar)
    return()=>{cancelAnimationFrame(agendado)
      removeEventListener('scroll',aoRolar);removeEventListener('resize',aoRolar)}
  },[])

  /* Painel aberto trava a rolagem do fundo e responde ao Esc. Sem isso o
     leitor rola a pagina por tras do menu e nao entende o que aconteceu. */
  useEffect(()=>{
    if(!aberto)return undefined
    const antes=document.body.style.overflow
    document.body.style.overflow='hidden'
    const tecla=e=>{if(e.key==='Escape')setAberto(false)}
    addEventListener('keydown',tecla)
    return()=>{document.body.style.overflow=antes;removeEventListener('keydown',tecla)}
  },[aberto])

  return <header ref={cabecalho} className={'site-header'+(aberto?' is-open':'')}>
    <Brand/>
    <nav aria-label="Navegação principal">{navLinks.map(([href,rotulo])=>
      <a key={href} href={href} data-secao={href}>{rotulo}</a>)}</nav>
    <a className="header-cta ms-btn ms-btn-small" href={whatsapp} target="_blank" rel="noreferrer" data-cursor="CHAMAR"><span>CHAMA NO WHATSAPP</span><ArrowUpRight size={15}/></a>
    <button className="menu-toggle" type="button" aria-expanded={aberto} aria-controls="menu-movel"
      aria-label={aberto?'Fechar menu':'Abrir menu'} onClick={()=>setAberto(v=>!v)}><i/><i/></button>
    <div className="mobile-menu" id="menu-movel" inert={!aberto}>
      <nav aria-label="Navegação do celular">{navLinks.map(([href,rotulo],i)=>
        <a key={href} href={href} style={{'--i':i}} data-secao={href}
           onClick={()=>setAberto(false)}><span>{String(i+1).padStart(2,'0')}</span>{rotulo}</a>)}</nav>
      <a className="mobile-menu-cta ms-btn" href={whatsapp} target="_blank" rel="noreferrer" onClick={()=>setAberto(false)}><span>CHAMA NO WHATSAPP</span><ArrowUpRight size={16}/></a>
      <p>(61) 99329-1126 · BRASÍLIA/DF</p>
    </div>
  </header>
}

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
  useEffect(()=>{
    const canvas=canvasRef.current,hero=document.querySelector('.hero-story'),stage=document.querySelector('.hero-sticky')
    const target=document.querySelector('.scene-2 h2'),sceneCopy=document.querySelector('.scene-2 .scene-copy')
    if(!canvas||!hero||!stage||!target||!sceneCopy)return undefined
    const ctx=canvas.getContext('2d'),reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const celular=innerWidth<720
    let frame=0,alive=true,points=[],width=innerWidth,height=innerHeight,dpr=1,targetsReady=false,scrollProgress=0
    let ultimoQuadro=0,ultimoMat=-1
    const clamp=n=>Math.max(0,Math.min(1,n))
    const smooth=t=>t*t*(3-2*t)
    const buildSphere=()=>{
      /* Cada particula custa um beginPath + arc + fill proprios -- sao
         chamadas de desenho individuais, nao um lote. 1700 delas a 60fps
         dao 102 mil chamadas por segundo so para a poeira. Numa tela de
         telefone 820 particulas continuam lendo como poeira, e custam um
         quinto disso. */
      const total=celular?820:3200,phi=Math.PI*(3-Math.sqrt(5))
      points=Array.from({length:total},(_,i)=>{
        const y=1-(i/(total-1))*2,r=Math.sqrt(Math.max(0,1-y*y)),a=phi*i
        return {sx:Math.cos(a)*r,sy:y,sz:Math.sin(a)*r,tx:0,ty:0,color:[244,237,227],seed:Math.random()*Math.PI*2,hot:Math.random()<.09}
      })
    }
    const sampleHeadline=()=>{
      const stageRect=stage.getBoundingClientRect(),rect=target.getBoundingClientRect(),style=getComputedStyle(target)
      if(rect.width<2||rect.height<2)return
      const scale=.5,off=document.createElement('canvas')
      off.width=Math.max(2,Math.round(width*scale));off.height=Math.max(2,Math.round(height*scale))
      const o=off.getContext('2d',{willReadFrequently:true});o.scale(scale,scale)
      const fontSize=parseFloat(style.fontSize),lineHeight=parseFloat(style.lineHeight)||fontSize*.84
      o.font=`${style.fontWeight||400} ${fontSize}px ${style.fontFamily}`;o.textAlign='center';o.textBaseline='middle'
      const centerX=rect.left-stageRect.left+rect.width/2,top=rect.top-stageRect.top
      o.fillStyle='#F4EDE3';o.fillText('UMA MARCA INTEIRA.',centerX,top+lineHeight*.5)
      o.fillStyle='#d7920b';o.fillText('NÃO PEÇAS SOLTAS.',centerX,top+lineHeight*1.5)
      const data=o.getImageData(0,0,off.width,off.height).data,pool=[]
      for(let y=0;y<off.height;y+=2)for(let x=0;x<off.width;x+=2){
        const k=(y*off.width+x)*4
        if(data[k+3]>105)pool.push({x:x/scale,y:y/scale,c:[data[k],data[k+1],data[k+2]]})
      }
      if(pool.length<120)return
      for(let i=pool.length-1;i>0;i--){const j=(Math.random()*(i+1))|0;[pool[i],pool[j]]=[pool[j],pool[i]]}
      points.forEach((p,i)=>{const t=pool[i%pool.length];p.tx=t.x;p.ty=t.y;p.color=t.c})
      targetsReady=true
    }
    const resize=()=>{
      const rect=stage.getBoundingClientRect();width=Math.max(320,rect.width||innerWidth);height=Math.max(520,rect.height||innerHeight)
      /* O S25 Ultra tem devicePixelRatio perto de 3.5. Cada ponto a mais
         de dpr e area de canvas que precisa ser limpa e repintada todo
         quadro, ao quadrado. Poeira desfocada nao mostra resolucao: 1.1
         no celular pinta menos da metade dos pixels que 1.6 pintava. */
      dpr=Math.min(window.devicePixelRatio||1,celular?1.1:1.6)
      canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr)
      ctx.setTransform(dpr,0,0,dpr,0,0)
      targetsReady=false;requestAnimationFrame(sampleHeadline)
    }
    const readScroll=()=>{
      const rect=hero.getBoundingClientRect(),travel=Math.max(1,hero.offsetHeight-innerHeight)
      scrollProgress=clamp(-rect.top/travel)
    }
    const draw=now=>{
      if(!alive)return
      frame=requestAnimationFrame(draw)
      /* Poeira girando nao precisa de 60fps: a 32ms ela le igual e sobra
         metade do orcamento de quadro para a rolagem responder ao dedo. */
      if(celular&&now-ultimoQuadro<32)return
      ultimoQuadro=now
      const morph=targetsReady?smooth(clamp((scrollProgress-.045)/.255)):0
      const materialize=smooth(clamp((scrollProgress-.285)/.125))
      const dustAlpha=1-materialize*.98
      /* Escrever em .style todo quadro invalida o layout do titulo mesmo
         quando o valor nao mudou -- e parado isso acontece 60x por
         segundo a toa. E blur() sobre texto Anton de 68px e dos filtros
         mais caros que existem: no celular ele sai e ficam so opacity e
         translate, que a GPU resolve sem repintar nada. */
      if(materialize!==ultimoMat){
        ultimoMat=materialize
        sceneCopy.style.opacity=String(materialize)
        sceneCopy.style.transform=`translateY(${((1-materialize)*18).toFixed(2)}px)`
        if(!celular)sceneCopy.style.filter=`blur(${((1-materialize)*10).toFixed(2)}px)`
      }
      const angle=now*.00014*(1-morph*.72),tilt=-.18+morph*.14
      const ca=Math.cos(angle),sa=Math.sin(angle),ct=Math.cos(tilt),st=Math.sin(tilt)
      ctx.clearRect(0,0,width,height);ctx.globalCompositeOperation='lighter'
      const cx=width*(innerWidth<720?.54:.76),cy=height*.49,radius=Math.min(width,height)*(innerWidth<720?.24:.255)
      points.forEach(p=>{
        const x1=p.sx*ca-p.sz*sa,z1=p.sx*sa+p.sz*ca,y1=p.sy*ct-z1*st,z2=p.sy*st+z1*ct
        const perspective=1/(1.58-z2*.32),sphereX=cx+x1*radius*perspective,sphereY=cy+y1*radius*perspective
        const px=sphereX+(p.tx-sphereX)*morph,py=sphereY+(p.ty-sphereY)*morph
        const depth=.32+.68*(z2+1)/2,twinkle=.8+.2*Math.sin(now*.0018+p.seed)
        const base=p.hot?[215,146,11]:[222,196,163],col=p.color
        const rr=Math.round(base[0]+(col[0]-base[0])*morph),gg=Math.round(base[1]+(col[1]-base[1])*morph),bb=Math.round(base[2]+(col[2]-base[2])*morph)
        const alpha=Math.max(.025,depth*twinkle*dustAlpha)
        ctx.beginPath();ctx.fillStyle=`rgba(${rr},${gg},${bb},${alpha})`;ctx.arc(px,py,(1.35-morph*.22)*perspective,0,Math.PI*2);ctx.fill()
      })
      ctx.globalCompositeOperation='source-over'
    }
    /* O laco era infinito: a poeira continuava sendo desenhada enquanto o
       visitante lia os servicos, a IA e o rodape, roubando quadros de
       secoes que nem sabem que ela existe. Agora ele so existe enquanto a
       hero esta por perto. */
    const ligar=()=>{if(alive&&!frame)frame=requestAnimationFrame(draw)}
    const desligar=()=>{if(frame){cancelAnimationFrame(frame);frame=0}}
    const olho=new IntersectionObserver(([e])=>{e.isIntersecting?ligar():desligar()},{rootMargin:'15% 0px'})
    buildSphere();resize();readScroll();document.fonts?.ready?.then(()=>{if(alive)sampleHeadline()})
    if(reduced){sceneCopy.style.opacity='1';sceneCopy.style.filter='none';sceneCopy.style.transform='none';return undefined}
    addEventListener('resize',resize);addEventListener('scroll',readScroll,{passive:true});olho.observe(hero)
    return()=>{alive=false;desligar();olho.disconnect();removeEventListener('resize',resize);removeEventListener('scroll',readScroll);sceneCopy.style.opacity='';sceneCopy.style.filter='';sceneCopy.style.transform=''}
  },[])
  return <div className="hero-dust" aria-hidden="true"><canvas ref={canvasRef}/><span>POEIRA → MENSAGEM</span></div>
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
  return <form className="contact-form" onSubmit={submit} noValidate data-final-reveal>
    <div className="form-meta" data-final-reveal><span>DIAGNÓSTICO GRATUITO</span><b>BRIEFING DIRETO</b></div>
    <div className="form-row" data-final-reveal><label><span>SEU NOME *</span><input name="nome" required autoComplete="name" placeholder="Como podemos chamar você?"/></label><label><span>WHATSAPP *</span><input name="telefone" required inputMode="tel" autoComplete="tel" placeholder="(61) 99999-9999"/></label></div>
    <label data-final-reveal><span>EMPRESA OU @ DO INSTAGRAM</span><input name="empresa" autoComplete="organization" placeholder="Nome da empresa ou perfil"/></label>
    <label data-final-reveal><span>O QUE VOCÊ PRECISA AGORA? *</span><select name="interesse" required defaultValue=""><option value="" disabled>Selecione</option><option>Gestão de redes sociais</option><option>Criação de conteúdo</option><option>Design e identidade visual</option><option>Site ou landing page</option><option>Aplicativo ou sistema</option><option>Tráfego pago</option><option>Tráfego orgânico / SEO</option><option>Treinamento em IA para a equipe</option><option>Gestão completa de marketing</option><option>Ainda não sei — preciso de ajuda</option></select></label>
    <label data-final-reveal><span>INVESTIMENTO MENSAL PREVISTO</span><select name="investimento" defaultValue=""><option value="">Selecione</option><option>Ainda estou avaliando</option><option>Até R$ 1.500 / mês</option><option>R$ 1.500 a R$ 3.000 / mês</option><option>R$ 3.000 a R$ 6.000 / mês</option><option>Acima de R$ 6.000 / mês</option></select></label>
    <label data-final-reveal><span>QUAL O SEU OBJETIVO EM UMA FRASE?</span><textarea name="objetivo" rows="2" placeholder="O que precisa mudar primeiro?"/></label>
    <input className="form-hp" type="text" name="website" tabIndex="-1" autoComplete="off" aria-hidden="true"/>
    <label className="form-consent" data-final-reveal><input type="checkbox" name="consentimento" required/><span>Autorizo a Mind Sculptor a entrar em contato pelo WhatsApp com as informações que enviei.</span></label>
    <button className="ms-btn" type="submit" data-final-reveal><span>ENVIAR E FALAR NO WHATSAPP</span><ArrowUpRight size={18}/></button>
    <small className="form-status" aria-live="polite" data-final-reveal>{status}</small>
  </form>
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
    let playFinal=()=>{}
    const fechados=[]
    let redeTimer=0

    /* No celular a barra de endereco some e reaparece durante a rolagem, e
       isso muda innerHeight. Por padrao o ScrollTrigger entende isso como
       "a janela mudou de tamanho" e RECALCULA tudo no meio do movimento --
       dai o solavanco e o pulo de posicao que parecem travamento. */
    ScrollTrigger.config({ignoreMobileResize:true})

    /* Um scrub de 1 segundo quer dizer "leve um segundo inteiro para
       alcancar a rolagem". No desktop, com rolagem inercial, isso le como
       suavidade. No celular o dedo esta ENCOSTADO no conteudo: um segundo
       entre o dedo e a imagem e exatamente a sensacao de que a pagina nao
       responde. No toque a perseguicao tem que ser curta. */
    /* E tem um agravante so da hero: a poeira do canvas le a rolagem
       direto, sem scrub nenhum, enquanto as cenas vinham com atraso. Os
       dois andavam fora de passo e o olho le desencontro como engasgo.
       Com a perseguicao curta eles voltam a andar juntos. */
    const perseguir=ScrollTrigger.isTouch===1?.12:.7

    const ctx=gsap.context(()=>{
      gsap.timeline({defaults:{ease:'power3.out'}}).to('.loader-center i',{scaleX:1,duration:.6}).to('.loader',{yPercent:-100,duration:.9,ease:'power4.inOut'},.72).from('.site-header',{y:-90,duration:.65},1.18)
      if(!reduced){
        const hero=gsap.timeline({scrollTrigger:{trigger:'.hero-story',start:'top top',end:'bottom bottom',scrub:perseguir}})
        hero.to('.scene-1',{autoAlpha:0,scale:1.08,duration:1}).fromTo('.scene-2',{autoAlpha:0,scale:1.08},{autoAlpha:1,scale:1,duration:1},'<').to('.scene-2',{autoAlpha:0,scale:1.07,duration:1}).fromTo('.scene-3',{autoAlpha:0,scale:1.08},{autoAlpha:1,scale:1,duration:1},'<')
        gsap.to('.hero-sticky .scene-bg',{xPercent:2.5,yPercent:-1.5,ease:'none',scrollTrigger:{trigger:'.hero-story',start:'top top',end:'bottom bottom',scrub:perseguir}})
        /* `opaco:false` e para quem JA tem opacidade propria — o cartao de
           servico vive em .37 e acende em 1 quando fica ativo. Se a entrada
           terminasse cravando opacity:1, ela apagaria esse mecanismo. O
           recorte sozinho ja esconde a peca, entao a opacidade nem faz falta. */
        const fechado=opaco=>({...(opaco?{opacity:0}:{}),clipPath:'inset(42% 0 42% 0 round 18px)',
          filter:'blur(9px) brightness(1.45) saturate(1.1)',y:18,z:-60,rotationX:10,scaleY:.86,
          transformPerspective:1200,transformOrigin:'50% 100%'})
        const aberto=opaco=>({...(opaco?{opacity:1}:{}),clipPath:'inset(-60% -60% -60% -60% round 0px)',
          filter:'blur(0px) brightness(1) saturate(1)',y:0,z:0,rotationX:0,scaleY:1})
        const revelar=(seletor,{opaco=true,escada=0,inicio='top 86%'}={})=>{
          const itens=gsap.utils.toArray(seletor)
          if(!itens.length)return
          itens.forEach(el=>{
            const grupo=escada?Array.from(el.children):[el]
            gsap.set(grupo,fechado(opaco))
            fechados.push([el,grupo,opaco])
            gsap.to(grupo,{...aberto(opaco),duration:.92,ease:'power4.out',stagger:escada,
              scrollTrigger:{trigger:el,start:inicio,once:true}})
          })
        }
        revelar('[data-reveal]')
        revelar('.service-entry',{opaco:false})
        revelar('.stage-visual',{opaco:false})
        revelar('.manifesto-media',{opaco:false})
        revelar('.final-cta footer',{escada:.09,inicio:'top 95%'})
        gsap.utils.toArray('.service-entry').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 52%',end:'bottom 52%',onEnter:()=>setActiveService(i),onEnterBack:()=>setActiveService(i)}))
        gsap.utils.toArray('.contrast-step').forEach((el,i)=>ScrollTrigger.create({trigger:el,start:'top 55%',end:'bottom 55%',onEnter:()=>setContrastFrame(i),onEnterBack:()=>setContrastFrame(i)}))
        const ai=gsap.timeline({scrollTrigger:{trigger:'.ai-story',start:'top top',end:'bottom bottom',scrub:perseguir}})
        ai.to('.ai-copy-1',{autoAlpha:0,y:-25,duration:.7}).fromTo('.ai-copy-2',{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.7},'<.2').to('.ai-copy-2',{autoAlpha:0,y:-25,duration:.7}).fromTo('.ai-copy-3',{autoAlpha:0,y:35},{autoAlpha:1,y:0,duration:.7},'<.2').to('.ai-sticky>img',{scale:1.07,filter:'brightness(1.18)',duration:1},0)
        gsap.fromTo('.method-route-fill',{scaleX:0},{scaleX:1,ease:'none',scrollTrigger:{trigger:'.method-system',start:'top 75%',end:'bottom 45%',scrub:perseguir}})
        gsap.utils.toArray('.method-card').forEach((el,i)=>gsap.from(el,{opacity:0,y:45,duration:.75,delay:i*.08,scrollTrigger:{trigger:el,start:'top 88%',once:true}}))
        gsap.to('.manifesto-media',{yPercent:-7,scrollTrigger:{trigger:'.type-manifesto',start:'top top',end:'bottom bottom',scrub:perseguir}})

        /* O CORREDOR DE LED: A SEÇÃO INTEIRA É O VÍDEO, E O SCROLL É QUEM
           O FAZ ANDAR.

           O vídeo nunca recebe play(). O progresso da seção vira
           `currentTime`, então os LEDs vão acendendo o caminho e o portal
           vai abrindo no ritmo em que a pessoa rola -- e rolando de volta,
           apaga de volta, porque é a mesma linha do tempo ao contrário.

           Quatro cuidados que esse arranjo exige:

           CARREGAR TARDE. São 1,6 MB (910 KB no celular). Baixar isso na
           abertura da página atrasaria o que a pessoa vê primeiro, para
           uma seção que está a cinco rolagens de distância. O `src` só é
           escrito quando a seção chega a duas telas de distância.

           DUAS FONTES. O arquivo é 16:9. Num celular em pé, `cover`
           jogaria fora dois terços da largura. A versão do celular é um
           recorte 9:16 feito no ffmpeg. matchMedia decide qual baixar --
           e decide ANTES de baixar, para nunca baixar as duas.

           QUANTIZAR. Escrever `currentTime` manda o navegador procurar o
           quadro; pedir isso 60x por segundo com valores que mal mudaram
           é trabalho que ele faz e joga fora. O alvo é arredondado para o
           quadro mais próximo (12fps aqui) e só vai quando muda de fato.

           DESTRAVAR NO iOS. O Safari recusa mexer no tempo de um vídeo
           que nunca tocou. O destravamento é um play/pause no primeiro
           toque da pessoa -- um gesto de usuário, que é o que ele exige. */
        const corredor=document.querySelector('.mm-fundo')
        if(corredor){
          const QUADRO=1/12
          const fonte=matchMedia('(max-width:820px)').matches
            ? '/video/manifesto-fundo-cel.mp4'
            : '/video/manifesto-fundo.mp4'
          let carregado=false,destravado=false,ultimo=-1
          const carregar=()=>{
            if(carregado)return
            carregado=true
            corredor.src=fonte
            corredor.load()
          }
          const destravar=()=>{
            if(destravado)return
            destravado=true
            carregar()
            corredor.play().then(()=>corredor.pause()).catch(()=>{})
            removeEventListener('touchstart',destravar);removeEventListener('pointerdown',destravar)
          }
          addEventListener('touchstart',destravar,{passive:true})
          addEventListener('pointerdown',destravar,{passive:true})
          ScrollTrigger.create({trigger:'.type-manifesto',start:'top bottom+=200%',once:true,onEnter:carregar,onEnterBack:carregar})
          /* O FECHO.
             O video NAO termina junto com o pin. Ele termina em 80% do
             curso, e os 20% que sobram sao o portal ja aceso, parado, antes
             de a secao soltar.

             Duas razoes. A primeira e o scrub: ele persegue a rolagem com
             atraso, entao quando o progresso marca 1 o video ainda esta
             chegando -- medi 7.83 de 7.92 no fim do curso. A secao soltava
             com o portal quase aceso. A cauda da a ele a folga para
             alcancar. A segunda e o olho: uma imagem que chega no mesmo
             instante em que sai nao e vista. O portal precisa de um tempo
             aceso e parado para ser o fecho da cena, e nao so o ultimo
             quadro de um arquivo. */
          const FECHO=.8
          const andar=p=>{
            const dur=corredor.duration
            if(!dur||!isFinite(dur))return
            const q=p<FECHO?p/FECHO:1
            const alvo=Math.round(q*(dur-QUADRO)/QUADRO)*QUADRO
            if(alvo===ultimo)return
            ultimo=alvo
            try{corredor.currentTime=alvo}catch{/* ainda sem metadados */}
          }
          const passo={p:0}
          gsap.to(passo,{p:1,ease:'none',
            /* O curso do PIN, igual a hero: `top top` e o instante em que o
               palco gruda na tela, `bottom bottom` e quando ele solta. Entre
               os dois a pagina rola 120vh sem que a secao saia -- e e nesse
               trecho que o corredor acende inteiro ate o portal. Usar a
               travessia da secao, como antes, fazia o video ainda estar no
               meio do caminho quando ela ja tinha ido embora. */
            scrollTrigger:{trigger:'.type-manifesto',start:'top top',end:'bottom bottom',scrub:perseguir},
            onUpdate(){andar(passo.p)}})
          corredor.addEventListener('loadedmetadata',()=>{ultimo=-1;andar(passo.p)})

          /* A COREOGRAFIA DO PIN, EM TRES ATOS.

             O curso preso vale 1.0 e e lido como tres rolagens, entao cada
             rolagem e um terco. Os tempos abaixo estao nessa moeda:

             O curso agora tem o trecho do video (ate .80) mais a cauda do
             portal aceso. As marcas abaixo vivem dentro do trecho do
             video, por isso sao .80 das de antes -- a METADE DA SEGUNDA
             rolagem continua sendo a metade da segunda rolagem DE VIDEO.

               0    ate .40   ato 1 -- o corredor anda com o titulo e o
                              cartao na tela, como ate agora
               .40  ate .58   ato 2 -- a metade da segunda rolagem de
                              video: titulo e cartao se retiram e o veu se
                              dissolve. O video deixa de ser fundo de uma
                              secao e passa a ser a secao
               .58  ate .80   ato 3 -- o corredor sozinho, em opacidade
                              cheia, ate o portal abrir
               .80  ate 1     o portal aceso, parado. So aqui a secao solta

             O cartao sai descendo e o titulo subindo: separar as direcoes
             evita que os dois virem uma coisa so sumindo, e deixa claro que
             estao dando lugar, nao apagando.

             autoAlpha, e nao opacity: alem de apagar ele poe
             `visibility:hidden`, entao o que saiu nao continua clicavel por
             cima do video. */
          const coreografia=gsap.timeline({
            scrollTrigger:{trigger:'.type-manifesto',start:'top top',end:'bottom bottom',scrub:perseguir}})
          coreografia
            /* O espacador. Uma timeline com scrub nao e lida em fracao do
               scroll: ela e lida em fracao da PROPRIA duracao. Sem isto a
               duracao seria .73 (o ultimo tween acaba ali), entao o fim do
               curso cairia no tempo .73 e tudo que marquei abaixo aconteceria
               cedo demais -- foi o que a medicao mostrou. Um tween vazio de
               duracao 1 fixa a regua: agora tempo e progresso sao a mesma
               coisa, e .50 e exatamente a metade do curso. */
            .to({},{duration:1},0)
            .to('.manifesto-type', {autoAlpha:0,y:-54,duration:.18,ease:'power2.in'},.40)
            .to('.manifesto-media',{autoAlpha:0,y:64,scale:.93,duration:.18,ease:'power2.in'},.40)
            .to('.mm-veu',         {opacity:0,duration:.16,ease:'power1.inOut'},.42)

          /* E o fecho: a ultima secao nao espera o pin soltar para so
             entao comecar a se montar -- isso daria um corte seco entre o
             portal e ela. Assim que o video fecha e o portal acende, as
             revelacoes dela sao disparadas: elas correm durante a cauda,
             entao quando o palco solta ela JA esta se formando, e o movimento parece continuar de uma para a outra.
             playFinal so toca uma vez; rolar de volta nao desmonta. */
          ScrollTrigger.create({trigger:'.type-manifesto',start:'top top',end:'bottom bottom',
            onUpdate:self=>{if(self.progress>.84)playFinal()}})
        }

        /* O brilho da borda só roda com a seção em cena. Animação
           em laço fora de quadro é bateria queimada sem ninguém olhando. */
        /* `cena-viva` e a chave geral das animacoes em laco: o CSS deixa
           tudo em animation-play-state:paused e so a secao em cena roda.
           Os LEDs dos cards repintam um gradiente conico a cada quadro e
           ainda passam por drop-shadow -- sao sete cards, nao e de graca. */
        for(const alvo of ['.type-manifesto','.work','.vision','.method'])
          ScrollTrigger.create({trigger:alvo,start:'top bottom',end:'bottom top',
            onToggle:self=>document.querySelector(alvo)?.classList.toggle('cena-viva',self.isActive)})
        /* O FINAL EM DUAS COLUNAS, CADA UMA NO SEU TEMPO.
           A versao anterior usava UM gatilho em `.final-v4`, e essa secao
           tem 125svh com o conteudo encostado no topo: quando "a secao
           entrava", o formulario ainda estava uns 800px abaixo da dobra.
           A animacao rodava inteira fora de quadro e sobrava so o
           resultado. Agora quem dispara e o proprio bloco que o olho
           alcanca, nao a caixa gigante em volta dele. */
        const cenasFinais=[]
        const cenaFinal=(seletor,inicio,montar)=>{
          const el=document.querySelector(seletor)
          if(!el)return
          const cena={tocou:false,montar}
          cenasFinais.push(cena)
          const tocar=()=>{if(cena.tocou)return;cena.tocou=true;montar(false)}
          ScrollTrigger.create({trigger:el,start:inicio,once:true,onEnter:tocar,onEnterBack:tocar})
        }

        const finalCopia=gsap.utils.toArray('.final-v4 .final-copy [data-final-reveal]')
        gsap.set(finalCopia,fechado(true))
        cenaFinal('.final-v4 .final-copy','top 82%',atalho=>
          gsap.to(finalCopia,{...aberto(true),duration:atalho?.5:.9,ease:'power4.out',
            stagger:atalho?0:.08,overwrite:'auto'}))

        /* O formulario em dois tempos no mesmo gatilho: o painel de vidro
           materializa primeiro e os campos se escrevem dentro dele. */
        const painelForm=document.querySelector('.contact-form')
        const camposForm=gsap.utils.toArray('.contact-form [data-final-reveal]')
        if(painelForm){
          gsap.set([painelForm,...camposForm],fechado(true))
          cenaFinal('.contact-form','top 86%',atalho=>{
            if(atalho){gsap.to([painelForm,...camposForm],{...aberto(true),duration:.5,
              ease:'power3.out',overwrite:'auto'});return}
            gsap.timeline()
              .to(painelForm,{...aberto(true),duration:.84,ease:'power4.out'})
              .to(camposForm,{...aberto(true),duration:.76,ease:'power4.out',stagger:.065},.2)
          })
        }

        /* A rede so forca quem ficou para tras: nunca atropela uma
           animacao em curso, porque cada cena marca que ja tocou. */
        playFinal=()=>{for(const c of cenasFinais){if(c.tocou)continue;c.tocou=true;c.montar(true)}}
      }
    },root)
    /* REDE DE SEGURANÇA. A entrada por transformação deixa a peça
       RECORTADA até o gatilho abrir — o que significa que um gatilho que
       não dispara não degrada a animação: ele APAGA o conteúdo, e em
       silêncio. Então qualquer peça que já esteja na tela e ainda esteja
       fechada é aberta na marra. Custa um retângulo por item só enquanto
       sobrar item fechado; quando a lista esvazia, o ouvinte sai. */
    const abrirPresos=()=>{
      for(let i=fechados.length-1;i>=0;i--){
        const [el,grupo,opaco]=fechados[i]
        const r=el.getBoundingClientRect()
        if(r.bottom<=0||r.top>=innerHeight)continue
        gsap.to(grupo,{...(opaco?{opacity:1}:{}),clipPath:'inset(-60% -60% -60% -60% round 0px)',
          filter:'blur(0px) brightness(1) saturate(1)',y:0,z:0,rotationX:0,scaleY:1,
          duration:.6,ease:'power3.out',overwrite:'auto'})
        fechados.splice(i,1)
      }
      if(!fechados.length)removeEventListener('scroll',rede)
    }
    const rede=()=>{clearTimeout(redeTimer);redeTimer=setTimeout(abrirPresos,420)}
    /* A REDE DO FINAL, AGORA DEPOIS DO GATILHO E NAO ANTES. A primeira
       versao disparava com `rect.top < innerHeight` -- um pixel da secao
       aparecendo no rodape ja bastava. Como a secao tem 125svh com o
       conteudo no topo, ela VENCIA o gatilho de verdade e tocava tudo
       abaixo da dobra. Rede que chega antes do trapezista nao e rede: e o
       chao. Agora ela so age quando o conteudo JA DEVERIA ter aberto,
       isto e, quando o proprio bloco passou do meio da tela. */
    const finalSafety=()=>{
      const alvo=document.querySelector('.contact-form')||document.querySelector('.final-v4 .final-copy')
      if(!alvo)return
      if(alvo.getBoundingClientRect().top<innerHeight*.55)playFinal()
    }
    addEventListener('scroll',finalSafety,{passive:true})
    addEventListener('scroll',rede,{passive:true})
    const safetyTimer=setTimeout(finalSafety,220)
    const redeInicial=setTimeout(abrirPresos,1400)
    return()=>{clearTimeout(safetyTimer);clearTimeout(redeInicial);clearTimeout(redeTimer)
      removeEventListener('scroll',finalSafety);removeEventListener('scroll',rede);ctx.revert()}
  },[])
  const current=services[activeService]
  const activeContrast=Math.floor(contrastFrame/2),contrastSolved=contrastFrame%2===1,currentContrast=contrast[activeContrast]
  const goContrast=index=>{
    const section=contrastSection.current
    if(!section)return
    const travel=Math.max(0,section.offsetHeight-window.innerHeight),top=window.scrollY+section.getBoundingClientRect().top
    window.scrollTo({top:top+travel*((index*2)/(contrast.length*2-1)),behavior:'smooth'})
  }
  /* PORQUE ESTAS SECOES SAO MEMORIZADAS.
     `activeService` e `contrastFrame` sao estado React escrito pelo SCROLL.
     Sem isto, cada degrau de rolagem re-renderiza a arvore inteira -- oito
     servicos, quatro trabalhos, tres visoes, o heroi, o metodo, o rodape --
     so para trocar uma classe e um paragrafo. No desktop passa; no celular
     e o que faz a pagina parecer que engasga a cada etapa.

     `useMemo` com dependencia vazia devolve SEMPRE o mesmo elemento, e o
     React entao pula a reconciliacao desse ramo inteiro. Nada aqui depende
     de estado, entao a lista vazia e honesta: estas secoes sao as mesmas
     do primeiro ao ultimo quadro. O que muda com o scroll sao as duas
     secoes que ficaram DE FORA -- servicos e contraste. */
  const cenaHeroi=useMemo(()=><>
      <section className="hero-story" id="topo"><div className="hero-sticky" data-cursor="EXPLORAR">
        <div className="hero-scene scene-1"><img className="scene-bg" src="/art/hero-architecture-v3.webp" alt="Arquitetura digital criada para a Mind Sculptor"/><SignalOverlay variant="hero"/><div className="scene-shade"/><div className="scene-copy"><p>UMA AGÊNCIA COMPLETA · BRASÍLIA</p><h1>MARKETING QUE<br/><em>NÃO PASSA</em><br/>DESPERCEBIDO.</h1></div></div>
        <div className="hero-scene scene-2"><img className="scene-bg" src="/art/web-portal-v3.webp" alt="Portal digital tridimensional criado para a Mind Sculptor"/><SignalOverlay variant="portal"/><div className="scene-shade"/><div className="scene-copy centered"><p>DESIGN · EXPERIÊNCIA · CONVERSÃO</p><h2>UMA MARCA INTEIRA.<br/><em>NÃO PEÇAS SOLTAS.</em></h2></div></div>
        <div className="hero-scene scene-3"><img className="scene-bg" src="/art/traffic-routing-v3.webp" alt="Sistema de tráfego com destino criado para a Mind Sculptor"/><SignalOverlay variant="traffic"/><div className="scene-shade"/><div className="scene-copy centered"><p>CONTEÚDO · PÁGINA · TRÁFEGO · ATENDIMENTO</p><h2>ESTRATÉGIA QUE<br/><em>CHEGA ATÉ A VENDA.</em></h2></div></div>
        <HeroDustMorph/>
        <div className="hero-rail"><span>MS / IMMERSIVE SYSTEM</span><span>01 — 03</span><span>BRASÍLIA · 2026</span></div><div className="hero-nav"><a href="#visao">VISÃO</a><i>/</i><a href="#servicos">SERVIÇOS</a><i>/</i><a href="#inteligencia">IA</a></div><a className="hero-scroll" href="#visao"><span>ROLE PARA EXPLORAR</span><ArrowDown size={15}/></a>
      </div></section>
  </>,[])

  const cenaVisao=useMemo(()=>
      <section className="vision vision-v4" id="visao"><div className="vision-copy" data-reveal><p className="section-label">01 / NOSSA VISÃO</p><h2>NÃO CRIAMOS<br/>PEÇAS SOLTAS.<br/><em>CRIAMOS CAMINHOS.</em></h2><p>Design, conteúdo, tecnologia e mídia trabalhando como um único ambiente — da primeira impressão até a próxima ação.</p></div><div className="vision-gallery">{visionCards.map(([src,meta,title],i)=><figure className={'vision-card vision-card-'+(i+1)} key={src} data-reveal><img src={src} alt={title}/><i className="led" aria-hidden="true"/><div className="vision-card-shade"/><figcaption><Zap size={15}/><span>{meta}</span><b>{title}</b></figcaption>{i===0&&<SignalOverlay variant="vision"/>}</figure>)}</div></section>
  ,[])

  const cenaTrabalhos=useMemo(()=>
      <section className="work" id="trabalhos"><div className="work-head" data-reveal><p className="section-label">03 / CENAS ORIGINAIS</p><h2>A IMAGEM NÃO<br/><em>DECORA A IDEIA.</em><br/>ELA É A IDEIA.</h2></div><div className="work-grid">{scenes.map(([src,label],i)=><figure className={'work-card work-'+(i+1)} key={src} data-reveal data-tilt data-cursor="VER"><img src={src} alt={label}/><i className="led" aria-hidden="true"/><figcaption><span>0{i+1}</span><b>{label}</b><ArrowUpRight size={17}/></figcaption></figure>)}</div></section>
  ,[])

  const cenaFecho=useMemo(()=><>
      <AIStory/>
      <section className="method method-v4" id="metodo"><div className="method-head" data-reveal><p className="section-label">06 / DO DIAGNÓSTICO À EVOLUÇÃO</p><h2>PROCESSO CLARO.<br/><em>SEM PEÇA SOLTA.</em></h2><p>Você enxerga o que entra, o que decidimos, o que colocamos em prática e como o trabalho evolui.</p></div><div className="method-system"><div className="method-route"><i/><b className="method-route-fill"/></div><div className="method-grid">{process.map((step,i)=><article className="method-card" key={step.n}><div className="method-card-top"><span>{step.n}</span><small>ETAPA {i+1} / 4</small></div><div className="method-node"><i/><b>{i+1}</b></div><h3>{step.title}</h3><p>{step.copy}</p><div className="method-inputs">{step.items.map(item=><span key={item}>{item}</span>)}</div><div className="method-output"><small>ENTREGA DA ETAPA</small><b>{step.output}</b></div></article>)}</div><div className="method-legend"><span><i/> ENTRADA</span><span><i/> DECISÃO</span><span><i/> ENTREGA</span><b>UM CICLO ALIMENTA O PRÓXIMO</b></div></div></section>
      <section className="type-manifesto"><div className="manifesto-palco"><video className="mm-fundo" muted playsInline preload="none" aria-hidden="true"/><i className="mm-veu" aria-hidden="true"/><div className="manifesto-type" data-reveal><div className="manifesto-line"><span>VALOR</span><b>→</b></div><div className="manifesto-line manifesto-line-amber"><span>NÃO É</span></div><div className="manifesto-line"><span>EXPLICADO.</span></div><strong>É PERCEBIDO.</strong><p>Design, mensagem e experiência fazem a mesma promessa — antes que o cliente precise perguntar.</p></div><figure className="manifesto-media"><i className="led" aria-hidden="true"/><img src="/art/traffic-routing-v3.webp" alt="Fluxo estratégico tridimensional criado para a Mind Sculptor"/><figcaption><span>MIND / ROUTE</span><b>CADA AÇÃO TEM<br/>UM DESTINO.</b></figcaption></figure></div></section>
      <section className="final-cta final-v4" id="contato"><div className="final-mark">MIND</div><div className="final-content"><div className="final-copy"><p className="section-label" data-final-reveal>07 / DIAGNÓSTICO GRATUITO</p><h2 data-final-reveal>VAMOS OLHAR<br/>O SEU NEGÓCIO<br/><em>DE PERTO.</em></h2><p data-final-reveal>Preencha os campos. A conversa segue direto no WhatsApp com quem entende do assunto — sem robô e sem funil de vendedor.</p><ul className="diagnostic-list" data-final-reveal><li><Check size={16}/>Análise do seu perfil, site e presença digital atual</li><li><Check size={16}/>Os três gargalos que mais travam sua venda hoje</li><li><Check size={16}/>Proposta com escopo e valor fechados, se fizer sentido</li><li><Check size={16}/>Zero compromisso: se não for a hora, a gente fala isso</li></ul><a className="ms-btn ms-btn-dark" href={whatsapp} target="_blank" rel="noreferrer" data-final-reveal><span>PREFIRO CHAMAR DIRETO</span><ArrowUpRight size={18}/></a><p className="direct-contact" data-final-reveal>(61) 99329-1126 · BRASÍLIA/DF · TODO O BRASIL</p></div><ContactForm/></div><footer><Brand/><span>BRASÍLIA/DF · TODO O BRASIL</span><span>© 2026 MIND SCULPTOR</span></footer></section>
  </>,[])

  return <div ref={root} className="site-shell"><Loader/><MouseGlow/><AmbientField/><div className="page-noise"/>
    <SiteHeader/>
    <main>
      {cenaHeroi}
      {cenaVisao}
      <section className="service-system services-v4" id="servicos"><div className="service-intro" data-reveal><p className="section-label">02 / O ECOSSISTEMA</p><h2>OITO FRENTES.<br/><em>UMA ÚNICA DIREÇÃO.</em></h2><p>Agora cada capacidade é mostrada em uso: o cliente vê o que acontece, como se conecta e qual movimento vem depois.</p></div><div className="service-layout"><div className="service-list">{services.map((service,index)=>{const Icon=service.icon;return <article className={'service-entry '+(index===activeService?'active':'')} key={service.n}><div className="service-entry-head"><span>{service.n}</span><small>{service.kicker}</small><Icon size={18}/></div><h3>{service.title}</h3><p>{service.copy}</p><div>{service.tags.map(tag=><span key={tag}>{tag}</span>)}</div><a className="ms-btn ms-btn-inline" href={whatsapp} target="_blank" rel="noreferrer"><span>CONVERSAR SOBRE ISSO</span><ArrowUpRight size={16}/></a><div className="mobile-service-art"><ServiceVisual service={service}/></div></article>})}</div><aside className="service-stage v4-stage" aria-live="polite"><div className="stage-visual" key={activeService}><ServiceVisual service={current}/></div><div className="stage-caption"><span>{current.n} / 08 · {current.kicker}</span><b>{current.title}</b><p>{current.copy}</p></div></aside></div></section>
      {cenaTrabalhos}
      <section ref={contrastSection} className={'contrast contrast-v4 '+(contrastSolved?'is-solved':'is-problem')} id="direcao"><div className="contrast-stage"><div className="contrast-bg" key={currentContrast.image}><img className="contrast-bg-gray" src={currentContrast.image} alt=""/><img className="contrast-bg-color" src={currentContrast.image} alt=""/><div className="contrast-vignette"/></div><p className="contrast-title">04 / A DIFERENÇA NA PRÁTICA</p><div className="contrast-count"><span>0{activeContrast+1}</span><i>/</i><b>04</b><small>{contrastSolved?'COM A MIND':'SEM DIREÇÃO'}</small></div><div className="contrast-left"><small>SEM DIREÇÃO</small><h3>{currentContrast.bad}</h3></div><div className="contrast-logo" aria-hidden="true"><div className="logo-halo"/><div className="logo-rotor"><img className="logo-face logo-gray" src="/art/logo-head-gray-3d-v4.webp" alt=""/><img className="logo-face logo-color" src="/art/logo-head-color-3d-v4.webp" alt=""/></div><div className="contrast-line"/></div><div className="contrast-right"><small>COM A MIND</small><h3>{currentContrast.good}</h3><p>{currentContrast.copy}</p></div><ol className="contrast-index" aria-label="Etapas da comparação">{contrast.map((item,i)=><li key={item.bad}><button type="button" aria-current={i===activeContrast?'true':'false'} onClick={()=>goContrast(i)}><i>0{i+1}</i><span>{item.bad}</span></button></li>)}</ol><div className="contrast-instruction"><span>{contrastSolved?'RESULTADO ILUMINADO':'PROBLEMA IDENTIFICADO'}</span><i/><b>CONTINUE ROLANDO</b></div></div><div className="contrast-scroll">{contrast.flatMap((item,i)=>[<div className="contrast-step" key={`${item.bad}-problema`}><span>0{i+1}A</span></div>,<div className="contrast-step" key={`${item.bad}-solucao`}><span>0{i+1}B</span></div>])}</div></section>
      {cenaFecho}
    </main>
    <a className="floating-whatsapp ms-btn" href={whatsapp} target="_blank" rel="noreferrer" aria-label="Falar com a Mind Sculptor no WhatsApp"><MessageCircle size={18}/><span>WHATSAPP</span><ArrowUpRight size={15}/></a>
  </div>
}
export default App
