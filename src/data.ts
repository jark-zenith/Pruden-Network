import type { LucideIcon } from 'lucide-react'
import { BrainCircuit, BookOpen, Boxes, FlaskConical, Globe2, HeartHandshake, Layers3, Palette, Users, Archive, Cpu, Network } from 'lucide-react'
export type Division={id:string;name:string;shortName:string;description:string;status:string;icon:LucideIcon;path:string}
export type Project={id:string;name:string;description:string;category:string;status:string;technologies:string[];featured:boolean;githubUrl?:string;liveUrl?:string}
export type NetworkNode={nodeId:string;name:string;type:string;status:string;connectedAt:string;lastSeen:string}
export const githubUrl='https://github.com/jark-zenith/Pruden-Network'
export const divisions:Division[]=[
{id:'labs',name:'PRUDEN LABS',shortName:'Labs',description:'Research, experimentation, prototypes, and emerging technology.',status:'ACTIVE',icon:FlaskConical,path:'/labs'},
{id:'ai',name:'JARK AI',shortName:'AI',description:'Artificial intelligence, intelligent systems, automation, and AI research.',status:'BUILDING',icon:BrainCircuit,path:'/projects'},
{id:'academy',name:'FUTURE ITECH ACADEMY',shortName:'Academy',description:'Practical technology education, project-based learning, and technical development.',status:'PLANNED',icon:BookOpen,path:'/academy'},
{id:'studios',name:'PRUDEN STUDIOS',shortName:'Studios',description:'Digital services, design, creative technology, and digital production.',status:'BUILDING',icon:Palette,path:'/studios'},
{id:'community',name:'PRUDEN COMMUNITY',shortName:'Community',description:'People, collaboration, events, learning, and technology communities.',status:'BUILDING',icon:Users,path:'/community'},
{id:'vault',name:'PRUDEN VAULT',shortName:'Vault',description:'Knowledge, documentation, research, archives, and the memory of the Network.',status:'PLANNED',icon:Archive,path:'/vault'}]
export const projects:Project[]=[
{id:'pruden-network',name:'PRUDEN NETWORK CORE',description:'The software-network layer for authenticated nodes, live presence, secure signaling, and device communication.',category:'NETWORK INFRASTRUCTURE',status:'BUILDING',technologies:['Node.js','HTTP','SSE','TypeScript'],featured:true,githubUrl},
{id:'jark-ai',name:'JARK AI',description:'An evolving home for intelligent systems, automation experiments, and applied AI research.',category:'ARTIFICIAL INTELLIGENCE',status:'IN DEVELOPMENT',technologies:['Python','AI','Automation'],featured:true,githubUrl},
{id:'future-itech',name:'FUTURE ITECH ACADEMY',description:'A practical learning system designed around building real technical foundations and projects.',category:'EDUCATION',status:'BUILDING',technologies:['Web','Learning','Systems'],featured:true,githubUrl},
{id:'pruden-labs',name:'PRUDEN LABS',description:'A space for early-stage ideas to become research notes, prototypes, and useful experiments.',category:'RESEARCH',status:'ACTIVE',technologies:['Research','Prototyping','Web'],featured:true,githubUrl}]
export const learningAreas=['Web Development','Programming','Python','JavaScript','AI','Linux','Git & GitHub','Cybersecurity','Networking','Systems']
export const technologyAreas=[{name:'NETWORKING',icon:Network},{name:'SOFTWARE',icon:Boxes},{name:'AI',icon:Cpu},{name:'WEB',icon:Globe2},{name:'AUTOMATION',icon:Network},{name:'RESEARCH',icon:FlaskConical},{name:'EDUCATION',icon:BookOpen},{name:'SYSTEMS',icon:Layers3}]
export const labStages=['IDEA','RESEARCH','PROTOTYPE','TEST','RESULT']
export const labs=[
{id:'LAB-001',title:'Network Intelligence',objective:'Build a software network that can discover nodes, carry signals, and become the foundation for future PRUDEN device infrastructure.',category:'NETWORK SYSTEMS',status:'ACTIVE',technologies:['Node.js','SSE','HTTP'],repository:githubUrl,documentation:'Core architecture in development'},
{id:'LAB-002',title:'Applied AI Workbench',objective:'Investigate practical workflows for intelligent tools without losing human control or clarity.',category:'AI RESEARCH',status:'EXPLORING',technologies:['Python','Automation'],repository:githubUrl,documentation:'Research in progress'}]
export const ecosystemIcons=[FlaskConical,BrainCircuit,BookOpen,Palette,HeartHandshake,Archive]