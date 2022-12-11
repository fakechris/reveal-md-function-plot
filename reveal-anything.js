
Reveal.addEventListener('ready', event => asyncFunctionRender(event));
async function asyncFunctionRender(event) {
	function parseJSON(str) {
	    str = str.replace(/(\r\n|\n|\r|\t)/gm,""); // remove line breaks and tabs
	    var json;
	    try {
        	json = JSON.parse(str, function (key, value) {
    			if (value && (typeof value === 'string') && value.indexOf("function") === 0) {
			        // we can only pass a function as string in JSON ==> doing a real function
//			        eval("var jsFunc = " + value);
				var jsFunc = new Function('return ' + value)();
			        return jsFunc;
		 	}
			return value;
		});
	    } catch (e) {
        	return null;
    	}
		return json;
	}
         
	var func_plot = document.getElementsByClassName("plot");
	func_plot.forEach((item, index) => {
		let funcNode = item.textContent.trim();
		options = parseJSON(funcNode);

		let plotDiv = document.createElement('div');
        plotDiv.classList.add('plot');
        plotDiv.setAttribute("data-processed", "true");
		plotDiv.id = options.target.substr(1);

        try {
            let parentDiv = document.createElement('div');
            parentDiv.appendChild(plotDiv);
            item.parentNode.parentNode.insertBefore(parentDiv, item.parentNode);
            item.parentNode.remove();
        }
        catch(err) {
            console.log(err.message);
        }

		functionPlot(options);
	})
}
