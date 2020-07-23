function populateUFs(){
  const ufSelect = document.querySelector("select[name=uf]")
  fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
  .then(res => res.json())
  .then(states =>{
    for(const state of states){
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome} </option>`
    }
  })
}

populateUFs()

function getCities(event){
  const citySelect = document.querySelector("select[name=city]")
  const stateInput = document.querySelector("input[name=state]")
  const ufValue = event.target.value

  const indexOfSelectedState=event.target.selectedIndex
  stateInput.value=event.target.options[indexOfSelectedState].text

  console.log(ufValue)
  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

  citySelect.innerHTML = "<option Value>Selecione a cidade</option>"
  citySelect.disabled= true

  fetch(url)
  .then(res => res.json())
  .then(cities =>{
      for(const city of cities){
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }
    citySelect.disabled= false
  })
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)

  // itens de coleta
  // pegar todos os li's

  const itensToCollect = document.querySelectorAll(".itens-grid li")

  for(const item of itensToCollect){
    item.addEventListener("click", handleSelectedItem)
  }

  const collectedItems = document.querySelector("input[name=itens]")

  let selectedItens = []

  function handleSelectedItem(event){
    const itemLi = event.target
    // adicionar ou remover uma classe com js
    itemLi.classList.toggle("selected")


    const itemId = itemLi.dataset.id 

    //verificar se existem itens selecionados, se sim
    //pegar os itens selecionados

    const alreadySelected = selectedItens.findIndex(function(item){
      const itemFound = item === itemId
      return itemFound
    } )

    // se já estiver selecionado tirar da seleção

    if(alreadySelected>=0){
      const filterIten = selectedItens.filter(item=>{
        const itenDifferent = item!=itemId
        return itenDifferent
      }) 
      selectedItens=filterIten
    }else{ 
    //se não estiver selecionado adicional
    selectedItens.push(itemId)

    }
    
    //atualizar o campo escondido com os itens selecionados
    collectedItems.value=selectedItens
  }
