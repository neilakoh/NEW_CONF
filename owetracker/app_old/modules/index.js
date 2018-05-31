module.exports = {
  checkEmptyRequiredTextInput: function(states, requiredFields) {
    return new Promise((resolve)=>{
      try {
        let getEmptyValue = [];
        let statesArr = Object.entries(states);

        for(let i=0; i<statesArr.length; i++) {
          for(let f=0; f<requiredFields.length; f++) {
            if(statesArr[i][0] === requiredFields[f]) {
              if(statesArr[i][1] === null || statesArr[i][1] === "") {
                getEmptyValue.push(statesArr[i][0])
              }
            }
          }
        }

        resolve({
          success: true,
          data: getEmptyValue
        });
      } catch (e) {
        resolve({
          success: false,
          data: []
        });
      }
    });
  },
  generateId: function() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 28; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
  },
  pBarPercentage: function(owedAmount, balance) {
    let balVal = parseInt(balance, 10);
    let owedVal = parseInt(owedAmount, 10);
    let getDiff = owedVal - balVal;
    let getPercentage = (getDiff * 100) / owedVal;
    return parseInt(getPercentage.toFixed(2), 10);
  },
  getPBarColor: function(num, colorCodes) {
    for(let c=0; c<colorCodes.length; c++) {
      if(num >= colorCodes[c].minVal && num <= colorCodes[c].maxVal) {
        return colorCodes[c].color;
      }
    }
  }
}
