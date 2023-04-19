class Connection {

  async doTransaction(payload) {
    const transactionURL = "https://run.mocky.io/v3/533cd5d7-63d3-4488-bf8d-4bb8c751c989";
    const transactionHeader = {
      method: "POST",
      body: JSON.stringify(payload),
      headers: { "Content-type": "application/json; charset=UTF-8" }
    }
    const transactionResponse = await fetch(transactionURL, transactionHeader);
    const transactionData = await transactionResponse.json();
    return transactionData;
  }

  async userData() {
    const userURL = "https://www.mocky.io/v2/5d531c4f2e0000620081ddce";
    const userResponse = await fetch(userURL);
    const userData = await userResponse.json();
    return userData;
  }

}


export default Connection