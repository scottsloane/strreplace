//import {strReplace} from './strreplace.js'
const strReplace = require('./strreplace.js');

strReplace.set([
		['.', '▄', true, true],
		['NOT ', '!', false, false]
	]);

	strReplace.add('O', '0', false, false);
	strReplace.add(' 0R ', '~', false, false);
	strReplace.add(' 0R', '', false, true);
	strReplace.add('0R ', '', false, false);

	strReplace.invalid.set(['!','@','~']);

	console.log(strReplace.get())
	let t_str = "OR 12~34.5678 NOT O.1.2.3.4 OR 4.3.2.1.0 OR";
	console.log(t_str);

	if(strReplace.invalid.check(t_str)){
		console.log('Remove invalids');
		t_str = strReplace.invalid.remove(t_str);
	}

	let r_str = strReplace.do(t_str);
	console.log(r_str);

	console.log(strReplace.undo(r_str, true));
	console.log(strReplace.undo(r_str, false));

	console.log(strReplace.do(t_str, [['1', 'X']]));
