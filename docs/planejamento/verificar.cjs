// Verificação documental; não executa aplicação, rede, cobranças ou fornecedores.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {spawnSync} = require('node:child_process');
const {rf,rnf,rules,tasks,phases,config} = require('./dados.cjs');
const root = path.resolve(__dirname,'../..');
const generated=spawnSync(process.execPath,[path.join(__dirname,'gerar.cjs'),'--check'],{cwd:root,encoding:'utf8'});
assert.equal(generated.status,0,generated.stderr || generated.stdout);
const files=['README.md',...fs.readdirSync(path.join(root,'docs')).filter(f=>f.endsWith('.md')).map(f=>'docs/'+f)];
// Incluir os guias do monorepositório sem percorrer dependências ou artefatos locais.
function collectGuides(directory) {
 for(const entry of fs.readdirSync(path.join(root,directory),{withFileTypes:true})) {
  if(entry.isSymbolicLink()) continue;
  if(['node_modules','.next','.venv','__pycache__','build','dist','test-results','playwright-report'].includes(entry.name)||entry.name.endsWith('.egg-info')) continue;
  const relative=directory+'/'+entry.name;
  if(entry.isDirectory()) collectGuides(relative);
  else if(entry.name.endsWith('.md')) files.push(relative);
 }
}
for(const directory of ['frontend','backend','infra','tests']) collectGuides(directory);
const known = new Set([...rf,...rnf,...rules,...tasks].map(r=>r.id));
rf.forEach(r=>known.add('US-'+r.id.slice(3)));
let linkCount=0, diagrams=0;
for(const file of files){
 const content=fs.readFileSync(path.join(root,file),'utf8');
 assert(!content.includes('\uFFFD'),`${file}: caractere de substituição`);
 assert(content.startsWith('# '),`${file}: título ausente`);
 const fences=[...content.matchAll(/^```.*$/gm)];
 assert.equal(fences.length%2,0,`${file}: bloco de código não fechado`);
 diagrams += [...content.matchAll(/^```mermaid$/gm)].length;
 const prose=content.replace(/```[^\n]*\n[\s\S]*?```/g,'');
 for(const [,targetRaw] of prose.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
  const target=targetRaw.replace(/^<|>$/g,'');
  if(/^(https?:|mailto:|#)/.test(target)) continue;
  const local=decodeURIComponent(target.split('#')[0]);
  assert(fs.existsSync(path.resolve(root,path.dirname(file),local)),`${file}: link quebrado ${target}`);
  linkCount++;
 }
 if(!file.endsWith('DIRETRIZES_ORIGINAIS.md')) {
  for(const [ref] of prose.matchAll(/\b(?:RF|RNF|RN|US|DEV)-\d{3}\b/g)) assert(known.has(ref),`${file}: referência desconhecida ${ref}`);
  assert(!/\bXXX\b|DD\/MM\/AAAA|\[data\]/.test(prose),`${file}: placeholder indevido`);
 }
}
// Contagem independente dos dias de capacidade e da data final, sem usar o alocador do gerador.
const technical=tasks.reduce((a,t)=>a+t.hours,0);
const reserve=phases.reduce((a,p)=>a+Math.ceil(tasks.filter(t=>t.phase===p.id).reduce((s,t)=>s+t.hours,0)*config.contingencyRate/8)*8,0);
let day=new Date(config.startDate+'T00:00:00Z'),count=0,end='';
while(count<(technical+reserve)/8){
 const key=day.toISOString().slice(0,10);
 if(day.getUTCDay()!==0&&day.getUTCDay()!==6&&!config.nonWorkingDates.includes(key)){count++;end=key;}
 day.setUTCDate(day.getUTCDate()+1);
}
const br=end.split('-').reverse().join('/');
for(const file of ['README.md','docs/RESUMO_EXECUTIVO.md','docs/CRONOGRAMA.md']){
 const content=fs.readFileSync(path.join(root,file),'utf8');
 assert(content.includes(`**Produção validada:** ${br}`),`${file}: data final divergente`);
 assert(content.includes(`**Total:** ${technical+reserve}h`),`${file}: total divergente`);
}
// Índice e README devem alcançar todos os documentos de topo.
for(const file of files.filter(f=>f.startsWith('docs/')&&f!=='docs/README.md')){
 const basename=path.basename(file);
 assert(fs.readFileSync(path.join(root,'docs/README.md'),'utf8').includes(`](${basename})`),`Índice sem ${basename}`);
 assert(fs.readFileSync(path.join(root,'README.md'),'utf8').includes(`](docs/${basename})`),`README sem ${basename}`);
}
console.log(`OK: ${files.length} arquivos Markdown; ${linkCount} links locais existentes; ${diagrams} diagramas Mermaid com blocos fechados.`);
console.log(`OK: catálogos, cobertura, dependências, referências, documentos gerados e cálculo independente de ${count} dias / término ${br}.`);
console.log('Limite: links externos e renderização Mermaid não são testados; nenhuma funcionalidade da aplicação foi validada por este comando.');
