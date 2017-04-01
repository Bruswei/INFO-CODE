
// Implementerer "handlebars"-aktige HTML-templater/databinding
// slik at vi kan separere view-logikk fra controller-logikk
// rekurserer nedover dom-treet fra node.
function recurse_dom(node) {
	var children = node.childNodes;
	
	text = node.textContent;
	length = text ? text.length || 0 : 0;
	attributes = node.attributes;

	repeatAttr = attributes ? attributes.getNamedItem("data-repeat") || null : null;
	repeatVal = repeatAttr ? repeatAttr.value : null; 
	ifAttr = attributes ? attributes.getNamedItem("data-if") || null : null;
	ifVal = ifAttr ? ifAttr.value : null;
	hrefAttr = attributes ? attributes.getNamedItem("href") : null;
	srcAttr = attributes ? attributes.getNamedItem("src") : null;

	// Håndterer data-if attributt, som i HTML-templatet brukes som 
	// <tag data-if="condition">. Hvis "condition" ikke er truthy,
	// fjernes noden til tag'en fra DOMen.
	if (ifVal) {
		var condition = true;

		try {
			condition = eval(ifVal);
		} catch(e) {
			return;
		}

		if (!condition) { 
			node.parentNode.removeChild(node) // Joda. Det må visst gjøres slik...
		}
	}

	// Håndterer data-repeat attributt, som i HTML-templatet brukes som 
	//     <tag data-repeat="array">
    //          <child-tag>{{ $elt ... }}</child-tag>
	//     </tag>
	// Templatene i undernodene til tag antas å inneholde "$elt" som substitutt 
	// for elementene i arrayen. Setter inn nye undernoder for elementene i 
	// array, med "$elt" substituert med referanse til faktisk element.
	if (repeatVal) {
		var arr = []
		var child = node.children ? node.children.length > 0 ? node.children[0] : null : null;

		try { 
			arr = eval(repeatVal)
		} catch (e) {
			return;
		}

		// Hvis undernode er tom eller inputvariabel ikke er en array, stopp rekursivt kall.
		if (!child || !arr || arr.constructor !== Array) { return; }

		// Setter inn like mange undernoder som arrayen som loopes over.
		for (var i = 0; i < arr.length; i++) {
			newNode = child.cloneNode(true);
			node.appendChild(newNode)
			newNode.innerHTML = newNode.innerHTML.replace(new RegExp('\\$elt', 'g'), repeatVal + "[" + i + "]")
		}

		node.removeChild(child);
	}

	// Gjør verdisubstitusjon i href-tagger. Statements lukket i {{ }} blir byttet ut med evaluering.
	if (hrefAttr) {
		hrefAttr.value = hrefAttr.value.replace(new RegExp('{{([^{^}]*)}}', 'g'), 
			function(match, p, offset, string) {
				var result; 
				try {
					result = eval(p);
				} catch (e) {
					result = match;
				}
				return result;
			}
		)
	}

	// Gjør verdisubstitusjon i src-tagger. Statements lukket i {{ }} blir byttet ut med evaluering.
	if (srcAttr) {
		srcAttr.value = srcAttr.value.replace(new RegExp('{{([^{^}]*)}}', 'g'), 
			function(match, p, offset, string) {
				var result; 
				try {
					result = eval(p);
				} catch (e) {
					result = match;
				}
				return result;
			}
		)
	}

	// Gjør verdisubstitusjon. Statements lukket i {{ }} blir byttet ut med evaluering.
	if (!node.hasChildNodes() && node.textContent) {
		node.textContent = node.textContent.replace(new RegExp('{{([^{^}]*)}}', 'g'),
		function(match, p, offset, string) {
			var result;
			try {
				result = eval(p);
			} catch (e) {
				result = match;
			}

			return result;
		})
	}

	
	children.forEach(recurse_dom)
}

// Rekurserer gjennom hele DOMen
function display() {
	recurse_dom(document)
}