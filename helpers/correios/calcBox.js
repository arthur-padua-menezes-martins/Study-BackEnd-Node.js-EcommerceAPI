const MIN_width = 11
const MAX_width = 105

const MIN_height = 2
const MAX_height = 105

const MIN_length = 16
const MAX_length = 105

const MIN_SOMA_CLA = 29
const MAX_SOMA_CLA = 200

const orderCart = (cart = null) => {
	if(!Array.isArray(cart))  return cart

	let carrinho = cart.map(item => 
		{
		let novaheight = Math.min( item.height, item.length, item.width )
		let novolength = Math.max( item.height, item.length, item.width )
		let _temp = [item.height, item.length, item.width].sort((a,b) => a < b)
		item.width = _temp[1]
		item.length = novolength
		item.height = novaheight
		item.areaCm = item.width * item.length
		return item
 	})
	return carrinho.sort((a,b) => a.areaCm < b.areaCm)
}

function calcBox ( cart = null )
{
	if(!Array.isArray(cart)) return cart

	let carrinho = orderCart(cart)

	const box = {
		'height': 0, 		 /* height final da caixa */
		'width': 0, 	 /* width */
		'length': 0,  /* ... */
		'qtd_itens': 0, 	 /* qtd de itens dentro da caixa */
		'message': null,   /* caso erro guarda mensagem */
		'volume': 0, 		 /* capacidade total de armazenamento da caixa */
		'volume_itens': 0, /* volume armazenado */
		'volume_vazio': 0, /* volume livre */
		'length_remanescente': 0,
		'width_remanescente': 0,
		'height_remanescente': 0
	}

	if(carrinho.length === 0 ) return "Erro: Carrinho encontra-se vazio."

	carrinho.forEach(item => {

		box.qtd_itens+=1

		box.volume_itens += item.height * item.length * item.width

		if( box.length_remanescente >= item.length && box.width_remanescente >= item.width ){

			if(item.height > box.height_remanescente){
				box.height += item.height - box.height_remanescente
			}

			if(item.length > box.length){
				box.length = item.length
			}

			box.length_remanescente = box.length - item.length

			box.width_remanescente = box.width_remanescente - item.width

			box.height_remanescente = item.height > box.height_remanescente ? item.height : box.height_remanescente

			return
		}

		// passo (N-1) - height e' a variavel que sempre incrementa independente de condicao ...
		box.height += item.height

		// passo N - verificando se item tem dimensoes maiores que a caixa...
		if ( item.width > box.width ) box.width = item.width

		if ( item.length > box.length ) box.length = item.length

		// calculando volume remanescente...
		box.length_remanescente = box.length
		box.width_remanescente = box.width - item.width
		box.height_remanescente = item.height
	})

	// @opcional - calculando volume da caixa ...
	box.volume = ( box.height * box.width * box.length )

	// @opcional - calculando volume vazio! Ar dentro da caixa!
	box.volume_vazio = box.volume - box.volume_itens

	// checa se temos produtos e se conseguimos alcancar a dimensao minima ...
	if( !carrinho.length === 0 ){
		// verificando se dimensoes minimas sao alcancadas ...
		if( box.height > 0 && box.height < MIN_height ) box.height = MIN_height 
		if( box.width > 0 && box.width < MIN_width ) box.width = MIN_width 
		if( box.length > 0 && box.length < MIN_length ) box.length = MIN_length 
	}

	// verifica se as dimensoes nao ultrapassam valor maximo
	if( box.height > MAX_height ) box.message = "Erro: height maior que o permitido."
	if( box.width > MAX_width ) box.message = "Erro: width maior que o permitido."
	if( box.length > MAX_length ) box.message = "Erro: length maior que o permitido."

	// @nota - nao sei se e' uma regra, mas por via das duvidas esta ai
	// Soma (C+L+A)	MIN 29 cm  e  MAX 200 cm
	if( (box.length+box.length+box.length) < MIN_SOMA_CLA ) box.message = "Erro: Soma dos valores C+L+A menor que o permitido."

	if( (box.length+box.length+box.length) > MAX_SOMA_CLA ) box.message = "Erro: Soma dos valores C+L+A maior que o permitido."

	return box
}

// carrinho = [
// 	{ title: 'Livro - A Arte da Guerra', height: 5, width: 30, length: 20 },
// 	{ title: 'Livro - A Arte da Guerra', height: 5, width: 30, length: 20 },
// 	{ title: 'Livro - Use a Cabeça Estatistica', height: 5, width: 8, length: 22 },
// 	{ title: 'Livro - Use a Cabeça Web Design', height: 28, width: 15, length: 15 }
// ]

// const box = calcBox( carrinho )

// console.log(box)

module.exports = calcBox