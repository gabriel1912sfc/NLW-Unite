



let participantes = [
    {
        nome: "Romulo Guilherme",
        email: "romuloguilherme@gmail.com",
        datainscricao: new Date(2024, 2, 21, 23, 20),
        dataCheckIn: new Date(2024, 2, 23, 17, 30),
    },
    {
        nome: "João Diego",
        email: "joaodiego@gmail.com",
        datainscricao: new Date(2024, 2, 19, 20, 10),
        dataCheckIn: new Date(2024, 2, 22, 17, 20),
    },
    {
        nome: "Maria Oliveira",
        email: "maria.oliveira@gmail.com",
        datainscricao: new Date(2024, 2, 25, 11, 45),
        dataCheckIn: new Date(2024, 2, 28, 15, 30),
    },
    {
        nome: "Carlos Silva",
        email: "carlos.silva@gmail.com",
        datainscricao: new Date(2024, 2, 26, 10, 30),
        dataCheckIn: new Date(2024, 2, 29, 14, 20),
    },
    {
        nome: "Ana Paula",
        email: "anapaula@gmail.com",
        datainscricao: new Date(2024, 2, 27, 12, 15),
        dataCheckIn: new Date(2024, 2, 30, 16, 45),
    },
    {
        nome: "Pedro Henrique",
        email: "pedro.henrique@gmail.com",
        datainscricao: new Date(2024, 2, 28, 9, 0),
        dataCheckIn: new Date(2024, 3, 1, 13, 10),
    },
    {
        nome: "Camila Santos",
        email: "camila.santos@gmail.com",
        datainscricao: new Date(2024, 2, 29, 8, 30),
        dataCheckIn: new Date(2024, 3, 2, 12, 20),
    },
    {
        nome: "Rafael Lima",
        email: "rafael.lima@gmail.com",
        datainscricao: new Date(2024, 2, 30, 14, 0),
        dataCheckIn: new Date(2024, 3, 3, 18, 30),
    },
    {
        nome: "Juliana Fernandes",
        email: "juliana.fernandes@gmail.com",
        datainscricao: new Date(2024, 3, 1, 13, 20),
        dataCheckIn: new Date(2024, 3, 4, 17, 50),
    },
    {
        nome: "Lucas Pereira",
        email: "lucas.pereira@gmail.com",
        datainscricao: new Date(2024, 3, 2, 10, 45),
        dataCheckIn: new Date(2024, 3, 5, 15, 15),
    }
]


const criarNovoParticipante = (participante) => {

    const datainscricao = dayjs(Date.now()).to(participante.datainscricao)

    let dataCheckIn = dayjs(Date.now()).to(participante.dataCheckIn)

    if(participante.dataCheckIn == null) {
        dataCheckIn = `
        <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
        >
         Confirmar check-in
        </button>
        `
    }
    
    return ` 
    <tr>
        <td> <strong>
                ${participante.nome}
            </strong> 
            <br> 
            <small>
                ${participante.email}
            </small>
        </td>
        <td>${datainscricao}</td>
        <td>${dataCheckIn}</td>
</tr>`
}

const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes){
        output = output + criarNovoParticipante(participante)
    }

    document.querySelector('tbody').innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {

    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
        nome: dadosDoFormulario.get('nome'),
        email: dadosDoFormulario.get('email'),
        datainscricao: new Date(),
        dataCheckIn: null
    }

    //Verificar se participante já existe

    const participanteExiste = participantes.find(
        (p) => {
            return p.email == participante.email
        }
        )  

        if(participanteExiste){
            alert('Email já cadastrado!')
            return
        }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    // limpar o formulário
    event.target.querySelector('[name="nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
    }

 const fazerCheckIn = (event) => {
    //Confirmar se realmente quer realizar o check-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?'

    if(confirm(mensagemConfirmacao) == false){
        return
    }

      //Encontrar o participante dentro da lista
      const participante = participantes.find((p) =>{
        return p.email == event.target.dataset.email
      })
      //Atualizar o check-in do participante
      participante.dataCheckIn = new Date()

      //Atualizar lista de participantes
      atualizarLista(participantes)
    
 }

