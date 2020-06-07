function populateUFs() {
  const ufSelect = document.querySelector("[name=uf]")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states => {

    for( const state of states ) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
    }
  })
}

populateUFs()

function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=state]")

    const ufValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities =>  {
    
    for( const city of cities ) {
      citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
    }

    citySelect.disabled = false
  })
}

document
    .querySelector("[name=uf]")
    .addEventListener("change", getCities)

// itens de coleta
// pegar todos os li's

const itemsToCollect = document.querySelectorAll('.items-grid li')

for (const item of itemsToCollect) {
  item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(event) {
  const itemLi = event.target

  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id

  // verificar se existem itens selecionados, se sim pegar esses itens 
  const alreadySelected = selectedItems.findIndex( item => { // para cada item ele retorna essa funcao
      const itemFound = (item == itemId)
      return itemFound
  }) 

  // console.log(alreadySelected)
  
  // se ja estiver selecionado 
  if( alreadySelected >= 0 ) {
  // tirar da selecao
  const filteredItems = selectedItems.filter( item => {
    const itemIsDifferent = (item != itemId) // return false
    return itemIsDifferent
  })

  selectedItems = filteredItems

  } else {
    // se nao estiver selecionado, adicionar a selecao
    selectedItems.push(itemId)
  }

  console.log(selectedItems)

  // atualizar o campo escondido com os dados selecionados
  
  collectedItems.value = selectedItems
}