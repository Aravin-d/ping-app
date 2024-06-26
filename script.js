document.addEventListener("DOMContentLoaded", () => {
  const input = document.querySelector("input");
  const button = document.querySelector("button");
  const resultList = document.getElementById('result-list')
  const wait = document.getElementById('wait')

  button.addEventListener("click", () => {
    const ipaddr = input.value;

    wait.style.display = "block"

    fetch(`http://localhost:3000/${ipaddr}`, {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
    })
      .then((response) => {
        if(!response.ok){
            throw new Error("network didn't respond")
        }
        return response.json()
      })
      .then((data) => {
        // console.log(typeof data);
        console.log(data);

        JSON.stringify(data).split(',').slice(1, this.length - 1).forEach(item => {

          wait.style.display = "none"
          resultList.innerHTML += `<li>${item}</li>`
        })
      })
      .catch(err => {
        console.error(err);
      })
  });
});
