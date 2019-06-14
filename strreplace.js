const strReplace = (() => {

	const invalid = (()=> {

		let _defaultInvalids = [];

		const setDefaultInvalids = (invalids) => {
			_defaultInvalids = invalids;
		};

		const getDefaultInvalids = () => {
			return _defaultInvalids;
		}

		const checkInvalid = (str, invalids) => {
			let _invalids = (typeof invalids === 'undefined') ? _defaultInvalids : invalids;
			for(let i = 0; i < _invalids.length; i++){
				if(str.indexOf(_invalids[i]) >= 0) return true;
			}
			return false;
		}

		const removeInvalid = (str, invalids) => {
			let _invalids = (typeof invalids === 'undefined') ? _defaultInvalids : invalids;
			let ostr = ''+str;
			for(let i = 0; i < _invalids.length; i++){
				ostr = ostr.split(_invalids[i]).join('');
			}
			return ostr;
		}

		return {
			set : setDefaultInvalids,
			get : getDefaultInvalids,
			check : checkInvalid,
			remove : removeInvalid
		}

	})();

	let _defaultReplacements = [];

	const setDefaultReplacements = (replacements) => {
		_defaultReplacements = replacements;
	}

	const getDefaultReplacements = () => {
		return _defaultReplacements;
	}

	const addReplacement = (char, newchar, regex, rev) => {
		_defaultReplacements.push([char, newchar, regex, rev]);
	}

	const removeReplacement = (char, newchar, regex, rev) => {
		for(let i = 0; i < _defaultReplacements.length; i++){
			if(_defaultReplacements[i] === [char, newchar, regex, rev]) _defaultReplacements.splice(i,1);
		}
	}

	const doReplace = (str, replacements) => {
		let _replacements = (typeof replacements === 'undefined') ? _defaultReplacements : replacements;
		let ostr = ''+str;
		for(let i = 0; i < _replacements.length; i++){
			ostr = ostr.split(_replacements[i][0]).join(_replacements[i][1])
		}
		return ostr;
	}

	const undoReplace = (str, regex, replacements) => {
		let _replacements = (typeof replacements === 'undefined') ? _defaultReplacements : replacements;
		let ostr = ''+str;
		for(let i = _replacements.length - 1; i >= 0; i--){
			if(_replacements[i][1].length > 0 && _replacements[i][3])
				ostr = ostr.split(_replacements[i][1]).join(((regex && _replacements[i][2]) ? '[' : '' ) + _replacements[i][0] + ((regex && _replacements[i][2]) ? ']' : '' ));
		}
		return ostr;
	}


	return {
		invalid : invalid,
		set : setDefaultReplacements,
		get : getDefaultReplacements,
		add : addReplacement,
		del : removeReplacement,
		do : doReplace,
		undo : undoReplace
	}
})();

module.exports = strReplace;
//export {strReplace};
