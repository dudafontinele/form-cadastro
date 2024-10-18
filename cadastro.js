async function buscarEndereco() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');
     const resultado = document.getElementById('resultado');
        if (cep.length !== 8) {
           resultado.innerHTML = 'CEP inválido.';
       return;
     }
 
 try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
       const data = await response.json();
 
     if (data.erro) {
           resultado.innerHTML = 'CEP não encontrado.';
     } else {
           document.getElementById('rua').value = data.logradouro;
          document.getElementById('bairro').value = data.bairro;
         document.getElementById('cidade').value = data.localidade;
          document.getElementById('estado').value = data.uf;
         resultado.innerHTML = '';
              }
            } catch (error) {
                resultado.innerHTML = 'Erro ao buscar o endereço.';
            }
        }
 
        function validarEmail(email) {
         const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
         return re.test(String(email).toLowerCase());
        }
 
      function validarCPF(cpf) {
      cpf = cpf.replace(/\D/g, '');
      if (cpf.length !== 11) return false;
       // Validação simplificada do CPF
       let soma = 0;
    let resto;
     for (let i = 1; i <= 9; i++) {
     soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
            }
     resto = (soma * 10) % 11;
     if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.charAt(9))) return false;
            soma = 0;
     for (let i = 1; i <= 10; i++) {
          soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
            }
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
  return resto === parseInt(cpf.charAt(10));
        }
 
     function validarFormulario(event) {
    const email = document.getElementById('email').value;
   const cpf = document.getElementById('cpf').value;
 
   if (!validarEmail(email)) {
        alert('Email inválido!');
        event.preventDefault();
    }
 
    if (!validarCPF(cpf)) {
         alert('CPF inválido!');
        event.preventDefault();
         }
  }