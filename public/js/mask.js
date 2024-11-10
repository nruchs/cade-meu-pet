document.addEventListener("DOMContentLoaded", function () {
  const telefoneInput = document.getElementById("telefone");

  if (telefoneInput) {
    IMask(telefoneInput, {
      mask: [
        {
          mask: "(00) 0000-0000",
          regex: "^\\([1-9]{2}\\) [2-8][0-9]{3}-[0-9]{4}$",
        },
        {
          mask: "(00) 00000-0000",
          regex: "^\\([1-9]{2}\\) 9[0-9]{4}-[0-9]{4}$",
        },
      ],
      dispatch: function (appended, dynamicMasked) {
        const number = (dynamicMasked.value + appended).replace(/\D/g, "");

        return number.length > 10 || number.charAt(2) === "9"
          ? dynamicMasked.compiledMasks[1]
          : dynamicMasked.compiledMasks[0];
      },
    });
  }

  console.log(telefoneInput);
});
