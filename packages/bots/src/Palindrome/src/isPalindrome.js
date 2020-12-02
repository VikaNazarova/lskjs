function isPalindrom(str) {

    if((typeof str === 'number' || 'string') && typeof str !== 'object') {
  
      str = String(str).toLowerCase().replace(/\s/g, '');
  
      for ( var i = 0; i < Math.floor(str.length/2); i++ ) {
        if (str[i] !== str[str.length - 1 - i]) {
          return false;
        }
      }
      return true;
    
    } else return false;
    
}

export default isPalindrom;