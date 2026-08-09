import fs from "node:fs";
import path from "node:path";
import ts from "typescript";
import { CAREER_QUESTION_QUARANTINE } from "../client/src/data/career-question-quarantine";
function unwrap(n:ts.Expression):ts.Expression{while(ts.isAsExpression(n)||ts.isTypeAssertionExpression(n)||ts.isParenthesizedExpression(n)||ts.isNonNullExpression(n))n=n.expression;return n;}
function pName(p:ts.ObjectLiteralElementLike):string|null{return ts.isPropertyAssignment(p)&&(ts.isIdentifier(p.name)||ts.isStringLiteralLike(p.name))?p.name.text:null;}
function prop(n:ts.ObjectLiteralExpression,k:string):ts.Expression|null{for(const p of n.properties)if(pName(p)===k&&ts.isPropertyAssignment(p))return p.initializer;return null;}
function str(n:ts.Expression|null):string{if(!n)return"";n=unwrap(n);return ts.isStringLiteralLike(n)?n.text.trim():"";}
function norm(s:string){return s.toLowerCase().replace(/[^a-z0-9]+/g," ").replace(/\s+/g," ").trim();}
function topics(file:string):Set<string>{const out=new Set<string>();if(!fs.existsSync(file))return out;const src=fs.readFileSync(file,"utf8"),sf=ts.createSourceFile(file,src,ts.ScriptTarget.Latest,true,file.endsWith(".tsx")?ts.ScriptKind.TSX:ts.ScriptKind.TS);const visit=(n:ts.Node)=>{if(ts.isObjectLiteralExpression(n)){const stem=str(prop(n,"stem"))||str(prop(n,"question"));const topic=str(prop(n,"topic"))||str(prop(n,"subtopic"))||str(prop(n,"category"));if(stem&&topic)out.add(norm(topic));}ts.forEachChild(n,visit);};visit(sf);return out;}
function unionTopics(files:string[]):Set<string>{const out=new Set<string>();for(const file of files)for(const topic of topics(path.resolve(file)))out.add(topic);return out;}
function covered(legacy:string,replacements:Set<string>):boolean{if(replacements.has(legacy))return true;for(const r of replacements){if(r.includes(legacy)||legacy.includes(r))return true;const lt=new Set(legacy.split(" ").filter(w=>w.length>3)),rt=new Set(r.split(" ").filter(w=>w.length>3));const overlap=[...lt].filter(w=>rt.has(w)).length;if(overlap>=Math.min(2,lt.size))return true;}return false;}
const results:any[]=[];let missingTotal=0;
for(const entry of CAREER_QUESTION_QUARANTINE){if(!entry.requireTopicParity)continue;const legacy=topics(path.resolve(entry.legacyPath)),replacement=unionTopics(entry.replacementPaths),missing=[...legacy].filter(t=>!covered(t,replacement)).sort();missingTotal+=missing.length;results.push({career:entry.career,legacyTopics:legacy.size,replacementTopics:replacement.size,coveredLegacyTopics:legacy.size-missing.length,coveragePercent:legacy.size?Math.round(((legacy.size-missing.length)/legacy.size)*10000)/100:100,replacementPaths:entry.replacementPaths,missingTopics:missing});}
console.log(JSON.stringify({careers:results,missingTopics:missingTotal,complete:missingTotal===0},null,2));if(missingTotal)process.exitCode=2;
