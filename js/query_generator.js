var counter=1;

function get_data(){
	var div_list=document.querySelectorAll('[id^="div_"]');
	var form_list=document.querySelectorAll('[id^="form_"]');
	var lemma_list=document.querySelectorAll('[id^="lemma_"]');
	var deprel_list=document.querySelectorAll('[id^="deprel_"]');
	var xpostag_list=document.querySelectorAll('[id^="xpostag_"]');
	var upostag_list=document.querySelectorAll('[id^="upostag_"]');
	var feats_list=document.querySelectorAll('[id^="feats_"]');
	var head_list=document.querySelectorAll('[id^="head_"]');
	var headvalue_list=document.querySelectorAll('[id^="headvalue_"]');
	var arr=[];
	
	for(i=0;i<div_list.length;i++){
		var obj=new Object();
		obj.div=div_list[i];
		obj.form=form_list[i];
		obj.lemma=lemma_list[i];
		obj.deprel=deprel_list[i];
		obj.xpostag=xpostag_list[i];
		obj.upostag=upostag_list[i];
		obj.feats=feats_list[i];
		obj.head=head_list[i];
		obj.headvalue=headvalue_list[i];
		arr.push(obj);
	}
	
	var output_query="";
	var output_variable="";
	var has_prop=false;
	for(i=0;i<arr.length;i++){
		has_prop=false;
		var query="?s_"+i.toString();
		var variable="?s_"+i.toString();
		if(arr[i].form.value!==""){
			query+=`\tconll:FORM\t"${arr[i].form.value}";\n`;
			console.log("1");
			has_prop=true;
		}
		if(arr[i].lemma.value!==""){
			query+=`\tconll:LEMMA\t"${arr[i].lemma.value}";\n`;
			console.log("2");
			has_prop=true;
		}
		if(arr[i].deprel.value!==""){
			query+=`\tconll:DEPREL\t"${arr[i].deprel.value}";\n`;
			console.log("3");
			has_prop=true;
		}
		if(arr[i].xpostag.value!=="None"){
			query+=`\tconll:XPOSTAG\t"${arr[i].xpostag.value}";\n`;
			console.log("4");
			has_prop=true;
		}
		if(arr[i].upostag.value!=="None"){
			query+=`\tconll:UPOSTAG\t"${arr[i].upostag.value}";\n`;
			console.log("5");
			has_prop=true;
		}
		if(arr[i].feats){
			var str=""
			for(j=0;j<arr[i].feats.selectedOptions.length;j++){
				if(arr[i].feats.selectedOptions[j].value!=="None")
					str+=arr[i].feats.selectedOptions[j].value+"|";
			}
			if(str.endsWith("|"))
				str=str.substring(0,str.length-1)
			if(str!==""	){
				has_prop=true;
				query+=`\tconll:FEATS\t"${str}";\n`;
			}
			
		}
		if(arr[i].head.value!=="None"){
			if(arr[i].head.value==="0"){
				query+=`\tconll:HEAD\t:s1_0;\n`;
				has_prop=true;
			}
			else if(i<arr.length-1){
				query+=`\tconll:HEAD\t?s_${i+1};\n`;
			}
			
		}
		if(has_prop===true){
			query=query.substring(0,query.length-2)+".\n";
			output_query+=query;
		}
		if(i!=0)
			output_variable+=", ";
		output_variable+=variable;

	}
	var total_query=`
PREFIX terms: <http://purl.org/acoli/open-ie/>
PREFIX rdf:   <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX conll: <http://ufal.mff.cuni.cz/conll2009-st/task-description.html#>
PREFIX rdfs:  <http://www.w3.org/2000/01/rdf-schema#>
PREFIX nif:   <http://persistence.uni-leipzig.org/nlp2rdf/ontologies/nif-core#>
SELECT ${output_variable} WHERE
{
${output_query}
}`;
	var generated_query=document.getElementById("generated_query");
	generated_query.textContent=total_query;
}

function get_div_content(div_id){
	var new_div=document.createElement('div');
	new_div.id="div_"+div_id.toString();
	
	var form = "form_"+div_id.toString();
	var lemma = "lemma_"+div_id.toString();
	var deprel = "deprel_"+div_id.toString();
	var xpostag = "xpostag_"+div_id.toString();
	var upostag = "upostag_"+div_id.toString();
	var feats = "feats_"+div_id.toString();
	var head = "head_"+div_id.toString();
	var head_value = "headvalue_"+div_id.toString();
	
	var content=`
	${div_id}<br/>
	FORM:
	<input type="text" name="${form}" id="${form}"><br>
	LEMMA:
	<input type="text" name="${lemma}" id="${lemma}">
	<br>
	DEPREL:
	<input type="text" name="${deprel}" id="${deprel}">
	<br>
	XPOSTAG:
	<select name="${xpostag}" id="${xpostag}">
		<option selected value="None">None</option>
		<option value="AJ">AJ</option>
		<option value="AV">AV</option>
		<option value="NU">NU</option>
		<option value="CNJ">CNJ</option>
		<option value="DET">DET</option>
		<option value="J">J</option>
		<option value="N">N</option>
		<option value="V">V</option>
		<option value="PRP">PRP</option>
		<option value="DN">DN</option>
		<option value="EN">EN</option>
		<option value="GN">GN</option>
		<option value="MN">MN</option>
		<option value="PN">PN</option>
		<option value="RN">RN</option>
		<option value="SN">SN</option>
		<option value="TN">TN</option>
		<option value="WN">WN</option>
		<option value="AN">AN</option>
		<option value="CN">CN</option>
		<option value="FN">FN</option>
		<option value="LN">LN</option>
		<option value="ON">ON</option>
		<option value="QN">QN</option>
		<option value="YN">YN</option>
	</select>
	<br>
	UPOSTAG:
	<select name="${upostag}" id="${upostag}">
		<option selected value="None">None</option>
		<option value="ADJ">ADJ</option>
		<option value="ADV">ADV</option>
		<option value="NUM">NUM</option>
		<option value="CCONJ">CCONJ</option>
		<option value="DET">DET</option>
		<option value="INTJ">INTJ</option>
		<option value="NOUN">NOUN</option>
		<option value="VERB">VERB</option>
		<option value="ADP">ADP</option>
		<option value="PROPN">PROPN</option>
	</select>
	<br>
	FEATS:
	<select name="${feats}" id="${feats}" multiple>
		<option selected value="None">None</option>
		<option value="Case=Abs">Case=Abs</option>
		<option value="Case=Gen">Case=Gen</option>
		<option value="Case=Erg">Case=Erg</option>
		<option value="Case=Abl">Case=Abl</option>
		<option value="Animacy=Nhum">Animacy=Nhum</option>
		<option value="Animacy=Hum">Animacy=Hum</option>
		<option value="Number=Plur">Number=Plur</option>
		<option value="Number=Sing">Number=Sing</option>
		<option value="Polarity=Pos">Polarity=Pos</option>
		<option value="Polarity=Neg">Polarity=Neg</option>
		<option value="Person=0">Person=0</option>
		<option value="Person=1">Person=1</option>
		<option value="Person=2">Person=2</option>
		<option value="Person=3">Person=3</option>
		<option value="Person=4">Person=4</option>
		<option value="Aspect=Prosp">Aspect=Prosp</option>
		<option value="VerbForm=Fin">VerbForm=Fin</option>
		<option value="Mood=Opt">Mood=Opt</option>
		<option value="Voice=Mid">Voice=Mid</option>				
	</select>
	<br>
	HEAD:
	<select name="${head}" id="${head}" onchange="show_box(this,${head_value})">
		<option value="None" default>None</option>
		<option value="0" >0</option>
		<option value="other" >Other Token</option>
	</select>
	<button type="submit" onclick="add_head()" id="${head_value}" style="visibility:hidden;">
		Add a HEAD
	</button>
	</div>
	<hr>
	`
	new_div.innerHTML=content;
	return new_div
}

function show_box(box,button_id){
	head_value=button_id;
	if (box.value=='other'){
		head_value.style.visibility='visible';
	}
	else {
		head_value.style.visibility='hidden';
	};
} 


function add_head(){
	new_div=get_div_content(window.counter);
	var space=100*(window.counter-1);
	new_div.style.position="relative";
	new_div.style.padding="0px 0px 0px "+space.toString()+"px";
	document.getElementsByClassName('container')[0].appendChild(new_div);
	window.counter+=1;
} 

