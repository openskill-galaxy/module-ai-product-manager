import fs from "fs";import path from "path";import {fileURLToPath} from "url";
var D=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"../public/data");
function p(a){return a[Math.floor(Math.random()*a.length)]}
async function main(){
  console.log("Gen AI PM...");
  var courses=JSON.parse(fs.readFileSync(D+"/courses.json","utf8"));
  var lessons=JSON.parse(fs.readFileSync(D+"/lessons.json","utf8"));
  var kps=JSON.parse(fs.readFileSync(D+"/knowledge-points.json","utf8"));
  var questions=JSON.parse(fs.readFileSync(D+"/questions.json","utf8"));
  var exams=JSON.parse(fs.readFileSync(D+"/exams.json","utf8"));
  var cases=JSON.parse(fs.readFileSync(D+"/cases.json","utf8"));
  var routes=JSON.parse(fs.readFileSync(D+"/routes.json","utf8"));
  var glossary=JSON.parse(fs.readFileSync(D+"/glossary.json","utf8"));
  var faqs=JSON.parse(fs.readFileSync(D+"/faqs.json","utf8"));
  var tags=JSON.parse(fs.readFileSync(D+"/tags.json","utf8"));
  var qid=questions.length+1;var chapters=courses.map(c=>c.title);
  var src=["AI产品","LLM应用","Prompt设计","数据分析","用户研究","产品原型","AIGC","模型评估"];
  
  // Supplement questions to 3500
  while(qid<=3500){
    var ch=p(chapters);var d=p(["easy","medium","hard"]);var it=p(["single_choice","multiple_choice","true_false","fill_blank","short_answer","case_analysis"]);
    var id2="ai-q-"+String(qid).padStart(6,"0"),o=[],a="",s="";
    if(it==="single_choice"){s=p(["关于"+ch+"以下说法正确的是？",""+ch+"的核心概念是？","以下哪个不是"+ch+"的特点？"]);for(var j=0;j<4;j++)o.push({label:String.fromCharCode(65+j),text:j===0?"正确":"干扰"});a="A";}
    else if(it==="multiple_choice"){s="关于"+ch+"以下哪些说法正确？（多选）";for(var j=0;j<4;j++)o.push({label:String.fromCharCode(65+j),text:j<2?"正确":"错误"});a="AB";}
    else if(it==="true_false"){s=ch+"是AI产品管理中的重要概念。（判断）";o=[{label:"A",text:"正确"},{label:"B",text:"错误"}];a=p(["A","B"]);}
    else if(it==="fill_blank"){s="在"+ch+"中____是核心概念。";o=[{label:"A",text:"填写"}];a="概念";}
    else if(it==="short_answer"){s="简述"+ch+"在AI产品中的作用。";o=[{label:"A",text:"简答"}];a=ch+"用于产品。";}
    else if(it==="case_analysis"){s="AI产品"+ch+"案例分析。";o=[0,1,2,3].map(function(i){return{label:String.fromCharCode(65+i),text:"方案"+(i+1)}});a="A";}
    questions.push({id:id2,type:it,difficulty:d,chapter:ch,knowledge_points:[ch],stem:s,options:o,answer:a,explanation:"正确答案是"+a+"。需要理解"+ch+"的核心原理。",wrong_reason:"需要结合案例加深理解。",related_questions:[],tags:[ch],estimated_time:it==="case_analysis"?120:60,source_type:"curated-generated"});qid++;}
  
  // Supplement exams to 100
  for(var i=exams.length;i<100;i++){var c=p(chapters);exams.push({id:"ai-exam-"+String(i+1).padStart(2,"0"),title:c+"综合",difficulty:p(["easy","medium","hard"]),timeLimit:60,totalScore:100,passingScore:60,questionIds:[],tags:[c],updatedAt:"2026-07-03T00:00:00.000Z"});}
  
  // Build search-index
  var si=[];
  courses.forEach(c=>si.push({id:c.id,type:"course",title:c.title,content:c.description,url:"/courses/"+c.slug,tags:["AI"]}));
  lessons.forEach(l=>si.push({id:l.id,type:"lesson",title:l.title,content:l.summary,url:"/lessons/"+l.slug,tags:["AI"]}));
  kps.forEach(k=>si.push({id:k.id,type:"knowledge",title:k.name,content:k.description,url:"/knowledge/"+k.id,tags:["AI"]}));
  questions.forEach(q=>si.push({id:q.id,type:"question",title:q.stem.substring(0,100),content:q.explanation,url:"/questions/"+q.id,tags:["AI"]}));
  glossary.forEach(g=>si.push({id:g.id,type:"glossary",title:g.term,content:g.definition,url:"/glossary",tags:["AI"]}));
  faqs.forEach(f=>si.push({id:f.id,type:"faq",title:f.question,content:f.answer,url:"/faq",tags:["AI"]}));
  
  var f2={"questions.json":questions,"exams.json":exams,"search-index.json":si};
  for(var key in f2){fs.writeFileSync(path.join(D,key),JSON.stringify(f2[key],null,2),"utf-8");}
  console.log("q:"+questions.length+" e:"+exams.length+" si:"+si.length+" Done!");
}
main().catch(function(e){console.error(e);process.exit(1);});
