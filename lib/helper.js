// Array helper function to convert all array items into a URL friendly items
//
Array.prototype.to_params = function(){
	var params = '[';

	for(var i = 0; i < this.length; i++)
	{
		// TO DO: Refactor this method
		if (typeof this[i] === 'string') {
          params += '"' + this[i] + '"';
      }
      else if(typeof this[i] == 'object'){
         params += JSON.stringify(this[i]);
     }
     else {
         params += this[i];
     }


     if(i != this.length - 1)
     {
         params += ",";
     }
 }

 return params + "]";
};