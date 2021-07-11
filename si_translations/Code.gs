
let suffix =  ['', 'k','M','G','T','P','E','Z','Y'];
let numbers = ['0','1','2','3','4','5','6','7','8','9'];

/**
 * Takes a SI representation of a number and returns the matching number
 *
 * e.g. 2M = 2,000,000
 * 
 * @param {rep} number representation
 * @return The matching numeric representation.
 * @customfunction
 */
function SI_TO_RAW(rep) {
  //rep = '23M';
  rep = rep.trim();

  let last_char = rep.slice(-1);
  if(suffix.includes(last_char)) {
    // We found a matching suffix
    let base_num = parseFloat(rep.slice(0, -1).trim());

    if(base_num == NaN) {
      throw 'Error: ' + rep + " the base number is not a number";
    }
    // Ok, so we have a known suffix and a number base.
    let final_value = base_num * (1000 ** suffix.findIndex(suffix => suffix == last_char));
    return final_value;
  } else {
    let final_number = parseFloat(rep);
    if(final_number != NaN) {
      // This is already a number
      return final_number;
    } else 
    throw 'Error: ' + rep + " is not a number";
  }
}

/**
 * Takes a number and converts to the closest aproximation SI with the specified decimal places.
 *
 * e.g.
 * 2,100,000 = 2M   with decimal_places = 0
 * 2,100,00  = 2.1M with decimal_places = 1
 * 
 * @param {rep} number representation
 * @return The matching numeric representation.
 * @customfunction
 */
function RAW_TO_SI(rep, decimal_places = 0) {
  let step_divisor = 1000;
  let step_count = 0;

  while(rep > step_divisor) {
    rep = rep / step_divisor;
    step_count = step_count + 1;
  }
  
  return rep.toFixed(decimal_places) + suffix[step_count];
}
