const clearWhiteSpace = word => {
    return word.replace(/^ +$/, " ");
}
export function cleanName(name) {
    let names = name.split(" ");
    let resName = "";
    let count = 0;
    for(let nam of names) {
        if(!_.isEmpty(nam)){
            resName += (count > 0) ? " " + nam : nam;
            count++;
        }
    }
    return resName;
}

class FormValidator {
    namex = /^[a-zA-Z- ]{2,}$/;
    numex = /^[0-9]{3,9}$/;
    idex = /^13\-?[0-9]{6}\-?[A-Z]{2}$/;

    validName(name) {
        return name.match(this.namex) !== null;
    }

    validFigure(num) {
        return num > 0;
    }

    validBankingID(id) {
        return id.toUpperCase().match(this.idex) !== null;
    }
}

export default FormValidator;