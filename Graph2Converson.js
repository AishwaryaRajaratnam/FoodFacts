var fs=require("fs");
var readline=require("readline");
var writeStream = fs.createWriteStream("Graph2.json")
var rlemitter=readline.createInterface(
  {
    input:fs.createReadStream("FoodFacts.csv"),
    //  output:fs.createWriteStream("Graph1.json")
  }
);
lineIndex=0;
indexArr=[];
RegionArray=['North Europe','Central Europe','South Europe'];
NEregionArray=['UNITED KINGDOM','DENMARK','DANMARK','SWEDEN','NORWAY'];
CEregionArray=['FRANCE','BELGIUM','GERMANY','SWITZERLAND','NETHERLANDS'];
SEregionArray=['PORTUGAL','GREECE','ITALY','SPAIN','CROATIA','ALBANIA'];
fatArray=[0,0,0];
carbArray=[0,0,0];
proteinArray=[0,0,0];

writeStream.write('[');
/*---Call back function to read and process a line ----*/
var lineReadFunction =function(line){
  var arr=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if(lineIndex==0) {
    for(i=0;i<arr.length;i++)
    {
      if(arr[i]=="countries")
      indexArr[0]=i;
      else if(arr[i]=="fat_100g")
      indexArr[1]=i;
      else if(arr[i]=="carbohydrates_100g")
      indexArr[2]=i;
      else if(arr[i]=="proteins_100g")
      indexArr[3]=i;
    }
    lineIndex++;
  }
  else {
    var countryName=arr[indexArr[0]].toUpperCase();
    if(NEregionArray.indexOf(countryName)>-1)
    {
      if(arr[indexArr[1]]=="")
      fatArray[0]+=0;
      else
      fatArray[0]+=parseFloat(arr[indexArr[1]]);

      if(arr[indexArr[2]]=="")
      carbArray[0]+=0;
      else
      carbArray[0]+=parseFloat(arr[indexArr[2]]);

      if(arr[indexArr[3]]=="")
      proteinArray[0]+=0;
      else
      proteinArray[0]+=parseFloat(arr[indexArr[3]]);
    }
    else if(CEregionArray.indexOf(countryName)>-1)
    {
      if(arr[indexArr[1]]=="")
      fatArray[1]+=0;
      else
      fatArray[1]+=parseFloat(arr[indexArr[1]]);

      if(arr[indexArr[2]]=="")
      carbArray[1]+=0;
      else
      carbArray[1]+=parseFloat(arr[indexArr[2]]);

      if(arr[indexArr[3]]=="")
      proteinArray[1]+=0;
      else
      proteinArray[1]+=parseFloat(arr[indexArr[3]]);
    }
    else if(SEregionArray.indexOf(countryName)>-1)
    {
      if(arr[indexArr[1]]=="")
      fatArray[2]+=0;
      else
      fatArray[2]+=parseFloat(arr[indexArr[1]]);

      if(arr[indexArr[2]]=="")
      carbArray[2]+=0;
      else
      carbArray[2]+=parseFloat(arr[indexArr[2]]);

      if(arr[indexArr[3]]=="")
      proteinArray[2]+=0;
      else
      proteinArray[2]+=parseFloat(arr[indexArr[3]]);
    }
  }//else ends
}//lineReadFunction ends
/*--------line event----*/
rlemitter.on("line",lineReadFunction);
/*--------close event----*/
rlemitter.on("close",function(){
  sep="";
  for(i=0;i<RegionArray.length;i++)
  {
    var ob={
      region:RegionArray[i],
      fat:fatArray[i].toFixed(2),
      carbohydrates:carbArray[i].toFixed(2),
      proteins:proteinArray[i].toFixed(2)
    };
    writeStream.write(sep+JSON.stringify(ob));
    if(!sep)
    sep=",";
  }
  writeStream.write("]");
  console.log("The end.............................");
});
