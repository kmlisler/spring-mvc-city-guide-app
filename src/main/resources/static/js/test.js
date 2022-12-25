function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const expected="Samet"
const given="samet"
capitalizeFirstLetter(given)===expected ? console.log('Success') : console.log('Fail')

