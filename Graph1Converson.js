var fs=require("fs");
var readline=require("readline");
var writeStream = fs.createWriteStream("Graph1.json")
var rlemitter=readline.createInterface(
  {
    input:fs.createReadStream("FoodFacts.csv"),
  //  output:fs.createWriteStream("Graph1.json")
  }
);
/*---gloabally declared----*/
lineIndex=0;
indexArr=[];
countryArray=['NETHERLANDS','UNITED KINGDOM','FRANCE','GERMANY','SPAIN'];
sugarArray=[0,0,0,0,0];
saltArray=[0,0,0,0,0];

writeStream.write('[');
/*---Call back function to read and process a line ----*/
var lineReadFunction =function(line){
  console.log("Inside asyn function");
  var arr=line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/);
  if(lineIndex==0) {
    for(i=0;i<arr.length;i++)
    {
      if(arr[i]=="countries")
      indexArr[0]=i;
      else if(arr[i]=="sugars_100g")
      indexArr[1]=i;
      else if(arr[i]=="salt_100g")
      indexArr[2]=i;
    }
    lineIndex++;
  }
  else {
    var countryName=arr[indexArr[0]].toUpperCase();
    var index=countryArray.indexOf(countryName);
    if(index>-1)
    {
      if(arr[indexArr[1]]=="")
      sugarArray[index]+=0;
      else
      sugarArray[index]+=parseFloat(arr[indexArr[1]]);

      if(arr[indexArr[2]]=="")
      saltArray[index]+=0;
      else
      saltArray[index]+=parseFloat(arr[indexArr[2]]);
    }
  }
}//lineReadFunction ends
/*--------line event----*/
rlemitter.on("line",lineReadFunction);
console.log("After lineRead");
/*--------close event----*/
rlemitter.on("close",function(){
  sep="";
  for(i=0;i<countryArray.length;i++)
  {
    var ob={
      country:countryArray[i],
      suagr:sugarArray[i].toFixed(2),
      salt:saltArray[i].toFixed(2)
    };
    writeStream.write(sep+JSON.stringify(ob));
    if(!sep)
    sep=",";
  }
  writeStream.write("]");
  console.log("The end.............................");
});
