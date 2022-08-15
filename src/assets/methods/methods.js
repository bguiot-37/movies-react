// méthode màj de la date
const dateMaJ = (date) => {
  return date.split("-").reverse().join("-");
};

module.exports = { dateMaJ };
